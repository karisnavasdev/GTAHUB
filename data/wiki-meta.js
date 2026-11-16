// ===== WIKI META — счётчики записей (p2-11) =====
// href — относительные /wiki/..., .claude/serve.ps1 проксирует их на wiki-src (dev-сервер :4321)
// прозрачно, тот же путь будет и в проде (пульт = корень, wiki = /wiki/, см. WIKI_SPEC §6).
// missions — коллекция уже заведена в content.config.ts, но без реальных записей (нет релиза GTA VI),
// открывается так же, как сейчас vehicles: "No entries yet — check back soon".
// count ниже — снимок реального количества статей на момент правки (не хардкод "с потолка"),
// но единственный источник правды — сама wiki-коллекция. Актуализируем через fetch('/wiki/counts.json')
// (см. wiki-src/src/pages/wiki/counts.json.ts) сразу после загрузки — если wiki-дев-сервер недоступен
// (см. CLAUDE.md wiki-src про 502 без второго сервера), тихо остаёмся на этом снимке.
// img — обложка из frontmatter соответствующей -overview.md статьи (wiki-src/src/content/<cat>/),
// файлы физически лежат в wiki-src/public/img/media/, отдаются по /img/media/... — serve.ps1
// проксирует этот префикс на wiki-dev-сервер так же, как /wiki (см. CLAUDE.md wiki-src).
// vehicles: индивидуальных статей пока 0 (игра не вышла), но overview-статья с реальным разбором
// confirmed-фактов уже есть — тайл ведёт именно туда, не в пустой список. Сетка — 4 позиции по
// запросу: MISSIONS убран (единственная категория без живого контента и без своей overview-плитки
// с уникальным кадром — vehicles/locations разница нагляднее), CHEATS занял 4-е место.
window.WIKI_META = [
  { id: "characters", label: "CHARACTERS", href: "/wiki/characters/", count: 8, img: "/img/media/real-dimez-04-press.webp" },
  { id: "vehicles", label: "VEHICLES", href: "/wiki/vehicles/", count: 0, img: "/img/media/vintage-vice-city-pack-vapid-stanier-01-edition80.webp" },
  { id: "locations", label: "LOCATIONS", href: "/wiki/locations/", count: 7, img: "/img/media/trailer-1-01-press.webp" },
  { id: "cheats", label: "CHEATS", href: "/wiki/cheats/", count: 1, img: "/img/media/trailer-2-39-press.webp" }
];

fetch('/wiki/counts.json')
  .then(r => (r.ok ? r.json() : null))
  .then(counts => {
    if (!counts) return;
    window.WIKI_META.forEach(item => {
      if (typeof counts[item.id] === 'number') item.count = counts[item.id];
    });
    if (window.Render) window.Render.renderWikiLinks();
  })
  .catch(() => {});
