// ===== ФРАГМЕНТЫ LEGENDARY-КАРТОЧЕК (сборные карточки в режиме езды) =====
// legendary в езде не открывается наездом: вместо её плитки на карте лежат 4 фрагмент-маркера
// (координаты — assets/map-tiles/card-fragments.json, детерминированно посчитаны оффлайн
// scripts/build-card-fragments.js). Собрал все 4 — куски слетаются в целую карточку и
// открывается ТА ЖЕ модалка, что по клику (window.HeroTiles.open) — свой анлок/счётчик здесь не
// заводится. Вне езды legendary ведёт себя как раньше: обычная плитка, клик открывает.
// Радар-сонар (js/radar.js) берёт цели отсюда — targets() в конце файла.
window.CardFragments = (function () {
  const NOOP = { tick() {}, hasMagnet: () => false, takeMagnet() {} };
  if (!window.LeonidaMap || typeof L === 'undefined') return NOOP; // MAP_ENABLED:false / нет CDN

  const map = window.LeonidaMap.map;
  const gameLatLng = window.LeonidaMap.gameLatLng;
  const cfg = window.SITE_CONFIG;
  const PARTS = 4;
  // Экранный размер иконки-пазла (см. .frag-marker в style.css). 30 -> 90 ("сделай в 3 раза
  // крупнее") -> 72 ("сделай меньше на 20%"). Радиус наезда считается отсюда же, так что размер
  // маркера и то, с какого расстояния он берётся, — одно число, а не два разъезжающихся.
  const FRAG_SIZE_PX = 72;
  const CAR_HALF_PX = cfg.DRIVE_MODE.carHalfPx;  // полспрайта машинки, общее число с drive-mode.js
  const STORE_KEY = 'leonida.map.fragments.v1';

  // Формула метр/px — единственная копия у map.js, рядом с CRS-калибровкой (рефактор 08-09)
  const mppx = window.LeonidaMap.mppx;

  // ---------- персист: {cardId: [индексы собранных кусков]} ----------
  // Формат версионирован именем ключа, как туман (leonida_fog_v1). Любая порча — чистый сброс
  // без исключений в консоль: прогресс сета не то, ради чего стоит ронять карту.
  function readStore() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw 0;
      const out = {};
      for (const [k, v] of Object.entries(raw)) {
        if (!Array.isArray(v)) throw 0;
        out[k] = new Set(v.filter((n) => Number.isInteger(n) && n >= 0 && n < PARTS));
      }
      return out;
    } catch {
      try { localStorage.removeItem(STORE_KEY); } catch {}
      return {};
    }
  }
  function writeStore() {
    const plain = {};
    // Пустые сеты не пишем: got() заводит Set лениво при каждом обходе, и без этого фильтра в
    // сторадж уезжали бы шесть пустых массивов ещё до первого подобранного куска.
    for (const [k, v] of Object.entries(collected)) if (v.size) plain[k] = [...v];
    try { localStorage.setItem(STORE_KEY, JSON.stringify(plain)); } catch {}
    document.dispatchEvent(new CustomEvent('leonida:state-changed', { detail: { key: STORE_KEY } })); // store.js: в аккаунт
  }
  // store.js при входе объединил фрагменты с серверной копией (union по карточке) и перезаписал
  // localStorage — перечитать в память и убрать с карты куски, собранные на другом устройстве.
  document.addEventListener('leonida:state-merged', () => {
    const fresh = readStore();
    for (const k of Object.keys(collected)) delete collected[k];
    Object.assign(collected, fresh);
    refresh();
  });

  let sets = [];                     // из card-fragments.json
  const collected = readStore();     // cardId -> Set(индексы)
  const markers = new Map();         // "cardId:i" -> L.marker
  const shownKeys = new Set();
  const revealAnimated = new Set();  // ключи, уже сыгравшие вспышку появления (один раз на кусок)
  const group = L.layerGroup();
  let magnetKey = null;

  const got = (cardId) => collected[cardId] || (collected[cardId] = new Set());
  // Сет "инертен", когда карточка уже открыта: кликом в обычном режиме (решение владельца —
  // клик всегда побеждает и деспавнит фрагменты) либо самой сборкой. Запись прогресса при этом
  // не стирается, просто перестаёт учитываться.
  const isInert = (cardId) => !!window.HeroTiles?.isCardRevealed?.(cardId);

  // ---------- маркеры ----------
  function key(cardId, i) { return `${cardId}:${i}`; }
  // Пазл-иконка своим SVG, а не эмодзи 🧩: эмодзи рисует шрифт системы, он зелёно-жёлтый и
  // перекрасить его нельзя ("значок пазла сделай оранжевым, а не зелёным"). Путь — обычная
  // деталь пазла, заливка currentColor, цвет ставит CSS.
  const PUZZLE_SVG = '<svg class="frag-ico" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="currentColor" d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4' +
    'c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5' +
    'c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>';
  function iconHtml(set) {
    // Кусок изображения на маркере НЕ показываем (решение владельца — спойлер): общая иконка-пазл,
    // оранжевое кольцо, счётчик N/4; название сета — подпись, видимая только при намагничивании.
    return `<div class="frag-marker">${PUZZLE_SVG}
      <div class="frag-count">${got(set.cardId).size}/${PARTS}</div>
      <div class="frag-label">${set.title}</div>
    </div>`;
  }
  function buildMarker(set, part) {
    const icon = L.divIcon({ className: '', html: iconHtml(set), iconSize: [FRAG_SIZE_PX, FRAG_SIZE_PX] });
    // Ниже фото-плиток (500), выше подписей районов; машинка езды по-прежнему сверху (10000).
    return L.marker(gameLatLng(part.x, part.y), { icon, zIndexOffset: 400, interactive: false });
  }
  function markerEl(k) { return markers.get(k)?.getElement()?.querySelector('.frag-marker') || null; }

  // Счётчик и подсветка живут в DOM иконки, а removeLayer/addTo пересоздаёт её из ИСХОДНОГО html
  // (та же грабля, что у плиток в hero-tiles.js) — синхронизируем при каждом показе и после
  // каждого подбора, иначе вернувшийся в кадр маркер показывал бы старое N/4.
  function syncEl(cardId, i) {
    const k = key(cardId, i);
    const el = markerEl(k);
    if (!el) return;
    el.querySelector('.frag-count').textContent = `${got(cardId).size}/${PARTS}`;
    el.classList.toggle('frag-magnet', k === magnetKey);
  }
  // Счётчик на ОСТАВШИХСЯ маркерах сета — растёт при подборе любого куска (§2 ТЗ).
  function refreshCounters(cardId) {
    const set = sets.find((s) => s.cardId === cardId);
    if (set) for (const p of set.parts) syncEl(cardId, p.i);
  }

  // Фрагменты живут ТОЛЬКО в езде и только под открытым туманом — тот же принцип, что у плиток
  // (js/hero-tiles.js applyHeroLOD): туман открывает факт существования точки.
  // Тумблер "Show cards" прячет фото-слой целиком — фрагменты обязаны уходить вместе с ним, иначе
  // выключенные карточки оставляют на карте свои же куски. Читаем сам чекбокс, а не состояние
  // hero-tiles: два обработчика на одном элементе иначе зависели бы от порядка регистрации.
  const showCards = document.getElementById('showCardsToggle');
  const cardsShown = () => showCards?.checked !== false;

  function refresh() {
    const drive = window.DriveMode;
    const active = !!drive?.isActive?.() && cardsShown();
    const bounds = map.getBounds();
    const want = new Set();
    if (active) {
      for (const set of sets) {
        if (isInert(set.cardId)) continue;
        for (const p of set.parts) {
          if (got(set.cardId).has(p.i)) continue;
          const ll = gameLatLng(p.x, p.y);
          if (!bounds.contains(ll)) continue;
          if (drive.isRevealedAt && !drive.isRevealedAt(p.x, p.y)) continue;
          want.add(key(set.cardId, p.i));
        }
      }
    }
    for (const k of [...shownKeys]) {
      if (!want.has(k)) { group.removeLayer(markers.get(k)); shownKeys.delete(k); }
    }
    for (const k of want) {
      if (shownKeys.has(k)) continue;
      markers.get(k).addTo(group);
      shownKeys.add(k);
      const [cardId, i] = k.split(':');
      syncEl(cardId, Number(i));
      // Вспышка появления — один раз на кусок: LOD-churn (уехал из вьюпорта и вернулся) её не
      // переигрывает, как и у плиток (revealAnimated в hero-tiles.js).
      if (!revealAnimated.has(k)) {
        revealAnimated.add(k);
        const el = markerEl(k);
        if (el) {
          el.classList.add('frag-reveal');
          el.addEventListener('animationend', () => el.classList.remove('frag-reveal'), { once: true });
        }
      }
    }
  }

  // ---------- подбор ----------
  // Магнит + E, как у карточек; наездом тоже берётся (карточки берутся, фрагмент не должен вести
  // себя иначе). Радиусы — от ТЕКУЩЕГО зума: экранная геометрия и метры в одном масштабе.
  // Защиты от повторного подбора тут не нужно, в отличие от карточек: карточка после открытия
  // остаётся на карте (её приходится помнить, пока не отъедешь), а фрагмент из shownKeys уходит
  // в тот же миг — второй раз цикл его просто не видит.
  function tick(carX, carY) {
    if (!shownKeys.size) { setMagnet(null); return; }
    const magnetR = cfg.DRIVE_MODE.cardMagnetPx * mppx(map.getZoom());
    // Радиус наезда — от БОЕВОГО зума, а не от текущего (тот же баг, что у карточек, 15-08):
    // отдалившись на driveZoomOut, игрок стоя собирал бы куски в радиусе полутора километров.
    const pickupR = (FRAG_SIZE_PX / 2 + CAR_HALF_PX) * mppx(cfg.DRIVE_MODE.zoom);
    let best = null, bestD = Infinity, pick = null, pickD = Infinity;
    for (const k of shownKeys) {
      const ll = markers.get(k).getLatLng();
      const d = Math.hypot(ll.lng - carX, ll.lat - carY);
      if (d < magnetR && d < bestD) { bestD = d; best = k; }
      if (d < pickupR && d < pickD) { pickD = d; pick = k; }
    }
    setMagnet(best);
    if (pick) take(pick);
  }
  function setMagnet(k) {
    if (k === magnetKey) return;
    markerEl(magnetKey)?.classList.remove('frag-magnet');
    magnetKey = k;
    markerEl(magnetKey)?.classList.add('frag-magnet');
  }
  function hasMagnet() { return !!magnetKey; }
  function takeMagnet() { if (magnetKey) take(magnetKey); }

  function take(k) {
    const [cardId, iStr] = k.split(':');
    const i = Number(iStr);
    const set = sets.find((s) => s.cardId === cardId);
    // Единственная защита от двойного зачёта: наезд и E могут прийти в один кадр на один и тот же
    // кусок. Дальше кусок уходит из shownKeys, и цикл tick() его больше не видит.
    if (!set || got(cardId).has(i)) return;
    got(cardId).add(i);
    writeStore();
    const n = got(cardId).size;
    // Respect за отдельный кусок («за фрагмент тоже начисляем респект», 16-08(8) — отменяет
    // прежнее «за куски не платим»). Кап — 'once' на id куска. Тихо: награду показывает экран
    // набора, который через мгновение закроет кадр целиком, а угловой тост под ним всё равно не
    // виден (см. blocked() в respect.js).
    const paid = window.Respect?.award?.(`card_frag_${cardId}_${i}`, cfg.CARD_FRAGMENT_RESPECT_AMOUNT, 'once', true);
    // Тоста «FRAGMENT n/4 — <название>» тут больше нет (16-08(11) «уведомление 1/4 Beach пропадает
    // слишком быстро»). Причина была не в длительности: тост показывался ДО экрана набора, экран
    // тут же накрывал кадр целиком, и свои 3 секунды плашка жила под ним. А текст на экране тот
    // же самый — название сета и n/4. Одно событие, одно уведомление; держится оно теперь дольше
    // (hold в showPickup).
    if (magnetKey === k) setMagnet(null);
    group.removeLayer(markers.get(k));
    shownKeys.delete(k);
    refreshCounters(cardId);
    n === PARTS ? playAssembly(set, paid) : showPickup(set, i, paid);
  }

  // ---------- экран набора ----------
  // ОДИН экран на оба события сета: подобрал кусок и собрал все четыре. Раньше это были две разные
  // штуки — маленькая плашка сбоку на подборе и полноэкранная сборка на финале, — из-за чего подбор
  // куска не читался как событие («вообще не ощущается»). Теперь разница только в анимации кусков
  // (слетаются или просто стоят) и в том, что происходит после закрытия.
  //
  // Плашка подбора жила по 'animationend' — и это была причина «появляется на секунду и пропадает»:
  // animationend ВСПЛЫВАЕТ, и первым до контейнера долетал он от вложенной вспышки только что
  // подобранного куска (fragPieceIn, .6с). Плашка снималась на 0.6с вместо своих 4.5с, и сколько бы
  // ни правили длительности, ничего не менялось. Время жизни экрана теперь задаёт ровно один таймер
  // в js, анимации на него не влияют вообще.
  //
  // Порядок кусков f0..f3 — row-major (0 верх-лево, 3 низ-право), тот же, что в нарезке.
  // Физику езды на время экрана снимаем: он закрывает кадр целиком, ехать вслепую под ним нечестно.
  // Салют — только на сборке сета («когда собираем всю легендарку, можно какой-то типо салют»):
  // три залпа искр поверх собранной карточки. Первый — в такт вспышке .frag-screen-grid (2.5с,
  // момент, когда последний кусок встал на место), дальше через полсекунды. Позиции залпов и углы
  // искр считаются здесь, разлёт и оседание — CSS (см. .frag-fw в style.css).
  // 16-08(14) «салютов при легендарке можно чуть больше»: было три залпа по 14 искр, стало пять по
  // 18. Последний уходит на 4.5с + 1.5с анимации — экран держится 12с (playAssembly), запас есть.
  const FW_BURSTS = [{ x: 24, y: 30, t: 2.5 }, { x: 76, y: 26, t: 3 }, { x: 50, y: 64, t: 3.5 },
    { x: 14, y: 62, t: 4 }, { x: 86, y: 56, t: 4.5 }];
  const FW_SPARKS = 18;
  function fireworksHtml() {
    const bursts = FW_BURSTS.map((b) => {
      // Углы ровным веером, длина разлёта гуляет по трём значениям — иначе искры встают идеальным
      // кольцом и читаются как шестерёнка, а не как салют.
      const sparks = Array.from({ length: FW_SPARKS }, (_, i) =>
        `<b style="--a:${Math.round(i * 360 / FW_SPARKS)}deg;--d:${70 + (i % 3) * 24}px"></b>`).join('');
      return `<i style="left:${b.x}%;top:${b.y}%;--t:${b.t}s">${sparks}</i>`;
    }).join('');
    return `<div class="frag-fw" aria-hidden="true">${bursts}</div>`;
  }

  let screen = null;                                        // {el, finish} — экран всегда один
  function fragScreen(set, { fly = false, picked = -1, paid = 0, hold, after } = {}) {
    screen?.finish();                                       // новый экран вытесняет предыдущий
    const el = document.createElement('div');
    el.className = `frag-screen${fly ? ' frag-screen-fly' : ''}`;
    const pieces = Array.from({ length: PARTS }, (_, j) => {
      // Стартовое смещение куска — наружу от своего угла: верх-лево улетает влево-вверх и т.д.
      const dx = (j % 2 ? 1 : -1) * 60, dy = (j < 2 ? -1 : 1) * 60;
      const cls = (got(set.cardId).has(j) ? ' got' : '') + (j === picked ? ' now' : '');
      return `<img class="frag-sp${cls}" style="--dx:${dx}vw;--dy:${dy}vh;--rot:${dx > 0 ? 25 : -25}deg;animation-delay:${j * 0.22}s"
        src="${cfg.HERO_IMG_BASE}/fragments/${set.image}-f${j}.webp" alt="">`;
    }).join('');
    // Полоса прогресса под счётчиком — тот же .tier-bar-track, что в модалке карточки и в панели
    // Map Info («можно тоже добавить слайдер прогресса»): цифра говорит сколько, полоса — насколько
    // близко. Цвет берём из CARD_TIERS, чтобы оранжевый легендарки не завёл себе третью копию.
    const tier = cfg.CARD_TIERS?.legendary?.color || '#ff9e4f';
    const pct = got(set.cardId).size / PARTS * 100;
    el.innerHTML = `<div class="frag-screen-grid">${pieces}</div>
      <div class="frag-screen-info">
        <b>${set.title}</b>
        <span>COLLECTED ${got(set.cardId).size}/${PARTS}${paid ? ` · +${paid} RP` : ''}</span>
        <span class="tier-bar-track frag-screen-bar" style="--tier:${tier}"><i style="width:${pct}%"></i></span>
      </div>${fly ? fireworksHtml() : ''}`;
    // .map-frame — тот же контейнер, что у dot-respect-pop: поверх Leaflet-пан, внутри виджета
    window.LeonidaMap.frame.appendChild(el);
    window.DriveMode?.pause?.();

    const finish = () => {
      if (screen?.el !== el) return;
      screen = null;
      clearTimeout(timer);
      el.remove();
      window.DriveMode?.resume?.();
      // Экран закрыт — можно показать тост, который его пережидал (см. blocked() в respect.js):
      // за фрагментами тосты копятся именно тут.
      window.Respect?.flush?.();
      after?.();
    };
    el.addEventListener('click', finish);                   // скип
    const timer = setTimeout(finish, hold);
    screen = { el, finish };
  }

  // Подобрали кусок: целая карточка, собранные четверти в цвете, недостающие серые и притушенные
  // ("лучше показывать всю картинку полностью, а неоткрытые части закрашены серым") — картинка сама
  // и есть индикатор прогресса, а вдобавок видно, что именно собираешь.
  // hold 4000 -> 6000 (16-08(11) «держи секунд 3-5 хотя б»): 4 секунды съедала анимация вылета
  // кусков, на чтение «COLLECTED 1/4 · +2 RP» оставалось меньше двух. Экран снимается кликом,
  // так что лишние две секунды никого не держат.
  function showPickup(set, i, paid) { fragScreen(set, { picked: i, paid, hold: 6000 }); }

  // Собрали сет: 4 куска слетаются в целую карточку. 1500 -> 2200 -> 4000 -> 12000мс («опять
  // пропадает за секунду, надо дольше в 3 раза»): полёт занимает ~2.5с (fragFly 1.8с + разбег
  // последнего куска .66с), значит собранная карточка висит ~9.5с. Держать дольше не страшно —
  // экран снимается кликом. Дальше — стандартная модалка карточки: анлок/Respect за плитку/счётчик
  // CARDS считает она.
  function playAssembly(set, paid) {
    fragScreen(set, {
      fly: true,
      paid,
      hold: 12000,
      after() {
        refresh();
        window.HeroTiles?.open?.(set.cardId);
        // Награда за сет — ПОСЛЕ той, что даёт сама карточка (+HERO_RESPECT_AMOUNT приходит из
        // openCard через 250мс). Тост в проекте один на всех: начисли сет первым — его тут же
        // затрёт базовый попап за плитку, и главная награда пролетит мимо глаз.
        setTimeout(() => window.Respect?.award?.(`card_set_${set.cardId}`, cfg.CARD_SET_RESPECT_AMOUNT, 'once'), 500);
      }
    });
  }

  // ---------- загрузка + триггеры пересчёта ----------
  // Те же поводы, что у плиток (hero-tiles.js): открытие тумана, вход/выход из режима, движение
  // камеры в езде. Точек максимум 24 — throttle чисто чтобы не дёргать DOM каждый кадр panBy.
  fetch(`${cfg.MAP_DATA_BASE}/${cfg.CARD_FRAGMENTS_FILE}`)
    .then((r) => r.json())
    .then((data) => {
      sets = data;
      for (const set of sets) for (const p of set.parts) markers.set(key(set.cardId, p.i), buildMarker(set, p));
      group.addTo(map);
      refresh();
    })
    .catch(() => {}); // офлайн/нет файла — карта и езда работают, фрагментов просто нет

  let throttle = null;
  function refreshThrottled() {
    if (throttle) return;
    refresh();
    throttle = setTimeout(() => { throttle = null; }, 250);
  }
  showCards?.addEventListener('change', () => { setMagnet(null); refresh(); });
  document.addEventListener('leonida:fogchange', refreshThrottled);
  document.addEventListener('leonida:drivechange', () => { clearTimeout(throttle); throttle = null; setMagnet(null); refresh(); });
  // Карточку могли открыть кликом прямо посреди набранного сета — фрагменты обязаны исчезнуть.
  document.addEventListener('leonida:herocard', (e) => { if (!e.detail?.open) refresh(); });
  map.on('zoomend moveend', refreshThrottled);
  map.on('move', () => { if (window.DriveMode?.isActive?.()) refreshThrottled(); });

  // targets — цели радара (js/radar.js): все неподобранные куски живых сетов, без оглядки на
  // туман, вьюпорт и тумблер "Show cards". Радар слышит сквозь туман — это его смысл, а прятать
  // цели за выключенным слоем карточек значило бы молча его глушить.
  // last: это ПОСЛЕДНИЙ недостающий кусок своего сета (3 из 4 уже собраны) — единственный случай,
  // когда радар выдаёт направление, а не только «горячо/холодно» (см. radar.js setBearing).
  return {
    tick, hasMagnet, takeMagnet,
    targets() {
      const out = [];
      for (const set of sets) {
        if (isInert(set.cardId)) continue;
        const last = got(set.cardId).size === PARTS - 1;
        for (const p of set.parts) {
          if (!got(set.cardId).has(p.i)) out.push({ x: p.x, y: p.y, tier: 'legendary', last });
        }
      }
      return out;
    }
  };
})();
