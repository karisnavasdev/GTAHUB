// ===== AI-РЕАЛИСТИЧНЫЙ СЛОЙ + ШТОРКА-СЛАЙДЕР (PROMPT_map_ai_realistic_layer_v2.md §5-7) =====
// Слой сравнения поверх базового yanis13, не альтернативная база — свой вход (кнопка Realistic
// view в .map-panel), не в общем L.control.layers. Тайлы грузятся только при включении (экономия
// Class B операций R2 после переезда, см. §5 промпта).
(function () {
  if (!window.LeonidaMap || typeof L === 'undefined') return; // MAP_ENABLED:false или CDN недоступен

  const map = window.LeonidaMap.map;
  const GameTileLayer = window.LeonidaMap.GameTileLayer;
  const cfg = window.SITE_CONFIG;
  const ai = cfg.AI_LAYER;
  if (!ai) return;

  // Ключ активного базового слоя — LeonidaMap.activeSourceKey() (рефактор 08-09): свой labelToKey
  // и локальное отслеживание baselayerchange удалены, map.js обновляет ключ раньше нас.

  const frame = window.LeonidaMap.frame;
  // Два состояния Original/Realistic (сегмент, раунд 03-08) вместо одной кнопки-тумблера;
  // шторка-слайдер остаётся для частичного сравнения поверх состояния Realistic.
  const seg = document.getElementById('aiSeg');
  const btnOriginal = document.getElementById('aiSegOriginal');
  const btnRealistic = document.getElementById('aiSegRealistic');
  const handle = document.getElementById('aiCompareHandle');
  const badge = document.getElementById('aiCompareBadge');
  if (!frame || !seg || !btnOriginal || !btnRealistic || !handle || !badge) return;

  // §7 — маркировка дословная, не перефразировать (обязательные 3 элемента: авторство прочтения,
  // кредит YANIS V13, честная пометка "buildings imagined"). Тот же текст — в бэйдже и в тултипе кнопки.
  const DISCLOSURE = window.Render.t('Our AI-assisted interpretation of the YANIS V13 community map — buildings and terrain imagined');
  badge.textContent = DISCLOSURE;
  btnRealistic.title = DISCLOSURE;

  // Пана слоя — выше базовых тайлов (200), ниже T2/hero-tiles (overlayPane 400 / markerPane 600).
  const aiPane = map.createPane('aiPane');
  aiPane.style.zIndex = 250;

  let aiTileLayer = null;
  let active = false;
  let dragging = false;
  let dragStartX = 0, dragStartFrac = 0; // точка захвата ручки — см. pointermove ниже
  let handleFrac = 0.5; // доля ширины контейнера, где сейчас ручка (0..1)
  let firstShow = true; // первый вход в Realistic — шторка у центра, см. activate()
  let externalDisabled = false; // PROMPT_map_drive_mode_step1.md §6 — гасится на время езды

  // clip-path считается от СОБСТВЕННОГО бокса паны, а пана — ребёнок mapPane, который Leaflet
  // смещает transform'ом при каждом панорамировании/зуме. Т.е. бокс паны живёт в layer-координатах,
  // не во вьюпорте — inset() от ширины вьюпорта резал не там после первого же сдвига карты (баг:
  // "слайдер двигается, но полностью не раскрывает"). Фикс: переводим видимую область и линию
  // ручки из container- в layer-точки и клипуем polygon'ом (не inset — layer-координаты бывают
  // отрицательными), пересчитывая на каждый move/zoom.
  function clipPane() {
    const rect = frame.getBoundingClientRect();
    const px = Math.round(rect.width * handleFrac);
    const nw = map.containerPointToLayerPoint([0, 0]);
    const se = map.containerPointToLayerPoint(map.getSize());
    const cx = map.containerPointToLayerPoint([px, 0]).x;
    // Пересечение со срезом мира (map.js clipTilesToMaster): за прямоугольником мастера AI-слой
    // не рисуется, как и базовые тайлы — иначе на сильном отдалении AI-вода торчала бы за краем мира.
    const { nw: mnw, se: mse } = window.LeonidaMap.masterLayerRect();
    const left = Math.max(nw.x, mnw.x), right = Math.max(left, Math.min(cx, mse.x));
    const top = Math.max(nw.y, mnw.y), bottom = Math.max(top, Math.min(se.y, mse.y));
    aiPane.style.clipPath = window.LeonidaMap.rectPolygon({ x: left, y: top }, { x: right, y: bottom });
    // Ручка не уезжает за рамку при handleFrac=1 (activate ставит слой на всю карту, а ручка
    // должна остаться видимой у правого края — фидбэк "слайдер был за экраном"). Отступ ОДИН И ТОТ
    // ЖЕ с обеих сторон: раньше подрезался только правый край, и на handleFrac=0 ручка вставала
    // вплотную к рамке, а на 1 — за 10px до неё ("слева граница ближе к краю, чем справа").
    // Клип слоя считается от неподрезанного px выше, так что шторка по-прежнему открывается нацело.
    handle.style.left = `${Math.min(Math.max(px, 10), rect.width - 10)}px`;
  }

  function syncSeg() {
    btnRealistic.classList.toggle('active', active);
    btnOriginal.classList.toggle('active', !active);
  }

  function activate() {
    if (active) return;
    active = true;
    // Состояние Realistic = слой на всю карту, ручку можно оттащить для сравнения. Но в ПЕРВЫЙ
    // раз шторка встаёт ближе к центру (08-09(5)): у края её никто не замечал, и переключатель
    // читался как «просто другая картинка» — а половина старой карты рядом сразу объясняет и
    // разницу слоёв, и что вертикальную линию можно таскать.
    // 0.4, а не ровно центр: правее начинается .map-panel (её левый край ~0.45 ширины кадра в
    // доке), и ручка вставала бы прямо на пульт. В fullscreen кадр шире — там это честный центр.
    // Позиция шторки переживает переключение Original <-> Realistic (25-08, владелец: «всегда
    // телепортируется направо»): раньше каждый повторный вход насильно возвращал её на всю карту,
    // и настроенное сравнение приходилось выставлять заново. Исключение одно — шторка, задвинутая
    // в самый левый край: там AI-слоя не видно совсем, и Realistic включился бы «пустым».
    if (firstShow) handleFrac = 0.4;
    else if (handleFrac < 0.05) handleFrac = 1;
    firstShow = false;
    if (!aiTileLayer) {
      aiTileLayer = new GameTileLayer('', {
        tileBase: `${cfg.TILE_BASE_URL}/${ai.slug}`,
        tileSize: 1024,
        minZoom: -1,
        maxZoom: map.getMaxZoom(),
        minNativeZoom: 0,
        maxNativeZoom: ai.maxNativeZoom,
        noWrap: true,
        pane: 'aiPane'
      });
    }
    aiTileLayer.addTo(map);
    badge.hidden = false;
    syncSeg();
    clipPane();
    // Раунд-14/15: на активации layout .map-frame ещё не устаканился (свежая AI-пана/бейдж/
    // активный сегмент) — первый getBoundingClientRect() давал позицию у самого края, settle-
    // пересчёт следующим кадром сдвигал ручку, и это читалось как "дёрг". Ручка теперь
    // ПОКАЗЫВАЕТСЯ только после кадра пересчёта — появляется сразу на финальном месте.
    requestAnimationFrame(() => {
      if (!active) return; // мгновенный Original-клик до кадра — не воскрешать ручку
      clipPane();
      handle.hidden = false;
    });
  }

  function deactivate() {
    if (!active) return;
    active = false;
    if (aiTileLayer) map.removeLayer(aiTileLayer);
    handle.hidden = true;
    badge.hidden = true;
    syncSeg();
  }

  // 17-08: проверка «подходит ли активный базовый слой» (requiresBaseSource) удалена вместе со
  // старыми тайлсетами — оба оставшихся слоя (clean/annotated) это один и тот же мастер, геометрия
  // общая, условие всегда было истинным. Появится official-слой с другой геометрией — гейт вернуть.

  // Зум больше не выключает слой и не двигает карту (16-08(13), «надо единообразить»): прежний
  // потолок sliderMaxZoom гасил Realistic выше z4 и отматывал зум назад по клику — это и были
  // «скачки между слоями». Диапазон зумов у обоих слоёв теперь один, выше maxNativeZoom Leaflet
  // растягивает последний нарезанный уровень (резкость лечится апскейлом мастера, см. config.js).
  // Кнопки гасит только режим езды.
  function syncDisabled() {
    btnOriginal.disabled = btnRealistic.disabled = externalDisabled;
  }

  btnOriginal.addEventListener('click', () => deactivate());
  btnRealistic.addEventListener('click', () => {
    if (externalDisabled) return;
    if (active) { handleFrac = 1; clipPane(); return; } // повторный клик — вернуть шторку на всю карту
    activate();
  });

  // Перетаскивание ручки — Pointer Events (мышь и тач одним кодом). map.dragging блокируется на
  // время перетаскивания, иначе панорамирование карты и сдвиг шторки конкурируют за один жест.
  handle.addEventListener('pointerdown', (e) => {
    dragging = true;
    dragStartX = e.clientX;
    dragStartFrac = handleFrac;
    map.dragging.disable();
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const rect = frame.getBoundingClientRect();
    // Двигаем ОТНОСИТЕЛЬНО точки захвата, а не по абсолютному X курсора: иначе первый же move
    // телепортировал шторку к курсору (захват за край ручки = скачок на её полуширину).
    // Диапазон 0..1, а не 0.04..0.96 — прежний узкий клэмп конфликтовал с handleFrac=1 из
    // activate() и на первом движении дёргал шторку влево на 4% ширины кадра. За рамку ручка
    // всё равно не уедет: её видимую позицию отдельно подрезает clipPane().
    handleFrac = Math.min(1, Math.max(0, dragStartFrac + (e.clientX - dragStartX) / rect.width));
    clipPane(); // clip-path на паны, не пересоздание слоя — без перерисовки тайлов на каждый кадр
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    map.dragging.enable();
  }
  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', () => { if (active) clipPane(); });
  // layer-координаты клипа зависят от позиции карты; 'resize' — это invalidateSize при
  // fullscreen-тоггле, размер карты меняется без window.resize.
  map.on('move zoom resize', () => { if (active) clipPane(); });

  syncDisabled();

  // Точка входа для drive-mode. Раунд-11 отменяет прежнее "гасить слой на время езды": в Realistic
  // МОЖНО ездить, на время езды блокируется только переключение сегмента. isActive() удалён в
  // 16-08(13): его единственным читателем был выбор боевого зума под слой, а заезд теперь идёт на
  // одном и том же зуме на любом слое (см. driveZoom в drive-mode.js).
  window.AiCompare = {
    setDriveModeActive(v) {
      externalDisabled = v;
      syncDisabled();
    }
  };
})();
