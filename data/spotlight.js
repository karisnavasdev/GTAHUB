// ===== PROMO BILLBOARD (p2-12, v2.2) — единственный дом: правая колонка, слот под Wiki =====
// Ротатор читает эту витрину; визуал (щит-рамка/болты/scan-lines) — см. render.js billboardCard() + css .pb-frame.
// type:'wiki' -> бейдж WIKI, клик = обычный переход на статичную страницу.
// type:'affiliate' — фаза 2 (сент-окт, см. MONETIZATION_SLOTS_1.md), внешняя ссылка target=_blank.
// img (R2, опционально): картинка-фон карточки; отсутствует/не грузится -> billboardCard() сам падает на текстовый вариант.
// 26-09 (владелец): картинка wiki-карточки = обложка статьи, куда ведёт url (images[0] и её position).
// Её подставляет сборка: wiki-src/scripts/build-featured-articles.js -> window.SPOTLIGHT_MEDIA.
// Свои кропы 640x280 (assets/spotlight/*.jpg, поля img/pos) расходились с обложками — сняты.
// Сменить картинку карточки = сменить обложку статьи.
// type:'lore' (вымышленные in-world бренды, url:null, не кликабельны) временно отключён по запросу —
// каждая карточка должна вести на статью вики, а под Sunshine State Insurance/Ammu-Nation статей нет.
// Вернуть можно, когда либо появятся такие статьи, либо решим оставить lore-карточки как есть.
// round-6: расширено с 3 до 31 карточки по прямому списку владельца (категории + отдельные статьи) —
// картинки не кроп hot-скринов (как планировалось раньше), а обложка самой статьи, см.
// wiki-src/src/content/**/*.md — практичнее, чем резать скрины под 28 новых карточек, и всегда
// тематически точно соответствует статье, на которую ведёт карточка.
// round-7 фикс: приоритет источника картинки был перепутан (heroClipPoster вперёд images[0]) —
// сайт везде (cardImage() в WikiCategoryIndex/WikiHub/RelatedCards.astro) берёт ПЕРВЫМ делом
// images[0].file, heroClipPoster только как фоллбэк если images[] пуст. Пересобрано под это
// правило (для категорий без своей -overview записи источник — картинка первой статьи категории
// по алфавиту файла, подтверждено live-рендером /wiki/, не угадано).
window.SPOTLIGHT_CARDS = [
  { id: 'lucia', type: 'wiki', badge: 'WIKI', title: 'Lucia', tagline: 'Everything we know so far', url: '/wiki/characters/lucia-caminos/' },
  { id: 'port-gellhorn', type: 'wiki', badge: 'WIKI', title: 'Port Gellhorn', tagline: 'The rust belt of Leonida', url: '/wiki/locations/port-gellhorn/' },
  { id: 'vehicles-overview', type: 'wiki', badge: 'WIKI', title: 'Vehicles', tagline: 'Overview of the current roster', url: '/wiki/vehicles/' },
  { id: 'leonida-keys', type: 'wiki', badge: 'WIKI', title: 'Leonida Keys', tagline: 'Florida Keys, but with more secrets', url: '/wiki/locations/leonida-keys/' },
  { id: 'vice-city', type: 'wiki', badge: 'WIKI', title: 'Vice City', tagline: 'The city at the center of it all', url: '/wiki/locations/vice-city/' },
  { id: 'poi-overview', type: 'wiki', badge: 'WIKI', title: 'Points of Interest', tagline: 'Every named spot worth marking', url: '/wiki/locations/poi-overview/' },
  { id: 'wildlife', type: 'wiki', badge: 'WIKI', title: 'Wildlife', tagline: 'All confirmed animals, so far', url: '/wiki/world/' },
  { id: 'characters-overview', type: 'wiki', badge: 'WIKI', title: 'Characters', tagline: 'Meet the cast of Leonida', url: '/wiki/characters/' },
  { id: 'story', type: 'wiki', badge: 'WIKI', title: 'Story', tagline: "What we know about Lucia & Jason's story", url: '/wiki/story/' },
  { id: 'missions', type: 'wiki', badge: 'WIKI', title: 'Missions', tagline: 'Confirmed missions and story beats', url: '/wiki/missions/' },
  { id: 'weapons-overview', type: 'wiki', badge: 'WIKI', title: 'Weapons', tagline: 'Every confirmed weapon so far', url: '/wiki/weapons/' },
  { id: 'activities-overview', type: 'wiki', badge: 'WIKI', title: 'Activities', tagline: 'Confirmed activities vs screenshot guesses', url: '/wiki/activities/' },
  { id: 'guides', type: 'wiki', badge: 'WIKI', title: 'Guides', tagline: 'Beginner tips for Leonida', url: '/wiki/guides/' },
  { id: 'cheats', type: 'wiki', badge: 'WIKI', title: 'Cheats', tagline: 'Every cheat code rumor and confirmation', url: '/wiki/cheats/' },
  { id: 'secrets-overview', type: 'wiki', badge: 'WIKI', title: 'Secrets', tagline: 'Easter eggs and what to expect at launch', url: '/wiki/secrets/' },
  { id: 'gta-vs-gta5', type: 'wiki', badge: 'WIKI', title: 'GTA 6 vs GTA 5', tagline: 'Every confirmed difference', url: '/wiki/gta-vs-gta5/' },
  { id: 'gta-online', type: 'wiki', badge: 'WIKI', title: 'GTA 6 Online', tagline: 'Rumors and expectations for online', url: '/wiki/gta-online/' },
  { id: 'project-rome', type: 'wiki', badge: 'WIKI', title: 'Project ROME', tagline: 'A new Rockstar multiverse', url: '/wiki/project-rome/' },
  { id: 'release', type: 'wiki', badge: 'WIKI', title: 'Release Info', tagline: 'Dates, editions, platforms', url: '/wiki/release/' },
  { id: 'trailers', type: 'wiki', badge: 'WIKI', title: 'Trailers', tagline: 'Every trailer, frame by frame', url: '/wiki/trailers/' },
  { id: 'art', type: 'wiki', badge: 'WIKI', title: 'Official Wallpapers', tagline: 'Every Rockstar art piece so far', url: '/wiki/art/' },
  { id: 'ultimate-edition', type: 'wiki', badge: 'WIKI', title: 'Ultimate Edition', tagline: 'Every confirmed item', url: '/wiki/release/ultimate-edition/' },
  { id: 'vintage-vice-city-pack', type: 'wiki', badge: 'WIKI', title: 'Vintage Vice City Pack', tagline: 'Pre-order bonus, detailed', url: '/wiki/release/vintage-vice-city-pack/' },
  { id: 'gta-6-pc-release-date', type: 'wiki', badge: 'WIKI', title: 'PC Release Date', tagline: 'When PC players can expect it', url: '/wiki/release/gta-6-pc-release-date/' },
  { id: 'jason-duval', type: 'wiki', badge: 'WIKI', title: 'Jason Duval', tagline: "The other half of Leonida's crime story", url: '/wiki/characters/jason-duval/' },
  { id: 'boobie-ike', type: 'wiki', badge: 'WIKI', title: 'Boobie Ike', tagline: 'Vice City clubs, studios and real estate', url: '/wiki/characters/boobie-ike/' },
  { id: 'cal-hampton', type: 'wiki', badge: 'WIKI', title: 'Cal Hampton', tagline: "Jason's friend on the Keys radio", url: '/wiki/characters/cal-hampton/' },
  { id: 'drequan-priest', type: 'wiki', badge: 'WIKI', title: "Dre'Quan Priest", tagline: 'Vice City hustler', url: '/wiki/characters/drequan-priest/' },
  { id: 'raul-bautista', type: 'wiki', badge: 'WIKI', title: 'Raul Bautista', tagline: 'The bank robber recruiting crews', url: '/wiki/characters/raul-bautista/' },
  { id: 'real-dimez', type: 'wiki', badge: 'WIKI', title: 'Real Dimez', tagline: 'The rap duo on Only Raw Records', url: '/wiki/characters/real-dimez/' },
  { id: 'npc-ai', type: 'wiki', badge: 'WIKI', title: 'NPC', tagline: "How Leonida's population reacts to you", url: '/wiki/gameplay/npc-ai/' },
  { id: 'dazed-magazine-cover-story', type: 'wiki', badge: 'WIKI', title: 'Dazed Cover', tagline: "Jason and Lucia's first magazine cover", url: '/wiki/release/dazed-magazine-cover-story/' },
  { id: 'gta-6-countdown', type: 'wiki', badge: 'WIKI', title: 'GTA 6 Countdown', tagline: 'Live timer to launch day', url: '/wiki/release/gta-6-countdown/' },
  { id: 'gameplay-overview', type: 'wiki', badge: 'WIKI', title: 'Gameplay', tagline: 'Every confirmed system so far', url: '/wiki/gameplay/gameplay-overview/' },
  { id: 'editions', type: 'wiki', badge: 'WIKI', title: 'Editions', tagline: 'Standard vs Ultimate, and which to buy', url: '/wiki/release/editions/' }
];
