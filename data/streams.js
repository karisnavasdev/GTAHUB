// ===== LIVE STREAMS — Twitch (static draft, фаза 1) =====
// Ячейка дока STREAMS (слой 2) + окно плеера (слой 3, windows.js openStream). Ручной список каналов,
// которые стабильно стримят GTA (RP / GTA V сейчас, GTA 6 с релиза). Превью — публичная
// картинка Twitch (Render.twitchThumb), обновляется сама, ключ не нужен; офлайн-канал показывает
// штатную заглушку Twitch. Живой список: воркер media-hub ходит в Twitch Helix (топ стримов по игре,
// live/зрители/заголовок) и подменяет список на месте (как media-live.js) — формат тот же,
// плюс поля live:boolean, viewers:number, title:string. Воркер готов (src/streams.js), ждёт ключей Twitch.
window.TWITCH_STREAMS = [
  { channel: 'xqc',       name: 'xQc',       tag: 'GTA RP' },
  { channel: 'summit1g',  name: 'summit1g',  tag: 'GTA RP' },
  { channel: 'buddha',    name: 'Buddha',    tag: 'GTA RP' },
  { channel: 'sykkuno',   name: 'Sykkuno',   tag: 'GTA RP' },
  { channel: 'ramee',     name: 'Ramee',     tag: 'GTA RP' },
  { channel: 'penta',     name: 'Penta',     tag: 'GTA RP' },
  { channel: 'koil',      name: 'Koil',      tag: 'GTA RP' },
  { channel: 'fuslie',    name: 'fuslie',    tag: 'GTA RP' }
];
