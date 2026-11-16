// ===== T1 — PHOTO-TILE СЛОЙ КАРТЫ (docs/PROMPT_map_hero_tiles.md) =====
// Крупные превью официальных скриншотов Rockstar прямо на карте, с квотами по зумам,
// прогрессом исследования (js/progress.js) и переходом в статьи вики. Отдельная DOM-группа,
// не участвует в canvas-слое T2/T3 (js/map.js) и не трогает markers.json/miami_refs.json.
(function () {
  if (!window.LeonidaMap || typeof L === 'undefined') return; // MAP_ENABLED:false или CDN недоступен

  const map = window.LeonidaMap.map;
  const gameLatLng = window.LeonidaMap.gameLatLng;
  const cfg = window.SITE_CONFIG;

  // --- квоты: "parent" тут = parentId ближайшего region из districts.json. Сам тир "parents"
  // в districts.json пока без координат (x/y null у всех 8 записей, см. Gate 0 генератора
  // districts) — ближайший region с реальными x/y даёт тот же практический эффект группировки
  // по 8 крупным зонам, без ожидания отдельной доработки districts.json.
  function nearestParentId(x, y, regions) {
    let best = null, bestD = Infinity;
    for (const r of regions) {
      const d = (r.x - x) ** 2 + (r.y - y) ** 2;
      if (d < bestD) { bestD = d; best = r; }
    }
    return best ? best.parentId : '__unknown';
  }

  // --- раздвижка совпадающих координат ---
  // В исходных таблицах несколько кадров одной локации честно записаны одной точкой: пять карточек
  // на сейф-хаусе Джейсона (-1793.5,-5247.75), плюс четыре пары (Prison Gate, Lucia and Jason
  // drinking, Brian's Hangar, Lucia Explode Police) — 8 карточек из 88. Раздвижка по экранной
  // дистанции ниже честно оставляла из каждой стопки ОДНУ (у остальных дистанция 0), и выигрывала
  // всегда одна и та же — по priority. То есть 8 карточек не открывались никогда, ни на каком зуме
  // («пометил карточку — не открывается, и там 4 карточки на одном месте»).
  // Это не ошибка данных: пять фото одного дома — нормальная запись, разложить их по карте обязан
  // рендер. Раскладываем по кругу вокруг общей точки, детерминированно (порядок в json), радиус
  // ~150 игровых метров — на боевых зумах z4-z5 это 75-150 экранных px при плитке 72.
  const SPREAD_R = 150;
  // Второй шаг той же задачи: точные дубли раскладываются по кругу (выше), а просто БЛИЗКИЕ
  // плитки — расталкиванием («если карточки накладываются друг на друга, их стоит разносить хоть
  // немного, даже если страдает точность»). Порог — размер плитки на боевом зуме z5 (1 м/px,
  // плитка 72px) плюс поля: ближе ~110 м две карточки на экране заведомо налезают.
  // Пар ближе 100 м в данных 60 из 3828 — расталкивание трогает только их, остальные не двигаются.
  // Сдвиг рантаймовый, hero-tiles.json не переписывается: данные остаются точными, разъезжается
  // только отрисовка.
  const MIN_GAP = 110;
  const RELAX_PASSES = 12;   // 88 плиток, ~3.8к пар за проход — разовая цена на загрузке
  function declutterTiles(list) {
    const groups = new Map();
    for (const t of list) {
      const k = `${t.x},${t.y}`;
      (groups.get(k) || groups.set(k, []).get(k)).push(t);
    }
    for (const g of groups.values()) {
      if (g.length < 2) continue;
      g.forEach((t, i) => {
        const a = (i / g.length) * Math.PI * 2;
        t.x += Math.cos(a) * SPREAD_R;
        t.y += Math.sin(a) * SPREAD_R;
      });
    }
    // Релаксация: пара ближе MIN_GAP расходится на половину нехватки каждая, пока не разъедутся
    // или не кончатся проходы. Детерминированно — порядок из json, ни одного случайного числа.
    for (let p = 0; p < RELAX_PASSES; p++) {
      let moved = false;
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i], b = list[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d >= MIN_GAP) continue;
          const ux = d > 0.01 ? dx / d : 1, uy = d > 0.01 ? dy / d : 0;
          const push = (MIN_GAP - d) / 2;
          a.x -= ux * push; a.y -= uy * push;
          b.x += ux * push; b.y += uy * push;
          moved = true;
        }
      }
      if (!moved) break;
    }
    return list;
  }

  function quotaForZoom(z) {
    const step = cfg.HERO_QUOTA.find((s) => z <= s.maxZoom);
    return step ? step.perParent : Infinity;
  }

  function tileSize() {
    return window.innerWidth <= 900 ? cfg.HERO_TILE_SIZE.mobile : cfg.HERO_TILE_SIZE.desktop;
  }

  const heroGroup = L.layerGroup();
  const markersById = new Map(); // id -> L.marker, создаются один раз, дальше только addTo/removeLayer
  const tileById = new Map();    // id -> запись hero-tiles.json (мост window.HeroTiles, см. низ файла)
  const activeIds = new Set();
  const revealAnimated = new Set(); // id, уже сыгравшие вспышку появления из тумана (раунд-9: один раз)
  let tiles = [];
  let explored = new Set();

  // --- прогресс карточек в панели Map Info (§6): общая полоса + четыре тонкие по редкости.
  // Полоса тумана (Explored) осталась только в окне COLLECTION — она про езду, не про карточки.
  const elCount = document.getElementById('heroExploredCount');
  const elTotal = document.getElementById('heroExploredTotal');
  const elBarFill = document.getElementById('heroExploredBarFill');
  const tierBox = document.getElementById('heroTierBars');
  // Тот же счётчик продублирован внутри карточки (§ ниже, card-progress) — карточка открыта
  // поверх панели, но дублировать всё равно нагляднее прямо у фото.
  const cardProgressCount = document.getElementById('heroCardProgressCount');
  const cardProgressTotal = document.getElementById('heroCardProgressTotal');
  const cardProgressFill = document.getElementById('heroCardProgressFill');
  const cardProgressBar = document.getElementById('heroCardProgressBar');
  // Строка прогресса по редкости открытой карточки (14-08) — второй, узкий срез рядом с общим.
  const cardTierRow = document.getElementById('heroCardTierRow');
  const cardTierName = document.getElementById('heroCardTierName');
  const cardTierFill = document.getElementById('heroCardTierFill');
  const cardTierNum = document.getElementById('heroCardTierNum');
  let openTile = null; // какая карточка сейчас в модалке — чтобы тик прогресса двигал и её полосу

  // Кратковременная подсветка изменившегося элемента — вызывается только при реальном приросте
  // (см. openCard), не на каждый renderCounter(). cls переключаемый: 'count-pulse' на числе,
  // 'bar-pulse' на самой полосе — полоса теперь несёт основной акцент прогресса (см. style.css).
  const pulseCount = (el, cls = 'count-pulse') => window.LeonidaMap.restartAnim(el, cls);
  // Разбивка по редкости — общий источник и для панели, и для плашки CARDS в езде (см. публичный
  // getTierProgress ниже), считается по tiles/explored, своего состояния не держит.
  function tierProgress() {
    const out = {};
    for (const t of tiles) {
      const k = t.tier || 'common';
      out[k] = out[k] || { opened: 0, total: 0 };
      out[k].total++;
      if (explored.has(t.id)) out[k].opened++;
    }
    return out;
  }
  // Порядок сверху вниз — от самой редкой: легендарки собирают ради них, обычные — фон.
  const TIER_ORDER = ['legendary', 'epic', 'rare', 'common'];
  // Тот же порядок — как приоритет отбора в applyHeroLOD. priority в hero-tiles.json это просто
  // номер строки исходной таблицы, и квота с раздвижкой отдавали слот тому, кто раньше в файле:
  // легендарка (их всего 6 на 88) регулярно проигрывала соседней common и пропадала с карты
  // («карточки пропали, например легендарка с Раулем»). Теперь редкие переживают оба фильтра, а
  // выбывают всегда обычные — их 40, потеря одной ничего не стоит.
  const tierRank = (t) => { const i = TIER_ORDER.indexOf(t.tier); return i < 0 ? TIER_ORDER.length : i; };
  const byRarity = (a, b) => tierRank(a) - tierRank(b) || a.priority - b.priority;

  // Полоса «сколько собрано карточек той же редкости» внутри модалки. Считается из того же
  // tierProgress(), что и полосы в панели — второго источника у витрины не заводим.
  function renderCardTier() {
    if (!cardTierRow) return;
    const tier = openTile?.tier;
    const prog = tier ? tierProgress()[tier] : null;
    cardTierRow.hidden = !prog;
    if (!prog) return;
    const tierCfg = cfg.CARD_TIERS?.[tier] || {};
    const color = tierCfg.color || 'var(--orange)';
    cardTierRow.style.setProperty('--tier', color); // --tier наследуется в .tier-bar-* (см. style.css)
    cardTierName.textContent = window.Render.t(tierCfg.label || tier.toUpperCase());
    cardTierNum.textContent = `${prog.opened}/${prog.total}`;
    cardTierFill.style.width = prog.opened / prog.total * 100 + '%';
  }

  // Полоса заливается с нуля при каждом открытии карточки (лутбокс-подача, 14-08): цель уже
  // проставлена renderCounter в style.width, поэтому обнуляем БЕЗ анимации, форсим рефлоу и тут же
  // возвращаем цель — заливка едет по обычному transition:width из style.css.
  // Без requestAnimationFrame намеренно: в фоновой/некомпозируемой вкладке кадры не идут вовсе, и
  // отложенное восстановление ширины не выполнялось — полоса залипала на нуле до следующего
  // renderCounter. Рефлоу же синхронный и работает всегда.
  function replayFill(el) {
    if (!el) return;
    const target = el.style.width;
    el.style.transition = 'none';
    el.style.width = '0%';
    void el.offsetWidth; // фиксируем нулевую ширину как «до» для перехода
    el.style.transition = '';
    el.style.width = target;
  }

  function renderCounter() {
    const n = tiles.filter((t) => explored.has(t.id)).length;
    const pct = (tiles.length ? n / tiles.length * 100 : 0) + '%';
    if (elCount) elCount.textContent = n;
    if (elTotal) elTotal.textContent = tiles.length;
    if (elBarFill) elBarFill.style.width = pct;
    // Привлекалка новичка на OPEN COLLECTION (свечение + бегущий блик, .attract в style.css):
    // живёт ровно до первой открытой карточки. tiles.length в условии — до загрузки данных
    // кнопке нечего рекламировать.
    document.getElementById('cardsCollectionBtn')?.classList.toggle('attract', tiles.length > 0 && n === 0);
    if (cardProgressCount) cardProgressCount.textContent = n;
    if (cardProgressTotal) cardProgressTotal.textContent = tiles.length;
    if (cardProgressFill) cardProgressFill.style.width = pct;
    renderCardTier();
    if (tierBox) {
      const prog = tierProgress();
      tierBox.innerHTML = TIER_ORDER.filter((k) => prog[k]).map((k) => {
        const { opened, total } = prog[k];
        const color = cfg.CARD_TIERS?.[k]?.color || 'var(--orange)';
        const label = window.Render.t(cfg.CARD_TIERS?.[k]?.label || k.toUpperCase());
        return `<span class="tier-bar-name" style="--tier:${color}">${label}</span>
          <span class="tier-bar-track" style="--tier:${color}"><i style="width:${opened / total * 100}%"></i></span>
          <span class="tier-bar-num">${opened}/${total}</span>`;
      }).join('');
    }
  }

  // --- карточка (§5) — самостоятельный компонент, не L.popup, не #lightbox (тот привязан к
  // window.SCREENSHOTS/NewsReactions в windows.js, другой источник данных и другое направление
  // перехода: лайтбокс -> карта, тут наоборот карта -> вики). ---
  const overlay = document.getElementById('heroCardOverlay');
  const cardImg = document.getElementById('heroCardImg');
  const cardTitle = document.getElementById('heroCardTitle');
  const cardLocation = document.getElementById('heroCardLocation');
  const cardAttr = document.getElementById('heroCardAttr');
  const cardReadmore = document.getElementById('heroCardReadmore');
  const cardClose = document.getElementById('heroCardClose');
  const cardTier = document.getElementById('heroCardTier');
  const cardOwned = document.getElementById('heroCardOwned');

  // wiki_slug ("locations/ambrosia") -> "Ambrosia", для подписи Location в карточке (данные из
  // колонки Location в исходных xlsx-таблицах, см. PROMPT_map_hero_tiles.md §0).
  function formatLocation(slug) {
    if (!slug) return '';
    return slug.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Общий таймер отложенного "тика" (см. ниже) — держим ссылку, чтобы отменять при быстром
  // переключении карточек (см. коммент в openCard).
  let pulseTimeout;
  function openCard(tile) {
    cardImg.src = `${cfg.HERO_IMG_BASE}/${tile.image}-card.webp`;
    cardImg.alt = tile.title;
    // Первое открытие или повторное — спрашиваем ProgressStore, а не локальный explored: тот
    // обновляется отложенным тиком (250мс ниже), и быстрое «открыл — закрыл — открыл» соврало бы.
    const firstOpen = !window.ProgressStore.all().has(tile.id);
    // Первый раз — фото расшторивается из блюра, как оно и лежало плиткой на карте под замком.
    cardImg.classList.remove('card-img-reveal');
    if (firstOpen) {
      void cardImg.offsetWidth; // рестарт анимации при открытии карточек подряд
      cardImg.classList.add('card-img-reveal');
    }
    // Повторное — спокойный статус вместо тишины: без него казалось, что прогресс не засчитался.
    cardOwned.hidden = firstOpen;
    if (!firstOpen) cardOwned.textContent = window.Render.t('ALREADY IN COLLECTION');
    cardTitle.textContent = tile.title;
    cardLocation.textContent = formatLocation(tile.wiki_slug);
    cardAttr.textContent = window.Render.heroAttr(tile.source);
    // Бейдж тира тем же цветом, что кольцо маркера. Слово COMMON/RARE/... переводится (владелец:
    // "можно перевести") — через тот же словарь рантайм-строк, что и остальной JS-текст.
    const tierCfg = cfg.CARD_TIERS?.[tile.tier];
    cardTier.hidden = !tierCfg;
    if (tierCfg) {
      cardTier.textContent = window.Render.t(tierCfg.label);
      cardTier.style.color = tierCfg.color;
      cardTier.style.borderColor = tierCfg.color;
      // Вспышка бейджа — последний такт открытия (полосы -> фото -> бейдж). Пауза перед ней
      // задана в CSS (animation-delay), здесь только перезапуск через рефлоу: своего таймера
      // больше нет, значит и отменять при быстром переключении карточек нечего.
      window.LeonidaMap.restartAnim(cardTier, 'tier-pop');
    }
    if (tile.wiki_slug) {
      cardReadmore.href = window.Render.wikiHref(`/wiki/${tile.wiki_slug}`);
      cardReadmore.hidden = false;
    } else {
      cardReadmore.hidden = true;
    }
    overlay.hidden = false;
    // Сигнал drive-mode (интеграция карточек): на время модалки физика на паузе. Событие, не
    // прямой вызов — hero-tiles не знает про drive-mode, мост односторонний.
    // first — новая карточка или уже собранная: на нём считает серию drive-mode.js. Считать её
    // самому там нельзя, «первый раз» знает только ProgressStore, а мост односторонний.
    // id — для бонуса «×2 под сиреной» в drive-mode: он капает награду по id карточки ('once').
    document.dispatchEvent(new CustomEvent('leonida:herocard', { detail: { open: true, first: firstOpen, id: tile.id } }));
    openTile = tile;
    renderCounter(); // прогресс без нового тайла — виден сразу при открытии карточки
    // ...и тут же переигрывается с нуля: обе полосы модалки заливаются до текущего значения,
    // а не появляются уже заполненными (14-08). Тик +1 ниже добавится поверх той же анимацией.
    replayFill(cardProgressFill);
    replayFill(cardTierFill);

    // Сброс от предыдущей карточки: pulse-анимация теперь длится 2с (round-5 фидбек), и быстрое
    // переключение между тайлами (открыл новый — тут же закрыл — открыл уже исследованный) читалось
    // как "анимация играет у уже открытой карточки" — на деле доигрывал pulse ПРЕДЫДУЩЕГО тайла.
    // Плюс отменяем зависший отложенный тик (250мс ниже), чтобы он не выстрелил на карточке,
    // которая к тому моменту уже сменилась на другую.
    clearTimeout(pulseTimeout);
    [elCount, elBarFill, cardProgressCount, cardProgressFill].forEach((el) => el?.classList.remove('count-pulse', 'bar-pulse'));

    const firstTick = window.ProgressStore.add(tile.id);
    if (firstTick) {
      // СОСТОЯНИЕ — сразу, АНИМАЦИЯ — с задержкой. Раньше explored.add жил внутри таймера ниже, а
      // таймер отменяется следующим openCard (строка с clearTimeout) — и карточка, открытая меньше
      // чем за 250мс до следующей, в explored не попадала НИКОГДА: второе открытие уже не первое,
      // ProgressStore.add возвращает false, новый таймер не заводится. Дальше isCardRevealed на неё
      // отвечал false, drive-mode считал её неподобранной и открывал снова — на кластере плиток
      // получалась бесконечная карусель модалок с надписью ALREADY IN COLLECTION (баг 15-08).
      explored.add(tile.id);
      markersById.get(tile.id)?.getElement()?.querySelector('.hero-tile')?.classList.add('explored');
    }
    // Сам "тик" бара — с задержкой: мгновенный скачок вместе с открытием карточки проходит мимо
    // глаз, через ~0.25с прирост уже заметен. Плата за карточку — в том же такте.
    // ponytail: быстрое «открыл-закрыл» до 250мс отменяет таймер вместе с оплатой — карточка
    // просто останется неоплаченной и заплатит на следующем открытии, чинить нечего.
    pulseTimeout = setTimeout(() => {
      if (firstTick) {
        renderCounter();
        pulseCount(elCount);
        pulseCount(elBarFill, 'bar-pulse');
        pulseCount(cardProgressCount);
        pulseCount(cardProgressFill, 'bar-pulse');
      }
      payTile(tile);
    }, 250);
  }

  // Плата за карточку — на КАЖДОЕ открытие, а не только на первое (16-08(7)). Раньше вызов стоял
  // внутри «первого открытия», и при исчерпанном дневном лимите карточка навсегда уходила в
  // explored, не заплатив ничего: «открыл все карточки после лимита, зашёл завтра — а всё уже
  // открыто». award при отказе событие не помечает, поэтому неоплаченная карточка теперь просто
  // ждёт — то же открытие завтра принесёт свои RP.
  // quiet=true: награду показывает попап у самой карточки, угловой тост был вторым «+3» на экране
  // («+3 respect дублируется в правом верхнем углу»). Попап — только если начисление ПРОШЛО:
  // «+3 RESPECT» поверх отказанного капом начисления был прямым враньём.
  // Держим попап на 1с дольше дефолта (1600мс) — 0.25с задержки такта оставляют меньше времени
  // прочитать его на стандартной длительности.
  function payTile(tile) {
    // Показываем НАЧИСЛЕННОЕ, а не запрошенное: сверх дневного потолка award платит 1 RP
    // (мягкий кап, 16-08(8)), и «+3 RESPECT» поверх начисленного одного врал бы ровно так же,
    // как раньше врал поверх нуля.
    const paid = window.Respect?.award?.(`hero_tile_${tile.id}`, cfg.HERO_RESPECT_AMOUNT, 'once', true);
    if (paid) window.Respect.popup?.(cardProgressBar, `+${paid} RESPECT`, 2600);
  }
  function closeCard() {
    overlay.hidden = true;
    openTile = null;
    document.dispatchEvent(new CustomEvent('leonida:herocard', { detail: { open: false } }));
  }
  cardClose.addEventListener('click', closeCard);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCard(); });
  document.addEventListener('keydown', (e) => {
    if (!overlay.hidden && e.key === 'Escape') closeCard();
  });

  // --- маркеры: создаются один раз при загрузке данных, дальше только add/removeLayer из heroGroup
  // (не пересоздаём DOM на каждый зум — тот же принцип, что applyLOD() в map.js). ---
  function buildMarker(tile) {
    const size = tileSize();
    // tier-<t> красит кольцо/свечение плитки (см. --tier-* в style.css). Тир приходит из
    // hero-tiles.json (scripts/build-card-fragments.js по docs/tiers-draft.md); у старых данных
    // без поля tier класса просто нет и плитка остаётся в исходной розовой рамке.
    const cls = 'hero-tile' + (explored.has(tile.id) ? ' explored' : '') + (tile.tier ? ` tier-${tile.tier}` : '');
    const icon = L.divIcon({
      className: '',
      html: `<div class="${cls}" style="width:${size}px;height:${size}px">
        <img src="${cfg.HERO_IMG_BASE}/${tile.image}-300.webp" alt="${tile.title}" loading="lazy">
        <div class="hero-tile-lock">🔒</div>
      </div>`,
      iconSize: [size, size]
    });
    // zIndexOffset — фото-карточки поверх подписей районов и прочих markerPane-соседей
    // (раунд-11 "приоритет карточке при пересечении"); машинка езды ещё выше (10000).
    const marker = L.marker(gameLatLng(tile.x, tile.y), { icon, zIndexOffset: 500 });
    // Раньше при совпадении T2-точки под плиткой клик открывал попап точки вместо карточки
    // (findMarkerNear в map.js) — задумывалось как способ дотянуться до мелкой точки под большим
    // фото, а на деле читалось как баг: клик по фото показывал название маркера. Плитка — основной
    // контент, всегда открывает свою карточку; findMarkerNear целиком убран из map.js.
    marker.on('click', () => openCard(tile));
    return marker;
  }

  // --- отбор: квота по (parentId, priority) ∩ вьюпорт, обрезка по HERO_DOM_CAP если всё равно
  // многовато (мобильный — основной канал трафика). Детерминированно: чистая функция от
  // зума+границ вьюпорта, без внешнего состояния. ---
  function applyHeroLOD() {
    const z = map.getZoom();
    const bounds = map.getBounds();

    // Интеграция с ездой: в режиме езды карточка под закрытым туманом не существует для игрока —
    // фильтр ДО квот (закрытая карточка не резервирует слот LOD, вместо неё покажется открытая).
    // Вне езды поведение не меняется вовсе (isRevealedAt спрашивается только при active).
    const driveActive = window.DriveMode?.isActive?.() || false;
    // В езде квота по родителю отключена — в AI/Realistic driveZoom ниже (см. drive-mode.js
    // start()), это опускает карточки в более строгий quota-tier (10/parent вместо Infinity) и
    // часть плиток просто не попадала в desired -> ht.visible() их не видел -> наезд не открывал
    // карточку никогда, пока обе конкурирующие плитки в кадре (баг "часть карточек не открывается").
    const perParentCap = driveActive ? Infinity : quotaForZoom(z);
    // Legendary в езде не показывается плиткой, пока не собрана: вместо неё на карте лежат 4
    // фрагмент-маркера (js/card-fragments.js). Вне езды — обычная плитка с кликом, чтобы игра не
    // запирала контент от утилитарных пользователей и SEO.
    const inView = tiles.filter((t) => bounds.contains(gameLatLng(t.x, t.y)) &&
      (!driveActive || (window.DriveMode.isRevealedAt(t.x, t.y) &&
        !(t.tier === 'legendary' && !explored.has(t.id)))));
    const byParent = new Map();
    for (const t of inView) {
      const list = byParent.get(t.parentId) || [];
      list.push(t);
      byParent.set(t.parentId, list);
    }

    let desired = [];
    for (const list of byParent.values()) {
      list.sort(byRarity);
      desired.push(...list.slice(0, perParentCap));
    }
    desired.sort(byRarity);

    // Раздвижка по экранной дистанции: в плотных кластерах тайлы визуально перекрываются, и
    // Leaflet кладёт один поверх другого по z-index (y-координата) — нижний тайл оказывается
    // физически некликабельным под верхним (баг "два тайла не открываются" из фидбека). По
    // приоритету пропускаем тайл, если он ближе размера плитки на экране к уже отобранному —
    // при следующем зуме/панораме, когда кластер разъедется, он появится сам.
    const size = tileSize();
    const placedPoints = [];
    // Та же причина, второй источник: .map-panel (Map Info, всегда открыта, z-index поверх
    // тайлов) может частично накрыть тайл, оказавшийся под ней при текущем пане/зуме — клик по
    // накрытой части уходит панели, а не Leaflet-маркеру. Считаем её экранный прямоугольник
    // относительно контейнера карты (оба — inset:0 внутри одного .map-frame, координаты совпадают
    // без пересчёта) и не показываем тайл, чей ЦЕНТР в неё попадает.
    // Было «хоть краем задел» — и в узком виджете (350px, панель занимает 57% ширины) это
    // выбрасывало 58 карточек из 85 в кадре: карта выглядела пустой, хотя данные на месте
    // («как будто пустовато»). По центру выбывает только тайл, накрытый больше чем наполовину;
    // у остальных открытая половина остаётся кликабельной, ради чего фильтр и заводился.
    // В езде фильтр панели отключён (решение раунд-8): клик не главный путь — открытие идёт
    // магнитом/наездом по мировым координатам, а скрытие карточки в центре кадра (камера
    // центрирует машинку, панель в узком виджете накрывает центр) ломало магнит.
    const panelEl = driveActive ? null : document.querySelector('.map-panel');
    let panelBox = null;
    if (panelEl) {
      const mapRect = map.getContainer().getBoundingClientRect();
      const pr = panelEl.getBoundingClientRect();
      panelBox = { left: pr.left - mapRect.left, top: pr.top - mapRect.top, right: pr.right - mapRect.left, bottom: pr.bottom - mapRect.top };
    }
    desired = desired.filter((t) => {
      const p = map.latLngToContainerPoint(gameLatLng(t.x, t.y));
      if (panelBox && p.x > panelBox.left && p.x < panelBox.right &&
          p.y > panelBox.top && p.y < panelBox.bottom) return false;
      // Раздвижка по экранной дистанции — тоже только для клика (см. panelBox выше). В езде
      // выкидывала из desired/activeIds ту из двух близких плиток, что проиграла по priority —
      // ht.visible() её никогда не видел, наездом она не открывалась в принципе, сколько ни катайся
      // (баг "Sunset/Ambrosia не открывается" — обе плитки существуют, но соседняя каждый раз забирала слот).
      if (!driveActive && placedPoints.some((q) => Math.hypot(p.x - q.x, p.y - q.y) < size)) return false;
      placedPoints.push(p);
      return true;
    });

    if (desired.length > cfg.HERO_DOM_CAP) desired = desired.slice(0, cfg.HERO_DOM_CAP);

    const desiredIds = new Set(desired.map((t) => t.id));
    for (const id of activeIds) {
      if (!desiredIds.has(id)) { heroGroup.removeLayer(markersById.get(id)); activeIds.delete(id); }
    }
    for (const t of desired) {
      if (!activeIds.has(t.id)) {
        markersById.get(t.id).addTo(heroGroup);
        activeIds.add(t.id);
        const el = markersById.get(t.id).getElement()?.querySelector('.hero-tile');
        if (!el) continue;
        // removeLayer/addTo пересоздаёт DOM из ИСХОДНОГО html иконки — классы, навешенные позже
        // (explored из openCard), теряются, и открытая карточка снова показывала замок (баг
        // "при втором подъезде залочена"). Синхронизируем состояние при каждом добавлении.
        if (explored.has(t.id)) el.classList.add('explored');
        // Появление из тумана в езде — scale-in + вспышка кромки (CSS .tile-reveal); карточка
        // остаётся заблюренной с замочком: туман открывает ФАКТ существования, не содержимое.
        // Один раз на карточку (раунд-9): LOD-churn больше не переигрывает вспышку.
        if (driveActive && !revealAnimated.has(t.id)) {
          revealAnimated.add(t.id);
          el.classList.add('tile-reveal');
          el.addEventListener('animationend', () => el.classList.remove('tile-reveal'), { once: true });
        }
      }
    }
  }

  // Чекбокс Show cards (раунд-11): прячет весь фото-слой. Магнит/наезд в езде отключаются сами —
  // visible() пустеет; туман, точки и счётчики работают как раньше.
  // Второе условие — режим COMPARE (16-08(12), «в режиме compare стоит скрывать карточки»): там
  // сравнивают габариты полотен, и 60 фотоплиток поверх чужой карты просто мешают смотреть.
  // Чекбокса это не касается: ушёл с вкладки — карточки вернулись в том состоянии, в каком были.
  const showCardsToggle = document.getElementById('showCardsToggle');
  const compareBtn = document.querySelector('.pm-btn[data-mode="compare"]');
  // В езде тумблер игнорируется (23-08): карточки — сам смысл поездки (магнит, наезд, серия),
  // выключенный в EXPLORE чекбокс молча давал пустой DRIVE. Выход из езды возвращает выбор юзера.
  const cardsWanted = () => (showCardsToggle?.checked !== false || window.DriveMode?.isActive?.() === true)
    && !compareBtn?.classList.contains('active');
  let cardsShown = cardsWanted();
  function syncCardsLayer() {
    if (cardsWanted() === cardsShown) return;
    cardsShown = !cardsShown;
    if (cardsShown) { heroGroup.addTo(map); applyHeroLOD(); }
    else map.removeLayer(heroGroup);
  }
  showCardsToggle?.addEventListener('change', () => {
    syncCardsLayer();
    // Обратная связь на выключение (23-08): «cards» для новичка — пустое слово, пузырь у самой
    // галочки говорит, что именно исчезло. Popup, не угловой toast — реакция должна появиться
    // там, куда смотрит рука. На включение не пищим — карточки сами появились.
    if (!showCardsToggle.checked) window.Respect?.popup?.(document.getElementById('showCardsRow'), window.Render.t('Photo cards hidden'), 2200);
  });
  // Смена режима панели приходит тем же 'leonida:panelchange', что и её размер (слушатель ниже) —
  // но там debounce 150мс, а слой карточек обязан уйти в тот же кадр, что и переключение вкладки.
  document.addEventListener('leonida:panelchange', syncCardsLayer);

  let heroDebounce;
  function scheduleApply() {
    clearTimeout(heroDebounce);
    heroDebounce = setTimeout(applyHeroLOD, 150); // тот же интервал, что lodZoomDebounce в map.js
  }
  map.on('zoomend moveend resize', scheduleApply);
  // Панель Map Info вычитается из зоны показа плиток (panelBox ниже), но её прямоугольник читается
  // только внутри applyHeroLOD. Панель при этом меняет размер САМА, без движения карты: свернулась
  // вбок, выросла на строку прогресса, переехала на другой язык. Плитка, показанная при короткой
  // панели, оставалась висеть под выросшей — видимая, но некликабельная (второй источник фидбэка
  // «карточка не открывается»). ResizeObserver закрывает весь класс: изменился бокс — пересчитали.
  // Сворачивание вбок — это transform, размер не меняется, ResizeObserver его не видит: там
  // js/map.js шлёт 'leonida:panelchange' сам.
  const panelForObserver = document.querySelector('.map-panel');
  if (panelForObserver && window.ResizeObserver) new ResizeObserver(scheduleApply).observe(panelForObserver);
  document.addEventListener('leonida:panelchange', scheduleApply);

  // Сигналы drive-mode: во время езды карта движется каждый кадр (panBy) — debounce по moveend
  // сбрасывается непрерывно и applyHeroLOD не успевает срабатывать, пока машинка не остановится.
  // Открытие тумана шлёт 'leonida:fogchange' (тут — trailing throttle 250мс, 88 плиток — дёшево),
  // вход/выход из режима — 'leonida:drivechange' (мгновенно: скрыть/показать всё разом).
  // Leading-edge (раунд-10): применяем СРАЗУ, потом молчим 250мс. Прежний trailing-вариант
  // задерживал появление карточки из тумана на 250мс — на скорости машинка успевала проехать
  // мимо раньше, чем карточка становилась видимой для намагничивания/наезда ("открылась с
  // делеем" / "вообще не открылась").
  let fogApplyTimer = null;
  function applyThrottled() {
    if (fogApplyTimer) return;
    applyHeroLOD();
    fogApplyTimer = setTimeout(() => { fogApplyTimer = null; }, 250);
  }
  document.addEventListener('leonida:fogchange', applyThrottled);
  // Движение камеры — ВТОРОЙ, независимый повод пересчитать LOD во время езды. 'fogchange'
  // приходит только когда открываются НОВЫЕ ячейки тумана: на повторном проезде по уже
  // разведанному району событий нет вообще, а debounce по 'moveend' (выше) во время езды
  // сбрасывается каждым кадром panBy и не срабатывает, пока машинка не остановится. Итог:
  // activeIds оставался от прежнего кадра, ht.visible() не видел плитку под машинкой, и наезд
  // не открывал карточку (фидбэк раунда-16 "карточки не всегда отрабатывают").
  map.on('move', () => { if (window.DriveMode?.isActive?.()) applyThrottled(); });
  document.addEventListener('leonida:drivechange', () => {
    clearTimeout(fogApplyTimer); fogApplyTimer = null;
    syncCardsLayer(); // cardsWanted() зависит от isActive() — вернуть/убрать слой при входе/выходе
    applyHeroLOD();
  });

  Promise.all([
    fetch(`${cfg.MAP_DATA_BASE}/hero-tiles.json`).then((r) => r.json()),
    fetch(`${cfg.MAP_DATA_BASE}/districts.json`).then((r) => r.json())
  ])
    .then(([heroTiles, districts]) => {
      explored = window.ProgressStore.all();
      tiles = declutterTiles(heroTiles.map((t) => ({ ...t, parentId: nearestParentId(t.x, t.y, districts.regions) })));
      tiles.forEach((t) => { tileById.set(t.id, t); markersById.set(t.id, buildMarker(t)); });
      heroGroup.addTo(map);
      renderCounter();
      applyHeroLOD();
    })
    .catch(() => {}); // офлайн/пустой датасет — карта остаётся рабочей без плиток (§8 п.6)

  // ---- Мост для drive-mode (интеграция карточек, раунд 03-08). Только чтение состояния +
  // вызов СУЩЕСТВУЮЩЕЙ карточки — анлок/модалка/счётчик не дублируются. Тиры/сеты сюда не
  // закладывать: точка расширения — isCardRevealed/getCardsProgress, не больше. ----
  window.HeroTiles = {
    // Видимые сейчас плитки (после LOD/квот/тумана) — drive-mode меряет до них дистанцию раз
    // в кадр (≤ HERO_DOM_CAP штук, без квадродеревьев).
    visible() { return cardsShown ? [...activeIds].map((id) => tileById.get(id)).filter(Boolean) : []; },
    // Открыть ту же модалку, что клик по плитке (общий openCard — общий анлок/Respect/счётчик).
    open(id) { const t = tileById.get(id); if (t) openCard(t); },
    markerTileEl(id) { return markersById.get(id)?.getElement()?.querySelector('.hero-tile') || null; },
    isCardRevealed(id) { return explored.has(id); },
    getCardsProgress() { return { opened: tiles.filter((t) => explored.has(t.id)).length, total: tiles.length }; },
    // Весь датасет + состояние открытости — для окна COLLECTION (js/windows.js). Ни тумана, ни
    // LOD, ни вьюпорта: витрина показывает все 88 карточек разом, закрытые — силуэтами. Копия
    // объекта, чтобы окно не могло случайно поправить внутреннее состояние слоя.
    allCards() { return tiles.map((t) => ({ ...t, opened: explored.has(t.id) })); }
  };
})();
