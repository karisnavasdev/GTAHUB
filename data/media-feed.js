// ===== VIDEO OF THE DAY / MEDIA -> VIDEOS / MEDIA -> SHORTS -- резервный список =====
// СГЕНЕРИРОВАН (workers/media-hub/tools/feed-to-js.mjs), руками не править. Снимок выдачи
// YouTube Data API v3, прогнанный через ту же политику отбора, что и воркер
// (workers/media-hub/src/filter.js): без сливов, только англоязычное и только про GTA 6,
// порог просмотров, максимум 2 ролика на канал, три корзины -- набирающие / популярное за
// неделю / крупное за месяц.
//
// Зачем он нужен при живом воркере: пока SITE_CONFIG.mediaFeedUrl = null, показывается именно
// этот список. И после деплоя он остаётся фолбэком -- если воркер лёг или KV пустой,
// js/media-live.js молча оставит эти массивы, и вкладки MEDIA не опустеют.
//
// Как обновить -- workers/media-hub/README.md, раздел «Обновить резервный список».
// Превью -- хотлинк i.ytimg.com/vi/<id>/hqdefault.jpg, к себе ничего не перезаливаем.
window.VOTD_LIST = [
  { id: "mYy9RBNv-vQ", title: "Every GTA 6 Safehouse Explained", channel: "Grid" },
  { id: "w1KTL2hCDFE", title: "Overanalyzing GTA 6 Trailer 2 One Last Time Before Trailer 3", channel: "RENZI" },
  { id: "Gn6U79uCBZE", title: "Exploring the GTA 6 Map in 3D Feels HUGE", channel: "Dr Mod" },
  { id: "iNFBj2pr9us", title: "Why GTA 6 Gameplay Is Coming To NETFLIX First", channel: "gameranx" },
  { id: "9kM_bUrRdHQ", title: "Why GTA 6 Might Skip Trailer 3", channel: "gameranx" },
  { id: "TwmIRrVgrE4", title: "The most insane GTA 6 story yet...", channel: "Luke Stephens" },
  { id: "mTK88IF6SUM", title: "GTA 6 Gameplay – 15 Minutes of Open World Vice City Gameplay (4K PS5) *Fan Made Concept Graphics*", channel: "DubStepZz" },
  { id: "6wx8j04kdqA", title: "I made the GTA 6 MAPPING PROJECT in CIties Skylines 2", channel: "noasden" },
  { id: "ufltp9aCycI", title: "Take-Two Just Revealed A Lot About GTA 6", channel: "DarkViperAU" },
  { id: "6Ol1ztmBFNI", title: "GTA 6 TRAILER 3 OFFICIALLY CONFIRMED! Everything You Need to Know!", channel: "DarkViperAU" },
  { id: "kAJMlCvRInY", title: "The GTA 6 MAP Explained", channel: "T5G" },
  { id: "Bxn-S9RwPgY", title: "NEW GTA 6 Mapping Project Update Explained [Yanis's V14]", channel: "Saukko505" },
  { id: "_WSuejHG_Uo", title: "The Perfect GTA 6 Online", channel: "Grid" },
  { id: "-IVEqM_OMEs", title: "GTA 6’s Netflix Reveal Is NOT What You Think", channel: "Hazard" },
  { id: "QpeFRoiXC5o", title: "The GTA VI Mapping Project & The Real Locations Behind Leonida", channel: "Badger Goodger" },
  { id: "7Y6Klb-aH-g", title: "We Just More INSANE Info On GTA 6's Netflix Extended Look Gameplay Trailer!", channel: "MrBossFTW" },
  { id: "y1alJ--dEOk", title: "The GTA 6 Map Will Be So Insane! Mapping Project Update", channel: "SubscribeForTacos" },
  { id: "8aELarVt3q8", title: "Breaking Down GTA 6 Trailer 2... 440 Days Later", channel: "ROBOTBOY" },
  { id: "TZRfFDcXMNY", title: "GTA 6 - Latest Map (August 2026)", channel: "GTA6Videos" },
  { id: "CszQcz6S1_w", title: "GTA 6 Gloriana is a Lie.", channel: "Saukko505" },
  { id: "vLQsMGA17FM", title: "What If GTA 6 Had a SECOND State? (Leonida + Gloriana)", channel: "Saintsfan" },
  { id: "R339lY0D5Vo", title: "This Is What The GTA 6 Map Looks Like 100 Days From Release!", channel: "MrBossFTW" },
  { id: "E_N-0co6MSU", title: "The MAP gets HUGE UPDATE in GTA 6 (Extended Look)", channel: "GTA infinity" },
  { id: "KkcOyoPdkoA", title: "He Created The GTA 6 Map Before Grand Theft Auto 6...", channel: "InkTV" }
];

