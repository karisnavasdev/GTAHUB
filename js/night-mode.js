// ===== ВРЕМЯ СУТОК (тумблер День/Ночь в панели Map Info -> Map layer) =====
// Затемнение + emissive-свечение городов поверх базовых тайлов/AI-слоя (mix-blend-mode).
// Слой 1 (инструмент карты, CORE_SPEC): своя пана nightPane, не трогает fog/AI/маркеры/машинку.
// Два состояния, без промежуточных. Сначала была плавная шкала («выглядит как просто странное
// затемнение» — при линейной доле свет городов гас так же, как и небо, ничего не «включалось»),
// потом три ступени с отдельным видом у сумерек — промежуточное положение владельцу тоже не
// понадобилось. Осталось ровно день/ночь.
(function () {
  const cfg = window.SITE_CONFIG.NIGHT_MODE;
  let on = false;

  // Контракт для js/drive-mode.js (фары): isOn() обязан работать и до/без инициализации модуля
  // ниже (MAP_ENABLED:false, kill switch, CDN недоступен) — тогда просто false.
  window.LeonidaNight = { isOn: () => on };

  if (!cfg?.enabled) return; // kill switch — тумблер не показываем, паны не создаём вообще
  if (!window.LeonidaMap || typeof L === 'undefined') return; // MAP_ENABLED:false или CDN недоступен

  const row = document.getElementById('nightRow');
  const toggle = document.getElementById('nightToggle');
  if (!row || !toggle) return;

  const map = window.LeonidaMap.map;
  const { masterLayerRect, rectPolygon } = window.LeonidaMap;

  // Пана 300: выше базовых тайлов (200) и AI-паны (250), ниже тумана (350) и маркеров (600).
  const nightPane = map.createPane('nightPane');
  nightPane.style.zIndex = 300;
  nightPane.style.pointerEvents = 'none';
  nightPane.style.display = 'none';

  const darkEl = document.createElement('div');
  darkEl.className = 'night-dark';
  nightPane.appendChild(darkEl); // непрозрачность ставит apply() — cfg.darkness * level

  // Emissive-свечение — <img>, src ставим лениво (только при первом включении ночи, см. apply).
  // onerror: маску мог ещё не сгенерить параллельный агент — затемнение работает и без неё.
  const glowImg = document.createElement('img');
  glowImg.className = 'night-glow';
  glowImg.alt = '';
  glowImg.style.opacity = cfg.emissiveOpacity;
  glowImg.onerror = () => { glowImg.style.display = 'none'; };
  nightPane.appendChild(glowImg);

  // Клип по прямоугольнику мастера — общий хелпер из map.js (за мастером ночи нет, как и тайлов).
  // nw/se заодно даёт точную позицию/размер emissive-картинки (выровнена 1:1 на мастер).
  function recompute() {
    const { nw, se } = masterLayerRect();
    nightPane.style.clipPath = rectPolygon(nw, se);

    // Затемнение — в прямоугольник мастера, как и свечение. Раньше оно строилось от вьюпорта
    // (containerPointToLayerPoint + map.getSize()): такой бокс живёт в экранных размерах, а пана
    // — ребёнок mapPane, который Leaflet во время анимации зума масштабирует transform'ом. На
    // отдалении бокс съезжал вместе с масштабом и переставал накрывать экран — часть карты
    // оставалась незатемнённой («как будто ночь включена на половине карты»). Прямоугольник
    // мастера задан в layer-координатах и масштабируется вместе с картой, поэтому не отстаёт.
    // Выпускаем на пиксель за кромку мастера с каждой стороны. Ровно по кромке оставалась светлая
    // линия в 1px сверху и справа («как будто проступает дневной режим», замер 24-08: #2C67A3 —
    // незатемнённая дневная вода): край самого div'а и clipPath паны попадают на одну и ту же
    // дробную координату, их сглаживания перемножаются, и тёмного в этом пикселе остаётся меньше,
    // чем тайла под ним. С запасом сглаживание остаётся одно — у клипа; лишнее он же и срежет.
    L.DomUtil.setPosition(darkEl, nw.subtract(L.point(1, 1)));
    darkEl.style.width = (se.x - nw.x + 2) + 'px';
    darkEl.style.height = (se.y - nw.y + 2) + 'px';

    // Свечение — ровно в тот же прямоугольник мастера.
    L.DomUtil.setPosition(glowImg, nw);
    glowImg.style.width = (se.x - nw.x) + 'px';
    glowImg.style.height = (se.y - nw.y) + 'px';

    // Затухание свечения по зуму. Маска 2048px растянута на мастер 20000 игровых метров: на z5
    // один её пиксель занимает ~10 экранных, деталей там физически нет — вблизи это не «огни
    // города», а розовая пелена поверх карты (проверено в браузере: в режиме езды заливало весь
    // экран). Пятна читаются на общем плане, поэтому полная сила до emissiveFullZoom и линейно
    // в ноль к emissiveFadeZoom; в езде (z5) остаётся только затемнение и фары.
    const z = map.getZoom();
    const k = z <= cfg.emissiveFullZoom ? 1
      : z >= cfg.emissiveFadeZoom ? 0
      : 1 - (z - cfg.emissiveFullZoom) / (cfg.emissiveFadeZoom - cfg.emissiveFullZoom);
    glowImg.style.opacity = cfg.emissiveOpacity * k;
  }
  map.on('move zoom viewreset resize', recompute);

  // Персист остался тем же ключом на всех переделках: булево true (первый тумблер) и любое число
  // от шкалы читаются одинаково — «не ноль значит ночь». Тот, кто ушёл с включённой ночью или с
  // ползунком в сумерках, вернётся в ночь, а не в сброшенный день.
  const load = () => {
    try { return !!Number(JSON.parse(localStorage.getItem(cfg.storageKey))); } catch { return false; }
  };

  const frame = window.LeonidaMap.frame;

  // Подпись DAY/NIGHT у кнопки ⛶ (24-08): ночь персистится, и возврат на карту молча начинался
  // ночью — «открылся сразу с ночным режимом, хотя я во вкладке explore». Две подписи в разметке,
  // показываем одну: рантайм-словаря на пульте нет, обе переводит билд по data-i18n.
  const tagDay = document.getElementById('dnTagDay');
  const tagNight = document.getElementById('dnTagNight');

  function apply(v, persist) {
    on = v;
    nightPane.style.display = v ? '' : 'none';
    darkEl.style.opacity = v ? cfg.darkness : 0;
    tagDay?.toggleAttribute('hidden', v);
    tagNight?.toggleAttribute('hidden', !v);
    // Фиолетовая тема кадра — вместе с фарами и затемнением. Раньше висела на Realistic-слое,
    // отсюда и был «рассинхрон по цветам».
    frame?.classList.toggle('night-ui', v);
    if (persist) { try { localStorage.setItem(cfg.storageKey, JSON.stringify(v)); } catch {} }
    if (v) {
      if (!glowImg.src) glowImg.src = `${window.SITE_CONFIG.MAP_DATA_BASE}/emissive-mask.png`;
      recompute();
    }
  }

  // ---------- табличка «что меняется ночью» (16-08(4)) ----------
  // Ночь выглядела чисто косметическим тумблером, хотя меняет и правила (радиус агро копов ×0.6,
  // js/police.js). Показываем список ровно тогда, когда игрок сам щёлкнул тумблер — не при
  // загрузке с персистнутой ночью: там это была бы табличка «здравствуйте» на каждом заходе.
  // Автоскрытия по таймеру нет («можно рисовать наверху и не убирать»): висит, пока идёт ночь,
  // уходит по клику или вместе с выключением ночи. Ушедшую вручную второй раз не показываем до
  // следующего включения — тумблер и есть её выключатель.
  // Текст живёт в разметке под data-i18n (билд-скрипт переводит его вместе со всей главной),
  // отсюда только показ/скрытие — рантайм-словаря на пульте нет.
  const brief = document.getElementById('nightBrief');
  let briefT = 0;
  function hideBrief() {
    if (!brief) return;
    clearTimeout(briefT);
    brief.classList.remove('show');
    briefT = setTimeout(() => { brief.hidden = true; }, 250); // дать доиграть fade-out
  }
  function showBrief() {
    if (!brief) return;
    clearTimeout(briefT);
    brief.hidden = false;
    void brief.offsetWidth;   // рефлоу: без него transition от display:none не стартует. Не rAF —
    brief.classList.add('show'); // тот не срабатывает в фоновой вкладке, и табличка зависла бы на opacity:0
  }
  brief?.addEventListener('click', hideBrief);

  row.hidden = false;
  toggle.addEventListener('change', () => {
    apply(toggle.checked, true);
    toggle.checked ? showBrief() : hideBrief();
  });
  toggle.checked = load();
  apply(toggle.checked, false); // применяем персистнутое состояние без лишней записи в localStorage
})();
