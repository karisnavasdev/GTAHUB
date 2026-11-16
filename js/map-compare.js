// ===== COMPARE MAPS — карты прошлых частей поверх полотна Leonida (16-08(8), растр с 16-08(9)) =====
// Слои по CORE_SPEC: 1 (карта) — сами картинки в overlayPane; 2 (периферия) — секция в панели Map
// Info. Своего окна и своего оверлея не заводит: это обычные L.imageOverlay, кнопки — те же
// .map-ui-btn, что во всей панели.
//
// Показывается сам растр с прозрачностью (16-08(9) «зачем нам силуэт, просто показывай карту с
// альфой»). С 16-08(10) оверлеи СМЕШИВАЮТСЯ: кнопки независимые, включённых карт может быть
// сколько угодно, а общий ползунок задаёт прозрачность всем сразу. С 16-08(11) площадь каждой
// игры написана на её кнопке — отдельной подписи-итога под списком нет.
//
// Масштаб. Единственный внешний вход — площадь карты игры (SITE_CONFIG.COMPARE_MAPS, цифры дал
// владелец). Всё остальное считается: метров на пиксель = sqrt(площадь / площадь картинки),
// дальше габариты в метрах кладутся на полотно как есть. Никакой калибровки «на глаз» и никаких
// вторых констант масштаба — врут пропорции, врёт вся фича.
window.MapCompare = (function () {
  const cfg = window.SITE_CONFIG?.COMPARE_MAPS;
  const sect = document.getElementById('compareSect');
  if (!cfg?.enabled || !sect || !window.LeonidaMap || typeof L === 'undefined') {
    // Нет фичи — нет и вкладки в панели: пустой раздел хуже отсутствующего.
    document.querySelector('.pm-btn[data-mode="compare"]')?.remove();
    return null;
  }

  const map = window.LeonidaMap.map;
  const gameLatLng = window.LeonidaMap.gameLatLng;
  const btnBox = document.getElementById('compareBtns');
  const slider = document.getElementById('compareAlpha');
  // 75.84 -> "75.8": в панели шириной 320px лишний знак только шумит. «≈» перед расчётными
  // площадями убран 16-08(13) по запросу — откуда взята каждая цифра, написано в README оверлеев.
  const km2 = (v) => `${v % 1 ? v.toFixed(1) : v} KM²`;

  const buttons = new Map();     // id -> <button>
  const layers = new Map();      // id -> L.imageOverlay[] (пустой массив = бронь на время загрузки)
  const cache = new Map();       // файл -> Promise<{url, w, h}> (тянем один раз за сессию)
  let alpha = (cfg.alphaDefault ?? 70) / 100;
  // Зазор между картами одной кнопки (доля ширины первой). У GTA 2 три РАЗНЫХ района, а не одна
  // карта из трёх кусков: без зазора они читались бы как один город.
  const TILE_GAP = 0.06;
  const filesOf = (item) => item.files || [item.file];

  // Габариты берём у самой картинки, а не из конфига: одна цифра площади плюс реальные пропорции
  // файла — второму источнику правды тут взяться неоткуда.
  function loadMap(file) {
    if (!cache.has(file)) {
      const url = `assets/map-overlays/${file}`;
      cache.set(file, new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ url, w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = reject;
        img.src = url;
      }));
    }
    return cache.get(file);
  }

  // Перетаскивание наложенной карты (16-08(13): «предполагается ли то, что мы можем двигать карту,
  // которую включаем для сравнения, или нет?»). Раньше — нет: карта ложилась в центр кадра и
  // стояла там намертво, подвинуть её можно было только выключив и включив заново в другом месте.
  // Тянутся ВСЕ файлы одной кнопки разом (три района GTA 2 — один объект), взаимное расположение
  // сохраняется: смещение считается от снимка границ на момент нажатия, а не по кадру.
  // Pointer Events, а не события слоя Leaflet: один и тот же код на мышь и на палец.
  // Наложения живут ровно столько, сколько открыта вкладка COMPARE: уход с неё зовёт clear()
  // (js/map.js, 16-08(14)). Поэтому чужой карты за пределами вкладки не бывает, и глушить ей
  // pointer-events на время отлучки больше не нужно — прежний syncGrab снят вместе с причиной.
  function makeDraggable(layer, group) {
    const img = layer.getElement();
    if (!img) return;
    img.draggable = false;   // иначе браузер начинает своё перетаскивание картинки с призраком
    let from = null, start = null;
    img.addEventListener('pointerdown', (e) => {
      from = map.mouseEventToLatLng(e);
      start = group.map((l) => l.getBounds());
      img.setPointerCapture(e.pointerId);
      map.dragging.disable();  // иначе карта и оверлей тянутся одним жестом
      e.preventDefault();
    });
    img.addEventListener('pointermove', (e) => {
      if (!from) return;
      const to = map.mouseEventToLatLng(e);
      const dLat = to.lat - from.lat, dLng = to.lng - from.lng;
      group.forEach((l, i) => {
        const b = start[i];
        if (!b) return;
        l.setBounds(L.latLngBounds([b.getSouth() + dLat, b.getWest() + dLng],
                                   [b.getNorth() + dLat, b.getEast() + dLng]));
      });
    });
    const drop = () => { if (!from) return; from = start = null; map.dragging.enable(); };
    img.addEventListener('pointerup', drop);
    img.addEventListener('pointercancel', drop);
  }

  function hide(id) {
    for (const layer of layers.get(id) || []) map.removeLayer(layer);
    layers.delete(id);
    buttons.get(id)?.classList.remove('active');
  }

  function show(item) {
    if (layers.has(item.id)) return;
    layers.set(item.id, []);                   // бронь на время загрузки — двойной клик не создаст два слоя
    buttons.get(item.id)?.classList.add('active');
    Promise.all(filesOf(item).map(loadMap)).then((imgs) => {
      const arr = layers.get(item.id);
      if (!arr || arr.length) return;          // успели выключить (или включить заново), пока грузилось
      if (imgs.some(({ w, h }) => !w || !h)) return;
      // Габариты в метрах: площадь у каждого файла своя и одинаковая (районы GTA 2 равны по
      // построению — одна сетка движка), пропорции берутся у самой картинки.
      const boxes = imgs.map(({ url, w, h }) => {
        const mPerPx = Math.sqrt(item.areaKm2 * 1e6 / (w * h));
        return { url, w: w * mPerPx, h: h * mPerPx };
      });
      const gap = boxes[0].w * TILE_GAP;
      const total = boxes.reduce((s, b) => s + b.w, 0) + gap * (boxes.length - 1);
      // Центр — середина текущего кадра: карта ложится туда, куда игрок смотрит, и дальше живёт
      // на своём месте на полотне (панорама её не таскает). КАЖДАЯ включённая — в тот же центр,
      // стопкой: в этом весь смысл сравнения, размеры видно только при наложении.
      // 16-08(15) карты разводились столбиком вниз (чтобы маленькая верхняя не мешала ухватить
      // большую нижнюю) — 17-08 отменено по репорту «почему-то не друг на друге, а вниз уходят»:
      // разведённые карты сравнивать нечем. Верхнюю всегда можно оттащить в сторону и добраться
      // до нижней — этого достаточно.
      const c = map.getCenter();
      let x = c.lng - total / 2;
      const cy = c.lat;
      for (const b of boxes) {
        const bounds = L.latLngBounds(gameLatLng(x, cy - b.h / 2), gameLatLng(x + b.w, cy + b.h / 2));
        const layer = L.imageOverlay(b.url, bounds, { interactive: true, className: 'cmp-overlay', opacity: alpha }).addTo(map);
        arr.push(layer);
        makeDraggable(layer, arr);
        x += b.w + gap;
      }
    }).catch(() => { hide(item.id); buttons.get(item.id)?.classList.add('cmp-broken'); });
  }

  function clear() {
    for (const id of [...layers.keys()]) hide(id);
  }

  function setAlpha(v) {
    alpha = v;
    for (const arr of layers.values()) for (const layer of arr) layer.setOpacity(alpha);
  }

  for (const item of cfg.list) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'map-ui-btn';
    // Площадь — на самой кнопке (16-08(11): «лучше под каждой картой пиши площадь»). Общая
    // подпись под списком (`LEONIDA 400 KM² · LAND 102.5 KM²`) убрана: она отвечала на вопрос,
    // которого никто не задавал, а площадь конкретной игры приходилось выяснять включением
    // оверлея. Названия и цифры не переводятся — это имена игр и км². У кнопки с несколькими
    // картами печатается сумма: на карту ложатся все три района GTA 2, значит и цифра общая.
    b.innerHTML = `<b>${item.name}</b><i>${km2(item.areaKm2 * filesOf(item).length)}</i>`;
    b.addEventListener('click', () => (layers.has(item.id) ? hide(item.id) : show(item)));
    buttons.set(item.id, b);
    btnBox.appendChild(b);
  }
  if (slider) {
    slider.value = Math.round(alpha * 100);
    slider.addEventListener('input', () => setAlpha(slider.value / 100));
  }
  sect.hidden = false;

  // Наружу — только clear (зовёт js/map.js при смене базового слоя). setAlpha и show снаружи
  // никто не звал: обоими управляют собственные слайдер и кнопки списка внутри модуля.
  return { clear };
})();