window.SHORTS_LIST = [
  { id: "fGwn9vhbII4", title: "GTA 6 vs GTA 5 😱 Map Size & Storage Comparison! #GTA6 #GTA5", channel: "Pixelnova" },
  { id: "EW6Ur9Qmuxo", title: "The Hidden Police Detail Everyone Missed In The GTA 6 Trailer!  #gta #gta6 #gtavi", channel: "LocaRishi" },
  { id: "iGCsRstmrGs", title: "The RAREST edition GTA IV released from Grand Theft Auto 6 🥲 #gta", channel: "oncewasted" },
  { id: "4TPsSFuHVng", title: "Rockstar cooked with GTA6...", channel: "Goboola" },
  { id: "jLr8Tu6s8i4", title: "GTA 6 Realization Hit Too Hard 🥹", channel: "Non Geek" },
  { id: "uodaaju9KZI", title: "The larpers are pissed😭 #gaming #gamingshorts #gta6 #gtaonline #gta #rockstargames #gamingvideos", channel: "TonyCeno" },
  { id: "tFClqo-oGiA", title: "Jeffy Trades Tim for GTA 6 🎮😂", channel: "Tim and Jeffy" },
  { id: "dCI5Aw3vICM", title: "🔥 GTA 6 Aa Rahi Hai! 😱 | Franklin, Michael & Trevor Ka Last Mission 😂#shorts #viral", channel: "ERROR AI" },
  { id: "8LYYVR0VzP0", title: "\"GTA 6 map is massive 💀 worth the wait\"\"~mini wowoodworkingod toy - art / hand craft /skills", channel: "Meenu Zz" },
  { id: "87rzEnKyamE", title: "Rockstar NEEDS to Fix This in GTA6 💀", channel: "YUMITO" },
  { id: "0mIF7wzixzE", title: "Police GTA VI Persuit Is CRAZY 💀😂", channel: "GTA Mastermind" },
  { id: "Aar7Umw3GuI", title: "Can My Brother Steal GTA 6 in GTA 5 for an Expensive Iron Man Hot Toy 😱", channel: "Scalpo" },
  { id: "Cjm3DL7dWFk", title: "Steven Ogg Doesn't Care About GTA 6 💀", channel: "MIKO" },
  { id: "Sy-EhG8_SOM", title: "PS4 Users After GTA 6 Said \"Not Invited\" 💀😭 #gta6memes # #america #usashorts #shorts #shortsfeed", channel: "Ninjasze" },
  { id: "XpEJ1tUHQbI", title: "Michael Was One Step Away... 💀#gta5 #gtav #gta6 #gtavi #gta #gtafunny #gaming #shorts  #gta6news", channel: "Afridi Reloaded" },
  { id: "bFsKNJLlq8U", title: "I Promised My Boyfriend GTA 6… BIG MISTAKE😭💀 #trending #viral #shortvideo #shortsfeed #shorts #gta6", channel: "Nik's Kitchen" },
  { id: "qq76pQsI1iw", title: "Grand Theft Auto VI: An Extended Look Coming August 27", channel: "Rockstar Games" },
  { id: "DXUOdAejFZc", title: "When You Install GTA 6 From Ipad 😂😂 #shorts #funny #gta6", channel: "UT Animations" },
  { id: "EaIlxp8VL8w", title: "Rampage Jackson Bought a PS5 for GTA 6 Then This Happened #rampagejackson #rampage", channel: "Clips Edge" },
  { id: "mqfykAtow3Q", title: "Bro Still Waiting for GTA 6 🎮😭", channel: "LoomZ" },
  { id: "bvIleU8JNLE", title: "GTA 6 Will Be The Last Big Triple A Game", channel: "Jonny RaZeR" },
  { id: "n7gZt_CI6Jk", title: "GTA 6 Déjà Vu Hits Hard 😭🎮", channel: "YashZ" },
  { id: "JJMODZV4wdE", title: "Franklin Just Did The Impossible.💀#gta5 #gtav #gta6 #gtavi #gta #gtafunny #gaming #shorts  #gta6news", channel: "Afridi Reloaded" },
  { id: "ujEMRxG5xPM", title: "GTA6 Ep. 9", channel: "Adhemz" },
  { id: "7Hq-kzBoZns", title: "GTA 6 Might Be My Last Game… And PS5 My Last PlayStation 💔🎮", channel: "HaHaX things " },
  { id: "jaLTSGZbIJM", title: "Why haven’t they started marketing GTA 6?? #carterpcs #tech #gta6 #gta", channel: "CarterPCs" },
  { id: "HTmzzwhgczg", title: "Follow for Amanda🥰 #gaming #gta6 #ps5 #xbox #pcgaming", channel: "Sumit Gaming" },
  { id: "PUdVV0-Ed8s", title: "GTA 6 REVEAL PAYWALLED #shorts", channel: "jacobweeby" },
  { id: "MyjVI2-mlEk", title: "The GTA 5 secret NOBODY noticed before Grand Theft Auto VI 🤯 #gta", channel: "oncewasted" },
  { id: "042rXChTZdQ", title: "The Only Game That Can Beat GTA 6", channel: "WebCrawler616" }
];
