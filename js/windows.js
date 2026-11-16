// ===== ОКНА-ПРИЛОЖЕНИЯ (§6: пульт = ОС, окно = приложение) =====
// Раскрытая панель рендерит ТЕ ЖЕ данные, что статичная SEO-страница.
// Первый кандидат — LIVE WIRE. Каркас переиспользуемый: openWindow(id).
(function () {

  // Respect за лайк скриншота (OFFICIAL-сетка внутри окна + лайтбокс) — та же награда в обоих местах.
  const SHOT_LIKE_AMOUNT = 3;

  // Тот же словарь рантайм-строк, что у шаблонов (data/i18n-dynamic.<locale>.js). Заголовки окон и
  // подписи вкладок рисует ЭТОТ файл, до них ни билд-скрипт (data-i18n), ни render.js не достают.
  const t = (s) => window.Render.t(s);

  // --- Каркас окна (CORE_SPEC Принцип 3: одна сущность = одно окно) ---
  const overlay = document.getElementById('appWin');
  const winPanel = overlay.querySelector('.aw-panel');
  const winTitle = overlay.querySelector('.aw-title');
  const winTabs  = overlay.querySelector('.aw-tabs');
  const winBody  = overlay.querySelector('.aw-body');
  const winRefresh = document.getElementById('awRefresh');
  let activeTabs = null;
  // Снимок окна, откуда был открыт видео-плеер (openVideoPlayer) — "Go back" под видео
  // восстанавливает именно его (список VIDEOS/SHORTS/...), а не закрывает всё до хаба.
  let returnState = null;
  function snapshotWindow() {
    if (!overlay.classList.contains('open') || !activeTabs) return null;
    const activeBtn = winTabs.querySelector('.aw-tab.active');
    return {
      title: winTitle.textContent,
      accent: winPanel.style.getPropertyValue('--win-accent'),
      tabs: activeTabs,
      tabId: activeBtn ? activeBtn.dataset.tab : activeTabs[0].id
    };
  }

  let activeTabId = null;
  function renderTab(id) {
    const tab = activeTabs.find(t => t.id === id) || activeTabs[0];
    activeTabId = tab.id;
    winBody.innerHTML = tab.render();
    winTabs.querySelectorAll('.aw-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab.id));
    // ↻ REFRESH в шапке — только у вкладок, объявивших onRefresh (MEDIA -> VIDEOS/SHORTS, см. openMedia)
    winRefresh.hidden = !tab.onRefresh;
    winRefresh.onclick = tab.onRefresh ? () => { tab.onRefresh(); renderTab(tab.id); } : null;
  }

  // Перерисовать текущую вкладку открытого окна данными, пришедшими позже (store.js: лидерборд
  // с сервера ответил, когда окно RESPECT уже открыто). Окно закрыто — ничего не делает.
  window.refreshOpenWindow = () => { if (overlay.classList.contains('open') && activeTabs) renderTab(activeTabId); };

  // tabs: [{id, label, render}] — один элемент = вкладки не рисуются (одна сущность, один вход)
  function openWindow(title, tabs, accent, initialId) {
    winTitle.textContent = title;
    winTitle.style.color = accent || 'var(--teal)';
    winPanel.style.setProperty('--win-accent', accent || 'var(--teal)');
    activeTabs = tabs;
    if (tabs.length > 1) {
      winTabs.hidden = false;
      winTabs.innerHTML = tabs.map(t => `<button class="aw-tab" data-tab="${t.id}">${t.label}</button>`).join('');
    } else {
      winTabs.hidden = true;
      winTabs.innerHTML = '';
    }
    renderTab(initialId || tabs[0].id);
    overlay.classList.add('open');
    document.body.classList.add('win-open');
  }
  function closeWindow() {
    overlay.classList.remove('open');
    document.body.classList.remove('win-open');
    // Обнуляем тело окна — если там играл iframe (трейлер/видео-плеер), закрытие иначе не
    // останавливает звук/воспроизведение (YouTube-iframe продолжает жить, просто скрыт под overlay).
    winBody.innerHTML = '';
    returnState = null;
  }
  overlay.querySelector('.aw-close').addEventListener('click', closeWindow);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeWindow(); });
  // Escape закрывает слои по одному: если поверх окна открыт лайтбокс — сначала он (свой
  // Escape-обработчик ниже), окно остаётся; раньше один Escape схлопывал оба разом.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('lightbox').classList.contains('open')) closeWindow();
  });
  winTabs.addEventListener('click', e => {
    const btn = e.target.closest('.aw-tab');
    if (btn) renderTab(btn.dataset.tab);
  });

  // Встроенный плеер для VIDEOS/SHORTS/VOTD — по клику вместо редиректа на youtube.com (по
  // запросу) переиспользует то же окно-каркас (openWindow), не новый оверлей (CORE_SPEC).
  // "Go back" под видео возвращает к списку, откуда открыли (returnState), не закрывает окно
  // целиком — крестик в шапке остаётся отдельным способом уйти сразу в хаб.
  window.openVideoPlayer = function (v, kind) {
    window.LeonidaRadio?.pauseForVideo(); // видео со звуком — не наслаивать на играющее радио
    returnState = snapshotWindow();
    // Под Go back пусто (по запросу заполнили обоими предложенными вариантами): канал текстом
    // сразу под видео + сетка "ещё видео" из того же pool (video/short), сам текущий id исключён.
    const pool = mediaPool(kind);
    const more = pool.length > 1 ? window.shuffleArray(pool.filter(x => x.id !== v.id)).slice(0, 6) : [];
    openWindow(v.title, [{ id: 'player', label: 'PLAYER', render: () => window.Render.videoPlayer(v, more, kind) }], 'var(--orange)');
  };

  // STREAMS (data/streams.js): ⤢ в доке — окно со всеми каналами; клик по плитке (в доке или в
  // любом окне, один делегат на document) — окно плеера Twitch, «Go back» возвращает к списку,
  // как у видео (returnState). +5 RP за первое открытие каждого окна (open-stream/open-streams,
  // серверный паттерн ^open-[a-z-]+$).
  const STREAMS_ACCENT = '#a970ff';
  const openStream = (channel) => {
    const list = window.TWITCH_STREAMS;
    const s = list.find(x => x.channel === channel) || list[0];
    window.LeonidaRadio?.pauseForVideo();
    returnState = snapshotWindow();
    openWindow('TWITCH — ' + s.name, [{ id: 'stream', label: 'LIVE', render: () => window.Render.twitchPlayer(s, list.filter(x => x !== s)) }], STREAMS_ACCENT);
    window.Respect.award('open-stream', 5, 'once');
  };
  document.getElementById('streamsExpand').addEventListener('click', () => {
    openWindow('LIVE STREAMS', [{ id: 'streams', label: 'LIVE', render: () => window.Render.streamGrid(window.TWITCH_STREAMS) }], STREAMS_ACCENT);
    window.Respect.award('open-streams', 5, 'once');
  });
  document.addEventListener('click', e => {
    const tile = e.target.closest('.stream-tile');
    if (tile) openStream(tile.dataset.channel);
  });

  // Лайк/дизлайк внутри окна (тот же общий голос, что и в доке) + клик по скриншоту -> лайтбокс (p2-9)
  // + p2-10: табы T1/T2/T3 трейлер-плеера (звук по умолчанию, кнопки SOUND ON больше нет)
  winBody.addEventListener('click', e => {
    if (e.target.closest('.tp-back-btn')) {
      if (returnState) { const s = returnState; returnState = null; openWindow(s.title, s.tabs, s.accent, s.tabId); }
      else closeWindow();
      return;
    }
    const btn = e.target.closest('.fa-btn');
    if (btn) {
      const key = btn.closest('[data-key]')?.dataset.key;
      // Скриншоты (OFFICIAL-сетка, .aw-shot) — отдельная награда за лайк, см. news.js vote().
      // anchorEl — сама плашка .aw-shot (не кнопка): попап центрируется по центру фото (см. CSS
      // .aw-shot .respect-pop), кнопка лайка сидит у самого низа маленького превью с overflow:hidden,
      // и "+3 RESPECT" над кнопкой то не помещался по высоте, то обрезался краем превью.
      const shotEl = btn.closest('.aw-shot');
      if (key) window.NewsReactions.vote(key, btn.dataset.r, shotEl ? { likeAmount: SHOT_LIKE_AMOUNT, anchorEl: shotEl } : undefined);
      return;
    }
    const tpTab = e.target.closest('.tp-tab');
    if (tpTab) {
      localStorage.setItem('lh_last_trailer', tpTab.dataset.trailer);
      renderTab('official');
      return;
    }
    const videoCardEl = e.target.closest('.video-card');
    if (videoCardEl) {
      window.openVideoPlayer(
        { id: videoCardEl.dataset.videoId, title: videoCardEl.dataset.videoTitle, channel: videoCardEl.dataset.videoChannel },
        videoCardEl.dataset.videoKind
      );
      return;
    }
    const shotEl = e.target.closest('.aw-shot');
    if (shotEl) openLightbox(shotEl.dataset.id);
  });

  // --- LIVE WIRE / WEAZEL: полная лента из тех же данных, что и в доке (одна форма окна, разный источник) ---
  function openFeedWindow({ title, accent, respectKey, tabId, tabLabel, news, feedKey }) {
    openWindow(title, [
      { id: tabId, label: tabLabel, render: () => window.Render.linkList(news, undefined, feedKey) }
    ], accent);
    window.Respect.award(respectKey, 5, 'once');
  }
  document.getElementById('intelExpand').addEventListener('click', () => openFeedWindow({
    title: t('LIVE WIRE — FULL FEED'), accent: 'var(--teal)', respectKey: 'open-livewire', // локализуется в тон dock.liveWire (23-08)
    tabId: 'feed', tabLabel: 'FEED', news: window.INTEL_NEWS, feedKey: 'intel'
  }));
  document.getElementById('weazelExpand').addEventListener('click', () => openFeedWindow({
    title: 'WEAZEL', accent: 'var(--pink)', respectKey: 'open-weazel',
    tabId: 'satire', tabLabel: 'SATIRE', news: window.WEAZEL_NEWS, feedKey: 'weazel'
  }));

  // --- GUIDE: базовый обзор сайта — 3 раздела (по запросу): что где лежит (Navigation),
  // как работают механики (Mechanics), что такое вики (Wiki, с мини-плиткой ссылок — те же
  // WIKI_META/wikiTile, что и в боковой панели, не отдельный шаблон). Акцент — оранжевый, единый
  // с рамкой окна (было #ffcb6b, отдельный от остальной палитры окон).
  // SUPPORT (☕ в шапке): заглушка-окно до донатов. href="#" — preventDefault, чтобы не прыгать наверх.
  const openSupport = () => openWindow(t('SUPPORT'), [{ id: 'support', label: t('SUPPORT'), render: () => window.Render.supportPanel() }], 'var(--orange)');
  document.getElementById('supportBtn').addEventListener('click', (e) => { e.preventDefault(); openSupport(); });
  // Строка «☕ SUPPORT →» в окне LEGAL (23-08: дубль текста поддержки из LEGAL убран, вместо него
  // ссылка): окно уже открыто, поэтому делегат по документу, как у .stream-tile.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.legal-support-link');
    if (!a) return;
    e.preventDefault();
    openSupport();
  });

  document.getElementById('guideBtn').addEventListener('click', () => {
    openWindow(t('GUIDE'), [
      { id: 'guide', label: t('GUIDE'), render: () => window.Render.guidePanel() }
    ], 'var(--orange)');
  });

  // --- COLLECTION: витрина собранных карточек карты + вкладка «зачем всё это» ---
  // Вход — строка Cards в панели Map Info (index.html #cardsCollectionBtn). Своего хранилища нет:
  // карточки берутся из window.HeroTiles.allCards(), клик по открытой отдаёт её ТОЙ ЖЕ модалке
  // (HeroTiles.open), что и клик по плитке на карте — второй карточки-компонента не заводим.
  // Оба входа (кнопка OPEN COLLECTION и строка Cards N/88) открывают ОДНО окно (Принцип 3), и оба
  // при нуле открытых карточек ведут сразу на HOW TO PLAY: стена из 88 замков новичку ничего не
  // объясняет («ноль — не приглашение», 08-09(6) — раньше так делала только строка Cards, а
  // мигающая привлекалка вела как раз на замки). Дальше — обычная витрина.
  const openCollection = () => {
    const opened = (window.HeroTiles?.allCards?.() || []).filter((c) => c.opened).length;
    openWindow(t('COLLECTION'), [
      { id: 'cards', label: t('CARDS'), render: () => window.Render.collectionPanel(window.HeroTiles?.allCards?.() || []) },
      { id: 'goals', label: t('HOW TO PLAY'), render: () => window.Render.goalsPanel() }
    ], 'var(--orange)', opened ? undefined : 'goals');
    window.Respect.award('open-collection', 5, 'once');
  };
  document.getElementById('cardsCollectionBtn')?.addEventListener('click', openCollection);
  document.getElementById('heroExploredRow')?.addEventListener('click', openCollection);
  // Клик по открытой карточке в витрине — закрыть окно и показать её же модалку карты.
  winBody.addEventListener('click', (e) => {
    const coll = e.target.closest('.coll-card.open');
    if (!coll) return;
    closeWindow();
    window.HeroTiles?.open?.(coll.dataset.cardId);
  });

  // --- LEGAL: дисклеймер fan-made проекта ---
  document.getElementById('legalBadge').addEventListener('click', () => {
    openWindow(t('LEGAL'), [
      { id: 'legal', label: t('LEGAL'), render: () => window.Render.legalPanel() }
    ], 'var(--orange)');
  });

  // --- RESPECT: топ игроков + звания (owner-запрос раунд-20) — раньше инлайн-раскрывашка внутри
  // community-card, теперь окно из общего каркаса (CORE_SPEC: не писать оверлей с нуля). Награды/
  // ачивки сюда не добавлены — реальных данных по ним в проекте нет (см. отчёт по задаче).
  document.getElementById('ccLbToggle').addEventListener('click', () => {
    // Заголовок/вкладки — через Render.t() (data/i18n-dynamic.js): те же слова, что уже стоят
    // на самой кнопке (community.topPlayers).
    openWindow(t('Top Respect'), [
      { id: 'leaderboard', label: t('Top Respect'), render: () => window.Render.leaderboardPanel(window.Leaderboard.rows()) },
      { id: 'ranks', label: t('Ranks'), render: () => window.Render.ranksPanel(window.Respect.get(), window.Respect.PTS_PER_LEVEL) }
    ], 'var(--pink)');
    window.Respect.award('open-respect-board', 5, 'once');
  });

  // --- MEDIA: единый дом для VOTD/SHORTS/OFFICIAL-скриншотов (CORE_SPEC Принцип 3) ---
  // VIDEOS и SHORTS — реальные YouTube-видео (data/media-feed.js), та же карточная сетка
  // (window.Render.videoGrid), разный kind только меняет /watch vs /shorts в ссылке.
  // Единая точка сопоставления kind -> pool (раньше этот же выбор дублировался инлайн в
  // openVideoPlayer тернарником и отдельно как аргументы mediaListTab ниже).
  const mediaPool = (kind) => kind === 'short' ? window.SHORTS_LIST : window.VOTD_LIST;
  // "Мешок" (как рандомайзер фигур в Tetris): каждый draw(n) съедает следующие n элементов из
  // перемешанной очереди, а не тянет независимую случайную выборку — так весь pool проходит по
  // разу, прежде чем что-то повторится, и соседние REFRESH почти не пересекаются (было: чистый
  // sample(pool,n) мог по случайности повторить почти тот же набор, что уже был показан).
  function makeBag(pool) {
    let queue = [];
    return function draw(n) {
      const out = [];
      while (out.length < n) {
        if (!queue.length) queue = window.shuffleArray(pool.slice());
        out.push(queue.shift());
      }
      return out;
    };
  }
  const mediaListTab = (id, label, pool, kind, displayCount) => {
    const draw = makeBag(pool);
    let shown = draw(Math.min(displayCount, pool.length));
    return {
      id, label,
      render: () => window.Render.videoGrid(shown, kind),
      onRefresh: () => { shown = draw(Math.min(displayCount, pool.length)); }
    };
  };
  function openMedia(initialId) {
    window.LeonidaRadio?.pauseForVideo(); // OFFICIAL-таб играет трейлер со звуком сразу же
    openWindow(t('MEDIA'), [
      mediaListTab('videos', t('VIDEOS'), mediaPool('video'), 'video', 9),
      mediaListTab('shorts', t('SHORTS'), mediaPool('short'), 'short', 15),
      {
        id: 'official', label: t('OFFICIAL'), render: () => {
          const activeTrailerId = localStorage.getItem('lh_last_trailer') ||
            window.TRAILERS.find(t => t.youtubeId)?.id || window.TRAILERS[0].id;
          return window.Render.trailerPlayer(window.TRAILERS, activeTrailerId) + window.Render.shotGrid(window.SCREENSHOTS);
        }
      }
    ], 'var(--orange)', initialId);
    window.Respect.award('open-media', 5, 'once');
  }
  // Деп-линк из превью-виджета OFFICIAL (левая колонка) на конкретный скрин/плеер в его "родной" вкладке (Принцип 3)
  function focusMediaItem(focusId) {
    if (!focusId) return;
    const target = focusId === 'player'
      ? winBody.querySelector('.trailer-player')
      : winBody.querySelector(`.aw-shot[data-id="${focusId}"]`);
    if (!target) return;
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    target.classList.add('aw-focus-pulse');
    setTimeout(() => target.classList.remove('aw-focus-pulse'), 1600);
  }
  document.getElementById('votdExpand').addEventListener('click', () => openMedia('videos'));
  document.getElementById('officialExpand').addEventListener('click', () => openMedia('official'));
  document.getElementById('officialShots').addEventListener('click', e => {
    const shotEl = e.target.closest('.shot');
    if (shotEl) { openMedia('official'); focusMediaItem(shotEl.dataset.id); }
  });
  document.getElementById('officialPip').addEventListener('click', (e) => {
    // Открыть MEDIA -> OFFICIAL должен показать именно тот трейлер, что играл в лупе (news.js
    // проставляет data-trailer-id), а не последний вручную выбранный (lh_last_trailer).
    const pipTrailerId = e.currentTarget.dataset.trailerId;
    if (pipTrailerId) localStorage.setItem('lh_last_trailer', pipTrailerId);
    openMedia('official'); focusMediaItem('player');
  });

  // --- ЛАЙТБОКС скриншотов (p2-9): клик по карточке в MEDIA → OFFICIAL ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbActions = document.getElementById('lightboxActions');
  const lbMapBtn = document.getElementById('lightboxMapBtn');
  const lbWikiBtn = document.getElementById('lightboxWikiBtn');
  let lbIdx = 0;

  function renderLightbox() {
    const shot = window.SCREENSHOTS[lbIdx];
    const key = `shot-${lbIdx}`;
    const r = window.NewsReactions.ensureReaction(key, {}, lbIdx);
    lbImg.src = shot.full; // full грузится только здесь, не в сетке-превью (lazy)
    lbImg.alt = shot.title;
    lbTitle.textContent = shot.title;
    lbActions.dataset.key = key;
    lbActions.innerHTML = `
      <button class="fa-btn${r.voted === 'up' ? ' active' : ''}" data-r="up">▲ <span>${r.up}</span></button>
      <button class="fa-btn${r.voted === 'down' ? ' active' : ''}" data-r="down">▼ <span>${r.down}</span></button>`;
    // official-shots.js даёт x/y напрямую (из hero-tiles.json), не mapMarkerId — карта панится
    // в игровые координаты через LeonidaMap.setView, а не через L.marker id.
    lbMapBtn.hidden = shot.x == null || shot.y == null;
    lbMapBtn.dataset.x = shot.x ?? '';
    lbMapBtn.dataset.y = shot.y ?? '';
    if (lbWikiBtn) {
      lbWikiBtn.hidden = !shot.wikiSlug;
      lbWikiBtn.href = shot.wikiSlug ? window.Render.wikiHref(`/wiki/${shot.wikiSlug}`) : '#';
    }
  }
  function openLightbox(id) {
    const idx = window.SCREENSHOTS.findIndex(s => s.id === id);
    lbIdx = idx < 0 ? 0 : idx;
    renderLightbox();
    lightbox.classList.add('open');
    window.Respect.award('gallery_first_view', 3, 'once');
  }
  function closeLightbox() { lightbox.classList.remove('open'); }
  function lbStep(dir) {
    lbIdx = (lbIdx + dir + window.SCREENSHOTS.length) % window.SCREENSHOTS.length;
    renderLightbox();
  }
  lbActions.addEventListener('click', e => {
    const btn = e.target.closest('.fa-btn');
    if (!btn) return;
    window.NewsReactions.vote(lbActions.dataset.key, btn.dataset.r, { likeAmount: SHOT_LIKE_AMOUNT, anchorEl: btn });
  });
  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lb-prev').addEventListener('click', () => lbStep(-1));
  lightbox.querySelector('.lb-next').addEventListener('click', () => lbStep(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  });
  lbMapBtn.addEventListener('click', () => {
    const x = parseFloat(lbMapBtn.dataset.x), y = parseFloat(lbMapBtn.dataset.y);
    closeLightbox();
    closeWindow();
    if (!Number.isNaN(x) && !Number.isNaN(y)) window.LeonidaMap?.setView(x, y, 3);
  });

  // --- СЕКРЕТ-ПАНЕЛЬ в доке — с 01-10 там 3D-карусель наших моделей (js/secret3d.js); заглушка
  // COMING SOON остаётся на случай, если карусель не поднялась (нет данных/скрипта).
  if (!window.Secret3D?.init()) document.getElementById('secretBody').innerHTML = window.Render.secretComingSoon();

  const phone = { get matches() { return window.LHLayout.narrow(); } };
  const votd = document.querySelector('.votd');
  const official = document.querySelector('.official-card');

  // --- Левая пара (VIDEO OF THE DAY / OFFICIAL) на ноутбуке — аккордеон «раскрыта строго одна»
  // (владелец 24-08: «официальное сворачивай в строчку, и когда разворачиваешь — должно
  // сворачиваться видео дня»); стартует раскрытым VIDEO OF THE DAY, повторный клик сворачивает.
  // Тело прячет CSS по [data-open]; на широком высоком экране атрибут ничего не значит, там всё
  // раскрыто всегда. Триггер — заголовок (первый ребёнок карточки).
  const pair = [votd, official];
  pair.forEach((card, i) => {
    card.dataset.open = String(i === 0);
    card.firstElementChild.addEventListener('click', (e) => {
      if (e.target.closest('button') || phone.matches) return; // кнопки ⤢ / ↻ — свои; телефон — ниже
      const willOpen = card.dataset.open !== 'true';
      pair.forEach((c) => { c.dataset.open = String(willOpen && c === card); });
    });
  });

  // --- Док (01-10, владелец): LIVE WIRE и WEAZEL — вкладки одной ячейки под левой колонкой.
  // Заголовок ячейки = вкладка, активную хранит [data-tab] на .dock; видна всегда одна лента.
  const dock = document.querySelector('.dock');
  const feeds = [...dock.querySelectorAll('.dock-intel, .dock-weazel')];
  feeds.forEach((cell) => {
    cell.firstElementChild.addEventListener('click', (e) => {
      if (e.target.closest('button') || phone.matches) return;
      dock.dataset.tab = cell.classList.contains('dock-weazel') ? 'weazel' : 'intel';
    });
  });

  // --- Телефон: LIVE WIRE / WEAZEL / VIDEO OF THE DAY / OFFICIAL — плитки 2×2 (владелец 01-10:
  // «4 блока сеткой»). Тело внутри плитки не раскрывается: тап по любой точке плитки = её ⤢, окно.
  // Слушатель на всей карточке: у плитки заголовок и есть вся карточка.
  [...feeds, votd, official].forEach((card) => {
    card.addEventListener('click', (e) => {
      if (!phone.matches || e.target.closest('button')) return;
      card.querySelector('.feed-expand')?.click();
    });
  });

  // Мобильный перенос тикера WEAZEL перед док убран 24-08 (владелец: «бегущую строку в самый
  // низ») — тикер живёт на своём месте в потоке: низ страницы, перед футером, на всех экранах.
})();
