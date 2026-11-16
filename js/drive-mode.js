// ===== РЕЖИМ ЕЗДЫ — машинка + туман войны (PROMPT_map_drive_mode_step1.md), шаг 1 =====
// + game-feel полировка (физика/камера/фидбек, отдельный прогон по фидбэку владельца) — только
// ощущение движения, туман-логика/сохранение/карточки/eligibility не тронуты.
// Ничего не грузит (canvas/спрайт/слушатели клавиш) до первого клика по START ENGINE —
// ленивая инициализация, см. ensureInit(). Публичный API — window.DriveMode, полный состав
// перечислен над return в конце файла; всё, что там есть, реально кем-то зовётся.
window.DriveMode = (function () {
  const NOOP = { isActive: () => false, fogPct: () => 0 };
  if (!window.LeonidaMap || typeof L === 'undefined') return NOOP; // MAP_ENABLED:false / нет CDN

  let map = window.LeonidaMap.map; // переприсваивается в init(map) — тот же инстанс, см. index.html
  const cfg = window.SITE_CONFIG.DRIVE_MODE;
  if (!cfg) return NOOP;

  function log(...args) { console.log('[drive-mode]', ...args); }
  // Формула метр/px — единственная копия у map.js, рядом с CRS-калибровкой (рефактор 08-09)
  const mppx = window.LeonidaMap.mppx;
  // CRS.Simple: window.LeonidaMap.gameLatLng(x,y) = L.latLng(y,x) — обратное преобразование не
  // требует калибровочных констант map.js, lat/lng ЕСТЬ игровые y/x напрямую в этой CRS.
  function gameXY(latlng) { return { x: latlng.lng, y: latlng.lat }; }
  // Потолок скорости в игровых м/с. Одна копия формулы на всех: физика в frame(), порог наезда
  // (PICKUP_MIN_SPEED) и police.js через публичный vMaxM.
  const topSpeed = () => cfg.vMax * mppx(cfg.zoom);
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  let driveBtn, startHintEl, resetBtn;
  // Кнопка RESET (раунд 08-09, вариант «A с триггером C»): появляется в приборке, только когда
  // машина непрерывно в воде дольше порога — застрять на суше нельзя (везде можно ехать), а
  // постоянная кнопка в HUD была бы мусором. Клик — resetToRoad() ниже.
  // 2.5 -> 10 («всплывает слишком рано») -> 4 («сброс в воде не происходит / кнопка не появляется»):
  // на воде потолок скорости 12% от vMax, десять секунд барахтанья успевали прочитаться как
  // «застрял насовсем и сделать нечего» раньше, чем кнопка вообще показывалась.
  const STUCK_WATER_SEC = 4;
  let stuckT = 0;
  // Сколько секунд подряд надо ехать по суше, чтобы катер снова стал машиной (16-08(12)). Вход в
  // воду мгновенный, выход с задержкой: у берегов маска поверхностей пестрит отмелями по паре
  // пикселей (~10м), и без порога силуэт со скоростью перещёлкивались туда-обратно по нескольку
  // раз в секунду. 0.35с — меньше, чем читается как «задержка», больше, чем длится любая отмель
  // на полном ходу. Состояние общее для спрайта, потолка скорости и прожектора (см. frame()).
  const BOAT_EXIT_SEC = 0.35;
  let boatT = 0, boatMode = false;
  // hudEl — общий бокс приборов (радар + спидометр), показывается/прячется целиком.
  let hudEl, speedoValueEl, speedoFillEl, speedoNeedleEl, respectRunEl;
  // Что показано в приборке сейчас — чтобы не трогать DOM каждый кадр и чтобы знать направление
  // изменения (рост или списание): подписки на события у respect.js нет, а заводить её ради одной
  // цифры дороже, чем сравнить числа в уже работающем цикле.
  let runShown = -1;
  // Спидометр: carSpeed в игровых м/с * 3.6 дало бы ~600 км/ч на vMax (аркадная скорость карты) —
  // коэффициент приводит цифру к "автомобильной" шкале, ~153 км/ч на vMax. Чисто дисплей.
  const SPEEDO_SCALE = 0.25;
  const SPEEDO_ARC = 131.9;    // длина дуги спидометра (PI*42, см. index.html #driveSpeedo)
  const SPEEDO_MAX_KMH = 200;  // шкала до 200: vMax (~153) не упирается в край — реалистичнее
  // Game feel шкалы (раунд 03-08 "стрелка прикольнее, шкала интереснее"):
  // - гамма < 1 растягивает низ диапазона: старт размашисто гонит стрелку (~половина дуги к
  //   80 км/ч), верх сжат — разгон визуально "теряет тягу", как у настоящей машины;
  // - стрелка асимметрична: вверх идёт резво, вниз опадает лениво (LERP_UP/DOWN);
  // - на скорости стрелка мелко дрожит (TREMOR, только визуал стрелки — не дуга, не цифра).
  const SPEEDO_GAMMA = 0.78;
  const SPEEDO_LERP_UP = 0.09, SPEEDO_LERP_DOWN = 0.06; // 0.16 -> 0.09: стрелка набирает спокойнее (раунд-8)
  const SPEEDO_TREMOR_DEG = 1.1; // амплитуда дрожи на полной шкале, градусы
  // "Реалистичный" ход стрелки: лерп с инерцией + медленный дополз на затяжном полном газу
  let speedoDisp = 0, fullThrottleT = 0;
  let inited = false;   // canvas/пана/грид тумана созданы
  let active = false;   // цикл езды идёт прямо сейчас

  // --- геометрия тумана (заполняется в ensureInit) ---
  let bounds = null;    // {west,east,south,north} игровые метры — из tilePyramidBounds map.js
  // Мир МАШИНКИ — прямоугольник maxBounds карты, а не пирамида тайлов (та вчетверо больше:
  // 32768x32768 против 14000x20000). Камера в maxBounds упирается жёсткой стеной, машинка же
  // клэмпилась по пирамиде — и уезжала туда, куда камера доехать физически не может. Дальше
  // позиция ложилась в сейв, и «камера слетела» переживала перезагрузку («полностью слетела
  // камера в drive режиме»).
  let carBounds = null;
  let cellSize = 0;     // игровые метры на ячейку
  let cols = 0, rows = 0;
  let fog = null;       // Uint8Array, 1 = открыто
  let openCount = 0;

  // --- машинка: физика (аркада, GTA1/2) ---
  let carX = 0, carY = 0, carAngle = 0; // игровые метры, радианы (0 = север, по часовой)
  // Где машинка стояла в конце прошлой поездки — оттуда и заводимся в следующий раз. null (первый
  // визит / сброшенный сейв) = стартуем с центра кадра, как раньше.
  let spawnPos = null;
  let carSpeed = 0;      // игровые метры/сек, знак = направление (- = задний ход)
  let spriteAngle = 0;   // лерпленный угол спрайта (радианы) — визуал, не влияет на физику
  let driftDeg = 0;      // текущий визуальный наклон дрифта, градусы
  let carMarker = null;

  // --- камера (см. §2 полировки: панорамирование через map.panBy, не setView каждый кадр) ---
  let camX = 0, camY = 0; // текущий (лерпленный) центр камеры, игровые метры
  // Обзор средней кнопкой мыши: камера временно не следует за машинкой ("хочется зажать среднюю
  // клавишу и подвигать камеру"). Возврат — по газу, как и у обзорного зум-аута.
  let camDetached = false, midDrag = false, midX = 0, midY = 0;

  // --- след (§3 полировки) ---
  let trailPane = null;
  const TRAIL_LIFETIME = 450; // мс
  const TRAIL_INTERVAL = 60;  // мс между точками на полной скорости
  let trailDots = [];         // {el, spawnedAt}
  let lastTrailSpawn = 0;

  // --- туман: пана/канвас ---
  let fogPane = null, fogCanvas = null, fogCtx = null;
  let gridCanvas = null, gridCtx = null; // offscreen, 1px = ячейка грида; см. paintFog()
  let fogDirty = true;

  // --- фары (ночной режим): конус света рисуется на fogCanvas вторым проходом в конце paintFog(),
  // отдельного канваса нет. lastHeadlightAngle/lastHeadlightOn — чтобы взводить fogDirty при
  // пере-лерпе spriteAngle, когда сама машинка не сдвинулась (доворачивает на месте) — иначе
  // конус "залипал бы" в старом направлении, пока карта не подвинется. window.LeonidaNight и
  // SITE_CONFIG.NIGHT_MODE могут ещё не существовать (параллельная разработка) — везде фолбэки.
  let lastHeadlightAngle = 0, lastHeadlightOn = false, lastFlickerTs = 0;
  const NIGHT_DEFAULTS = { headlightLenPx: 120, headlightAngleDeg: 46, headlightOpacity: 0.9,
    headlightFlicker: 0.65, headlightIdleOffSec: 10 };
  const FLICKER_MS = 80; // шаг перерисовки конуса ради мерцания, когда машинка стоит (~12 fps)
  // Лампа гаснет на длинном простое и зажигается обратно с припадочным накалом ("когда включаются —
  // мерцающая анимация как в фильмах"). Ступеньки — время в мс от начала розжига и доля яркости:
  // вспышка, темнота, две неровные попытки, ровный свет. Ступенчато, а не синусоидой: киношная
  // лампа именно ДЁРГАЕТСЯ, плавная кривая читается как обычное мерцание, которое тут и так есть.
  const WARMUP_MS = 1000;
  const WARMUP_STEPS = [[0, 0.9], [70, 0], [150, 1], [210, 0], [330, 0.85], [400, 0.1],
    [520, 1], [610, 0.25], [730, 1], [820, 0.55], [900, 1]];
  let lampOff = false;   // фары выключены простоем
  let idleT = 0;         // сек без движения
  let warmupT = -1;      // мс с начала розжига, -1 = не идёт
  function warmupFactor(t) {
    let v = 1;
    for (const s of WARMUP_STEPS) { if (t >= s[0]) v = s[1]; else break; }
    return v;
  }
  // Фары горят, когда ночь включена И идёт езда И лампу не вырубил простой. Считалось в двух
  // местах (paintFog и frame) — разъехались бы при первой же правке условия.
  const headlightsLit = () => !!window.LeonidaNight?.isOn?.() && active && !lampOff;
  // Порог доворота spriteAngle, взводящий перерисовку фар (см. frame() ниже) — подобран на глаз,
  // не измерен против turnMinFactor/spriteLerp (открытый вопрос, см. docs/qa-night-mode.md).
  const HEADLIGHT_ANGLE_EPS = 0.002;

  // --- маска поверхностей (scripts/build-surface-mask.js): дорога/местность/вода ---
  let surfData = null, surfSize = 0;
  // Гео-привязка маски = прямоугольник МАСТЕРА yanis13 (20000м), не тайл-пирамиды — константы
  // из калибровки map.js (ZERO_PX_AT_Z0_*, offset 6384), продублированы в build-surface-mask.js.
  const SURF = { west: -16500, north: 12000, size: 20000 };

  function loadSurfaceMask() {
    if (!cfg.surfaceMask) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const cx = c.getContext('2d');
      cx.drawImage(img, 0, 0);
      surfData = cx.getImageData(0, 0, img.width, img.height).data;
      surfSize = img.width;
      log(`маска поверхностей: ${img.width}x${img.height}`);
    };
    img.onerror = () => log('маска поверхностей не загрузилась — едем без неё');
    img.src = cfg.surfaceMask;
  }

  // Спавн "с дороги": ближайший дорожный пиксель маски к точке (кольцевой поиск, до ~800м),
  // курс — вдоль дороги (по вертикальному соседу). Маска грузится с init() — к первому старту
  // готова; если вдруг нет (офлайн) — стартуем как есть.
  function snapToRoad(x, y) {
    if (!surfData) return { x, y, angle: 0 };
    const px = SURF.size / surfSize;
    const mx0 = Math.floor((x - SURF.west) / px);
    const my0 = Math.floor((SURF.north - y) / px);
    const isRoad = (mx, my) => mx >= 0 && my >= 0 && mx < surfSize && my < surfSize &&
      surfData[(my * surfSize + mx) * 4] > 200;
    for (let r = 0; r <= 80; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue; // только кольцо радиуса r
          const mx = mx0 + dx, my = my0 + dy;
          if (!isRoad(mx, my)) continue;
          const angle = (isRoad(mx, my - 1) || isRoad(mx, my + 1)) ? 0 : Math.PI / 2;
          return { x: SURF.west + (mx + 0.5) * px, y: SURF.north - (my + 0.5) * px, angle };
        }
      }
    }
    return { x, y, angle: 0 };
  }

  // RESET: телепорт на ближайшую дорогу (тот же кольцевой поиск snapToRoad, ~800м). Заплыл
  // дальше радиуса поиска (или за мастер, где дорог нет вовсе) — фолбэк на центр мастера:
  // потерять позицию при осознанном сбросе честнее, чем оставить кнопку неработающей.
  function resetToRoad() {
    if (!active) return;
    let spot = snapToRoad(carX, carY);
    if (spot.x === carX && spot.y === carY && sampleSurface(spot.x, spot.y) !== 'road') {
      spot = snapToRoad(SURF.west + SURF.size / 2, SURF.north - SURF.size / 2);
    }
    carX = spot.x; carY = spot.y; carAngle = spot.angle;
    spriteAngle = carAngle; carSpeed = 0; driftDeg = 0;
    camX = carX; camY = carY; camDetached = false;
    stuckT = 0;
    if (resetBtn) resetBtn.hidden = true;
    map.setView(window.LeonidaMap.gameLatLng(carX, carY), driveZoom, { animate: false });
    updateCarMarker();
    revealFog(); // как на старте: точка приземления сразу чуть рассеяна
    fogDirty = true; paintFog();
    scheduleSave();
  }

  function sampleSurface(x, y) {
    if (!surfData) return 'road'; // маска ещё грузится/нет — без штрафов
    const mx = Math.floor((x - SURF.west) / SURF.size * surfSize);
    const my = Math.floor((SURF.north - y) / SURF.size * surfSize);
    if (mx < 0 || my < 0 || mx >= surfSize || my >= surfSize) return 'water'; // за мастером — океан
    const v = surfData[(my * surfSize + mx) * 4]; // grayscale: 255 дорога / 120 земля / 0 вода
    return v > 200 ? 'road' : v > 60 ? 'land' : 'water';
  }

  // --- цикл/ввод ---
  const keys = new Set();
  let rafId = null, lastTs = null;
  // Боевой зум заезда — ВСЕГДА cfg.zoom, на любом слое (16-08(13): «drive у нас на 200м при
  // реалистике имеет совсем другую динамику, надо единообразить»). До этого в Realistic заезд шёл
  // на потолке AI-слоя, то есть с вдвое большим числом метров в пикселе: физика оставалась той же,
  // а на экране всё двигалось иначе — это и была «другая динамика». Тайлы AI выше своего z_native
  // просто растягиваются, зато оба слоя ездят одинаково.
  const driveZoom = cfg.zoom;
  let savedMinZoom, savedMaxZoom;
  let saveTimer = null;
  // Пока идёт зум-анимация Leaflet, panBy каждый кадр обрывал бы её — зум ощущался "резким"
  // (мгновенный скачок вместо плавного перелёта). Флаг ставится в ensureInit по zoomstart/zoomend.
  let zoomAnimating = false;
  let radioKicked = false; // радио запускается один раз за сессию езды, по первому нажатию газа

  const CAR_HALF_PX = cfg.carHalfPx;  // полспрайта машинки, см. комментарий в config.js

  // --- интеграция карточек (hero-tiles): намагничивание + пауза физики на время модалки ---
  let magnetId = null; // id видимой карточки в радиусе подъезда (подсветка + E — открыть)
  let paused = false;  // модалка карточки открыта: rAF-цикл и клавиши сняты, радио не трогаем

  // ---------- eligibility кнопки START ENGINE ----------
  // Ключ активного слоя — LeonidaMap.activeSourceKey() (рефактор 08-09): свой labelToKey и своё
  // отслеживание baselayerchange здесь удалены, map.js обновляет ключ раньше нашего обработчика.
  const isTouchPrimary = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  function updateDriveEligibility() {
    // Оба варианта мастера (clean/annotated) — одна геометрия и одна калибровка, ездить можно
    // на любом (раунд-11: переключение Community/Reference не должно прятать DRIVE).
    const eligible = cfg.enabled && !isTouchPrimary
      && ['yanis13', 'yanis13ref'].includes(window.LeonidaMap.activeSourceKey());
    if (driveBtn) driveBtn.hidden = !eligible;
    if (!eligible && active) stop();
  }

  // ---------- geometry / грид тумана (§3) ----------
  function setupGeometry() {
    const b = window.LeonidaMap.tilePyramidBounds;
    bounds = { west: b.getWest(), east: b.getEast(), south: b.getSouth(), north: b.getNorth() };
    // Грид тумана остаётся на пирамиде: он уже посчитан у всех в сейвах, а сейв инвалидируется по
    // cols/rows — сузить его значило бы стереть всем разведанное. Ячейки за maxBounds просто
    // недостижимы. ponytail: лишние ячейки дешевле потерянного прогресса.
    const mb = map.options.maxBounds;
    carBounds = { west: mb.getWest(), east: mb.getEast(), south: mb.getSouth(), north: mb.getNorth() };
    cellSize = cfg.fogCellPx * mppx(cfg.zoom);
    cols = Math.ceil((bounds.east - bounds.west) / cellSize);
    rows = Math.ceil((bounds.north - bounds.south) / cellSize);
    const total = cols * rows;
    log(`грид тумана: ${cols}x${rows} = ${total} ячеек, cellSize=${cellSize.toFixed(1)}м`);
    // Cap поднят 200k->500k вместе с fogCellPx 96->48 ("квадраты слишком крупные"): рендер теперь
    // один drawImage грид-канваса (не цикл по ячейкам), а в localStorage биты пакуются 8/байт —
    // оба прежних основания для 200k сняты. 500k — новый потолок здравого смысла, не расчёт.
    if (total > 500000) {
      // Стоп, а не молчаливый пересчёт — см. §3 промпта.
      throw new Error(`[drive-mode] грид тумана ${total} ячеек > 500k, остановка`);
    }
  }

  // ---------- localStorage (§4) ----------
  function toBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function fromBase64(str) {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  // v2: биты пакуются 8 ячеек/байт. При ячейке 48px грид 466k ячеек — байт-на-ячейку раздул бы
  // запись до ~620 КБ base64, упаковка держит её в ~80 КБ. В памяти fog остаётся байт-на-ячейку.
  function packBits(cells) {
    const packed = new Uint8Array(Math.ceil(cells.length / 8));
    for (let i = 0; i < cells.length; i++) if (cells[i] === 1) packed[i >> 3] |= 1 << (i & 7);
    return packed;
  }
  function unpackBits(packed, count) {
    const cells = new Uint8Array(count);
    for (let i = 0; i < count; i++) cells[i] = (packed[i >> 3] >> (i & 7)) & 1;
    return cells;
  }

  function loadState() {
    let raw;
    try { raw = localStorage.getItem(cfg.storageKey); } catch (e) { return null; }
    if (!raw) return null;
    try {
      const s = JSON.parse(raw);
      if (s.v !== 2 || s.cols !== cols || s.rows !== rows) {
        log('сохранённое состояние не совпадает с текущей конфигурацией — сброс');
        return null;
      }
      const packed = fromBase64(s.bits);
      if (packed.length !== Math.ceil(cols * rows / 8)) { log('битая длина bits — сброс'); return null; }
      // pos/angle из записи теперь используются: следующая поездка продолжается с того места, где
      // закончилась прошлая («машинка каждый раз заводится в центре кадра» — неестественно, раз
      // туман и так помнит, где ты был). Формат v2 не менялся, поля лежали в записи с самого начала.
      const pos = Array.isArray(s.pos) && s.pos.length === 2 && s.pos.every(Number.isFinite) ? s.pos : null;
      return { bits: unpackBits(packed, cols * rows), pos, angle: Number.isFinite(s.angle) ? s.angle : 0 };
    } catch (e) {
      log('не удалось прочитать сохранённое состояние (' + e.message + ') — чистый сброс');
      return null;
    }
  }

  function doSave() {
    const payload = JSON.stringify({ v: 2, cols, rows, pos: [carX, carY], angle: carAngle, bits: toBase64(packBits(fog)) });
    if (saveTimer == null) log(`размер записи туман: ${(payload.length / 1024).toFixed(1)} КБ`);
    try { localStorage.setItem(cfg.storageKey, payload); } catch (e) { log('не удалось сохранить состояние', e.message); }
    document.dispatchEvent(new CustomEvent('leonida:state-changed', { detail: { key: cfg.storageKey } })); // store.js: в аккаунт
  }
  // store.js при входе объединил туман с серверной копией (OR битов той же сетки) и перезаписал
  // localStorage — подтянуть новые биты в память, не трогая свои. До primeFog() делать нечего:
  // он сам прочитает уже объединённую запись.
  document.addEventListener('leonida:state-merged', () => {
    if (!fog) return;
    const saved = loadState();
    if (!saved) return;
    let added = 0;
    for (let i = 0; i < fog.length; i++) if (saved.bits[i] === 1 && fog[i] !== 1) { fog[i] = 1; openCount++; added++; }
    if (!added) return;
    if (gridCanvas) rebuildGridCanvas();
    fogDirty = true;
    if (inited) paintFog();
  });
  function scheduleSave() {
    if (saveTimer) return;
    saveTimer = setTimeout(() => { saveTimer = null; doSave(); }, 2000);
  }
  function flushSave() { if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; } if (inited) doSave(); }
  window.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushSave(); });
  window.addEventListener('pagehide', flushSave);

  // ---------- прогресс (§4) ----------
  // Своей строки в Map Info больше нет: процент рассеянного тумана показывает окно COLLECTION
  // (js/render.js collectionPanel) через fogPct() — панель осталась пультом, вся статистика
  // собралась в одном месте. Туман сохраняется между сессиями, поэтому значение осмысленно и вне
  // езды; пока ни разу не ездили — 0.0%, и окно рисует полосу пустой.
  function fogPct() {
    if (!fog || !cols || !rows) return 0;
    return openCount / (cols * rows) * 100;
  }

  // ---------- туман из сохранения (без панов/канваса) ----------
  // Отдельно от ensureInit: процент рассеянного тумана показывается в Map Info ВСЕГДА, значит
  // геометрию и сейв надо прочитать уже при загрузке. А вот паны/канвас так и остаются ленивыми —
  // создай их здесь, и туман начал бы рисоваться на карте у всех, кто хоть раз ездил.
  function primeFog() {
    if (fog) return;
    setupGeometry();
    const saved = loadState();
    fog = saved ? saved.bits : new Uint8Array(cols * rows);
    if (saved?.pos) spawnPos = { x: saved.pos[0], y: saved.pos[1], angle: saved.angle };
    openCount = 0;
    for (let i = 0; i < fog.length; i++) if (fog[i] === 1) openCount++;
  }

  // ---------- ленивая инициализация (canvas/пана/грид/машинка) ----------
  function ensureInit() {
    if (inited) return;
    inited = true;

    primeFog();

    fogPane = map.createPane('fogPane');
    // Выше AI-паны (250) и базовых тайлов (200), ниже T2/hero-tiles (overlayPane 400/markerPane 600) —
    // туман не должен закрывать маркеры/фото-тайлы, только сами тайлы карты.
    fogPane.style.zIndex = 350;
    fogPane.style.pointerEvents = 'none';

    trailPane = map.createPane('driveTrailPane');
    trailPane.style.zIndex = 360; // над туманом, под машинкой (markerPane 600)
    trailPane.style.pointerEvents = 'none';

    // Своя пана для машинки, выше popupPane (700) — открытая табличка маркера не должна
    // перекрывать машинку, когда та проезжает поверх (раунд-12).
    const carPane = map.createPane('driveCarPane');
    carPane.style.zIndex = 750;
    carPane.style.pointerEvents = 'none';

    fogCanvas = document.createElement('canvas');
    fogCanvas.className = 'drive-fog-canvas';
    fogPane.appendChild(fogCanvas);
    fogCtx = fogCanvas.getContext('2d');

    rebuildGridCanvas();

    // Силуэт машинки сверху (не стрелка-курсор) — корпус со скруглением + лобовое стекло у
    // "носа" (угол 0 = север = верх спрайта). Розовая заливка + оранжевая обводка, 13x21
    // (уменьшалась дважды: 24x40 -> 16x26 -> 13x21 по фидбэку).
    // .drive-car-ping — кольцо, которое радар (js/radar.js) вспыхивает на каждый пинг. Живёт в
    // иконке машинки, чтобы ездить вместе с ней; вне пинга прозрачно и ничего не стоит.
    // Второй силуэт в той же иконке — катер (острый нос, тот же viewBox и размер): на воде
    // показывается он, на суше — машинка. Оба лежат в DOM всегда, переключает класс on-water в
    // updateCarMarker: пересобирать divIcon на каждом заезде в воду было бы дороже и мигало бы.
    // Третий силуэт — самолёт (бонус planeBonus ниже): те же viewBox/размер, показывается классом
    // flying. Полоска ударов (.drive-car-hp, наполняет js/police.js) и счётчик секунд полёта —
    // сёстры .drive-car-rot, а не потомки: их нельзя крутить вместе с корпусом.
    const iconHtml = '<span class="drive-car-ping"></span>' +
      '<div class="drive-car-rot"><svg class="dc-car" viewBox="0 0 16 26" width="13" height="21">' +
      '<rect x="1" y="1" width="14" height="24" rx="5" fill="var(--pink)" stroke="var(--orange)" stroke-width="1.5"/>' +
      '<rect x="3.5" y="4" width="9" height="6" rx="2" fill="rgba(11,6,32,.6)"/>' +
      '</svg><svg class="dc-boat" viewBox="0 0 16 26" width="13" height="21">' +
      '<path d="M8 1c4.6 6 6 13.5 5.4 23H2.6C2 14.5 3.4 7 8 1z" fill="var(--pink)" stroke="var(--orange)" stroke-width="1.5"/>' +
      '<rect x="4.5" y="9" width="7" height="7" rx="2" fill="rgba(11,6,32,.6)"/>' +
      // 17x27 -> 21x33 («самолёт можно покрупнее»): бонус длится 15 секунд и должен читаться как
      // смена транспорта, а не как чуть другая машинка.
      '</svg><svg class="dc-plane" viewBox="0 0 16 26" width="21" height="33">' +
      '<path d="M8 1c1.2 0 2 2.3 2 5.2v3.1l4.8 3.4v2.2L10 13.4v5.2l2 1.6v1.9l-4-1.2-4 1.2v-1.9l2-1.6v-5.2L1.2 15v-2.2L6 9.3V6.2C6 3.3 6.8 1 8 1z" ' +
      'fill="var(--pink)" stroke="var(--orange)" stroke-width="1.2" stroke-linejoin="round"/>' +
      '</svg></div><i class="drive-car-hp"></i><i class="drive-car-timer"></i>' +
      '<i class="drive-car-note"></i>';
    carMarker = L.marker(window.LeonidaMap.gameLatLng(carX, carY), {
      icon: L.divIcon({ className: '', html: iconHtml, iconSize: [13, 21], iconAnchor: [6.5, 10.5] }),
      interactive: false,
      pane: 'driveCarPane', // выше popupPane (700) — табличка открытого маркера не закрывает машинку
      zIndexOffset: 10000 // машинка поверх фото-карточек (раунд-8: при наезде видна над плиткой)
    });

    // 'move', не 'moveend': перерисовка теперь дешёвая (заливка + один drawImage), туман может
    // следовать за картой и во время перетаскивания без рывка в конце. Во время езды кадры красит
    // сам frame() — событие только помечает dirty, чтобы не красить дважды за кадр.
    map.on('move zoom', () => { fogDirty = true; if (!active) paintFog(); });
    map.on('zoomstart', () => { zoomAnimating = true; });
    // Ушли с боевого зума — камера отцепляется от машинки, ровно как при обзоре средней кнопкой.
    // Без этого колесо и камера дрались за кадр: Leaflet зумит ВОКРУГ КУРСОРА (вид уезжает вбок),
    // а panCamera в следующем же кадре тащит центр обратно к машинке. Между шагами колеса
    // zoomAnimating успевает сброситься, и каждый щелчок отдавался рывком в сторону
    // («камера как будто пытается центрировать изображение, всё время прыжки»). Возврат — газом,
    // он же вернёт и сам зум (см. frame()).
    map.on('zoomend', () => {
      zoomAnimating = false;
      if (active && map.getZoom() !== driveZoom) camDetached = true;
    });
    // map 'resize' (invalidateSize) отдельно от window.resize: fullscreen-тоггл карты меняет её
    // размер БЕЗ ресайза окна — без этого канвас оставался размером с виджет и туман покрывал
    // только его угол ("не покрывает весь мир" в fullscreen).
    map.on('resize', resizeFogCanvas);
    window.addEventListener('resize', resizeFogCanvas);
    resizeFogCanvas();
    initMiddleDrag();
  }

  // ---------- обзор средней кнопкой мыши ----------
  // В езде map.dragging выключен (камера ведёт машинку каждый кадр), поэтому осмотреться нечем.
  // Средняя кнопка двигает карту напрямую через panBy и отцепляет камеру до первого газа.
  // Свой обработчик, а не map.dragging: левая кнопка по-прежнему не должна воевать с камерой.
  function initMiddleDrag() {
    const container = map.getContainer();
    container.addEventListener('mousedown', (e) => {
      if (e.button !== 1 || !active) return;
      e.preventDefault(); // иначе Windows включает автоскролл и курсор превращается в «компас»
      midDrag = true; camDetached = true; midX = e.clientX; midY = e.clientY;
      container.classList.add('drive-look');
    });
    container.addEventListener('auxclick', (e) => { if (e.button === 1 && active) e.preventDefault(); });
    // mousemove/mouseup на window, не на контейнере: увёл курсор за край карты — жест не должен
    // залипать нажатым.
    window.addEventListener('mousemove', (e) => {
      if (!midDrag) return;
      map.panBy([midX - e.clientX, midY - e.clientY], { animate: false, noMoveStart: true });
      midX = e.clientX; midY = e.clientY;
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button !== 1 || !midDrag) return;
      midDrag = false;
      container.classList.remove('drive-look');
    });
  }

  // ---------- рендер тумана (§3) ----------
  // Запас канваса за края вьюпорта: CSS blur(8px) размывает В ТОМ ЧИСЛЕ внешний край самого
  // канваса — без запаса по периметру карты висела полупрозрачная полоса тумана (фидбэк 03-08).
  // 24px > 2x радиуса блюра, размытая кромка остаётся за экраном.
  const FOG_PAD = 24;

  function resizeFogCanvas() {
    if (!fogCanvas) return;
    const size = map.getSize();
    fogCanvas.width = size.x + FOG_PAD * 2;
    fogCanvas.height = size.y + FOG_PAD * 2;
    paintFog();
  }

  // Offscreen-канвас 1px = ячейка: открытые ячейки — непрозрачные пиксели. Обновляется точечно
  // в revealFog(), целиком перестраивается только при загрузке состояния из сейва.
  function rebuildGridCanvas() {
    if (!gridCanvas) {
      gridCanvas = document.createElement('canvas');
      gridCanvas.width = cols; gridCanvas.height = rows;
      gridCtx = gridCanvas.getContext('2d');
      gridCtx.fillStyle = '#fff'; // цвет не важен, drawImage идёт в режиме destination-out (альфа)
    }
    gridCtx.clearRect(0, 0, cols, rows);
    for (let i = 0; i < fog.length; i++) {
      if (fog[i] === 1) gridCtx.fillRect(i % cols, Math.floor(i / cols), 1, 1);
    }
  }

  function paintFog() {
    if (!fogCtx) return;
    fogDirty = false;
    const headlightsOn = headlightsLit();
    // Туман — только во время езды (фидбэк 03-08 "вышел из игры — туман висит на карте");
    // прогресс исследования при этом персистится и вернётся при следующем START ENGINE.
    if (!active) { fogCanvas.style.display = 'none'; return; }
    fogCanvas.style.display = '';

    // Канвас — единственный ребёнок паны, но Leaflet двигает саму пану (через panBy/drag), не
    // содержимое; DOM-элемент, вставленный вручную, не следует за ней сам — перепривязываем к
    // текущему левому верхнему углу вьюпорта (минус запас FOG_PAD) на каждой перерисовке.
    L.DomUtil.setPosition(fogCanvas, map.containerPointToLayerPoint([-FOG_PAD, -FOG_PAD]));

    // Сплошная заливка вьюпорта + вырезание открытых ячеек одним drawImage грид-канваса,
    // растянутого на прямоугольник пирамиды (destination-out стирает туман по альфе пикселей).
    // Это чинит сразу три жалобы прежнего поцикличного рендера: (1) заливка покрывает и области
    // ЗА пирамидой — "туман не покрывает весь мир"; (2) билинейное сглаживание при апскейле +
    // CSS blur дают мягкие пятна вместо жёстких квадратов; (3) стоимость не зависит от числа
    // видимых ячеек — работает на любом зуме, гейт z<2 убран.
    fogCtx.globalCompositeOperation = 'source-over';
    fogCtx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);
    fogCtx.fillStyle = `rgba(4,2,14,${active ? 0.92 : 0.55})`; // "чернее" — было rgba(11,6,32, .82/.35)
    fogCtx.fillRect(0, 0, fogCanvas.width, fogCanvas.height);

    const p0 = map.latLngToContainerPoint(window.LeonidaMap.gameLatLng(bounds.west, bounds.north));
    // Правый/нижний край — через cols/rows*cellSize, не bounds.east/south: грид округлён вверх
    // Math.ceil'ом и чуть шире пирамиды, растяжка ровно по bounds дала бы субпиксельный сдвиг ячеек.
    const p1 = map.latLngToContainerPoint(window.LeonidaMap.gameLatLng(
      bounds.west + cols * cellSize, bounds.north - rows * cellSize));
    fogCtx.globalCompositeOperation = 'destination-out';
    // container-координаты -> координаты канваса: канвас начинается на FOG_PAD раньше вьюпорта
    fogCtx.drawImage(gridCanvas, p0.x + FOG_PAD, p0.y + FOG_PAD, p1.x - p0.x, p1.y - p0.y);
    fogCtx.globalCompositeOperation = 'source-over';

    if (headlightsOn) paintHeadlights();
  }

  // Конус фар — второй проход поверх уже нарисованного тумана (или пустого канваса, если туман
  // выключен). НЕ destination-out: слой ночи — отдельный div в своей пане, «прожечь» его этим
  // канвасом нельзя — фары именно ДОРИСОВЫВАЮТ свет. 'screen' вместо 'lighter': формула
  // 1-(1-a)(1-b) ограничена сверху (не уходит в чистый белый клип, как аддитивный 'lighter' на
  // ярких пикселях), и там, где конус попадает на ещё не разведанный тёмный туман — визуально
  // "пробивает" его светом, а не просто закрашивает поверх плоским цветом (как дал бы 'source-over').
  // Дёшево: один путь-клин + один радиальный градиент, без теней и без учёта surface-mask.
  function paintHeadlights() {
    const nc = window.SITE_CONFIG.NIGHT_MODE || NIGHT_DEFAULTS;
    // headlightLenPx откалиброван "на зуме cfg.zoom" (см. комментарий в config.js) — раньше тут
    // было захардкожено число 5, которое само DRIVE_MODE.zoom уже дважды меняло (3->4->5);
    // при следующей перекалибровке зума конус молча остался бы неправильного размера.
    // На воде это уже не фары: у катера их нет в принципе, там ходовой прожектор — узкий луч,
    // бьющий дальше автомобильного («насколько корректен конус света у катера?», 16-08(7)).
    // Два коэффициента вместо двух новых ключей конфига: крутить их пока незачем.
    // boatMode, а не свой сэмпл маски: катер, потолок скорости и прожектор обязаны переключаться
    // одним и тем же событием (16-08(12), см. frame()).
    const lenPx = (nc.headlightLenPx ?? NIGHT_DEFAULTS.headlightLenPx) * (boatMode ? 1.25 : 1)
      * Math.pow(2, map.getZoom() - cfg.zoom);
    const halfAngle = (nc.headlightAngleDeg ?? NIGHT_DEFAULTS.headlightAngleDeg) * (boatMode ? 0.5 : 1)
      / 2 * Math.PI / 180;
    // Яркость конуса — СВОЙ ключ, не emissiveOpacity (тот про свечение городов; когда его снизили
    // с 0.9 до 0.55 из-за розовой пелены, фары потускнели заодно, хотя их об этом не просили).
    // Мерцание: три несинхронные синусоиды — ровный пульс читается как анимация UI, несовпадающие
    // периоды дают живой неровный накал лампы. Только ПРОСАДКА вниз от базовой яркости, вверх не
    // уходим: лампа тускнеет, а не разгорается ярче номинала, и rgba-строка не может вылезти за 1
    // (там это была бы невалидная заливка и молча пропавший конус).
    const t = performance.now() / 1000;
    const amp = nc.headlightFlicker ?? NIGHT_DEFAULTS.headlightFlicker;
    const wob = (Math.sin(t * 2.6) + 0.7 * Math.sin(t * 1.1) + 0.4 * Math.sin(t * 0.47)) / 2.1; // -1..1
    const flicker = 1 - amp * (0.5 + 0.5 * wob); // (1-amp)..1
    const base = nc.headlightOpacity ?? NIGHT_DEFAULTS.headlightOpacity;
    // Розжиг после простоя — поверх обычного мерцания: ступенчатая огибающая гасит конус в ноль
    // и обратно несколько раз за секунду ("мерцающая анимация как в фильмах").
    const warm = warmupT >= 0 ? warmupFactor(warmupT) : 1;
    const opacity = Math.min(1, Math.max(0, base * flicker * warm));

    // Позиция машинки на канвасе — как p0/p1 выше: container-точка + FOG_PAD. Направление конуса —
    // spriteAngle (лерпленный визуальный угол, не физический carAngle), та же формула, что даёт
    // CSS-rotate в updateCarMarker (0 рад = север = экранный "вверх", по часовой): единичный вектор
    // направления на экране — (sin(a), -cos(a)).
    const carPt = map.latLngToContainerPoint(window.LeonidaMap.gameLatLng(carX, carY));
    const cx = carPt.x + FOG_PAD, cy = carPt.y + FOG_PAD;
    const leftA = spriteAngle - halfAngle, rightA = spriteAngle + halfAngle;
    const lx = cx + Math.sin(leftA) * lenPx, ly = cy - Math.cos(leftA) * lenPx;
    const rx = cx + Math.sin(rightA) * lenPx, ry = cy - Math.cos(rightA) * lenPx;

    const grad = fogCtx.createRadialGradient(cx, cy, 0, cx, cy, lenPx);
    grad.addColorStop(0, `rgba(255,244,214,${opacity})`);
    grad.addColorStop(1, 'rgba(255,244,214,0)');

    fogCtx.globalCompositeOperation = 'screen';
    fogCtx.fillStyle = grad;
    fogCtx.beginPath();
    fogCtx.moveTo(cx, cy);
    fogCtx.lineTo(lx, ly);
    fogCtx.lineTo(rx, ry);
    fogCtx.closePath();
    fogCtx.fill();
    fogCtx.globalCompositeOperation = 'source-over';
  }

  function revealFog() {
    const ccx = Math.floor((carX - bounds.west) / cellSize);
    const ccy = Math.floor((bounds.north - carY) / cellSize);
    const r = cfg.revealRadiusCells;
    let changed = false;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue; // круглая область
        const cx = ccx + dx, cy = ccy + dy;
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
        const idx = cy * cols + cx;
        if (fog[idx] !== 1) { fog[idx] = 1; openCount++; changed = true; gridCtx.fillRect(cx, cy, 1, 1); }
      }
    }
    if (changed) {
      fogDirty = true;
      // hero-tiles слушает и показывает карточки, вышедшие из тумана (throttle на его стороне)
      document.dispatchEvent(new CustomEvent('leonida:fogchange'));
    }
  }

  // Открыта ли ячейка тумана над игровой точкой — hero-tiles прячет карточки в закрытых ячейках
  // (только в режиме езды).
  function isRevealedAt(x, y) {
    if (!inited || !fog) return true;
    const cx = Math.floor((x - bounds.west) / cellSize);
    const cy = Math.floor((bounds.north - y) / cellSize);
    if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
    return fog[cy * cols + cx] === 1;
  }

  // ---------- машинка: визуал (угол лерпится отдельно от физики, + дрифт-наклон, §1/§2 полировки) ----------
  function updateCarMarker() {
    carMarker.setLatLng(window.LeonidaMap.gameLatLng(carX, carY));
    const el = carMarker.getElement();
    const rot = el && el.querySelector('.drive-car-rot');
    if (!rot) return;
    rot.style.transform = `rotate(${(spriteAngle * 180 / Math.PI + driftDeg).toFixed(1)}deg)`;
    // Машинка/катер/самолёт — по состоянию и поверхности под собой. Класс, а не смена иконки:
    // divIcon пересоздал бы DOM (вместе с кольцом радара и текущим поворотом) на каждом заезде
    // в воду. Самолёт старше воды: летим — катер не показываем, даже если внизу залив.
    const air = isFlying();
    rot.classList.toggle('flying', air);
    rot.classList.toggle('on-water', !air && boatMode);
    // Счётчик секунд полёта — единственный HUD бонуса: 15 секунд без цифры читались бы как
    // «когда-нибудь кончится». В приборку он не поехал: смотрят на машинку, а не в угол.
    const timer = el.querySelector('.drive-car-timer');
    if (timer) timer.textContent = air ? `PLANE ${Math.ceil(planeT / 1000)}s` : '';
  }

  // ---------- след (§3 полировки) — точки-геометки в trailPane, позиция считается один раз при
  // спавне через layer point (пана панорамируется вместе с картой, точке не нужно догонять камеру) ----------
  function spawnTrail() {
    const el = document.createElement('div');
    el.className = 'drive-trail-dot';
    L.DomUtil.setPosition(el, map.latLngToLayerPoint(window.LeonidaMap.gameLatLng(carX, carY)));
    trailPane.appendChild(el);
    trailDots.push({ el, spawnedAt: performance.now() });
  }
  function updateTrail(now) {
    if (!trailDots.length) return;
    trailDots = trailDots.filter((d) => {
      const age = now - d.spawnedAt;
      if (age >= TRAIL_LIFETIME) { d.el.remove(); return false; }
      d.el.style.opacity = String(1 - age / TRAIL_LIFETIME);
      return true;
    });
  }

  // ---------- тряска камеры (столкновение с копом, js/police.js) — 200мс ----------
  // Анимируем КОНТЕЙНЕР карты: Leaflet двигает свою _mapPane внутри него, поэтому transform
  // самого контейнера ни с чем не конфликтует (в отличие от трансформа паны, см. panCamera).
  function shakeCamera() {
    const el = map.getContainer();
    window.LeonidaMap.restartAnim(el, 'drive-shake'); // рестарт при ударах подряд
    el.addEventListener('animationend', () => el.classList.remove('drive-shake'), { once: true });
  }

  // ---------- камера: map.panBy вместо setView каждый кадр (§2 полировки) ----------
  // panBy остаётся на официальном Leaflet-пути (обновляет _pixelOrigin синхронно с картой) — в
  // отличие от прямого L.DomUtil.setPosition на _mapPane, это не расходится с
  // latLngToContainerPoint/latLngToLayerPoint, которые использует и туман, и маркеры/hero-tiles.
  // "Дёрганость" в фидбэке была от setView (полный сброс вида), не от округления пикселя внутри
  // panBy — на глаз незаметно, а раздельный ручной трансформ паны рискует рассинхронизировать
  // позиционирование маркеров с видимыми тайлами. Осознанный трейд-офф, не "не сделали".
  function panCamera() {
    // Проекция на ТЕКУЩЕМ зуме, не cfg.zoom: во время езды теперь можно отдаляться
    // (driveZoomOut), а panBy принимает пиксели текущего зума.
    const z = map.getZoom();
    const targetPoint = map.project(window.LeonidaMap.gameLatLng(camX, camY), z);
    const currentCenterPoint = map.project(map.getCenter(), z);
    const offset = targetPoint.subtract(currentCenterPoint);
    if (Math.abs(offset.x) < 0.5 && Math.abs(offset.y) < 0.5) return false;
    map.panBy(offset, { animate: false, duration: 0, noMoveStart: true });
    return true;
  }

  // ---------- карточки: три кольца близости (раунд-8). Радиусы magnet/pickup — игровые метры,
  // пересчитаны из px на боевом зуме (на zoom-out физически те же); "треть экрана" — по
  // текущему зуму, это про кадр, а не про мир.
  //   near (треть экрана)  -> лёгкий пульс-скейл: карточка "зовёт"
  //   magnet (cardMagnetPx)-> подсветка + подсказка E — open
  //   pickup (полплитки)   -> наезд: эффект столкновения + автооткрытие, как взятый бонус
  let nearIds = new Set();
  let lastPickupId = null; // защита от повторного автооткрытия, пока не отъехал из magnet-кольца
  function updateCardMagnet() {
    const ht = window.HeroTiles;
    if (!ht) return;
    // Радиусы считаются от ТЕКУЩЕГО зума, а не от боевого cfg.zoom. Плитка рисуется постоянным
    // размером в экранных px, а радиус в игровых метрах от cfg.zoom — фиксированный: стоило
    // отдалиться на разрешённые driveZoomOut уровней, и плитка покрывала до 8x больше метров,
    // чем радиус наезда. Машинка визуально ехала прямо по карточке и ничего не подбирала
    // (фидбэк "проехал — не открылась"). Экранная геометрия и радиусы теперь в одном масштабе.
    const mpp = mppx(map.getZoom());
    const magnetR = cfg.cardMagnetPx * mpp;
    // Полплитки + полмашинки: карточка берётся, когда спрайты ВИЗУАЛЬНО пересеклись. Раньше
    // считалась только полплитки от центра — проезд впритирку к краю карточки не срабатывал,
    // хотя на экране машинка её задевала. Размер плитки — тот же, что рисует hero-tiles.
    const tilePx = window.innerWidth <= 900
      ? window.SITE_CONFIG.HERO_TILE_SIZE.mobile : window.SITE_CONFIG.HERO_TILE_SIZE.desktop;
    // Радиус НАЕЗДА — единственный из трёх, который считается от БОЕВОГО зума, а не от текущего
    // (баг 15-08 «при зуме в драйве карточки открываются сами»). Подсветка и пульс — про экран,
    // им текущий зум правилен; наезд — про мир. При driveZoomOut на 4 уровня mpp растёт в 16 раз,
    // и радиус в 85 м превращался в 1360 м: игрок отдалялся осмотреться, стоя на месте, и разом
    // «переезжал» всё вокруг. Теперь наезд всегда 85 м, сколько ни отдаляй.
    const pickupR = (tilePx / 2 + CAR_HALF_PX) * mppx(cfg.zoom);
    const sz = map.getSize();
    const nearR = Math.min(sz.x, sz.y) / 3 * mpp;
    let best = null, bestD = Infinity, pickupDist = Infinity;
    // Кандидат на наезд ищется ОТДЕЛЬНО от magnet-подсветки. Раньше проверялся только ближайший
    // тайл (best): если он уже открыт или только что подобран, закрытый сосед в радиусе наезда
    // не открывался вовсе — в плотных кластерах это и читалось как "карточка не сработала".
    let pick = null, pickD = Infinity;
    const newNear = new Set();
    for (const t of ht.visible()) {
      const d = Math.hypot(t.x - carX, t.y - carY);
      if (d < nearR) newNear.add(t.id);
      if (d < magnetR && d < bestD) { bestD = d; best = t; }
      if (d < pickupR && d < pickD && t.id !== lastPickupId && !ht.isCardRevealed(t.id)) { pickD = d; pick = t; }
      if (t.id === lastPickupId) pickupDist = d;
    }
    // пульс: снять с уехавших, добавить всем в кольце (add идемпотентен и переживает
    // пересоздание маркера LOD'ом — removeLayer/addTo теряет классы)
    for (const id of nearIds) if (!newNear.has(id)) ht.markerTileEl(id)?.classList.remove('card-near');
    for (const id of newNear) ht.markerTileEl(id)?.classList.add('card-near');
    nearIds = newNear;
    if ((best ? best.id : null) !== magnetId) {
      if (magnetId) ht.markerTileEl(magnetId)?.classList.remove('card-magnet');
      magnetId = best ? best.id : null;
    }
    if (magnetId) ht.markerTileEl(magnetId)?.classList.add('card-magnet');
    // наезд = бонус: только для ЗАКРЫТОЙ карточки и один раз (раунд-9) — открытая уже спокойна
    // (оранжевая обводка), повторный наезд ничего не открывает; E/Enter/клик работают всегда.
    if (lastPickupId && (pickupDist === Infinity || pickupDist > magnetR)) lastPickupId = null;
    // pickupPending — карточка, въехавшая первой, держит "слот" открытия монопольно: без гварда
    // быстрый проезд карточка->карточка ставил в очередь два setTimeout(160мс), и второй тихо
    // перезаписывал модалку первой тем же overlay-DOM (симптом "карточка не открылась" — на деле
    // открылась и тут же была подменена). Приоритет — тому, кто въехал первым.
    // Наезд открывает карточку только НА ХОДУ. Стоящая машинка перестала быть пылесосом: в плотном
    // кластере («много карточек в одном месте — проезд превращается в бесконечное открывание») она
    // ловила соседей одного за другим, и каждый удар по газу упирался в новую модалку. Плюс это же
    // условие добивает зум-баг: осматриваешься стоя — ничего не открывается само.
    // Стоя карточка берётся руками: она подсвечена магнитом, жми E — так было с самого начала.
    // Порог — доля потолка скорости: каждый наезд режет скорость до 0.3, значит после второй
    // подряд машинка сама опускается ниже порога и цепочка обрывается.
    const moving = Math.abs(carSpeed) > topSpeed() * PICKUP_MIN_SPEED;
    if (pick && moving && !pickupPending) pickupCard(pick);
  }
  const PICKUP_MIN_SPEED = 0.15; // доля vMax, ниже которой наезд не считается наездом
  let pickupPending = false;
  function pickupCard(t) {
    lastPickupId = t.id;
    pickupPending = true;
    carSpeed *= 0.3; // "столкновение" — машинку осаживает
    const el = window.HeroTiles?.markerTileEl(t.id);
    if (el) {
      el.classList.add('card-pickup');
      el.addEventListener('animationend', () => el.classList.remove('card-pickup'), { once: true });
    }
    // Модалка после вспышки (та же openCard, что клик/E) — пауза физики придёт событием herocard.
    // 230 -> 160мс: фидбэк раунда-10 "открывается с делеем".
    setTimeout(() => {
      pickupPending = false;
      if (active) window.HeroTiles?.open(t.id);
    }, 160);
  }
  function clearCardMagnet() {
    const ht = window.HeroTiles;
    if (magnetId) ht?.markerTileEl(magnetId)?.classList.remove('card-magnet');
    magnetId = null;
    for (const id of nearIds) ht?.markerTileEl(id)?.classList.remove('card-near');
    nearIds = new Set();
    lastPickupId = null;
  }

  // ---------- коллекционные точки волны A (раунд-9): наезд -> +1 Respect. Кап "once навсегда"
  // и сам факт сбора живут в событиях respect.js (map_dot_<id>) — отдельного стораджа нет.
  // Точка гаснет (перекраска в map.js), но остаётся на карте как "уже был здесь".
  function collectDots() {
    const dots = window.LeonidaMap.waveDots;
    if (!dots || !window.Respect) return;
    const r = 16 * mppx(cfg.zoom); // радиус наезда ~16 px боевого зума (машинка 13x21)
    for (const d of dots) {
      if (d.collected) continue;
      if (Math.abs(d.x - carX) > r || Math.abs(d.y - carY) > r) continue; // дешёвый bbox до hypot
      if (Math.hypot(d.x - carX, d.y - carY) > r) continue;
      window.LeonidaMap.markDotCollected(d);
      // quiet — угловой тост не нужен: награда показывается прямо у точки (раунд-10)
      if (window.Respect.award('map_dot_' + d.id, 1, 'once', true)) showDotReward(d);
    }
  }

  // Что именно собрал: попап маркера открывается на 4с (имя/фото лендмарка — уже готовый
  // контент Render.mapMarkerPopup) + "+1 RESPECT" всплывает у самой точки, не в углу экрана.
  function showDotReward(d) {
    d.marker.openPopup();
    setTimeout(() => { if (d.marker.isPopupOpen?.()) d.marker.closePopup(); }, 4000);
    const p = map.latLngToContainerPoint(window.LeonidaMap.gameLatLng(d.x, d.y));
    const el = document.createElement('div');
    // Едем на юг — подпись ПОД точкой: сверху она ложилась ровно на машинку, которая в момент
    // сбора чуть ниже точки (раунд-11)
    el.className = 'dot-respect-pop' + (Math.cos(carAngle) < 0 ? ' below' : '');
    el.textContent = '+1 RESPECT';
    el.style.left = `${p.x}px`;
    el.style.top = `${p.y}px`;
    window.LeonidaMap.frame.appendChild(el); // .map-frame — поверх Leaflet-пан
    setTimeout(() => el.remove(), 1800);
  }

  // ---------- бонус: самолёт на 15 секунд ----------
  // Единственный пауэр-ап режима езды. На карте лежит ОДНА точка за раз: наехал — durationMs
  // летишь (быстрее, поверх воды и бездорожья, копы не достают — см. isFlying в police.js), потом
  // снова машинка. Respect за бонус не начисляется вовсе, поэтому и капить нечего (CORE_SPEC):
  // награда тут — сама механика, а не очки.
  // Точка спавнится на ДОРОГЕ в кольце [minM, maxM] вокруг машинки и только на разведанной туманом
  // клетке: под закрытым туманом её физически не видно, и бонус превратился бы в лотерею.
  const planeCfg = cfg.planeBonus;
  let planeT = 0;                 // мс полёта осталось, 0 = едем
  let bonusMarker = null, bonusX = 0, bonusY = 0, bonusWaitT = 0;
  const isFlying = () => planeT > 0;

  function clearBonus() {
    if (bonusMarker) map.removeLayer(bonusMarker);
    bonusMarker = null;
  }
  function spawnBonus() {
    // 40 попыток вслепую вместо перебора маски: дорожных пикселей десятки тысяч, а нам нужна
    // одна точка раз в полминуты — дешевле бросить кубик, чем строить индекс.
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = planeCfg.minM + Math.random() * (planeCfg.maxM - planeCfg.minM);
      const x = carX + Math.sin(a) * d, y = carY + Math.cos(a) * d;
      if (x < carBounds.west || x > carBounds.east || y < carBounds.south || y > carBounds.north) continue;
      if (sampleSurface(x, y) !== 'road' || !isRevealedAt(x, y)) continue;
      bonusX = x; bonusY = y;
      bonusMarker = L.marker(window.LeonidaMap.gameLatLng(x, y), {
        icon: L.divIcon({ className: '', html: '<div class="drive-bonus">✈</div>', iconSize: [32, 32] }),
        interactive: false
      }).addTo(map);
      return;
    }
    bonusWaitT = 2000;   // вокруг вода/неразведанное — попробуем ещё раз через пару секунд
  }
  function updateBonus(dt) {
    if (!planeCfg?.enabled) return;
    const ms = dt * 1000;
    if (planeT > 0) {
      planeT = Math.max(0, planeT - ms);
      if (planeT === 0) window.Respect?.toast?.('LANDED');
    }
    if (!bonusMarker) {
      bonusWaitT -= ms;
      if (bonusWaitT <= 0) spawnBonus();
      return;
    }
    // Радиус наезда — те же ~22 px боевого зума, что у точек волны A: бонус берётся корпусом.
    if (Math.hypot(bonusX - carX, bonusY - carY) > 22 * mppx(cfg.zoom)) return;
    clearBonus();
    bonusWaitT = planeCfg.respawnMs;
    planeT = planeCfg.durationMs;
    window.Respect?.toast?.(`PLANE MODE — ${Math.round(planeCfg.durationMs / 1000)}s`);
  }

  // ---------- сейф-хаусы: фиксация выигрыша (16-08(4)) ----------
  // «Может сделаем в стиле ГТА — save house». Доехал до дома — заработанное за заезд уходит в
  // неприкосновенный баланс (Police.bank поднимает базу заезда, см. police.js). Кнопки в приборке
  // нет: фиксация — действие на карте, а не клик по счётчику.
  // Позиции — из данных (assets/map-tiles/safehouses.json, scripts/build-safehouses.js), как
  // заставы: рантайм ничего не генерит.
  // Туман дома ПРЯЧЕТ (16-08(9), «почему дома показываются через туман войны?»). Прежнее исключение
  // («убежище это навигация, а не сюрприз») не выдержало проверки глазами: 27 значков поверх
  // неразведанной черноты выглядели утечкой, а не подсказкой. Найти дом вслепую всё равно есть чем —
  // радар даёт бирюзовый пеленг на ближайший, ровно когда есть что фиксировать (js/radar.js);
  // сонар слышит сквозь туман по построению, в этом его смысл.
  // Дом «заряжен» (пульсирует), только когда есть что фиксировать: без этого одинаковые значки
  // на карте — просто декор, а так они зажигаются ровно в тот момент, когда становятся нужны.
  const houseCfg = cfg.safehouses;
  // 22 -> 26 px: «сделай такими же, как полицейские участки» (.police-outpost, 26 px). Заодно ушёл
  // множитель --house-scale из 16-08(8) — значок больше не ужимается по зуму: от «вся карта из
  // домов» на общем плане теперь спасает туман, а двух механизмов на одну задачу не надо.
  const HOUSE_HTML = '<div class="drive-safehouse"><svg viewBox="0 0 24 24" width="26" height="26">' +
    '<path d="M12 3.2 21 10v10.4H3V10z" fill="rgba(11,6,32,.85)" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M9.6 20.4v-5.6h4.8v5.6" fill="currentColor"/></svg></div>';
  let houses = [], housesLoaded = false, housesArmed = false;
  const houseGroup = L.layerGroup();

  function loadHouses() {
    if (housesLoaded || !houseCfg?.enabled) return Promise.resolve();
    housesLoaded = true;
    return fetch(`${window.SITE_CONFIG.MAP_DATA_BASE}/${houseCfg.file}`)
      .then((r) => r.json())
      .then((list) => {
        houses = list.slice(0, houseCfg.count).map((h) => ({
          ...h,
          marker: L.marker(window.LeonidaMap.gameLatLng(h.x, h.y), {
            icon: L.divIcon({ className: '', html: HOUSE_HTML, iconSize: [26, 26] }),
            interactive: false, zIndexOffset: 360   // рядом с заставами (350), ниже плиток (500)
          })
        }));
        // В группу маркеры кладёт updateHouses по мере рассеивания тумана — см. там же.
      })
      .catch(() => { houses = []; });  // нет файла — заезд работает как раньше, фиксация по STOP
  }

  const paintHouse = (h) => h.marker.getElement()?.firstChild?.classList.toggle('armed', housesArmed);

  function updateHouses() {
    if (!houses.length) return;
    const armed = !!window.Police?.canBank?.();   // условие живёт в police.js, копий не держим
    const armedChanged = armed !== housesArmed;
    housesArmed = armed;
    for (const h of houses) {
      // Дом существует на карте ровно с того момента, как игрок разведал его клетку тумана.
      const seen = isRevealedAt(h.x, h.y);
      if (seen !== h.seen) {
        h.seen = seen;
        if (seen) { h.marker.addTo(houseGroup); paintHouse(h); } else houseGroup.removeLayer(h.marker);
      } else if (armedChanged && seen) paintHouse(h);
      if (!armed || Math.hypot(h.x - carX, h.y - carY) > houseCfg.radiusM) continue;
      const v = window.Police?.bank?.() ?? 0;
      // Плюс вернулся (16-08(9)): с эскроу заезда фиксация ДЕЙСТВИТЕЛЬНО прибавляет — до дома эти
      // RP в общем балансе не лежали. В 16-08(8) плюс убрали как враньё, и тогда это было правдой.
      if (v > 0) carNote(`+${v} RP SECURED`);
    }
  }

  // Оранжевая плашка над машинкой — фиксация объявляется там, где произошла, а не угловым тостом
  // («SECURED лучше показывать оранжевой плашкой над машиной»). Тот же узел, что у счётчика полёта
  // под машинкой, только сверху: пусто = :empty прячет его целиком, отдельного флага не нужно.
  const NOTE_MS = 2200;
  let noteT = null;
  function carNote(text) {
    const el = carMarker?.getElement()?.querySelector('.drive-car-note');
    if (!el) return;
    el.textContent = text;
    clearTimeout(noteT);
    noteT = setTimeout(() => { el.textContent = ''; }, NOTE_MS);
  }

  // ---------- пауза физики на время модалки карточки (сигнал 'leonida:herocard' из hero-tiles).
  // Снимаем rAF-цикл и клавиши целиком: газ/руль/Escape не работают, а Esc модалки обрабатывает
  // сам hero-tiles — слоистый Esc (сначала модалка, потом режим) получается сам собой. Радио не
  // трогаем — играет. ----------
  // Паузу держат ДВА независимых источника: модалка карточки ('card') и экран сбора фрагментов
  // ('ext', см. card-fragments.js). Раньше оба дёргали один булев флаг, и таймер экрана фрагментов
  // снимал паузу за обоих: подобрал кусок (экран висит 4 с), в те же секунды открылась карточка —
  // и физика ехала дальше поверх открытой модалки («когда открываем карточку, полицейские должны
  // останавливаться, а то они едут»). Теперь пауза снимается, только когда её отпустили все.
  // Сигнал наружу для всех, кто живёт СВОИМИ таймерами и о rAF-цикле не знает (js/radar.js: скан
  // раз в SCAN_MS + пинг по setTimeout). Раньше радар слушал 'leonida:herocard' — то есть замирал
  // на модалке карточки и продолжал сканировать под экраном сбора фрагментов (16-08(12), «при
  // открытии легендарки копы всё равно двигаются»: копы-то стоят — замер это подтвердил, — а
  // приборка над ними жила своей жизнью). Одно событие на оба источника паузы, спецслучаев нет.
  const pauseHolders = new Set();
  function announcePause(paused) {
    document.dispatchEvent(new CustomEvent('leonida:drivepause', { detail: { paused } }));
  }
  function pausePhysics(who = 'card') {
    pauseHolders.add(who);
    if (paused || !active) return;
    paused = true;
    keys.clear();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    announcePause(true);
  }
  function resumePhysics(who = 'card') {
    pauseHolders.delete(who);
    if (pauseHolders.size || !paused) return;
    paused = false;
    if (!active) return; // STOP нажали, пока висела модалка — не воскрешать цикл
    lastTs = null;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    rafId = requestAnimationFrame(frame);
    announcePause(false);
  }
  document.addEventListener('leonida:herocard', (e) => {
    if (!active && !paused) return; // модалка вне езды — не наше дело
    if (e.detail?.open && e.detail.first) { bumpStreak(); chaseBonus(e.detail.id); }
    e.detail?.open ? pausePhysics() : resumePhysics();
  });

  // ---------- серия за поездку: N новых карточек подряд, ни одного удара копа ----------
  // Единственное место, где сбор и полиция становятся одной механикой: пока едешь чисто, растёт
  // ставка. Удар (см. Police.tick в frame) обнуляет счётчик, STOP тоже — серия живёт внутри одной
  // поездки. Флаг "карточка новая" приходит из hero-tiles событием: ProgressStore знает только он.
  let streak = 0;
  function bumpStreak() {
    const s = cfg.streak;
    if (!s || !window.Respect) return;
    if (++streak < s.cards) return;
    streak = 0;
    // Слоты в день, как watch-{date}-{i} в timer.js: серия — повторяемое действие, свой
    // ограничитель обязателен (CORE_SPEC, 16-08(15)). Первый свободный слот дня и есть начисление.
    const day = new Date().toISOString().slice(0, 10);
    for (let i = 0; i < s.dailyCap; i++) {
      // Цифра — из возврата award (сверх потолка платится меньше запрошенного, 16-08(8)).
      const paid = window.Respect.award(`drive-streak-${day}-${i}`, s.respect, 'once', true);
      if (paid) {
        window.Respect.toast(`+${paid} RESPECT — CLEAN RUN ×${s.cards}`);
        break;
      }
    }
  }

  // ---------- ×2 под сиреной ----------
  // Новая карточка, взятая во время погони, приносит вдвое: base +HERO_RESPECT_AMOUNT начисляет
  // сама модалка (hero-tiles payTile), столько же добавляем здесь. Смысл — дать погоне вторую сторону: до этого
  // она была чистым минусом, и единственной стратегией было не связываться. Кап — сам id карточки
  // ('once'): за одну и ту же карточку бонус платится ровно раз, всего их 88 (CORE_SPEC).
  // Задержка 600мс — чтобы тост не затёрся базовым попапом за плитку, который приходит на 250мс.
  function chaseBonus(id) {
    if (!id || !window.Police?.isChasing?.() || !window.Respect) return;
    const pts = window.SITE_CONFIG.HERO_RESPECT_AMOUNT;
    setTimeout(() => {
      const paid = window.Respect.award(`chase-bonus-${id}`, pts, 'once', true);
      if (paid) window.Respect.toast(`+${paid} RESPECT — ×2 UNDER FIRE`);
    }, 600);
  }

  function onKeyDown(e) {
    if (e.code === 'Escape') { stop(); return; }
    // E/Enter у намагниченной карточки — та же модалка, что клик мышью (общий openCard)
    if ((e.code === 'KeyE' || e.code === 'Enter') && magnetId) {
      e.preventDefault();
      window.HeroTiles?.open(magnetId);
      return;
    }
    // Тот же E у намагниченного фрагмента legendary. Проверяется ПОСЛЕ карточки: если совпало и
    // то и другое, приоритет у карточки — она крупнее на экране, к ней и целился игрок.
    if ((e.code === 'KeyE' || e.code === 'Enter') && window.CardFragments?.hasMagnet()) {
      e.preventDefault();
      window.CardFragments.takeMagnet();
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
      keys.add(e.code);
      e.preventDefault();
      if (startHintEl) startHintEl.hidden = true; // "PRESS W TO DRIVE" гаснет с первым газом
      // Радио стартует с первым движением (по запросу) — именно здесь, внутри keydown: это
      // user gesture, autoplay-политика браузера разрешает audio.play() только из него.
      if (!radioKicked) { radioKicked = true; window.LeonidaRadio?.playForDrive?.(); }
    }
  }
  function onKeyUp(e) { keys.delete(e.code); }

  // Счётчик BONUS RP в приборке: заработанное за ЗАЕЗД — эскроу js/respect.js, то есть ровно то,
  // что забирают копы (доля за каждый удар и остаток на аресте, js/police.js). В общий баланс эти
  // очки попадают только через сейф-хаус или выход из режима. Своего учёта тут нет,
  // число читается из police.js; в DOM пишем только на изменение и подсвечиваем направление —
  // за счёт этого каждый удар виден красной вспышкой цифры.
  // Фиксируется он на карте, в сейф-хаусе (updateHouses), а не кнопкой здесь.
  function updateRespectReadout() {
    if (!respectRunEl) return;
    const run = window.Police?.runEarned?.() ?? 0;
    if (run === runShown) return;
    const cls = run < runShown ? 'dsr-down' : 'dsr-up';
    runShown = run;
    respectRunEl.textContent = `+${run}`;
    respectRunEl.classList.remove('dsr-up', 'dsr-down');
    void respectRunEl.offsetWidth;   // рестарт подсветки при начислениях подряд
    respectRunEl.classList.add(cls);
  }

  function frame(ts) {
    if (!active) return;
    if (lastTs == null) lastTs = ts;
    const dt = Math.min((ts - lastTs) / 1000, 0.05); // клэмп против скачка dt при смене вкладки
    lastTs = ts;

    // В самолёте потолок скорости выше — и разгон/трение/тормоз считаются от него же, поэтому
    // «быстрее» получается целиком из одной строки, без второй копии физики. Копы летать не умеют:
    // их потолок берётся из vMaxM() (публичный topSpeed), которого этот множитель не касается.
    const flying = isFlying();
    const vMaxM = topSpeed() * (flying ? planeCfg.speedFactor : 1);
    const accel = vMaxM / cfg.accelTime;
    const friction = vMaxM / cfg.frictionTime;
    const brake = vMaxM / cfg.brakeTime;
    const reverseMaxM = vMaxM * cfg.reverseFactor;

    const throttle = (keys.has('KeyW') || keys.has('ArrowUp')) ? 1
      : (keys.has('KeyS') || keys.has('ArrowDown')) ? -1 : 0;
    const turnInput = (keys.has('KeyD') || keys.has('ArrowRight')) ? 1
      : (keys.has('KeyA') || keys.has('ArrowLeft')) ? -1 : 0;

    // --- продольная физика: разгон/трение/тормоз/реверс ---
    if (throttle > 0) {
      carSpeed = Math.min(carSpeed + accel * dt, vMaxM);
    } else if (throttle < 0) {
      if (carSpeed > 0) carSpeed = Math.max(carSpeed - brake * dt, 0); // тормоз сильнее трения
      else carSpeed = Math.max(carSpeed - accel * dt, -reverseMaxM);   // разгон заднего хода
    } else if (carSpeed > 0) {
      carSpeed = Math.max(carSpeed - friction * dt, 0);
    } else if (carSpeed < 0) {
      carSpeed = Math.min(carSpeed + friction * dt, 0);
    }

    // --- поворот: зависит от скорости (машина, не танк), инверсия на заднем ходу ---
    if (turnInput !== 0) {
      const speedFrac = clamp(Math.abs(carSpeed) / vMaxM, cfg.turnMinFactor, 1);
      const sign = carSpeed < 0 ? -turnInput : turnInput;
      carAngle += sign * cfg.turnRate * speedFrac * dt;
    }

    // --- поверхность под колёсами: дорога быстрая, местность режет потолок скорости, вода —
    // почти непроходима (раунд-15: сильное замедление вместо жёсткого стопа "иначе не выехать") ---
    const surf = sampleSurface(carX, carY);
    // Катер (16-08(12), «проверь корректен ли переход с катера на машину и обратно»): вход в воду
    // мгновенный, выход — только после BOAT_EXIT_SEC подряд на суше. Без задержки любая отмель в
    // пару пикселей маски (~10м, у берегов их полно — замер: заплыв на запад дал три перещёлка за
    // 1.1 секунды) на доли секунды превращала катер в машину и обратно, вместе с потолком скорости.
    // Состояние ОДНО на всех: спрайт, потолок скорости и прожектор фар читают его отсюда.
    if (surf === 'water') boatT = BOAT_EXIT_SEC; else boatT = Math.max(0, boatT - dt);
    boatMode = boatT > 0;
    // В полёте поверхности под собой нет вообще: ни офф-роуд-кап, ни вода не действуют — в этом
    // весь бонус («превращается в самолёт»), залив пролетается насквозь.
    const surfFactor = flying ? 1
      : boatMode ? cfg.waterFactor : surf === 'road' ? 1 : cfg.offRoadFactor;
    // Застрял — через STUCK_WATER_SEC всплывает RESET. Условие «вода» больше не годится само по
    // себе: с режимом катера по воде идут полным ходом, и кнопка всплывала бы посреди нормального
    // заплыва. Считаем только реальное застревание — вода И скорость почти в ноль.
    stuckT = (!flying && surf === 'water' && Math.abs(carSpeed) < vMaxM * 0.05) ? stuckT + dt : 0;
    if (resetBtn) {
      const show = stuckT > STUCK_WATER_SEC;
      if (resetBtn.hidden === show) resetBtn.hidden = !show;
    }
    if (surfFactor < 1) {
      const cap = vMaxM * surfFactor;
      if (carSpeed > cap) carSpeed = Math.max(cap, carSpeed - brake * dt);
      else if (carSpeed < -cap) carSpeed = Math.min(-cap, carSpeed + brake * dt);
    }

    // --- позиция: клэмп по границе полотна с плавным гашением скорости у края (§3 полировки) ---
    const edgeM = cfg.edgeSlowPx * mppx(cfg.zoom);
    const dist = carSpeed * dt;
    let stepX = Math.sin(carAngle) * dist;
    let stepY = Math.cos(carAngle) * dist;
    if (stepX > 0) { const r = carBounds.east - carX; if (r < edgeM) stepX *= clamp(r / edgeM, 0, 1); }
    else if (stepX < 0) { const r = carX - carBounds.west; if (r < edgeM) stepX *= clamp(r / edgeM, 0, 1); }
    if (stepY > 0) { const r = carBounds.north - carY; if (r < edgeM) stepY *= clamp(r / edgeM, 0, 1); }
    else if (stepY < 0) { const r = carY - carBounds.south; if (r < edgeM) stepY *= clamp(r / edgeM, 0, 1); }
    carX = clamp(carX + stepX, carBounds.west, carBounds.east);
    carY = clamp(carY + stepY, carBounds.south, carBounds.north);

    // --- прилипание к дороге: сэмплируем перпендикулярно курсу на ширину пикселя маски; если
    // дорога только с одной стороны — мягко тянем машинку туда (сила растёт со скоростью).
    // Работает и на дороге (центрирует), и рядом с ней (возвращает съехавшего наполовину).
    if (cfg.roadMagnet && !flying && surfData && Math.abs(carSpeed) > 1) {
      const perpX = Math.cos(carAngle), perpY = -Math.sin(carAngle);
      const probe = SURF.size / surfSize; // игровых метров на пиксель маски (~9.8)
      const left = sampleSurface(carX - perpX * probe, carY - perpY * probe) === 'road';
      const right = sampleSurface(carX + perpX * probe, carY + perpY * probe) === 'road';
      if (left !== right) {
        const pull = (right ? 1 : -1) * cfg.roadMagnet * dt * clamp(Math.abs(carSpeed) / vMaxM, 0, 1);
        carX = clamp(carX + perpX * pull, carBounds.west, carBounds.east);
        carY = clamp(carY + perpY * pull, carBounds.south, carBounds.north);
      }
    }
    if (stepX !== 0 || stepY !== 0) revealFog();
    updateCardMagnet(); // ≤ HERO_DOM_CAP видимых плиток, простой перебор — дёшево на кадр
    // Фрагменты legendary (js/card-fragments.js) — свой магнит/наезд по тем же радиусам;
    // видимых точек максимум 24, поэтому просто ещё один перебор рядом, без общей структуры.
    window.CardFragments?.tick(carX, carY);
    updateBonus(dt);   // бонус-самолёт: одна точка на карте, наезд -> полёт (см. выше)
    updateHouses();    // сейф-хаусы: наезд -> фиксация заработанного за заезд
    // Полиция (js/police.js): максимум 3 копа в кадре — та же арифметика, что у машинки, ×3;
    // агро/побег модуль проверяет сам раз в ~300мс. Физику удара применяем здесь: скорость
    // игрока живёт в этом файле, а police.js только сообщает факт столкновения.
    // tick возвращает 'bust' на аресте (набрал hitsToBust ударов за погоню) и true на обычном
    // толчке — арест ставит машину намертво, толчок просто осаживает.
    const bump = window.Police?.tick(carX, carY, dt);
    if (bump) {
      carSpeed *= bump === 'bust' ? 0 : cfg.police.collideSpeedDrop;
      shakeCamera();
      streak = 0; // догнали — серия обнулилась (см. bumpStreak)
    }
    // Пока висит отложенное открытие карточки (160мс, см. pickupCard) — сбор точки не отвлекает
    // попапом/бонусом поверх готовящейся модалки, точка просто останется несобранной до
    // следующего проезда (карточке отдан приоритет).
    if (!pickupPending) collectDots(); // точки волны A: bbox-префильтр, сотни записей — дёшево на кадр

    // --- визуал: лерп угла спрайта + дрифт-наклон на скорости в повороте ---
    spriteAngle += (carAngle - spriteAngle) * cfg.spriteLerp;
    const speedFrac2 = Math.abs(carSpeed) / vMaxM;
    let targetDrift = 0;
    if (turnInput !== 0 && speedFrac2 > cfg.driftSpeedThreshold) {
      const t = clamp((speedFrac2 - cfg.driftSpeedThreshold) / (1 - cfg.driftSpeedThreshold), 0, 1);
      targetDrift = turnInput * cfg.driftMaxDeg * t;
    }
    driftDeg += (targetDrift - driftDeg) * cfg.driftLerp;
    updateCarMarker();

    // --- спидометр: дуга + стрелка по шкале 0..200, лерп с инерцией; на затяжном полном газу
    // стрелка медленно доползает ещё на ~+14 (как настоящая машина после "полки" разгона) ---
    const kmh = Math.abs(carSpeed) * 3.6 * SPEEDO_SCALE;
    const atTop = Math.abs(carSpeed) >= vMaxM * 0.98;
    fullThrottleT = atTop ? fullThrottleT + dt : 0;
    const creep = atTop ? Math.min(14, fullThrottleT * 1.6) : 0;
    const speedoTarget = kmh + creep;
    speedoDisp += (speedoTarget - speedoDisp) * (speedoTarget > speedoDisp ? SPEEDO_LERP_UP : SPEEDO_LERP_DOWN);
    const dispFrac = Math.pow(clamp(speedoDisp / SPEEDO_MAX_KMH, 0, 1), SPEEDO_GAMMA);
    const tremor = Math.sin(ts * 0.028) * SPEEDO_TREMOR_DEG * dispFrac;
    speedoValueEl.textContent = Math.round(speedoDisp);
    updateRespectReadout();
    speedoFillEl.style.strokeDashoffset = (SPEEDO_ARC * (1 - dispFrac)).toFixed(1);
    speedoNeedleEl.setAttribute('transform', `rotate(${(dispFrac * 180 + tremor).toFixed(1)} 50 50)`);

    // --- след: точки на скорости ---
    if (Math.abs(carSpeed) > vMaxM * 0.3) {
      if (ts - lastTrailSpawn > TRAIL_INTERVAL) { spawnTrail(); lastTrailSpawn = ts; }
    }
    updateTrail(ts);

    // --- камера: упреждение по направлению движения, лерп к цели, panBy вместо setView ---
    const lookaheadM = cfg.cameraLookahead * mppx(cfg.zoom);
    const lookaheadDir = carSpeed < 0 ? -1 : 1; // на заднем ходу упреждение позади машинки
    const camTargetX = carX + Math.sin(carAngle) * lookaheadM * lookaheadDir;
    const camTargetY = carY + Math.cos(carAngle) * lookaheadM * lookaheadDir;
    camX += (camTargetX - camX) * cfg.cameraLerp;
    camY += (camTargetY - camY) * cfg.cameraLerp;
    // Отдалился и снова поехал — зум возвращается к боевому. БЕЗ анимации (16-08(10): «если
    // отзумиться, а потом нажать движение, нас возвращает через тёмный экран»): анимированный
    // setZoom на 4 уровня Leaflet играет как масштабирование текущего слоя, тайлов целевого зума
    // в этот момент ещё нет, и полсекунды в кадре темнота. Жёсткий setView на машинку ставит
    // готовый кадр сразу — то же самое делает старт заезда.
    if (!zoomAnimating && throttle !== 0 && map.getZoom() < driveZoom) {
      map.setView(window.LeonidaMap.gameLatLng(camX, camY), driveZoom, { animate: false });
      fogDirty = true;
    }
    // Осмотрелся средней кнопкой — камера отцеплена от машинки, газ её возвращает. Ровно та же
    // логика, что у обзорного зума: обзор живёт, пока стоишь.
    if (throttle !== 0) camDetached = false;
    const panned = (zoomAnimating || camDetached) ? false : panCamera();

    if (stepX !== 0 || stepY !== 0 || panned) { fogDirty = true; scheduleSave(); }
    // Фары следуют за spriteAngle, а не только за позицией: машина может доворачивать на месте
    // (carSpeed=0, но turnMinFactor даёт ненулевой поворот) — без этого конус "залипал бы" на
    // предыдущем угле, пока карта не сдвинется. scheduleSave() тут не нужен — это не туман.
    // --- лампа: гаснет на простое, зажигается с киношным припадком при первом же движении ---
    const nightCfg = window.SITE_CONFIG.NIGHT_MODE || NIGHT_DEFAULTS;
    if (Math.abs(carSpeed) > 0.5 || turnInput !== 0) {
      idleT = 0;
      if (lampOff) { lampOff = false; warmupT = 0; }
    } else {
      idleT += dt;
      if (!lampOff && idleT > (nightCfg.headlightIdleOffSec ?? NIGHT_DEFAULTS.headlightIdleOffSec)) {
        lampOff = true; warmupT = -1; fogDirty = true;
      }
    }
    if (warmupT >= 0) {
      warmupT += dt * 1000;
      if (warmupT > WARMUP_MS) warmupT = -1;
      fogDirty = true; // ступеньки по 70мс — редкий тик FLICKER_MS их бы проглотил
    }

    const headlightsOn = headlightsLit();
    if (headlightsOn !== lastHeadlightOn || (headlightsOn && Math.abs(spriteAngle - lastHeadlightAngle) > HEADLIGHT_ANGLE_EPS)) {
      fogDirty = true;
    }
    // Мерцание должно быть видно и на стоящей машинке, а туман перерисовывается только по
    // движению/повороту. Свой тик на ~12 fps: глазу этого хватает, а полный repaint канваса
    // каждый кадр ради синусоиды — нет.
    if (headlightsOn) {
      const now = performance.now();
      if (now - lastFlickerTs > FLICKER_MS) { lastFlickerTs = now; fogDirty = true; }
    }
    lastHeadlightOn = headlightsOn;
    lastHeadlightAngle = spriteAngle;
    if (fogDirty) paintFog();

    rafId = requestAnimationFrame(frame);
  }

  // ---------- зум-лок: боевой зум driveZoom, вниз — люфт driveZoomOut ("отдалиться, чтобы понять,
  // где находишься"), вверх — люфт driveZoomIn ("приблизиться"); физика вся в игровых метрах, от
  // зума вьюпорта не зависит ----------
  // driveZoomIn не меняет боевой зум: старт, скорости и калибровка конуса фар по-прежнему от
  // cfg.zoom, просто потолок больше не совпадает с ним. Возврат к боевому зуму на газ (см. frame())
  // подтягивает камеру только СНИЗУ — приближение сверху остаётся, пока сам не отъедешь.
  function lockZoom() {
    savedMinZoom = map.getMinZoom();
    savedMaxZoom = map.getMaxZoom();
    map.setMinZoom(driveZoom - (cfg.driveZoomOut || 0));
    map.setMaxZoom(driveZoom + (cfg.driveZoomIn || 0));
  }
  function unlockZoom() {
    map.setMinZoom(savedMinZoom);
    map.setMaxZoom(savedMaxZoom);
  }

  // ---------- публичный API ----------
  function start() {
    if (active || !cfg.enabled) return;
    ensureInit();
    active = true;
    paused = false;
    pauseHolders.clear();   // держатели паузы не переживают вход/выход из режима
    lastTs = null;
    // Продолжаем с того места, где закончили прошлую поездку (spawnPos — из сейва или из stop()).
    // Первый раз (сейва нет) — центр текущего кадра, примагниченный к ближайшей дороге (фидбэк
    // 03-08): где смотришь, там и заводишься, но уже на асфальте и курсом вдоль дороги.
    const c = gameXY(map.getCenter());
    const spawn = spawnPos || snapToRoad(c.x, c.y);
    // Клэмп спавна — починка уже испорченных сейвов: в них лежит точка, куда машинка уехала по
    // старым (пирамидным) границам, и без этого камера так и осталась бы у стены, а машинка
    // за кадром. Одна и та же строка чинит и сейв, и переход из stop().
    carX = clamp(spawn.x, carBounds.west, carBounds.east);
    carY = clamp(spawn.y, carBounds.south, carBounds.north);
    carAngle = spawn.angle;
    carSpeed = 0; driftDeg = 0; spriteAngle = carAngle;
    speedoDisp = 0; fullThrottleT = 0; radioKicked = false; streak = 0;
    // Стартовые значения ставим молча: подсветка должна означать «только что изменилось», а не
    // «заезд начался». Заработок заезда на старте всегда 0 — police.js берёт базу в тот же момент.
    runShown = 0;
    if (respectRunEl) {
      respectRunEl.textContent = '+0';
      respectRunEl.classList.remove('dsr-up', 'dsr-down');
    }
    camX = carX; camY = carY; camDetached = false; midDrag = false;
    // Заводимся с погашенными фарами ("стартуем с выключенными"): первое же движение зажигает их
    // киношным припадком (warmupT), который иначе никто бы не увидел — на старте свет просто был.
    lampOff = true; idleT = 0; warmupT = -1;
    stuckT = 0;
    boatT = 0; boatMode = false;   // заезд начинается на колёсах, даже если прошлый кончился в заливе
    // Бонус — сессионный, как погоня: каждый заезд начинается на колёсах, первая точка ложится
    // через firstMs (сразу на старте её некуда ставить — туман вокруг ещё не разведан).
    planeT = 0; clearBonus(); bonusWaitT = planeCfg?.firstMs ?? 0;
    if (resetBtn) resetBtn.hidden = true;
    carMarker.addTo(map);
    revealFog(); // стартовая точка сразу чуть рассеяна вокруг машинки (фидбэк 03-08)
    lockZoom();
    map.dragging.disable(); // иначе перетаскивание карты соревнуется с камерой каждый кадр
    map.setView(window.LeonidaMap.gameLatLng(carX, carY), driveZoom, { animate: false }); // разовый жёсткий кадр старта
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.AiCompare?.setDriveModeActive(true);
    driveBtn.textContent = 'STOP';
    driveBtn.classList.add('active');
    hudEl.hidden = false;
    if (startHintEl) startHintEl.hidden = false; // мигает, пока не нажат газ (раунд-9)
    fogDirty = true; paintFog();
    // Карточки за туманом прячутся сразу, а открытые в стартовом круге — появляются сразу
    // (hero-tiles слушает без debounce — вход/выход это разовое событие, не поток кадров)
    document.dispatchEvent(new CustomEvent('leonida:drivechange'));
    // Дома — после события: police.js на нём же открывает эскроу заезда, и стартовый бонус ниже
    // обязан лечь ПОСЛЕ этого, иначе он уйдёт прямиком в баланс и фиксировать будет нечего.
    housesArmed = false;
    for (const h of houses) h.seen = undefined;   // новый заезд — заново по текущему туману
    houseGroup.addTo(map);
    Promise.resolve(loadHouses()).then(() => { if (active) updateHouses(); });
    // Стартовый бонус — обучение механике: без него счётчик BONUS RP пуст, и до первой карточки
    // объяснять фиксацию нечем. Кап дневной ('daily', CORE_SPEC: повторяемое — только с капом),
    // поэтому второй заезд за день его уже не даёт.
    if (houseCfg?.enabled && houseCfg.startRespect > 0) {
      window.Respect?.award?.('drive-start-bonus', houseCfg.startRespect, 'daily');
    }
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (!active) return;
    active = false;
    paused = false;
    pauseHolders.clear();
    spawnPos = { x: carX, y: carY, angle: carAngle }; // следующий DRIVE заведётся здесь же
    planeT = 0; clearBonus();
    map.removeLayer(houseGroup);   // дома живут только в заезде: вне его фиксировать нечего
    clearCardMagnet();
    keys.clear();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    trailDots.forEach((d) => d.el.remove());
    trailDots = [];
    camDetached = false; midDrag = false;
    map.getContainer().classList.remove('drive-look');
    unlockZoom();
    map.dragging.enable();
    window.AiCompare?.setDriveModeActive(false);
    driveBtn.textContent = 'DRIVE'; // было START ENGINE — короче и без дубля смысла (раунд-8)
    driveBtn.classList.remove('active');
    hudEl.hidden = true;
    if (startHintEl) startHintEl.hidden = true;
    flushSave();
    fogDirty = true; paintFog();
    document.dispatchEvent(new CustomEvent('leonida:drivechange')); // вернуть все карточки
  }

  function isActive() { return active; }

  // getFogState/setFogState жили здесь «точкой расширения под Supabase-синхронизацию» и за все
  // раунды их не позвал никто. Формат сейва тумана всё равно задаёт saveFog/primeFog — когда
  // синхронизация дойдёт до дела, писать её надо будет от них, а не от заготовки, угаданной заранее.

  function init(mapInstance) {
    map = mapInstance || map;
    driveBtn = document.getElementById('driveModeBtn');
    startHintEl = document.getElementById('driveStartHint');
    hudEl = document.getElementById('driveHud');
    speedoValueEl = document.getElementById('driveSpeedoValue');
    speedoFillEl = document.getElementById('driveSpeedoFill');
    speedoNeedleEl = document.getElementById('driveSpeedoNeedle');
    respectRunEl = document.getElementById('driveRespectRun');
    if (!driveBtn || !hudEl) return;

    driveBtn.addEventListener('click', () => { active ? stop() : start(); });
    resetBtn = document.getElementById('driveResetBtn');
    resetBtn?.addEventListener('click', resetToRoad);
    // Подсказку про радар показываем только если он реально включён — иначе она обещала бы прибор,
    // которого в кадре нет.
    const radarHintEl = document.getElementById('driveRadarHint');
    if (radarHintEl) radarHintEl.hidden = !cfg.radar?.enabled;

    map.on('baselayerchange', updateDriveEligibility);
    updateDriveEligibility();
    // Процент рассеянного тумана доступен окну COLLECTION с загрузки, а не только в езде — читаем
    // сейв сразу. Паны/канвас по-прежнему ленивые (ensureInit), туман на карте до первого DRIVE
    // не рисуется.
    try { primeFog(); } catch (e) { log('прогресс тумана недоступен:', e.message); }
    // Маска — с загрузки страницы, не лениво в ensureInit: snapToRoad() нужен уже ПЕРВОМУ
    // START ENGINE, а маска грузится асинхронно (74 КБ — дёшево).
    loadSurfaceMask();
  }

  init(map); // самозапуск при загрузке скрипта — та же схема, что ai-compare.js/hero-tiles.js.
             // Наружу init/start не отдаются: снаружи их не звал никто, а старт двигателя идёт
             // через свою кнопку внутри модуля.
  // isRevealedAt — для hero-tiles (карточки под закрытым туманом скрыты, только в езде)
  // getCarPos — для радара (js/radar.js): дистанции до целей. Только чтение позиции, всё
  // остальное радар считает сам; центр карты для этого не годится (камера идёт с упреждением).
  // vMaxM/surfaceAt — для police.js: копы обязаны считаться по ТОЙ ЖЕ физике, что игрок
  // (offRoad-кап действует на обоих, вода не пускает никого), поэтому потолок скорости и класс
  // поверхности отдаются наружу, а не пересчитываются там своей копией констант.
  // pause/resume — та же пауза, что у модалки карточки, но для тех, кто закрывает кадр своим
  // экраном без события 'leonida:herocard' (card-fragments.js: экран набора). Наружу отдаётся
  // ОТДЕЛЬНЫМ владельцем 'ext' — с общим ключом чужой resume снимал бы паузу модалки (см. выше).
  // isFlying — для police.js: пока идёт бонус-полёт, копы не могут ни толкнуть, ни арестовать.
  // safehouses — для радара (js/radar.js): пеленг на ближайший дом, когда есть что фиксировать.
  // Голые координаты, как outposts() у police.js: радару незачем знать про маркеры и туман.
  return { stop, isActive, isRevealedAt, fogPct,
    safehouses: () => houses.map((h) => ({ x: h.x, y: h.y })),
    pause: () => pausePhysics('ext'), resume: () => resumePhysics('ext'),
    getCarPos: () => (active ? { x: carX, y: carY } : null),
    vMaxM: topSpeed,
    isFlying,
    surfaceAt: sampleSurface };
})();
