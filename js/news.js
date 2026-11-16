// ===== FEEDS =====
(function () {
  const t = (s) => window.Render.t(s);

  // --- WEAZEL: выпуск из пула (data/news-data.js, docs/PROMPT_weazel_pool_rotation.md) ---
  // Два выпуска в сутки, один и тот же у всех посетителей: не random, а окно по кругу от номера
  // полусуток — соседние выпуски не пересекаются, карточка возвращается через полный круг пула
  // (34 сатиры по 4 → ~4 дня). Слот [D] (type:'ad') — в каждом выпуске последним. Текст — по
  // локали хаба (HUB_I18N.locale: ru / es / pt-br / fr / de), нет перевода → EN. Метка времени
  // правдоподобная и стабильная в пределах выпуска (хэш id+выпуск), не прыгает при перезагрузке.
  const L = window.HUB_I18N?.locale || 'en';
  const loc = (n) => n[L] || n[L.split('-')[0]] || n.en;
  const issueNo = Math.floor(Date.now() / 43200000);
  const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  const pick = (arr, n) => Array.from({ length: n }, (_, k) => arr[(issueNo * n + k) % arr.length]);
  const ago = (m) => m < 60 ? t('{n} min ago').replace('{n}', m) : t('{n} h ago').replace('{n}', Math.floor(m / 60));
  const card = (n, time) => Object.assign({}, n, loc(n), { time }); // Render.feedItem/fullCard читают title/body/category/type
  const pool = window.WEAZEL_POOL;
  const satire = pick(pool.filter(n => n.type !== 'ad'), 4)
    .map(n => [n, 1 + hash(n.id + issueNo) % 599])
    .sort((a, b) => a[1] - b[1])                 // свежие сверху, как в ленте
    .map(([n, m]) => card(n, ago(m)));
  const ads = pool.filter(n => n.type === 'ad').map(n => card(n, t('Sponsored')));
  window.WEAZEL_NEWS = satire.concat(ads);      // windows.js читает при открытии окна SATIRE
  // Геймификация ленты: клик -> раскрытие (+1 RP), лайк/дизлайк -> +2 RP (по разу на новость)
  const reactions = {};                       // { key: {up,down,voted} } — в сессии; Respect-события персистятся
  const ensureReaction = (key, n, i) =>
    reactions[key] || (reactions[key] = { up: n.likes ?? (3 + (i * 7) % 20), down: n.dislikes ?? (i * 3) % 6, voted: null });
  // Общий голос: используется и доком (twins-карточки), и полным окном (aw-card), и скриншотами
  // (OFFICIAL-сетка + лайтбокс) — все несут data-key. opts.likeAmount — скриншоты награждают
  // отдельной, более крупной суммой за лайк, в отличие от общей реакции на новости (+2 за любое
  // направление) — см. вызовы в windows.js.
  // round-6: дизлайк тоже награждается (меньше, чем лайк) — раньше respect был только за лайк,
  // что явно толкало людей лайкать что попало ради очков вместо честной оценки.
  const vote = (key, type, opts) => {
    const r = reactions[key];
    if (!r) return;
    if (r.voted === type) { r[type]--; r.voted = null; }
    else { if (r.voted) return; r.voted = type; r[type]++; }
    document.querySelectorAll(`[data-key="${key}"]`).forEach(card => {
      const b = card.querySelector(`.fa-btn[data-r="${type}"]`);
      if (!b) return;
      b.classList.toggle('active', r.voted === type);
      b.querySelector('span').textContent = r[type];
    });
    if (r.voted !== type) return; // голос сняли — respect не начисляем
    if (opts?.likeAmount) {
      const amount = type === 'up' ? opts.likeAmount : Math.ceil(opts.likeAmount / 3);
      // Показываем начисленное, а не запрошенное: сверх дневного потолка award платит меньше
      // (мягкий кап, 16-08(8)).
      const paid = window.Respect.award(`shot-${type}-${key}`, amount, 'once');
      if (paid && opts.anchorEl) window.Respect.popup(opts.anchorEl, `+${paid} RESPECT`);
    } else {
      window.Respect.award(`react-${key}`, 2, 'once');
    }
  };
  window.NewsReactions = { ensureReaction, vote };
  // Ключ реакции: стабильный id карточки (Weazel — id из пула, LIVE WIRE — n-<id> из Supabase), чтобы
  // react-<id> не обнулялся сменой выпуска/обновлением ленты; у хардкода LIVE WIRE без id — позиция.
  const item = (n, i, feed) => {
    const key = n.id || `${feed}-${i}`;
    return window.Render.feedItem(n, key, ensureReaction(key, n, i));
  };
  const fill = (id, arr, feed) => {
    const el = document.getElementById(id);
    const html = arr.map((n, i) => item(n, i, feed)).join('');
    el.innerHTML = html + html;               // дубль для бесшовного скролла
  };
  fill('intelInner', window.INTEL_NEWS, 'intel');
  fill('weazelInner', window.WEAZEL_NEWS, 'weazel');
  // Живая лента (js/news-live.js) подменила INTEL_NEWS на месте — перерисовать колонку дока.
  document.addEventListener('intel-updated', () => fill('intelInner', window.INTEL_NEWS, 'intel'));

  // p2-11: плитки Wiki (скрин + счётчик записей), данные из data/wiki-meta.js
  window.Render.renderWikiLinks();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // p2-12 (v2.2): Promo Billboard — читает SPOTLIGHT_CARDS (data/spotlight.js), shuffle при загрузке,
  // ротация 15 сек, пауза при hover, glitch-переход 300ms.
  // window.shuffleArray — тот же Fisher-Yates нужен и windows.js (MEDIA-плеер, "мешок" следующих
  // видео), выносим единой точкой правды вместо копии в каждом файле.
  const shuffle = window.shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const billboardEl = document.getElementById('billboard');
  // 26-09 (владелец, «залочим последовательность»): первые показы закреплены на всех экранах —
  // Lucia → Dazed (Рокси) → NPC → Countdown → Dre'Quan → Gameplay → Editions, дальше shuffle.
  const PROMO_FIRST = ['lucia', 'dazed-magazine-cover-story', 'npc-ai', 'gta-6-countdown', 'drequan-priest', 'gameplay-overview', 'editions'];
  const promoOrder = shuffle([...window.SPOTLIGHT_CARDS]);
  const first = PROMO_FIRST.map(id => promoOrder.find(c => c.id === id)).filter(Boolean);
  promoOrder.splice(0, promoOrder.length, ...first, ...promoOrder.filter(c => !first.includes(c)));
  // Акцент — по номеру показа, не по карточке: при каждой смене новый цвет по кругу (по запросу).
  const PROMO_ACCENTS = ['#4fa8ff', 'var(--orange)', 'var(--pink)', 'var(--teal)'];
  let promoIdx = 0;
  let promoPaused = false;
  const renderPromo = () => {
    billboardEl.innerHTML = window.Render.billboardCard(promoOrder[promoIdx], PROMO_ACCENTS[promoIdx % PROMO_ACCENTS.length]);
  };
  renderPromo();
  // Пауза по hover — только там, где hover настоящий. На телефоне касание (в т.ч. скролл
  // пальцем по щиту) шлёт mouseenter без парного mouseleave, и ротация вставала на первой
  // карточке навсегда (владелец 25-09: «дальше NPC не переключается»).
  if (window.matchMedia('(hover: hover)').matches) {
    billboardEl.addEventListener('mouseenter', () => promoPaused = true);
    billboardEl.addEventListener('mouseleave', () => promoPaused = false);
  }
  // Смена карточки — контент, а не украшение: крутится и при prefers-reduced-motion (на
  // телефонах его включает энергосбережение, и щит навсегда застывал на первой карточке).
  // Под reduced-motion убран только glitch-переход — карточка меняется мгновенно.
  setInterval(() => {
    if (promoPaused) return;
    promoIdx = (promoIdx + 1) % promoOrder.length;
    if (reduceMotion) { renderPromo(); return; }
    billboardEl.classList.add('pb-glitch');
    setTimeout(() => { renderPromo(); billboardEl.classList.remove('pb-glitch'); }, 300);
  }, 15000);

  // STREAMS (data/streams.js): одна плитка канала в ячейке дока, смена по ↻ и сама раз в 20 с
  // (пауза при hover, как биллборд). Живой список воркера (media-live.js) приходит событием
  // streams-updated — начинаем с его первого (самого смотримого) канала. Клики — windows.js.
  const streamsEl = document.getElementById('streamsBody');
  if (!window.SITE_CONFIG.streamsEnabled) {
    // Пауза: серый оверлей COMING SOON на всю ячейку (тот же шаблон, что у SECRET), кнопки под ним.
    streamsEl.closest('.dock-cell').insertAdjacentHTML('beforeend', window.Render.secretComingSoon());
  } else {
    let streamIdx = 0;
    const renderStream = () => {
      const list = window.TWITCH_STREAMS;
      streamIdx %= list.length;
      streamsEl.innerHTML = window.Render.streamTile(list[streamIdx]);
    };
    renderStream();
    document.getElementById('streamsNext').addEventListener('click', () => { streamIdx++; renderStream(); });
    document.addEventListener('streams-updated', () => { streamIdx = 0; renderStream(); });
    if (!reduceMotion) {
      let streamPaused = false;
      streamsEl.addEventListener('mouseenter', () => streamPaused = true);
      streamsEl.addEventListener('mouseleave', () => streamPaused = false);
      setInterval(() => { if (!streamPaused) { streamIdx++; renderStream(); } }, 20000);
    }
  }

  // OFFICIAL: мини-строка превью скриншотов (без лайков — голосование живёт только в MEDIA → OFFICIAL, CORE_SPEC Принцип 3)
  // Полный SCREENSHOTS (data/official-shots.js) — 88 плиток, для компактной строки в доке берём только
  // первые несколько со ссылкой в вики (полный сгруппированный список — в окне MEDIA → OFFICIAL).
  // data-id — деп-линк на карточку внутри окна (клик обрабатывается в windows.js)
  const officialPreview = window.SCREENSHOTS.filter(s => s.wikiSlug).slice(0, 6);
  document.getElementById('officialShots').innerHTML = officialPreview.map(s => window.Render.shotThumb(s)).join('');

  // PIP "TRAILER LOOP" — фоновый автоплей-луп реального трейлера (data/trailers.js), без звука
  // (это превью, не плеер) и без своего плеер-контрола, клик всё равно открывает MEDIA → OFFICIAL
  // (см. windows.js officialPip listener) — iframe только декоративный, pointer-events:none в CSS.
  const pipTrailer = window.TRAILERS.find(tr => tr.youtubeId);
  if (pipTrailer) {
    const pipEl = document.getElementById('officialPip');
    pipEl.innerHTML =
      `<iframe src="https://www.youtube.com/embed/${pipTrailer.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${pipTrailer.youtubeId}&controls=0&modestbranding=1" frameborder="0" allow="autoplay"></iframe>`;
    // Клик по лупу должен открывать именно тот трейлер, что в нём играет (см. windows.js officialPip listener) —
    // а не последний выбранный вручную в MEDIA -> OFFICIAL (lh_last_trailer может указывать на другой).
    pipEl.dataset.trailerId = pipTrailer.id;
  }

  // Раз в ~10 сек один тумбнейл "дышит" (подсказка кликабельности), без автопрокрутки ленты
  if (!reduceMotion) {
    setInterval(() => {
      const shots = document.querySelectorAll('#officialShots .shot');
      if (!shots.length) return;
      const pick = shots[Math.floor(Math.random() * shots.length)];
      pick.classList.add('breathe');
      setTimeout(() => pick.classList.remove('breathe'), 1200);
    }, 10000);
  }

  // Делегирование: работает и на дублях (состояние синхронится по data-key)
  document.querySelectorAll('.feed-scroll').forEach(scroll => {
    scroll.addEventListener('click', e => {
      const itemEl = e.target.closest('.feed-item');
      if (!itemEl) return;
      const key = itemEl.dataset.key;
      const twins = scroll.querySelectorAll(`.feed-item[data-key="${key}"]`);
      const btn = e.target.closest('.fa-btn');

      if (btn) {                              // лайк / дизлайк (повторный клик по тому же — отмена голоса)
        vote(key, btn.dataset.r);
        return;
      }
      // клик по новости -> раскрытие
      const open = !itemEl.classList.contains('open');
      twins.forEach(t => t.classList.toggle('open', open));
      if (open) window.Respect.award(`expand-${key}`, 1, 'once');
    });
  });

  // VOTD: ротация реальных видео с YouTube (data/media-feed.js). Превью — публичный
  // i.ytimg.com/vi/<id>/hqdefault.jpg, без API-ключа. Клик — встроенный плеер (windows.js
  // openVideoPlayer), не редирект на youtube.com.
  let votdIdx = 0;
  const votdThumb = document.getElementById('votdThumb');
  const votdThumbImg = document.getElementById('votdThumbImg');
  const votdTitle = document.getElementById('votdTitle');
  const renderVotd = () => {
    const v = window.VOTD_LIST[votdIdx];
    votdThumbImg.src = window.Render.ytThumb(v.id);
    votdThumbImg.alt = v.title;
    votdTitle.textContent = v.title;
  };
  renderVotd();
  document.addEventListener('media-feed-updated', () => { votdIdx = 0; renderVotd(); });
  votdThumb.addEventListener('click', () => window.openVideoPlayer(window.VOTD_LIST[votdIdx], 'video'));
  document.getElementById('votdRefresh').addEventListener('click', e => {
    e.stopPropagation();
    votdIdx = (votdIdx + 1) % window.VOTD_LIST.length;
    renderVotd();
  });

  // "online now" — драфт-заглушка; заменится на Supabase presence.
  // Инерционный дрейф к медленно меняющейся цели: не больше ±4% за тик,
  // иначе счётчик прыгал 1059 → 570 за пару минут (USER_FLOWS_01-09, трение-4).
  const on = document.getElementById('onlineNum');
  let v = 940 + Math.floor(Math.random() * 120);
  let target = v;
  const drift = () => {
    if (Math.random() < 0.15) target = 600 + Math.floor(Math.random() * 550);
    const step = Math.round((target - v) * 0.08) + Math.floor(Math.random() * 11) - 5;
    const cap = Math.max(3, Math.round(v * 0.04));
    v = Math.max(250, v + Math.max(-cap, Math.min(cap, step)));
    on.textContent = v.toLocaleString();
  };
  drift(); setInterval(drift, 4000);

  // Fullscreen map toggle
  const deck = document.querySelector('.deck');
  document.getElementById('fsBtn').addEventListener('click', () => {
    deck.classList.toggle('fs');
    setTimeout(() => window.dispatchEvent(new Event('resize')), 60); // Leaflet re-measure
  });
})();
