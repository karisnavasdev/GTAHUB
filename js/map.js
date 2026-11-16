// ===== INTERACTIVE MAP (Leaflet, custom CRS.Simple, gta6map community tiles — p1-2) =====
(function () {
  // Kill switch (p2-19): карта построена на тайлах сообщества (наследие слива 2022) — риск DMCA
  // до тайл-свопа 19.11 (MONETIZATION_SLOTS.md). MAP_ENABLED:false скрывает виджет и Fullscreen-
  // кнопку, оставляя плейсхолдер вместо Leaflet; #fsBtn остаётся в DOM (просто display:none) —
  // news.js вешает на него слушатель безусловно, удаление элемента дало бы ошибку в консоли.
  if (!window.SITE_CONFIG.MAP_ENABLED) {
    document.getElementById('leafletMap').innerHTML =
      '<div class="map-unavailable">The interactive map is temporarily unavailable.</div>';
    document.querySelector('.map-panel')?.remove();
    document.querySelector('.map-attribution')?.remove();
    document.getElementById('mapUiPanel')?.remove();
    const fsBtn = document.getElementById('fsBtn');
    if (fsBtn) fsBtn.style.display = 'none';
    return;
  }

  // Fallback: CDN Leaflet недоступен -> статичная картинка вместо мёртвого блока
  if (typeof L === 'undefined') {
    const el = document.getElementById('leafletMap');
    el.innerHTML = '<img src="assets/map-placeholder.svg" alt="Leonida map" style="width:100%;height:100%;object-fit:contain">';
    return;
  }

  // ---- Калибровка (PROMPT_map_implementation.md §2, из исходного index.html проекта gta6map) ----
  const TILE_SIZE = 1024;
  const MAX_Z = 6;
  // round-6 фикс (см. scripts/yanis13-tile.js): раньше центром тайл-пирамиды была ИГРОВАЯ точка
  // (0,0) — унаследовано от старого датасета yanis v6, чей "мир" ±16384м реально был таким большим.
  // Мастер yanis13 — честные 20000×20000м, и его собственный центр НЕ совпадает с игровым (0,0):
  // смещение -6500м по X и +2000м по Y (см. ZERO_X/ZERO_Y в yanis13-tile.js). Из-за старого
  // центрирования на z0 (1 тайл = 32768м) остров упирался в край, а второй z0-тайл был на 99.6%
  // пустой водой без единого реального пикселя — при отдалении ниже z0 (Leaflet тянет z0-тайл)
  // это выглядело как гигантский лишний кусок воды. Теперь пирамида центрирована на центр САМОГО
  // МАСТЕРА, не на игровой ноль — те же 6384/32=199.5 и (6384-2000... см. расчёт), пиксель тайл-
  // пирамиды на zoom=0 (канвас 1024px): X0 = gx/32 + 715.125, Y0 = -gy/32 + 574.5.
  const ZERO_PX_AT_Z0_X = 715.125;
  const ZERO_PX_AT_Z0_Y = 574.5;
  // xMin было -16000 — сэмплинг цвета z0-тайлов (sharp, столбцовая дисперсия) показал, что суша на
  // мастер-картинке начинается только с gx≈-9984, а -16000..-9984 это чистая заливка/вода без
  // единого пикселя реального контента — fitBounds ниже честно центрировал этот пустой хвост,
  // отсюда и "асимметрия влево" (пустая вода слева, остров прижат вправо). -10500 — измеренная
  // граница суши (-9984) плюс небольшой запас, без пересэмпла при желании подвинуть точнее.
  // xMax 4000->3500: восточная граница МАСТЕРА (за ней — только дорисованная при нарезке вода,
  // раунд 03-08 "убрать лишние тайлы/воду": карта теперь жёстко ограничена этим прямоугольником).
  const WORLD = { xMin: -10500, xMax: 3500, yMin: -8000, yMax: 12000 };

  // CRS.Simple с кастомной трансформацией "игровые единицы -> пиксели тайла", L.Transformation
  // вместо самодельной линейной интерполяции (см. PROMPT) — избегает рассинхрона осей X/Y между
  // тайлсетами и маркерами на разных зумах. Знак Y инвертирован (game Y растёт вверх/на север,
  // пиксели тайла — вниз, типовая конвенция для таких карт); если после визуальной проверки на
  // реальных тайлах маркеры окажутся зеркальны по вертикали — поменять знак у c и d.
  const CRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1 / 32, ZERO_PX_AT_Z0_X, -1 / 32, ZERO_PX_AT_Z0_Y)
  });

  const gameLatLng = (x, y) => L.latLng(y, x);
  // Игровых метров в одном экранном пикселе на зуме z — прямое следствие трансформации 1/32 выше.
  // Единственная копия формулы (экспорт через LeonidaMap): drive-mode/card-fragments раньше
  // держали каждую свою — при смене калибровки CRS они разъехались бы молча.
  const mppx = (z) => 32 / Math.pow(2, z);
  // maxBounds — используется только для стартового fitBounds() и кнопки Recenter (тайлы больше не
  // ограничены bounds, см. GameTileLayer ниже) — панорамировать за эти границы можно свободно,
  // тут только "домашний" кадр камеры, подогнанный под измеренную границу суши по X (см. WORLD).
  const maxBounds = L.latLngBounds(
    gameLatLng(WORLD.xMin, WORLD.yMin),
    gameLatLng(WORLD.xMax, WORLD.yMax)
  );

  const sources = window.SITE_CONFIG.TILE_SOURCES;
  const labelToKey = Object.fromEntries(Object.keys(sources).map((key) => [sources[key].label, key]));
  // maxZoom карты — потолок физической детализации АКТИВНОГО слоя, не общий MAX_Z: на yanis13/-ref
  // (z_native=5) зумить выше нельзя, апскейл последнего уровня даёт видимую "лесенку" пикселей —
  // см. maxNativeZoom в config.js. Стартовое значение — по дефолтному слою, дальше обновляется на
  // каждый baselayerchange ниже.
  const defaultSourceKey = window.SITE_CONFIG.DEFAULT_TILE_SOURCE;

  const map = L.map('leafletMap', {
    crs: CRS,
    minZoom: -2, // реальный минимум ставит clampViewToWorld() ниже — динамический, по размеру вьюпорта
    maxZoom: sources[defaultSourceKey].maxNativeZoom || MAX_Z,
    zoomSnap: 0.25,
    // Дефолтный порог 4: зум-переход больше 4 уровней (полный диапазон тут ~7) Leaflet рисует
    // БЕЗ анимации — жёсткий скачок, читался как "рывки на больших расстояниях".
    zoomAnimationThreshold: 8,
    attributionControl: false,
    noWrap: true,
    // Раунд 03-08 (отменяет прежний запрет на maxBounds): карта ограничена прямоугольником WORLD
    // жёсткой стеной — за границей только дорисованная при нарезке вода, показывать нечего.
    // Прошлая проблема "вязкость тянет к центру на низких зумах" решена не отказом от bounds, а
    // динамическим minZoom (clampViewToWorld): вьюпорт никогда не больше bounds, тянуть не к чему.
    maxBounds,
    maxBoundsViscosity: 1.0,
    preferCanvas: true // PROMPT_map_lod_finalize.md §6.1 — T2 рендерится L.circleMarker на canvas
  });
  // Динамический потолок отдаления: "вьюпорт целиком внутри WORLD" минус один уровень запаса
  // (фидбэк "1 км мало — нужен уровень выше"). На этом запасном уровне по краям виден фон
  // контейнера — он в цвет воды тайлсета, край не читается. Пересчёт на каждый ресайз
  // (fullscreen-тоггл шлёт map 'resize'); во время езды min/max зумом владеет drive-mode.
  function clampViewToWorld() {
    if (window.DriveMode?.isActive?.()) return;
    // Пол z=0: на нём шкала показывает "3 km" — максимум отдаления по фидбэку раунда-9
    // (глубже жил только фон-океан, ценности в кадре не добавлял).
    map.setMinZoom(Math.max(map.getBoundsZoom(maxBounds, true) - 3, 0));
  }
  map.on('resize', clampViewToWorld);
  map.fitBounds(maxBounds);
  clampViewToWorld();

  // Мир = мастер 20000x20000м (game x -16500..3500, y -8000..12000). "Лишних" тайлов на диске нет
  // (нарезка генерит только пересекающие мастер), но вода-доливка запечена ВНУТРИ краевых тайлов —
  // клип тайл-паны по прямоугольнику мастера отрезает её на любом отдалении: дальше мастера
  // рисуется только фон контейнера (в цвет воды). Layer-координаты, пересчёт на move/zoom —
  // тот же приём, что клип шторки в ai-compare.js (тот дополнительно пересекает свой клип с этим
  // же прямоугольником, см. masterRect в экспорте LeonidaMap).
  const MASTER_RECT = { west: -16500, east: 3500, south: -8000, north: 12000 };
  // Три паны клипуются по одному и тому же прямоугольнику мастера: тайлы (здесь), ночь
  // (night-mode.js) и AI-слой (ai-compare.js, ещё и пересекает его со шторкой). Формула перевода
  // в layer-координаты и сборка polygon() жили в трёх копиях — при правке калибровки разъехались бы
  // молча. Отдаём наружу через LeonidaMap, чтобы копия была одна.
  const masterLayerRect = () => ({
    nw: map.latLngToLayerPoint(gameLatLng(MASTER_RECT.west, MASTER_RECT.north)),
    se: map.latLngToLayerPoint(gameLatLng(MASTER_RECT.east, MASTER_RECT.south))
  });
  const rectPolygon = (nw, se) =>
    `polygon(${nw.x}px ${nw.y}px, ${se.x}px ${nw.y}px, ${se.x}px ${se.y}px, ${nw.x}px ${se.y}px)`;
  function clipTilesToMaster() {
    const { nw, se } = masterLayerRect();
    map.getPane('tilePane').style.clipPath = rectPolygon(nw, se);
  }
  map.on('move zoom viewreset resize', clipTilesToMaster);
  clipTilesToMaster();
  // Известная ловушка Leaflet: контейнер .map-frame получает свою итоговую ширину/высоту из CSS
  // grid, которая может ещё сдвинуться после первого fitBounds() (веб-шрифты Bebas Neue/Space
  // Grotesk дозагружаются асинхронно и меняют высоту строк выше карты) — а Leaflet кэширует размер
  // контейнера в момент L.map(), не переслушивает такие сдвиги (только настоящий window resize).
  // Итог — карта может отцентроваться по СТАРОМУ, неверному размеру контейнера и выглядеть
  // асимметричной, пока пользователь не потрогает карту (что форсит invalidateSize сам). Пере-
  // считываем размер и перецентровываем, когда шрифты точно готовы (или сразу, если API недоступен).
  const refit = () => { map.invalidateSize(); map.fitBounds(maxBounds); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  else window.addEventListener('load', refit);

  // ---- Тайл-слои: все источники из TILE_SOURCES создаются сразу, активный переключается
  // пикером (сейчас это два варианта одного мастера — clean и annotated).
  // Схема имени файла своя (НЕ TMS, НЕ стандартный slippy {z}/{x}/{y}): {z}/{z},{y},{x}.jpg.
  const GameTileLayer = L.TileLayer.extend({
    // Плавность дальнего зума — для ВСЕХ слоёв этого класса (базовые здесь + AI-слой в
    // ai-compare.js): не перегружать сетку тайлов посреди зум-анимации (старые тайлы просто
    // масштабируются до zoomend — без мигания полузагруженных) и держать запас тайлов за краем
    // вьюпорта (дефолт 2), чтобы перелёт не открывал "шахматку" пустых клеток.
    options: { updateWhenZooming: false, keepBuffer: 6 },
    getTileUrl(coords) {
      return `${this.options.tileBase}/${coords.z}/${coords.z},${coords.y},${coords.x}.jpg`;
    }
  });

  // Реальный охват тайл-пирамиды на z0 — после round-6 ретайла (центр пирамиды = центр мастера,
  // см. ZERO_PX_AT_Z0_X/Y и scripts/yanis13-tile.js) на z0 РОВНО один тайл: x:[0,1), y:[0,1).
  // Раньше (мир центрирован на игровой ноль, унаследовано от старого датасета yanis v6) тайлов на
  // z0 было два, и второй был на 99.6% пустой водой без единого реального пикселя — именно он и
  // читался как "лишний кусок воды" при отдалении ниже z0 (minZoom:-1 тянет z0 растянутым).
  //
  // bounds на слое (ниже) — без него Leaflet на низком зуме/маленьком вьюпорте всё равно просит
  // соседние тайлы за пределами реальной сетки, их нет на диске -> 404 -> пустой img поверх
  // тёмного фона читается как ещё одна "колонка воды", хотя это не тайл карты вообще. bounds =
  // точный край физической сетки тайлов (не кадр камеры) — исключает лишние запросы, не обрезает
  // настоящие тайлы.
  //
  // Проверено напрямую (не на глаз): смэтчил z0-тайл против реального мастера
  // local-map-source/yanis-v13/yanis13-clean-master.png (20000×20000) — нашёл bbox острова в
  // 625×625 даунскейле мастера (x:202-606) и в самом тайле (x:399-809, ожидание 402-806 с учётом
  // паддинга 200px) — совпадает. Асимметрия полей вокруг острова внутри тайла — свойство самого
  // мастер-файла (остров и там не по центру своего холста), не баг компоновки.
  const TILE_GRID_Z0 = { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }; // тайл-индексы z0, верхняя граница исключительно
  const tileEdgeToGame = (tx, ty) => gameLatLng((tx * TILE_SIZE - ZERO_PX_AT_Z0_X) * 32, (ZERO_PX_AT_Z0_Y - ty * TILE_SIZE) * 32);
  const tilePyramidBounds = L.latLngBounds(
    tileEdgeToGame(TILE_GRID_Z0.xMin, TILE_GRID_Z0.yMax),
    tileEdgeToGame(TILE_GRID_Z0.xMax, TILE_GRID_Z0.yMin)
  );

  const baseLayers = {};
  Object.keys(sources).forEach((key) => {
    baseLayers[sources[key].label] = new GameTileLayer('', {
      tileBase: `${window.SITE_CONFIG.TILE_BASE_URL}/${sources[key].slug}`,
      tileSize: TILE_SIZE,
      minZoom: -2, // не выше minZoom карты — иначе ниже своего порога слой просто исчезает (пустой экран на дальнем отдалении)
      maxZoom: MAX_Z,
      minNativeZoom: 0, // тайлов ниже z0 нет на диске — Leaflet растягивает z0 вместо 404 на z=-1
      // per-source: yanis13/-ref нарезаны только до z5 (§3, maxZoom карты капается на этом же
      // значении ниже — апскейл выше z_native физически недостижим).
      maxNativeZoom: sources[key].maxNativeZoom || MAX_Z,
      noWrap: true,
      bounds: tilePyramidBounds
    });
  });
  baseLayers[sources[defaultSourceKey].label].addTo(map);
  // Пикер слоёв нужен только когда есть из чего выбирать: при единственном источнике
  // (TILE_SOURCES из одного ключа) показывать переключатель не на что.
  if (Object.keys(sources).length > 1) {
    L.control.layers(baseLayers, null, { position: 'topleft' }).addTo(map);
  }

  // Общий конструктор своих контролов (Recenter/Scale/Player): различаются только позицией и
  // телом onAdd — три одинаковых L.Control.extend-обёртки схлопнуты в одну (рефактор 08-09).
  const addControl = (position, onAdd) =>
    new (L.Control.extend({ options: { position }, onAdd }))().addTo(map);

  // Кнопка "вернуть камеру" — после снятия maxBounds (см. выше, по запросу) пользователь может
  // укатить вьюпорт сколь угодно далеко, обратной пружины больше нет, нужен явный способ вернуться.
  addControl('topleft', () => {
    const btn = L.DomUtil.create('button', 'map-recenter');
    btn.type = 'button';
    btn.title = window.Render.t('Recenter map');
    // Иконка — SVG-фон в CSS (.map-recenter), не текстовый глиф, см. коммент там же.
    L.DomEvent.disableClickPropagation(btn);
    btn.addEventListener('click', () => map.fitBounds(maxBounds));
    return btn;
  });

  // Текущий активный базовый слой — читает openUiPanel() ниже, чтобы решить, показывать ли
  // картинку-легенду (условные обозначения нужны только на annotated-слое, см. openUiPanel).
  let activeLayerKey = defaultSourceKey;

  // На каждую смену базового слоя — потолок зума карты под физическую детализацию нового слоя
  // (см. коммент у maxZoom выше); Leaflet сам подожмёт текущий зум, если он теперь выше потолка.
  // Автооткрытие Legend на annotated-слое убрано по запросу — панель доступна вручную по кнопке.
  map.on('baselayerchange', (e) => {
    const key = labelToKey[e.name];
    activeLayerKey = key;
    map.setMaxZoom(sources[key]?.maxNativeZoom || MAX_Z);
  });

  // bottomleft занят текстовой атрибуцией (.map-attribution, не Leaflet-контрол, перекрытие
  // с leaflet-control-scale не разруливается автостеком) — bottomright свободен.
  // Своя шкала вместо L.control.scale: у той ДЛИНА полосы подгоняется под круглое число (1/2/3/5),
  // и на нашем дробном зуме два верхних шага давали одну и ту же подпись — замер: z=4.75 -> "100 m"
  // полосой 84px и z=5.0 -> "100 m" полосой 100px ("мне 2 раза по 100 показывается"). Причина —
  // фаза зума: fitBounds на zoomSnap 0.25 садится на 1.75, шаги идут 2.75/3.75/4.75, а последний
  // обрезан потолком maxZoom до 5.0 — интервал получается не 2x, а 1.19x, и оба попадают в одну
  // ступень ладдера. Метр-на-пиксель у нас известен точно (CRS 1/32 => 32/2^zoom), поэтому здесь
  // наоборот: полоса фиксированной длины, подпись — её честная величина. Ни одна пара соседних
  // зумов больше не совпадает, и фаза зума перестала иметь значение.
  const SCALE_PX = 100;
  const scaleText = (m) => (m >= 1000
    ? String(+(m / 1000).toFixed(1)) + ' km'
    : Math.round(m / 10) * 10 + ' m');
  addControl('bottomright', () => {
    const box = L.DomUtil.create('div', 'leaflet-control-scale leaflet-control');
    const line = L.DomUtil.create('div', 'leaflet-control-scale-line', box);
    line.style.width = SCALE_PX + 'px';
    const draw = () => { line.textContent = scaleText(mppx(map.getZoom()) * SCALE_PX); };
    map.on('zoom zoomend', draw);
    draw();
    return box;
  });

  // Кнопка-шорткат на радио прямо с карты — переиспользует уже существующий тумблер radioToggle
  // (та же логика play/pause, что в виджете слева), не дублирует состояние радио здесь. Иконка
  // (play/pause) и цвет (--ra-c текущей станции, тот же приём, что в radio.css) синхронизируются
  // через MutationObserver за #radioWidget — тот живёт в другом поддереве DOM (левая колонка), а
  // не внутри leaflet-контролов, так что CSS-каскад до кнопки на карте сам не дотягивается.
  // Добавлена после scale — bottomright у Leaflet стекуется снизу вверх, значит окажется НАД ним.
  addControl('bottomright', () => {
    // Обёртка появилась вместе с ползунком громкости: <input> внутри <button> — невалидная вложенность,
    // и перетаскивание ручки прилетало бы кнопке как клик play/pause.
    const wrap = L.DomUtil.create('div', 'map-player');
    const btn = L.DomUtil.create('button', 'map-player-btn', wrap);
    btn.type = 'button';
    btn.title = 'Play/pause Vice FM';
    // 16->20px по фидбэку "иконку радио крупнее". .mpb-viz — мини-эквалайзер: кубики двигает
    // тот же vizLoop radio.js, что и #cdoViz в чилл-режиме (radio.js грузится после map.js,
    // кнопка к тому моменту уже в DOM). data-max — потолок высоты кубика в px (в чилл-режиме 24).
    // Стрелки вверх/вниз вместо точек станций (16-08): точек было ровно столько, сколько станций,
    // и с ростом списка кнопка бы поехала; шаг ±1 занимает фиксированное место при любом их числе.
    // Видны, как и эквалайзер, только в играющем состоянии — у выключенного плеера переключать
    // нечего. Эквалайзер стоит ПЕРЕД иконкой play/pause («кнопку паузы и эквалайзер поменяй
    // местами»).
    btn.innerHTML = `
      <span class="mpb-viz" aria-hidden="true"><i data-max="14"></i><i data-max="14"></i><i data-max="14"></i><i data-max="14"></i></span>
      <svg class="mpb-play" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      <svg class="mpb-pause" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
      <span class="mpb-nav"><i data-station-step="-1" title="Previous station"></i><i data-station-step="1" title="Next station"></i></span>`;
    L.DomEvent.disableClickPropagation(wrap);
    // Один обработчик на кнопку: клик по стрелке = соседняя станция (по кругу), куда угодно ещё =
    // play/pause. Так не нужен ни stopPropagation, ни вложенные кнопки внутри <button>. Индекс
    // текущей станции берём из data-state виджета — своего состояния тут по-прежнему нет.
    btn.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-station-step]');
      if (nav) { stepStation(+nav.dataset.stationStep); return; }
      document.getElementById('radioToggle')?.click();
    });

    // Громкость прямо на карте («у плеера внизу сделать слайдер громкости — связанный с основной
    // страницей»). Своей громкости здесь НЕТ и быть не должно: ручка двигает ползунок виджета
    // (#radioVol) его же событием input, а применяет, сохраняет и снимает mute по-прежнему
    // radio.js. Вторая точка правды разъехалась бы с первой на первом же переходе пульт<->вики.
    const vol = document.getElementById('radioVol');
    const slider = L.DomUtil.create('input', 'radio-vol mpb-vol', wrap);
    Object.assign(slider, { type: 'range', min: 0, max: 1, step: 0.01, title: 'Volume' });
    const pullVol = () => {
      slider.value = vol.value;
      slider.style.setProperty('--vol-pct', `${vol.value * 100}%`);
    };
    if (vol) {
      slider.addEventListener('input', () => {
        vol.value = slider.value;
        vol.dispatchEvent(new Event('input'));
      });
      vol.addEventListener('input', pullVol);   // ручку двигают в виджете — здесь она едет следом
    }

    const radioWidget = document.getElementById('radioWidget');
    // Шаг по кругу от станции, которую сейчас показывает виджет (data-station его же ставит
    // radio.js). Своего указателя на текущую станцию здесь нет — иначе он разъехался бы с
    // виджетом на первом же переключении оттуда.
    function stepStation(delta) {
      const list = window.RADIO_STATIONS || [];
      if (!list.length) return;
      const i = list.findIndex((s) => s.id === radioWidget?.dataset.station);
      window.LeonidaRadio?.setStation?.(((i < 0 ? 0 : i + delta) + list.length) % list.length);
    }
    const sync = () => {
      if (!radioWidget) return;
      const state = radioWidget.dataset.state;
      const on = state === 'playing' || state === 'resume';
      btn.classList.toggle('is-playing', on);   // эквалайзер и стрелки станций — только на играющем
      // Стартовую громкость radio.js ставит ползунку виджета молча (без события) и, возможно,
      // позже нашей инициализации — поэтому забираем значение здесь, а не один раз при создании.
      if (vol) pullVol();
      const raC = getComputedStyle(radioWidget).getPropertyValue('--ra-c').trim();
      if (raC) wrap.style.setProperty('--btn-c', raC);   // на обёртке: цвет нужен и кнопке, и ползунку
    };
    if (radioWidget) {
      sync();
      new MutationObserver(sync).observe(radioWidget, { attributes: true, attributeFilter: ['data-state', 'data-station'] });
    }
    return wrap;
  });

  // ---- Маркеры: LOD-пирамида (PROMPT_map_lod_finalize.md). markers.json — из gtadb (§3, см.
  // scripts/gtadb-to-markers.js), districts.json — подписи районов (scripts/generate-districts.js).
  // Волна B ("unnamed landmarks") не рендерится — см. фильтр на входе ниже. T0 (parents/regions) —
  // DOM divIcon-подписи, десятки штук, DOM не проблема. T1 (hero photo-tiles) — отдельный датасет
  // и рендер, см. js/hero-tiles.js (PROMPT_map_hero_tiles.md), сюда не относится. T2 (волна A) —
  // L.circleMarker на canvas (preferCanvas выше), сотни живых DOM-узлов иначе.
  // CSS-класс .dot-confirmed на canvas не действует — цвет продублирован как path-опция ниже (тот
  // же #ff9e4f, что в style.css). Все рендерящиеся маркеры теперь wave==='a' -> confidence всегда
  // 'confirmed', второго стиля не нужно.
  const DOT_STYLE = {
    confirmed: { radius: 5, color: '#fff', weight: 2, fillColor: '#ff9e4f', fillOpacity: 1 },
    // Собранная в режиме езды точка (раунд-9: наезд -> +1 Respect, кап once в respect.js) —
    // заливка гаснет, но белая обводка остаётся в полную силу (раунд-11) — "уже был здесь"
    collected: { radius: 4, color: '#fff', weight: 2, fillColor: '#6b6480', fillOpacity: .75 }
  };

  // Уровни выводятся из SITE_CONFIG.MARKER_LOD (единственный источник правды про имена LOD-слоёв) —
  // добавление/переименование уровня в конфиге не требует синхронной правки списка здесь.
  const waveDots = []; // {id,x,y,marker,collected} — коллекционные точки для drive-mode (см. ниже)

  // Полосы прогресса по меткам в панели нет (раунд 08-08(4), «полоску маркеров спрятал бы»):
  // 369 точек — фон исследования, а не коллекция вроде 88 карточек. Сам сбор меток в режиме езды
  // остался: наезд гасит точку и даёт Respect (markDotCollected ниже), просто без счётчика.
  const lodLevels = Object.keys(window.SITE_CONFIG.MARKER_LOD);
  const lodGroups = Object.fromEntries(lodLevels.map((level) => [level, L.layerGroup()]));
  const lodState = Object.fromEntries(lodLevels.map((level) => [level, false]));

  const divIcon = (html) => L.divIcon({ className: '', html, iconSize: null });

  function districtLabel(d, cls) {
    return L.marker(gameLatLng(d.x, d.y), {
      icon: divIcon(`<div class="district-label ${cls}">${d.name}</div>`),
      interactive: false // клик по подписи решается позже, пока просто не мешает маркерам под собой
    });
  }

  // Порог зума решает "показать ли уровень", применяется идемпотентно: считаем целевое состояние,
  // сравниваем с текущим, добавляем/убираем только разницу — никаких пересозданий групп на каждый вызов.
  function applyLOD() {
    const z = map.getZoom();
    const cfg = window.SITE_CONFIG.MARKER_LOD;
    const desired = {};
    lodLevels.forEach((level) => { desired[level] = z >= cfg[level].minZoom && z <= cfg[level].maxZoom; });
    lodLevels.forEach((level) => {
      if (desired[level] === lodState[level]) return;
      lodState[level] = desired[level];
      if (desired[level]) lodGroups[level].addTo(map);
      else map.removeLayer(lodGroups[level]);
    });
  }

  let lodZoomDebounce;
  map.on('zoomend', () => {
    clearTimeout(lodZoomDebounce);
    lodZoomDebounce = setTimeout(applyLOD, 150);
  });

  Promise.all([
    fetch(`${window.SITE_CONFIG.MAP_DATA_BASE}/markers.json`).then((r) => r.json()),
    fetch(`${window.SITE_CONFIG.MAP_DATA_BASE}/districts.json`).then((r) => r.json())
  ])
    .then(([markers, districts]) => {
      districts.parents.filter((d) => d.x !== null && d.y !== null)
        .forEach((d) => districtLabel(d, 'district-label-parent').addTo(lodGroups.parents));
      districts.regions.forEach((d) => districtLabel(d, 'district-label-region').addTo(lodGroups.regions));

      // Волна B ("unnamed landmarks", неподтверждённые gtadb-догадки) не рендерится вовсе — не
      // прячем тумблером, отфильтровываем на входе. markers.json не трогаем, датасет остаётся.
      // Точки волны A — ещё и коллекционные в режиме езды (раунд-9): наезд собирает точку
      // (+1 Respect, кап once — сам факт сбора живёт в событиях respect.js, отдельного стораджа нет).
      markers.filter((m) => m.wave === 'a').forEach((m) => {
        const latlng = gameLatLng(m.x, m.y);
        const collected = !!window.Respect?.has?.('map_dot_' + m.id);
        const marker = L.circleMarker(latlng, DOT_STYLE[collected ? 'collected' : m.confidence]).addTo(lodGroups.waveA);
        // autoPan:false — авто-попап при сборе точки в езде не должен дёргать карту (камера
        // и так ведёт машинку через panBy каждый кадр, autoPan воевал бы с ней).
        marker.bindPopup(window.Render.mapMarkerPopup(m), { autoPan: false });
        waveDots.push({ id: m.id, x: m.x, y: m.y, marker, collected });
      });

      applyLOD(); // начальное состояние — map.fitBounds() мог выставить зум не на minZoom
    })
    .catch(() => {}); // офлайн/нет данных — карта остаётся рабочей без пинов

  // ---- Панель Legend (§5.4, была Legend/Credits/Sources — Credits и Sources убраны по запросу,
  // картинка credits теперь просто вторым изображением внизу той же панели). Слой 1 (инструмент
  // карты, CORE_SPEC): оверлей внутри .map-frame, не app-window из windows.js — тот для
  // "приложений" пульта, не для подсказок поверх самой карты.
  const uiPanels = {
    // note — источник T1 photo-tiles (PROMPT_map_hero_tiles.md §5), не касается самих тайлов карты
    legend: { label: 'LEGEND', src: 'assets/map-ui/legend-yanis13.webp', src2: 'assets/map-ui/credits-yanis13.webp', note: 'Photo-tiles: official screenshots & trailer frames — Rockstar Games.' }
  };
  const uiPanel = document.getElementById('mapUiPanel');
  const uiPanelImg = document.getElementById('mapUiPanelImg');
  const uiPanelImg2 = document.getElementById('mapUiPanelImg2');
  const uiPanelTitle = document.getElementById('mapUiPanelTitle');
  const uiPanelNote = document.getElementById('mapUiPanelNote');
  let activeUiPanel = null;

  function openUiPanel(key) {
    const panel = uiPanels[key];
    if (!panel || !uiPanel) return;
    // Легенда (условные обозначения точек) осмысленна только на annotated-слое (yanis13ref) — на
    // дефолтном чистом слое кодировать нечего, кнопка LEGEND показывает только картинку credits.
    const creditsOnly = key === 'legend' && activeLayerKey !== 'yanis13ref';
    uiPanelTitle.textContent = creditsOnly ? 'CREDITS' : panel.label;
    uiPanelImg.src = creditsOnly ? panel.src2 : panel.src;
    uiPanelImg.alt = creditsOnly ? `${panel.label} credits` : panel.label;
    if (uiPanelImg2) {
      uiPanelImg2.hidden = creditsOnly || !panel.src2;
      if (!uiPanelImg2.hidden) { uiPanelImg2.src = panel.src2; uiPanelImg2.alt = `${panel.label} credits`; }
    }
    if (uiPanelNote) uiPanelNote.textContent = panel.note || '';
    uiPanel.classList.add('open');
    activeUiPanel = key;
    // Только кнопки-панели ([data-panel]) — у aiCompareBtn/driveModeBtn класс active ведут их
    // собственные модули, съём "для всех .map-ui-btn" гасил их подсветку при закрытии легенды.
    document.querySelectorAll('.map-ui-btn[data-panel]').forEach((b) => b.classList.toggle('active', b.dataset.panel === key));
  }
  function closeUiPanel() {
    uiPanel?.classList.remove('open');
    activeUiPanel = null;
    document.querySelectorAll('.map-ui-btn[data-panel]').forEach((b) => b.classList.remove('active'));
  }
  document.querySelectorAll('.map-ui-btn[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.panel;
      activeUiPanel === key ? closeUiPanel() : openUiPanel(key);
    });
  });
  document.getElementById('mapUiPanelClose')?.addEventListener('click', closeUiPanel);
  document.addEventListener('click', (e) => {
    if (activeUiPanel && !e.target.closest('#mapUiPanel') && !e.target.closest('.map-ui-btn')) closeUiPanel();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeUiPanel) closeUiPanel();
  });

  // Сворачивание панели Map Info до одной шапки: в узком кадре она накрывает изрядный кусок карты,
  // а убрать её было нечем. Состояние не персистится — панель это основной пульт карты, и молча
  // встречать пользователя свёрнутой она не должна; свернуть заново — один клик.
  const collapseBtn = document.getElementById('panelCollapse');
  collapseBtn?.addEventListener('click', () => {
    const collapsed = collapseBtn.closest('.map-panel').classList.toggle('collapsed');
    collapseBtn.textContent = collapsed ? '◂' : '▸';
    // Панель уезжает transform'ом — размер не меняется, ResizeObserver в hero-tiles.js молчит.
    // Без этого сигнала освободившаяся полоса карты остаётся без фото-плиток до первого движения.
    document.dispatchEvent(new CustomEvent('leonida:panelchange'));
  });

  // На телефоне панель встречает СВЁРНУТОЙ (владелец, 28-08: «чтобы у нас была только карта»).
  // Оговорка выше — про десктоп, где панель лежит сбоку и кадру не мешает; на телефоне это
  // полоса над картой в 220px, то есть половина видимого кадра до первого касания.
  // Слушаем и смену медиазапроса, а не только старт: на первом кадре ширина бывает ещё неизвестна
  // (0 в скрытом окне или предпросмотре), и разовая проверка складывала панель на десктопе.
  // Как только пользователь сам нажал кнопку — его выбор больше не переписываем.
  if (collapseBtn) {
    let touched = false;
    collapseBtn.addEventListener('click', () => { touched = true; }, { once: true });
    const autoCollapse = () => {
      if (touched) return;
      const narrow = window.LHLayout.narrow();
      collapseBtn.closest('.map-panel').classList.toggle('collapsed', narrow);
      collapseBtn.textContent = narrow ? '◂' : '▸';
    };
    autoCollapse();
    window.LHLayout.onNarrowChange(autoCollapse);
  }

  // Режимы панели: EXPLORE / DRIVE / COMPARE (16-08(9), «панель выглядит уже перегруженной»).
  // Каждая секция объявляет свои режимы через data-mode (СПИСОК через пробел — коллекция живёт
  // сразу в двух); секция без атрибута (YOUR RESPECT) видна всегда. Прячем классом, не hidden:
  // hidden занят kill switch'ами самих секций.
  // Состояние не персистится — как и сворачивание панели выше: встречать пользователя чужим
  // выбором панель не должна.
  const modeBox = document.getElementById('panelModes');
  modeBox?.addEventListener('click', (e) => {
    const btn = e.target.closest('.pm-btn');
    if (!btn) return;
    // Ушёл с вкладки DRIVE во время заезда — заезд заканчивается (16-08(11)). Иначе машинка
    // продолжала ехать под слоями сравнения, а приборка управляла режимом, которого в панели
    // уже нет. Это тот же STOP ENGINE со всеми последствиями, включая сгорающий эскроу: выход
    // из режима — он и есть выход, каким бы способом его ни нажали.
    if (btn.dataset.mode !== 'drive' && window.DriveMode?.isActive?.()) window.DriveMode.stop();
    // Ушёл с вкладки COMPARE — наложенные карты снимаются (16-08(14): «выход из вкладки compare
    // в другую вкладку должен отключать наложенные карты»). По той же логике, что и заезд выше:
    // режим кончился — кончились и его объекты. Раньше карты переживали уход, и в EXPLORE поверх
    // полотна висел чужой растр, который нечем было убрать, не вернувшись назад.
    if (btn.dataset.mode !== 'compare') window.MapCompare?.clear?.();
    for (const b of modeBox.querySelectorAll('.pm-btn')) b.classList.toggle('active', b === btn);
    for (const s of document.querySelectorAll('.map-panel .panel-sect[data-mode]')) {
      s.classList.toggle('pm-off', !s.dataset.mode.split(' ').includes(btn.dataset.mode));
    }
    // Высота панели поменялась — плиткам заново считать свободную полосу карты (hero-tiles.js).
    document.dispatchEvent(new CustomEvent('leonida:panelchange'));
  });
  // Стартовое состояние — то же правило, что и по клику: активная кнопка задаёт видимую группу.
  modeBox?.querySelector('.pm-btn.active')?.click();

  // Высота полосы Map Info на телефоне (--strip). От неё считаются смещения карты, кнопки
  // фуллскрина, шторки AI и таблички ночи, поэтому её нужно знать числом. Раньше это был набор
  // CSS-констант: своё число на режим (в COMPARE список длиннее), своё на французский (длинные
  // подписи), и в 16-08(13) чуть не завелось третье — на состояние исчерпанного лимита, где в
  // RESPECT появляются ещё две строки. Каждая такая константа молча ломалась от любой новой
  // строки в панели: секция сжималась ниже своего содержимого, и контролы вылезали за рамку
  // («map layer collections всё съезжает»). Теперь высоту диктует сам контент — панель на
  // телефоне height:auto, — а этот наблюдатель переносит её в переменную. Зацикливания нет:
  // --strip не участвует в высоте самой панели (она абсолютная и растёт от содержимого).
  const panelEl = document.querySelector('.map-panel');
  if (panelEl && window.ResizeObserver) {
    const frameEl = map.getContainer().parentElement;
    const syncStrip = () => {
      const h = Math.ceil(panelEl.getBoundingClientRect().height);
      const narrow = window.LHLayout.narrow();
      frameEl.style.setProperty('--strip', narrow ? `${h}px` : '');
      // С 24-09 кадр на телефоне держит высоту плитки ARTICLES (--plate-h, view-mode.js), и
      // полоса отнимает место у карты, а не растит кадр: высота карты меняется вместе с полосой.
      // Leaflet узнаёт о смене размера только по resize окна — сообщаем сами, после раскладки.
      if (narrow) requestAnimationFrame(() => map.invalidateSize());
    };
    new ResizeObserver(syncStrip).observe(panelEl);
    window.LHLayout.onNarrowChange(syncStrip);
  }

  // API для внешних модулей (лайтбокс скриншотов — VIEW ON MAP, см. windows.js: official-shots.js
  // даёт игровые x/y напрямую из hero-tiles.json, кнопка зовёт setView, привязка по id маркера не нужна).
  window.LeonidaMap = {
    // QA-хелпер для scripts/capture-map-screenshots.js (docs/qa-*.jpg) — берёт игровые метры,
    // не lat/lng, чтобы скрипту не нужно было знать про gameLatLng.
    setView(x, y, zoom) { map.setView(gameLatLng(x, y), zoom, { animate: false }); },
    // Внутренности для js/hero-tiles.js (грузится следующим тегом, PROMPT_map_hero_tiles.md) —
    // та же карта и трансформация координат, без пересоздания L.map.
    // GameTileLayer — для js/ai-compare.js (PROMPT_map_ai_realistic_layer_v2.md §6): та же схема
    // имён тайлов {z}/{z},{y},{x}.jpg, без дублирования класса под свой слой сравнения.
    // tilePyramidBounds — для js/drive-mode.js (PROMPT_map_drive_mode_step1.md §2/§3): готовый
    // расчёт границ физической тайл-сетки в игровых координатах, уже посчитан выше — просто
    // отдаём наружу вместо повторного вывода калибровочных констант в другом модуле.
    // masterLayerRect/rectPolygon — прямоугольник мастера 20000x20000 в layer-координатах и
    // готовый по нему clip-path (сами игровые координаты наружу не нужны никому): единственная
    // копия формулы на все паны, которые обязаны обрезаться по мастеру (ночь, AI-слой, тайлы).
    // mppx — игровых метров в пикселе на зуме z (см. константу выше); activeSourceKey — ключ
    // активного базового слоя из TILE_SOURCES. Оба раньше жили копиями в drive-mode/ai-compare/
    // card-fragments (своя формула, свой labelToKey + своя подписка на baselayerchange у каждого) —
    // рефактор 08-09 оставил одну копию здесь. Порядок событий безопасен: map.js подписался на
    // baselayerchange первым (грузится раньше), к моменту чужих обработчиков ключ уже обновлён.
    // frame — .map-frame, общий контейнер виджета. Все оверлеи режима езды (экран набора,
    // вспышка ареста, шторка AI, ночная тема) кладутся ИМЕННО в него, а не в контейнер Leaflet:
    // тот двигает свою _mapPane, и всё внутри уезжает вместе с картой. Раньше пять модулей брали
    // этот узел двумя разными способами (document.querySelector против getContainer().parentElement)
    // — одна копия здесь, как уже сделано с mppx и activeSourceKey.
    map, frame: map.getContainer().parentElement,
    gameLatLng, mppx, GameTileLayer, tilePyramidBounds,
    masterLayerRect, rectPolygon,
    activeSourceKey: () => activeLayerKey,
    // Коллекционные точки волны A для drive-mode (раунд-9): список позиций + перекраска при сборе.
    waveDots,
    markDotCollected(dot) {
      dot.collected = true;
      dot.marker.setStyle(DOT_STYLE.collected);
    },
    // Перезапуск CSS-анимации: снять класс, дёрнуть рефлоу, вернуть. Жил копиями в пяти местах
    // (hero-tiles, drive-mode, police, radar), а забытый `void offsetWidth` ломается молча —
    // класс вернётся в том же кадре, браузер не заметит, анимация не проиграет второй раз.
    restartAnim(el, cls) {
      if (!el) return;
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    }
  };
})();
