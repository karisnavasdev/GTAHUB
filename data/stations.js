// ===== RADIO STATIONS — Vice FM =====
// Контракт данных как у остальных data/*.js: замена на fetch('/data/stations.json') не меняет radio.js.
// 23-08: 12 mp3 из Music/ поровну по двум станциям; первый трек в списке — стартовый (розовая VICE FM —
// Gravity, оранжевая LEONIDA TALK — Burning, по просьбе владельца). Станции пока одинаковые по стилю —
// так задумано до появления разного материала. url треков — от корня (/assets/...), не относительный:
// этот файл грузится и со страниц вики (/wiki/characters/slug/) через RadioDock.astro — относительный
// путь резолвился бы от их URL, не от сайта, и тут же падал бы ошибкой загрузки.
window.RADIO_STATIONS = [
  {
    id: "vice-fm",
    name: "VICE FM",
    tagline: "Synth. Neon. Ocean Drive.",
    tracks: [
      { title: "Gravity Of The Intersection", url: "/assets/music/Gravity_Of_The_Intersection.mp3", duration: 0 },
      { title: "Chrome and Salt", url: "/assets/music/Chrome_and_Salt.mp3", duration: 0 },
      { title: "Made of Motion", url: "/assets/music/Made_of_Motion.mp3", duration: 0 },
      { title: "Midnight Avenue", url: "/assets/music/Midnight_Avenue.mp3", duration: 0 },
      { title: "Midnight Velocity", url: "/assets/music/Midnight_Velocity.mp3", duration: 0 },
      { title: "Two Stars Colliding Night", url: "/assets/music/Two_Stars_Colliding_Night.mp3", duration: 0 }
    ]
  },
  {
    id: "leonida-talk",
    name: "LEONIDA TALK",
    tagline: "Call-in chaos, 24/7.",
    tracks: [
      { title: "Burning Through The Night", url: "/assets/music/Burning_Through_The_Night.mp3", duration: 0 },
      { title: "Chrome Boulevard", url: "/assets/music/Chrome_Boulevard.mp3", duration: 0 },
      { title: "Magnetic Velocity", url: "/assets/music/Magnetic_Velocity.mp3", duration: 0 },
      { title: "Midnight Ignition", url: "/assets/music/Midnight_Ignition.mp3", duration: 0 },
      { title: "Two Stars Colliding", url: "/assets/music/Two_Stars_Colliding.mp3", duration: 0 },
      { title: "Violet Boulevard", url: "/assets/music/Violet_Boulevard.mp3", duration: 0 }
    ]
  }
];
