// ===== Режимы центральной зоны главной: NEWS | ARTICLES | MAP | RELATIONS | GAMES =====
// (PROMPT_home_articles_mode_03-09 + рефактор 03-09: третий режим — граф связей персонажей;
// 23-09: NEWS — посты /news/ той же плиткой, что ARTICLES, данные window.FEATURED_NEWS.)
// Карта НЕ уничтожается: .map-frame.view-<mode> прячет её детей CSS-ом, возврат на MAP дёргает
// map.invalidateSize() (Leaflet после display:none ломает размеры). В map.js не лезем.
//
// ARTICLES — плитка вики-карточек из window.FEATURED_ARTICLES (data/featured-articles.<loc>.js).
// RELATIONS — граф Relationship Map: общее ядро /graph/relationship-graph-core.js (то же, что
// на /wiki/characters/relationship-map/) + данные window.RELATIONSHIP_GRAPH
// (data/relationship-graph.<loc>.js). Инициализация ленивая — при первом входе в режим;
// при выходе симуляция глушится (handle.onHide), чтобы не тикать в фоне.
// GAMES (11-10) — пятнашки (js/puzzle.js + data/puzzle-pics.js): тот же приём — ленивый init
// при первом входе, onHide ставит часы партии на паузу, onShow возвращает.
//
// Состояние: hash #view=<mode> (дефолтный режим — SITE_CONFIG.DEFAULT_VIEW — без hash;
// hash, не query — не плодить URL для SEO) + localStorage 'leonida.home.view'; hash приоритетнее. Выбранный в
// графе персонаж живёт ВНУТРИ того же hash: #view=relations&char=<slug> (charHash-колбэки
// ядру) — у страницы одна hash-схема, а не две конфликтующие.
// Каждое переключение = history.pushState + ручной GA4 page_view (правило проекта про
// интеракции-оверлеи и пороги рекламных сетей) + событие view_mode_change.
//
// Kill switch: при SITE_CONFIG.MAP_ENABLED:false дефолтом становится ARTICLES, MAP из
// переключателя пропадает (прежняя заглушка «temporarily unavailable» не показывается).
(function () {
  const frame = document.querySelector('.map-frame');
  const sw = document.getElementById('viewSwitch');
  const articlesView = document.getElementById('articlesView');
  const newsView = document.getElementById('newsView');
  const graphView = document.getElementById('graphView');
  const gamesView = document.getElementById('gamesView');
  if (!frame || !sw) return;

  const mapEnabled = !!window.SITE_CONFIG.MAP_ENABLED;
  const STORAGE_KEY = 'leonida.home.view';
  const t = (s) => window.Render.t(s);
  const ga = (...args) => { if (typeof window.gtag === 'function') window.gtag(...args); };

  // ---- ARTICLES / NEWS: одна плитка, разные данные (шаблон — Render.featurePlate) ----
  // «ALL … →» — CTA под сеткой на всех вьюпортах (05-09). Адрес вики берём у шапки
  // вики-панели — билд-скрипт уже локализовал его на каждой главной (/wiki/<locale>/). Адрес
  // ленты новостей своей локали пишет в данные сборщик (FEATURED_NEWS_HREF).
  const wikiHref = document.querySelector('.wiki-head')?.getAttribute('href') || '/wiki/';
  function plate(view, list, allHref, allLabel) {
    if (!view || !Array.isArray(list) || !list.length) return false;
    view.innerHTML = window.Render.featurePlate(list, allHref, allLabel);
    view.hidden = false; // видимостью дальше управляет .view-<mode> на .map-frame
    return true;
  }
  const hasArticles = plate(articlesView, window.FEATURED_ARTICLES, wikiHref, 'ALL ARTICLES');
  const hasNews = plate(newsView, window.FEATURED_NEWS, window.FEATURED_NEWS_HREF || '/news/', 'ALL NEWS');

  // ---- RELATIONS: ленивая инициализация общего ядра ----
  const hasGraph = !!(graphView && window.RelationshipGraph && window.RELATIONSHIP_GRAPH?.nodes?.length);
  // Кнопка RELATIONS прячется по недоступности данных/ядра — но не молча: без ядра
  // (/graph/relationship-graph-core.js, /vendor/d3 404) причину иначе не найти
  if (graphView && !hasGraph) console.warn('[view-mode] режим RELATIONS скрыт:',
    window.RelationshipGraph ? 'нет данных window.RELATIONSHIP_GRAPH' : 'ядро /graph/relationship-graph-core.js не загрузилось');
  let graphHandle = null;
  function ensureGraph() {
    if (graphHandle || !hasGraph) return;
    graphView.hidden = false; // дальше — .view-relations на .map-frame
    graphHandle = window.RelationshipGraph.init(graphView, window.RELATIONSHIP_GRAPH, {
      t,
      // Персонаж живёт внутри режимного hash: #view=relations&char=<slug>
      charHash: {
        parse: () => (location.hash.match(/^#view=relations&char=([a-z0-9-]+)$/) || [, null])[1],
        build: (slug) => selfUrl(slug ? `#view=relations&char=${slug}` : '#view=relations'),
      },
      // ⛶ — родной фуллскрин пульта (.deck.fs, как у кнопки карты): Fullscreen API
      // здесь режется permissions-политикой окружения
      fullscreen: () => {
        document.querySelector('.deck').classList.toggle('fs');
        setTimeout(() => window.dispatchEvent(new Event('resize')), 60); // кадр перемерился
      },
      // Respect-цель «открой всех»: одноразовые +15 за карточки ВСЕХ персонажей графа
      // (неповторяемое once-событие, свой ограничитель по CORE_SPEC не нужен). Прогресс —
      // отдельным ключом localStorage: у respect.js события бинарные, частичный набор
      // слагов туда не положить. Недоступный localStorage = прогресс не посчитать, выходим.
      onNodeOpen: (slug) => {
        if (!window.Respect || window.Respect.has('graph-all-chars')) return;
        let seen;
        try {
          seen = new Set(JSON.parse(localStorage.getItem('leonida.graph.seen')) || []);
          seen.add(slug);
          localStorage.setItem('leonida.graph.seen', JSON.stringify([...seen]));
        } catch (e) { return; }
        if (seen.size >= window.RELATIONSHIP_GRAPH.nodes.length) window.Respect.award('graph-all-chars', 15, 'once');
      },
      // Квиз STREET KNOWLEDGE: играет ядро, начисляет пульт. Once-события — переигровка
      // не фармится; id версионирует ядро (пара рёбер / число рёбер), новые связи после
      // трейлеров сами становятся новой целью. Ограничитель по CORE_SPEC — сама once-механика.
      quiz: { award: (id, pts, quiet) => (window.Respect ? window.Respect.award(id, pts, 'once', quiet) : 0) },
    });
  }

  // ---- GAMES: ленивая инициализация пятнашек ----
  const hasGames = !!(gamesView && window.Puzzle && window.PUZZLE_PICS?.length);
  let gamesHandle = null;
  function ensureGames() {
    if (gamesHandle || !hasGames) return;
    gamesView.hidden = false; // дальше — .view-games на .map-frame
    gamesHandle = window.Puzzle.init(gamesView);
  }

  // ---- режимы ----
  // Доступные режимы: без карты MAP выпадает, без данных соответствующий режим не
  // предлагается вовсе. Дефолт первого захода — SITE_CONFIG.DEFAULT_VIEW (до релиза
  // articles, решение владельца 04-09); недоступный/не заданный — первый доступный.
  // Порядок режимов — порядок кнопок в разметке (index.html), второй копии списка тут нет.
  const available = { map: mapEnabled, articles: hasArticles, news: hasNews, relations: hasGraph, games: hasGames };
  const MODES = [...sw.querySelectorAll('.vs-btn')].map((b) => b.dataset.view).filter((m) => available[m]);
  if (!MODES.length) return;
  const DEFAULT_MODE = MODES.includes(window.SITE_CONFIG.DEFAULT_VIEW) ? window.SITE_CONFIG.DEFAULT_VIEW : MODES[0];

  // Собственный путь страницы + hash. Строить URL для pushState относительным ("#view=map")
  // нельзя: в шапке стоит <base href="/">, и браузер резолвит относительный адрес от базы, а
  // не от текущего документа — на /ru/ кнопка MAP давала /#view=map, то есть возвращала
  // читателя на английскую главную (находка владельца 22-09). location.pathname про <base>
  // ничего не знает и всегда отдаёт реальный путь.
  const selfUrl = (hash) => location.pathname + location.search + (hash || '');

  // Логотип в шапке ведёт на главную ТЕКУЩЕЙ локали. В разметке у него href="#", и с тем же
  // <base href="/"> браузер резолвит его в «/#»: клик по логотипу на /ru/ уводил читателя на
  // английскую главную (замечено 22-09, починено 23-09). Адрес берём из location, как и для
  // pushState выше, — разметка про локаль ничего не знает, а location знает всегда.
  const logo = document.querySelector('a.logo');
  if (logo) logo.href = selfUrl('');

  let mode = null;
  // push=true — переключение действием пользователя (pushState + GA4);
  // push=false — восстановление из hash/localStorage/popstate, историю не трогаем.
  function apply(next, push) {
    if (!MODES.includes(next)) next = DEFAULT_MODE;
    const changed = next !== mode;
    mode = next;
    // Класс на каждый режим, кроме карты: CSS прячет карту и показывает свой контейнер.
    for (const m of MODES) if (m !== 'map') frame.classList.toggle(`view-${m}`, mode === m);
    // Невыбранные вкладки подсвечиваются по очереди: каждой свой номер в --vs-turn, из него
    // style.css считает сдвиг анимации. Номер считаем здесь, а не через nth-child: активная
    // вкладка меняется, место в разметке нет, и подсказки шли внахлёст (владелец 22-09).
    let turn = 0;
    sw.querySelectorAll('.vs-btn').forEach((b) => {
      const on = b.dataset.view === mode;
      b.classList.toggle('active', on);
      if (!on && !b.hidden) b.style.setProperty('--vs-turn', turn++);
    });
    if (mode === 'relations') { ensureGraph(); graphHandle?.onShow(); }
    else if (changed) graphHandle?.onHide();
    if (mode === 'games') { ensureGames(); gamesHandle?.onShow(); }
    else if (changed) gamesHandle?.onHide();
    if (mode === 'map' && changed) window.LeonidaMap?.map?.invalidateSize?.();
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
    if (push) {
      history.pushState({ view: mode }, '', selfUrl(mode === DEFAULT_MODE ? '' : `#view=${mode}`));
      ga('event', 'page_view', { page_location: location.href, page_title: document.title });
      ga('event', 'view_mode_change', { mode });
    }
  }

  // '#view=relations&char=x' — тоже relations: режим держит префикс, персонажа читает ядро
  const modeFromHash = () => {
    const m = location.hash.match(/^#view=([a-z]+)/);
    if (m) return m[1];
    return location.hash ? DEFAULT_MODE : null;
  };

  sw.querySelectorAll('.vs-btn').forEach((b) => {
    if (!MODES.includes(b.dataset.view)) { b.hidden = true; return; }
    b.addEventListener('click', () => { if (mode !== b.dataset.view) apply(b.dataset.view, true); });
  });
  // Переключатель показывается, только когда есть из чего выбирать
  if (MODES.length > 1) sw.hidden = false;

  // Крупный сегмент (23-09) бывает шире кадра ноутбука, а на телефоне, где он растянут на кадр,
  // длинная подпись (BEZIEHUNGEN) шире своей четверти. Меряем оба случая и, если не влезает,
  // сжимаем кегль через --vs-scale (style.css): сегмент целиком — по ширине кадра, кнопку — по
  // её собственной ширине. Итоговую высоту сегмента пишем в --vs-h на кадр: от неё считаются
  // верхний отступ плитки и позиции кнопок графа (24-09 — константы расходились с кеглем).
  // Перемер — на resize и после загрузки шрифта: до неё подписи набраны запасным шрифтом.
  function fitSwitch() {
    sw.style.setProperty('--vs-scale', 1);
    let scale = Math.min(1, (frame.clientWidth - 16) / sw.scrollWidth);
    // Кнопка: ширина текста (Range) против места внутри полей. scrollWidth кнопки не годится —
    // в нём поля, и подпись после ужатия всё равно обрезалась на пару пикселей.
    const range = document.createRange();
    sw.querySelectorAll('.vs-btn:not([hidden])').forEach((b) => {
      const cs = getComputedStyle(b);
      // Ширина дробная (getBoundingClientRect), а не clientWidth: прежний допуск +1px на округление
      // clientWidth пропускал RELATIONS на 390px (текст 82.6 при месте 81.6) — подпись резалась
      // многоточием «RELATIO…» (02-10). Без округления допуск нужен только на погрешность float.
      const room = b.getBoundingClientRect().width - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth)
        - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      range.selectNodeContents(b);
      const text = range.getBoundingClientRect().width;
      if (text > room + 0.1) scale = Math.min(scale, (room / text) * 0.97);
    });
    if (scale < 1) sw.style.setProperty('--vs-scale', scale.toFixed(3));
    frame.style.setProperty('--vs-h', `${sw.offsetHeight}px`);
    measurePlate();
  }

  // На телефоне кадр ARTICLES/NEWS растёт по контенту, а MAP и RELATIONS держали свои высоты —
  // кадр прыгал при переключении (владелец 24-09). Меряем высоту плитки и отдаём её в --plate-h
  // (style.css, мобильный блок). Плитка в чужом режиме скрыта, поэтому класс её режима ставится
  // на время замера и тут же снимается: всё синхронно, до отрисовки кадра, — мигания нет.
  // Высоты у ARTICLES и NEWS одинаковы: картинки держат aspect-ratio, заголовки обрезаны строками.
  function measurePlate() {
    const plateMode = ['articles', 'news'].find((m) => MODES.includes(m));
    if (!plateMode || !window.LHLayout?.narrow()) { frame.style.removeProperty('--plate-h'); return; }
    // На время замера — ровно один класс режима, плиточного: чужой (view-relations) своим
    // правилом прятал бы плитку, и замер давал 2px (одна рамка кадра).
    const saved = frame.className;
    const before = frame.style.getPropertyValue('--plate-h');
    frame.className = `${saved.replace(/\bview-\S+/g, '').trim()} view-${plateMode}`;
    const h = frame.offsetHeight;
    frame.className = saved;
    frame.style.setProperty('--plate-h', `${h}px`);
    // Кадр карты сменил высоту — Leaflet сам этого не видит (как после display:none).
    if (before !== `${h}px` && mode === 'map') window.LeonidaMap?.map?.invalidateSize?.();
  }
  let fitQueued = false;
  const queueFit = () => {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => { fitQueued = false; fitSwitch(); });
  };
  if (!sw.hidden) {
    fitSwitch();
    window.addEventListener('resize', queueFit);
    document.fonts?.ready.then(queueFit);
    // Кириллица/иероглифы подгружаются лениво уже ПОСЛЕ ready: первый замер шёл по запасному (широкому) шрифту
    // и навсегда оставлял кегль ужатым (RU на 375px: 0.54 вместо 1.0, 11-10). Перемер по каждой догрузке.
    document.fonts?.addEventListener?.('loadingdone', queueFit);
  }

  // Back/forward браузера восстанавливает режим без нового pushState (чистый URL = дефолт,
  // сохранённый выбор тут не участвует); выбранного в графе персонажа по тому же событию
  // восстанавливает ядро (свой popstate-слушатель)
  window.addEventListener('popstate', () => apply(modeFromHash() || DEFAULT_MODE, false));

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  apply(modeFromHash() || saved || DEFAULT_MODE, false);
})();
