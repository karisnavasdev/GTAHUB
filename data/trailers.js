// ===== TRAILERS (p2-10) — единственный дом: MEDIA → OFFICIAL =====
// youtubeId:null -> плеер рисует "COMING SOON". Новый трейлер = новая запись здесь, UI подхватит сам.
// youtubeId — те же ID, что в wiki-src/src/content/trailers/trailer-{1,2}.md (video-embed iframe).
// wikiSlug — статья с разбором; wikiTitle — её реальное название (frontmatter name:), кнопка в
// плеере показывает его вместо общего "View on wiki" (render.js trailerPlayer).
window.TRAILERS = [
  { id: "t1", label: "TRAILER 1", youtubeId: "QdBZY2fkU-0", releaseDate: null,
    wikiSlug: "trailers/trailer-1", wikiTitle: "GTA 6 Trailer 1 — The First Reveal" },
  { id: "t2", label: "TRAILER 2", youtubeId: "VQRLujxTm3c", releaseDate: null,
    wikiSlug: "trailers/trailer-2", wikiTitle: "GTA 6 Trailer 2 — Captured on PS5" },
  { id: "t3", label: "TRAILER 3", youtubeId: "tJbzMqJGH4k", releaseDate: null,
    wikiSlug: "trailers/trailer-3", wikiTitle: "GTA 6 Trailer 3: An Extended Look" }
];
