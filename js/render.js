// ===== RENDER — единственное место, где живут шаблоны карточек =====
// Правило ядра: новый вид карточки = новая функция ЗДЕСЬ, не инлайн в модулях.
window.Render = {
  // --- локализация рантайм-строк (раунд-16, глобал локале-независимый с раунда-19) ---
  // window.HUB_I18N инлайнится билд-скриптом ТОЛЬКО в ru|es|pt-br /index.html. На EN его нет,
  // обе функции работают как identity — английский путь кода не меняется ни на байт.
  // t() — подпись из data/*.js по её же английскому тексту (см. data/i18n-dynamic.<locale>.js).
  t(s) {
    return window.HUB_I18N?.strings?.[s] || s;
  },
  // Экранирование пользовательских строк (хендл и аватар из аккаунта). Остальное в шаблонах —
  // свои данные из data/*.js, их не экранируем, как и раньше.
  esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },
  // Меню аккаунта в шапке (js/store.js): тот же details/summary без JS и те же классы, что у
  // переключателя языка — своего дропдауна не заводим. Состав: имя/аватар, Sign out. Бейдж Vice
  // Crew здесь не дублируем — он в виджете YOUR RESPECT (приёмка 21-08). Строки «Signed in with…»
  // нет нарочно: читалась как кнопка входа (живая приёмка 21-08).
  // «Vice Crew» — маркетинговое имя бейджа, в БД он og_* (is_og/og_number); не переводится.
  userMenu(u) {
    const name = this.esc(u.nick || u.handle || 'Resident');
    const avatar = u.avatar_url
      ? `<img class="user-avatar" src="${this.esc(u.avatar_url)}" alt="" referrerpolicy="no-referrer">`
      : '';
    return `
      <details class="lang-switch user-menu" id="userMenu">
        <summary aria-label="${this.esc(this.t('Account'))}">${avatar}<span class="user-handle">${name}</span> ▾</summary>
        <div class="lang-menu user-menu-list">
          <button type="button" class="user-signout" data-auth="sign-out">${this.t('Sign out')}</button>
        </div>
      </details>`;
  },
  // Плашка Vice Crew #N: в виджете YOUR RESPECT (store.js, вместо «Log in to save…») и в окне
  // RESPECT над объяснением. В шапке её нет нарочно — дублировала пункт меню (приёмка 21-08).
  // Клик — в окно RESPECT, где объяснение механики (store.js, data-auth="crew-info").
  crewBadge(n) {
    return `<button type="button" class="crew-badge" data-auth="crew-info" title="${this.esc(this.t('The first 500 residents of Leonida Hub. Your number is yours for good, and it came with +25 Respect.'))}">Vice Crew #${Number(n) || ''}</button>`;
  },
  // Крючок для гостя в виджете YOUR RESPECT: сколько номеров ещё свободно. Рисуется только когда сервер
  // ответил (store.js spotsLeft !== null). Полный текст крючка — в title кнопки входа и в окне RESPECT.
  crewHook(left) {
    return `<button type="button" class="crew-hook" data-auth="crew-info" title="${this.esc(this.t('Join the Vice Crew — first 500 get numbered badges'))}">${this.esc(this.t('{n} spots left').replace('{n}', Number(left)))}</button>`;
  },
  // Ник (004): публичное имя на доске. Сгенерирован сервером при регистрации; пока игрок ни разу
  // его не менял (nick_changed_at пуст) — форма раскрыта и просит выбрать, потом свёрнута в
  // «Change nick». Отправку и ошибки (занят / рано / не по правилу) обрабатывает store.js.
  nickForm(u) {
    const fresh = !u.nick_changed_at;
    return `
      <details class="nick-edit"${fresh ? ' open' : ''}>
        <summary><span class="nick-label">${this.t('Your nick')}:</span> <b class="nick-cur">${this.esc(u.nick || '')}</b> <span class="nick-change">${this.t(fresh ? 'Pick your nick — it shows on the Respect board' : 'Change nick')}</span></summary>
        <form class="nick-form" data-auth="nick" autocomplete="off">
          <input name="nick" value="${this.esc(u.nick || '')}" maxlength="20" minlength="3" pattern="[A-Za-z0-9_]{3,20}" required spellcheck="false">
          <button type="submit" class="cc-lb-login-btn">${this.t('Save')}</button>
          <span class="nick-msg"></span>
          <span class="nick-hint">${this.t('Letters, digits, underscore — 3 to 20. Next change in 30 days.')}</span>
        </form>
      </details>`;
  },
  // Блок под таблицей в окне RESPECT — единственное место с объяснением Vice Crew. Состояния:
  // гость без SDK (кнопка погашена, как раньше) / гость (крючок + живая кнопка) / участник с
  // номером / залогинен без номера (лимит исчерпан). store.js перерисовывает его на месте при
  // смене auth, чтобы окно не расходилось с шапкой.
  authCta() {
    const store = window.RespectStore;
    const u = store?.user?.();
    if (u) {
      const body = u.is_og
        ? `${this.crewBadge(u.og_number)}<span class="cc-lb-crew">${this.t('The first 500 residents of Leonida Hub. Your number is yours for good, and it came with +25 Respect.')}</span>`
        : `<span class="cc-lb-crew">${this.t('Vice Crew is full — all 500 numbers are taken.')}</span>`;
      return `<div class="crew-card">${body}</div>${this.nickForm(u)}`;
    }
    const ready = !!store?.ready;
    const left = store?.spotsLeft?.();
    const hook = ready
      ? `<span class="cc-lb-hook">${this.t('Join the Vice Crew — first 500 get numbered badges')}${typeof left === 'number' ? ' · ' + this.t('{n} spots left').replace('{n}', left) : ''}</span>`
      : '';
    const btn = ready
      ? `<button class="cc-lb-login-btn" type="button" data-auth="sign-in">${this.t('Log in')}</button>`
      : `<button class="cc-lb-login-btn" type="button" disabled title="${this.t('COMING SOON')}">${this.t('Log in')}</button>`;
    return `<span>🔒 ${this.t('Log in to save your progress')}</span>${btn}${hook}`;
  },
  // wikiHref() — ссылка на ту же статью вики в текущей локали. Локализованная вики живёт под
  // /wiki/<locale>/... (wiki-src/src/i18n/config.ts wikiPath), но переведены НЕ все страницы:
  // список реально существующих путей генерит билд-скрипт из wiki-src/src/content/**/<locale>/.
  // Нет перевода — остаётся английская ссылка, битого урла не появится.
  wikiHref(href) {
    const paths = window.HUB_I18N?.paths;
    if (!paths || !href.startsWith('/wiki/')) return href;
    // Хвостовой слэш добавляется принудительно: у hero-карточек wiki_slug приходит без него
    // ("locations/ambrosia"), а вики отдаёт канонический URL со слэшем — без нормализации
    // сравнение со списком путей не совпадало бы ни разу.
    const localized = href.replace('/wiki/', `/wiki/${window.HUB_I18N.locale}/`).replace(/\/?$/, '/');
    return paths.includes(localized) ? localized : href;
  },
  // Публичный YouTube-тумбнейл без API-ключа (news.js VOTD-виджет использует напрямую на <img>.src,
  // не через шаблон — тот же URL-паттерн, одна точка правды вместо копии в двух файлах).
  ytThumb(id) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  },
  // Подпись источника hero-tile карточки (map.js/hero-tiles.js) — из поля source в hero-tiles.json.
  // Честная атрибуция (CLAUDE.md "Правило иллюстраций"): trailer -> конкретный трейлер, site ->
  // наш собственный скриншот; без бренда Rockstar Games в тексте (юр-гигиена, не подразумевать
  // партнёрство — общий дисклеймер в футере уже покрывает copyright).
  heroAttr(source) {
    if (source === 'trailer-1') return 'Source: Trailer 1';
    if (source === 'trailer-2') return 'Source: Trailer 2';
    if (source === 'site') return 'Source: Leonida Hub';
    return 'Source: Official'; // press
  },
  // Компактная карточка для дока (density: dock)
  feedItem(n, key, r) {
    return `
    <div class="feed-item" data-key="${key}">
      <div class="feed-item-meta"><span class="fi-cat">${n.category}</span><span class="fi-time">${n.time}</span>${n.sponsored ? '<span class="fi-ad-badge">AD</span>' : ''}</div>
      <div class="feed-item-title">${n.title}</div>
      <div class="feed-item-body">${n.body}</div>
      <div class="feed-actions">
        <button class="fa-btn" data-r="up">▲ <span>${r.up}</span></button>
        <button class="fa-btn" data-r="down">▼ <span>${r.down}</span></button>
      </div>
    </div>`;
  },
  // Полная карточка для окна-приложения (density: window). Без плейсхолдеров картинки/источника
  // (владелец 23-08): ссылка на источник — только если в данных есть url (живая лента LIVE WIRE).
  // react — опционально {key, r}: если передан, рисуем те же кнопки лайк/дизлайк, что и в доке (не дублируем шаблон).
  fullCard(n, react) {
    const actions = react ? `
      <div class="feed-actions">
        <button class="fa-btn${react.r.voted === 'up' ? ' active' : ''}" data-r="up">▲ <span>${react.r.up}</span></button>
        <button class="fa-btn${react.r.voted === 'down' ? ' active' : ''}" data-r="down">▼ <span>${react.r.down}</span></button>
      </div>` : '';
    return `
    <article class="aw-card"${react ? ` data-key="${react.key}"` : ''}>
      <div class="aw-card-meta"><span class="fi-cat">${n.category}</span><span class="fi-time">${n.time}</span>${n.sponsored ? '<span class="fi-ad-badge">AD</span>' : ''}</div>
      <h3 class="aw-card-title">${n.title}</h3>
      <p class="aw-card-body">${n.body}</p>
      ${n.url ? `<div class="aw-card-src">SOURCE: <a href="${n.url}" target="_blank" rel="noopener">${n.source || n.url} ↗</a></div>` : ''}
      ${actions}
    </article>`;
  },
  // Простой список ссылок (для будущих wiki-окон). variant: 'cards' — сетка вместо списка.
  // feed — опционально ('intel'/'weazel'): подключает те же лайки/дизлайки, что и в доке, через window.NewsReactions.
  linkList(items, variant, feed) {
    const cls = variant ? `aw-grid aw-grid-${variant}` : 'aw-grid';
    const html = items.map((n, i) => {
      if (!feed) return this.fullCard(n);
      const key = n.id || `${feed}-${i}`; // тот же ключ, что в доке (news.js item)
      const r = window.NewsReactions.ensureReaction(key, n, i);
      return this.fullCard(n, { key, r });
    }).join('');
    return `<div class="${cls}">${html}</div>`;
  },
  // p2-12 (v2.2): Promo Billboard — щит-рамка с болтами/scan-lines, ротатор SPOTLIGHT_CARDS под списком Wiki.
  // type:'wiki' -> клик = обычный переход на статичную страницу (SEO-слой).
  // type:'affiliate' (фаза 2) -> внешняя ссылка, target=_blank/rel=sponsored.
  // accent — цвет по номеру показа (news.js передаёт index % палитры), не по типу карточки: по
  // запросу каждая смена ротации должна давать новый акцент, а не один и тот же цвет для wiki.
  // 25-09 (владелец): первое слово заголовка споттлайта — цветом рамки карточки (--pb-accent).
  // Слово = до первого пробела; заголовки уже локализованы через t(), так что перевод не ломается.
  accentFirstWord(title) {
    const i = String(title).indexOf(' ');
    return i > 0 ? `<span class="pb-brand-first">${title.slice(0, i)}</span>${title.slice(i)}` : `<span class="pb-brand-first">${title}</span>`;
  },
  billboardCard(card, accent) {
    // img опционален: onload помечает карточку как visual (обрезка/затемнение/крупный заголовок),
    // onerror убирает img+scrim -> остаётся обычный текстовый вариант (fallback, слот никогда не пустой).
    // onerror: реального фото ещё нет (R2 пустой) -> держим visual-раскладку (has-img), но фон = временный
    // паттерн вместо фото + метка ph-note "PHOTO PLACEHOLDER". Уйдёт само, когда img.card начнёт грузиться.
    // 26-09: картинка wiki-карточки — обложка самой статьи (images[0] + position), её подставляет
    // сборка в window.SPOTLIGHT_MEDIA (featured-articles.<loc>.js); card.img — только для не-вики.
    const m = window.SPOTLIGHT_MEDIA?.[card.id];
    const img = m ? m.image : card.img;
    const pos = m ? m.pos : card.pos;
    const media = img
      ? `<img class="pb-img" src="${img}" alt="" loading="lazy"${pos ? ` style="object-position:${pos}"` : ''}
           onload="this.closest('.pb-frame').classList.add('pb-has-img')"
           onerror="this.closest('.pb-frame').classList.add('pb-has-img','pb-img-fallback');this.remove()">
         <span class="pb-scrim"></span>
         <span class="ph-note pb-img-ph">PHOTO PLACEHOLDER</span>`
      : '';
    const inner = `
      ${media}
      <span class="pb-bolt pb-bolt-tl"></span><span class="pb-bolt pb-bolt-tr"></span>
      <span class="pb-bolt pb-bolt-bl"></span><span class="pb-bolt pb-bolt-br"></span>
      <span class="pb-scanlines"></span>
      <span class="pb-badge">${card.badge}</span>
      <span class="pb-brand">${this.accentFirstWord(this.t(card.title))}</span>
      <span class="pb-tagline">${this.t(card.tagline)}</span>`;
    if (!card.url) return `<div class="pb-frame" style="--pb-accent:${accent}">${inner}</div>`;
    const external = card.type !== 'wiki';
    return external
      ? `<a class="pb-frame" href="${card.url}" target="_blank" rel="noopener sponsored" style="--pb-accent:${accent}">${inner}</a>`
      : `<a class="pb-frame" href="${this.wikiHref(card.url)}" style="--pb-accent:${accent}">${inner}</a>`;
  },
  // Скриншот с лайком/дизлайком — единственный дом: MEDIA → OFFICIAL (CORE_SPEC Принцип 3).
  // Клик по картинке (не по fa-btn) открывает лайтбокс (p2-9) — см. windows.js.
  shotCard(shot, key, r) {
    return `
    <figure class="aw-shot" data-key="${key}" data-id="${shot.id}">
      <img src="${shot.thumb}" alt="${shot.title}" loading="lazy">
      <div class="feed-actions shot-actions">
        <button class="fa-btn${r.voted === 'up' ? ' active' : ''}" data-r="up">▲ <span>${r.up}</span></button>
        <button class="fa-btn${r.voted === 'down' ? ' active' : ''}" data-r="down">▼ <span>${r.down}</span></button>
      </div>
    </figure>`;
  },
  // Мини-превью без лайков — доковая строка OFFICIAL (голосование живёт только в MEDIA → OFFICIAL, см. shotCard)
  shotThumb(s) {
    return `<div class="shot" data-id="${s.id}"><img src="${s.thumb}" alt="${s.title}"></div>`;
  },
  // Данные уже идут блоками по group (official-shots.js генерируется из hero-tiles.json в том же
  // порядке — Press Kit, потом Trailer 1, потом Trailer 2), поэтому просто вставляем подзаголовок
  // при смене group, без пересортировки.
  shotGrid(shots) {
    let lastGroup = null;
    const html = shots.map((s, i) => {
      const key = `shot-${i}`;
      const r = window.NewsReactions.ensureReaction(key, {}, i);
      const heading = s.group !== lastGroup ? (lastGroup = s.group, `<h4 class="aw-shot-group">${s.group}</h4>`) : '';
      return heading + this.shotCard(s, key, r);
    }).join('');
    return `<div class="aw-grid aw-grid-cards">${html}</div>`;
  },
  // MEDIA → VIDEOS/SHORTS — реальные YouTube-видео (data/media-feed.js). Клик открывает встроенный
  // плеер в окне (windows.js openVideoPlayer), не редиректит на youtube.com (по запросу).
  videoCard(v, kind) {
    return `
    <button class="video-card" type="button"
      data-video-id="${v.id}" data-video-kind="${kind}" data-video-title="${v.title.replace(/"/g, '&quot;')}"
      data-video-channel="${v.channel.replace(/"/g, '&quot;')}">
      <div class="video-card-thumb">
        <img src="${this.ytThumb(v.id)}" alt="${v.title}" loading="lazy">
        <span class="video-card-play">▶</span>
      </div>
      <div class="video-card-title">${v.title}</div>
      <div class="video-card-channel">${v.channel}</div>
    </button>`;
  },
  videoGrid(list, kind) {
    return `<div class="aw-grid aw-grid-cards">${list.map(v => this.videoCard(v, kind)).join('')}</div>`;
  },
  // Встроенный плеер VIDEOS/SHORTS/VOTD (открывается через windows.js openVideoPlayer) — раньше
  // жил инлайн-строкой в windows.js, что нарушало "шаблоны только здесь" (CORE_SPEC). more —
  // до 6 других видео из того же pool (см. openVideoPlayer), kind не участвует в разметке.
  videoPlayer(v, more, kind) {
    return `
    <div class="tp-video"><iframe src="https://www.youtube.com/embed/${v.id}?autoplay=1"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    ${v.channel ? `<div class="tp-video-channel">${this.t('Uploaded by')} ${v.channel}</div>` : ''}
    <button class="tp-back-btn" type="button">← ${this.t('Go back')}</button>
    ${more.length ? `<h4 class="aw-shot-group tp-more-heading">${this.t('MORE VIDEOS')}</h4>${this.videoGrid(more, kind)}` : ''}`;
  },
  // --- STREAMS (data/streams.js): плитка в доке (news.js) + окно плеера Twitch (windows.js openStream) ---
  // Превью — публичный снимок эфира Twitch, без ключа; офлайн-канал отдаёт штатную заглушку Twitch.
  twitchThumb(channel) {
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-440x248.jpg?t=${Math.floor(Date.now() / 300000)}`; // кэш-бастер раз в 5 мин
  },
  // viewers есть только у живого списка воркера (media-live.js) — тогда бейдж «● 12 345», иначе TWITCH.
  streamTile(s) {
    return `
    <button class="stream-tile" type="button" data-channel="${s.channel}" title="${this.esc(s.title || '')}">
      <img src="${this.twitchThumb(s.channel)}" alt="" loading="lazy">
      <span class="stream-live">${s.viewers ? '● ' + s.viewers.toLocaleString() : 'TWITCH'}</span>
      <span class="stream-cap"><b>${this.esc(s.name)}</b> · ${this.esc(s.tag)}</span>
    </button>`;
  },
  streamGrid(list) {
    return `<div class="stream-grid">${list.map(s => this.streamTile(s)).join('')}</div>`;
  },
  // Окно плеера: embed Twitch (parent — наш хост, требование Twitch), «Go back» как у видео-плеера
  // (windows.js returnState), под ним остальные каналы той же плиткой.
  twitchPlayer(s, more) {
    return `
    <div class="tp-video"><iframe src="https://player.twitch.tv/?channel=${s.channel}&parent=${location.hostname}&autoplay=true"
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>
    <div class="tp-video-channel">${this.esc(s.title || s.name + ' · ' + s.tag)} · <a href="https://www.twitch.tv/${s.channel}" target="_blank" rel="noopener">twitch.tv/${s.channel}</a></div>
    <button class="tp-back-btn" type="button">← ${this.t('Go back')}</button>
    ${more.length ? `<h4 class="aw-shot-group tp-more-heading">${this.t('MORE STREAMS')}</h4>${this.streamGrid(more)}` : ''}`;
  },
  // p2-10: трейлер-плеер вкладки MEDIA → OFFICIAL. Табы T1/T2/T3, autoplay со звуком сразу (не
  // muted — по запросу, звук по умолчанию; без отдельной кнопки SOUND ON, она вносила путаницу).
  // youtubeId:null -> заглушка COMING SOON (см. data/trailers.js).
  trailerPlayer(trailers, activeId) {
    const active = trailers.find(t => t.id === activeId) || trailers[0];
    const tabs = trailers.map(t =>
      `<button class="tp-tab${t.id === active.id ? ' active' : ''}" data-trailer="${t.id}">${this.t(t.label)}</button>`
    ).join('');
    const frame = active.youtubeId
      ? `<div class="tp-video">
          <iframe src="https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${active.youtubeId}&controls=1&modestbranding=1"
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>`
      // Дату форматируем по языку страницы, а не жёстко en-US: в RU/ES/PT-BR окне "Nov 1" рядом
      // с переведённым COMING SOON выглядел как недоперевод (сама строка уже локализована).
      : `<div class="tp-soon"><span class="ph-note">${this.t('COMING SOON')}${active.releaseDate ? ' · ' + new Date(active.releaseDate).toLocaleDateString(document.documentElement.lang || 'en-US', { month: 'short', day: 'numeric' }) : ''}</span></div>`;
    // Ссылка на статью вики (разбор трейлера) — переиспользует стиль hero-card-readmore (бегущая
    // подсветка по краю, тот же приём, что хлебные крошки в вики, см. .hero-card-readmore в CSS).
    const wikiLink = active.wikiSlug
      ? `<a class="hero-card-readmore tp-wiki-link" href="${this.wikiHref('/wiki/' + active.wikiSlug)}">${this.t(active.wikiTitle || 'View on wiki')} →</a>` : '';
    return `<div class="trailer-player"><div class="tp-tabs">${tabs}</div>${frame}${wikiLink}</div>`;
  },
  // Панель SECRET в доке (windows.js) — механика разблокировки за Respect снята, пока заглушка.
  // Абзацы «спасибо / с душой / как поддержать» — общие для окна SUPPORT и низа LEGAL (владелец 23-08).
  supportLines() {
    return `<p class="support-note">${this.t('This site is made with heart and dedication.')}</p>
      <p class="support-note support-how">${this.t('Want to support us? Type “leonida interactive” into Google and pick our site — it may be on page 1–5 of the results.')}</p>`;
  },
  // Окно SUPPORT (шапка, ☕ Support) — заглушка до донатов (SITE_STATE п.6).
  supportPanel() {
    return `<div class="support-soon"><p class="support-thanks">${this.t('Thank you for choosing our site.')}</p>${this.supportLines()}<p class="support-note">${this.t('We will update this section soon.')}</p></div>`;
  },
  secretComingSoon() {
    return `<div class="secret-soon"><span class="ph-note">${this.t('COMING SOON')}</span></div>`;
  },
  // Ячейка SECRET (01-10): карусель наших 3D-моделей из data/models3d.js. Вид — постер до WebGL,
  // canvas появляется, когда js/secret3d.js подгрузит вьюер; под моделью — ссылка на статью.
  // Заголовок модели по локали пульта: data/models3d.js (генерируется) хранит title { en, ru, … }; нет локали → en.
  modelTitle(m) { return m.title[window.HUB_I18N?.locale || 'en'] || m.title.en; },
  secret3d(items) {
    const views = items.map((m, i) => `<div class="s3d-view"${i ? ' hidden' : ''}>
        <img src="${this.esc(m.poster)}" alt="${this.esc(this.modelTitle(m))}" loading="lazy" decoding="async">
        <canvas hidden></canvas>
      </div>`).join('');
    return `<div class="s3d">
      <div class="s3d-stage">${views}
        <button class="s3d-arrow s3d-prev" type="button" aria-label="‹">‹</button>
        <button class="s3d-arrow s3d-next" type="button" aria-label="›">›</button>
      </div>
      <a class="s3d-link" href="#"></a>
    </div>`;
  },
  // Окно RESPECT (windows.js), вкладка TOP RESPECT — тот же список, что раньше разворачивался
  // инлайн в community-card (owner-запрос раунд-20: окно вместо раскрывашки). rows — уже
  // отсортированный массив {name, pts, you?} из js/leaderboard.js.
  // Бейдж звания — иконка + название в цвете ранга. Один шаблон на все три места, где звание
  // показывается (строка лидерборда, строка "сегодня", шкала RANKS): дублировать разметку
  // редкости мы уже один раз пробовали, второй раз не надо.
  rankBadge(rank, withTitle = true) {
    if (!rank) return '';
    // Звания переводятся (владелец: "можно перевести") — те же ключи в data/i18n-dynamic.<locale>.js,
    // что и остальной рисуемый JS-ом текст. В конфиге они остаются английскими: одна точка правды.
    const title = this.t(rank.title);
    return `<span class="cc-rank-badge" style="color:${rank.color};border-color:${rank.color}"
      title="${title}">${rank.icon}${withTitle ? `<b>${title}</b>` : ''}</span>`;
  },
  leaderboardPanel(rows) {
    const medals = ['🥇', '🥈', '🥉'];
    const rank = (pts) => window.Respect?.rank?.(pts);
    const rowsHtml = rows.map((r, i) => `
      <li class="cc-lb-row${r.you ? ' you' : ''}">
        <span class="cc-lb-rank">${medals[i] || i + 1}</span>
        <span class="cc-lb-name">${r.name}${this.rankBadge(rank(r.pts))}</span>
        <span class="cc-lb-pts">${r.pts.toLocaleString()}</span>
      </li>`).join('');
    // Секция "Best today" (owner-запрос) — над общей таблицей: она про сегодняшнюю активность,
    // а всё, что ниже, про накопленное за всё время. Порядок разный намеренно.
    const today = window.Leaderboard?.todayRows?.() || [];
    const todayHtml = today.length ? `
      <div class="cc-lb-caption">${this.t('Best today')}</div>
      <ol class="cc-leaderboard cc-lb-today">${today.map((r, i) => `
        <li class="cc-lb-row${r.you ? ' you' : ''}">
          <span class="cc-lb-rank">${i + 1}</span>
          <span class="cc-lb-name">${r.name}${this.rankBadge(rank(r.pts), false)}</span>
          <span class="cc-lb-pts up">+${r.today}</span>
        </li>`).join('')}</ol>
      <div class="cc-lb-caption">${this.t('All time')}</div>` : '';
    // Под таблицей — не оправдание («демо-данные»), а действие: логин сохраняет прогресс в
    // аккаунт и даёт номер Vice Crew. Содержимое — authCta() выше; store.js перерисовывает его
    // на месте при смене auth. Сама таблица остаётся демо до фазы 2.
    return `
      ${todayHtml}
      <ol class="cc-leaderboard">${rowsHtml}</ol>
      <div class="cc-lb-login">${this.authCta()}</div>`;
  },
  // Окно RESPECT, вкладка RANKS — шкала уровней из js/respect.js (balance/ptsPerLevel) с
  // гангстерскими званиями из SITE_CONFIG.RESPECT_RANKS. Выдуманных ачивок/наград по-прежнему
  // нет: строка — это порог и звание, ничего кроме. shownTo: весь список званий, но не меньше
  // текущего уровня +4 — если игрок уже KINGPIN, шкала не должна обрываться под ним.
  ranksPanel(balance, ptsPerLevel) {
    const currentLevel = window.Respect?.level?.(balance) ?? Math.floor(balance / ptsPerLevel) + 1;
    const ranks = window.SITE_CONFIG?.RESPECT_RANKS || [];
    const shownTo = Math.max(ranks.length || 10, currentLevel + 4);
    const rowsHtml = Array.from({ length: shownTo }, (_, i) => {
      const lvl = i + 1;
      const threshold = (lvl - 1) * ptsPerLevel;
      const r = ranks[Math.min(lvl - 1, ranks.length - 1)];
      const done = lvl <= currentLevel;
      return `
      <li class="cc-lb-row${lvl === currentLevel ? ' you' : ''}${done ? ' done' : ''}">
        <span class="cc-lb-rank">${lvl}</span>
        <span class="cc-lb-name">${r ? this.rankBadge(r) : `LEVEL ${lvl}`}</span>
        <span class="cc-lb-pts">${threshold.toLocaleString()} RP</span>
      </li>`;
    }).join('');
    const cur = window.Respect?.rank?.(balance);
    const inLevel = balance % ptsPerLevel;
    // Подпись у полосы — не фраза, а те же два числа, что показывает сама полоса: сколько набрано
    // в текущем уровне и сколько нужно (раунд 08-09(4), вместо «Next rank in N RP»). Числа
    // относительные, как и заливка: 20 / 50 = ровно 40% полосы, остаток видно её пустой частью.
    // Переводить нечего — ключ 'Next rank in' выпал из всех словарей вместе с фразой.
    // Подпись над блоком — тот же .cc-lb-caption, что у «Best today»/«All time» в соседней
    // вкладке: своего стиля заголовку не нужно, шкала и лидерборд живут в одном окне.
    const head = cur ? `<div class="cc-lb-caption">${this.t('Your rank')}</div>
    <div class="cc-rank-now">
      ${this.rankBadge(cur)}
      <span class="coll-head-track" style="--tier:${cur.color}"
        ><i style="width:${inLevel / ptsPerLevel * 100}%"></i></span>
      <span class="cc-rank-next">${inLevel} / ${ptsPerLevel} RP</span></div>` : '';
    return `${head}<ol class="cc-leaderboard">${rowsHtml}</ol>`;
  },
  // Попап маркера карты (p1-2, gta6map landmarks) — см. js/map.js
  // Строки статуса («confirmed · landmark» и прочие теги) больше нет: рендерятся только маркеры
  // волны A, у них confidence всегда 'confirmed', а теги датасета игроку ничего не говорят
  // («это никому не нужно»). Остаётся название и район.
  mapMarkerPopup(m) {
    return `
    <div class="popup-title">${m.name}</div>
    ${m.region ? `<div>${m.region}</div>` : ''}`;
  },
  // Плитка со скрином вместо строки-иконки (по запросу — список "не цеплял глаз"). img — обложка
  // соответствующей -overview.md статьи (см. data/wiki-meta.js) — у vehicles эта статья единственная
  // (0 отдельных записей, игра не вышла), тайл всё равно ведёт на реальный контент.
  wikiTile(item) {
    return `
    <a class="wiki-tile" href="${this.wikiHref(item.href)}">
      <img class="wt-img" src="${item.img}" alt="" loading="lazy">
      <span class="wt-scrim"></span>
      <span class="wt-label">${this.t(item.label)}</span>
    </a>`;
  },
  // Вариант "list" (на пробу, см. SITE_CONFIG.WIKI_TILE_STYLE) — узкая строка вместо плитки 4/3,
  // тот же img/scrim/badge/label набор классов, просто короткая высота сама даёт "полосу" картинки
  // (object-fit:cover обрезает по высоте строки), без отдельного кропа под каждый вариант.
  wikiTileRow(item) {
    return `
    <a class="wiki-tile-row" href="${this.wikiHref(item.href)}">
      <img class="wt-img" src="${item.img}" alt="" loading="lazy">
      <span class="wt-scrim"></span>
      <span class="wt-label">${this.t(item.label)}</span>
    </a>`;
  },
  // --- Плитка режимов ARTICLES и NEWS центральной зоны (js/view-mode.js) ---
  // До 23-09 шаблон жил инлайном в view-mode.js — против правила ядра; с появлением NEWS он
  // понадобился второй раз и переехал сюда. Данные: window.FEATURED_ARTICLES / FEATURED_NEWS
  // (data/featured-articles.<locale>.js). Бейдж и дата переводятся здесь, в данные едут
  // только категория и ISO-дата.
  FEATURE_BADGES: {
    characters: 'CHARACTER', locations: 'LOCATION', vehicles: 'VEHICLE', trailers: 'TRAILER',
    release: 'NEWS', guides: 'GUIDE', story: 'STORY', gameplay: 'GAMEPLAY', world: 'WORLD',
    weapons: 'WEAPONS', art: 'ART', secrets: 'SECRETS', activities: 'ACTIVITIES',
    missions: 'MISSIONS', cheats: 'CHEATS', news: 'NEWS',
    'gta-online': 'ONLINE', 'project-rome': 'ROME', 'gta-vs-gta5': 'GTA 6 VS GTA 5'
  },
  // Категории со СВОИМ цветом бейджа (--fa-cat в style.css); прочие падают в дефолтный
  FEATURE_COLORED: new Set(['characters', 'locations', 'vehicles', 'trailers', 'release', 'guides', 'art', 'news']),
  featureDate(iso) {
    try {
      return new Date(iso + 'T00:00:00Z').toLocaleDateString(window.HUB_I18N?.locale || 'en',
        { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    } catch (e) { return iso; }
  },
  // Один шаблон на обе карточки, featured — параметр размера (CORE_SPEC: «чуть другой шаблон =
  // параметр, не копия разметки»). aspect-ratio держит место ДО загрузки картинки (анти-CLS).
  featureCard(a, featured) {
    const cat = this.FEATURE_COLORED.has(a.category) ? a.category : 'default';
    const badge = featured ? this.t('FEATURED') : this.t(this.FEATURE_BADGES[a.category] || a.category.toUpperCase());
    return `
    <a class="fa-card${featured ? ' fa-featured' : ''}" href="${this.esc(a.url)}">
      <img class="fa-img" src="${this.esc(a.image)}" alt=""${a.pos ? ` style="object-position:${this.esc(a.pos)}"` : ''} ${featured ? 'fetchpriority="high"' : 'loading="lazy"'}>
      <span class="fa-scrim"></span>
      <span class="fa-badge fa-cat-${cat}${featured ? ' fa-badge-featured' : ''}">${badge}</span>
      ${a.has3d ? '<span class="fa-badge fa-badge-3d">3D</span>' : ''}
      <span class="fa-body">
        ${featured ? `<h2 class="fa-title">${this.esc(a.title)}</h2>` : `<span class="fa-title">${this.esc(a.title)}</span>`}
        ${featured && a.excerpt ? `<span class="fa-excerpt">${this.esc(a.excerpt)}</span>` : ''}
        <span class="fa-date">${this.esc(this.featureDate(a.date))}</span>
      </span>
    </a>`;
  },
  // Вся плитка режима: [0] крупно, остальные сеткой, под ней CTA в полный раздел.
  featurePlate(list, allHref, allLabel) {
    return this.featureCard(list[0], true) +
      `<div class="fa-grid">${list.slice(1).map((a) => this.featureCard(a, false)).join('')}</div>` +
      `<a class="fa-all" href="${this.esc(allHref)}">${this.esc(this.t(allLabel))} →</a>`;
  },
  // --- Пятнашки (режим GAMES, js/puzzle.js): все шаблоны — здесь, модуль только собирает состояние ---
  // Оболочка игры: шапка (заголовок, «Solved!», переключатель 3x3/4x4), поле (плитки рисует puzzle.js через
  // puzzleTile), счётчики, кнопки «Restart» / «Preview» (образец) / «New picture», подсказка и живая область под
  // результат. Кто/что на картинке — только после сборки (puzzleResult); до неё имя в разметке и aria не лежит.
  // На телефоне и ноутбуке — столбец, на широком ПК шапка и .pz-info становятся панелью справа от поля (CSS).
  puzzleShell({ size }) {
    const t = (s) => this.t(s);
    // Кнопки под полем — иконки (в строку со счётчиками на 375px текст трёх кнопок не влезает); подпись — в
    // title (подсказка) и aria-label, видимая подпись .pz-btn-l — только в боковой панели на широком ПК.
    // data-act — по нему puzzle.js вешает обработчики.
    const btn = (act, label, extra = '') => {
      const l = this.esc(t(label));
      return `<button type="button" class="pz-btn" data-act="${act}" title="${l}" aria-label="${l}"${extra}>${this.puzzleIcon(act)}<span class="pz-btn-l" aria-hidden="true">${l}</span></button>`;
    };
    const sizeBtn = (n) => `<button type="button" class="pz-size" data-size="${n}" aria-pressed="${n === size}">${n}×${n}</button>`;
    return `
    <div class="pz">
      <div class="pz-head">
        <div class="pz-titlerow"><h3 class="pz-title">${t('SLIDING PUZZLE')}</h3><p class="pz-solved">${t('Solved!')}</p></div>
        <div class="pz-sizes" role="group" aria-label="${this.esc(t('Grid size'))}">${sizeBtn(3)}${sizeBtn(4)}</div>
      </div>
      <div class="pz-boardwrap"><div class="pz-board pz-loading" role="group" aria-label="${this.esc(t('Sliding puzzle'))}"></div></div>
      <div class="pz-info">
        <div class="pz-stats">
          <span class="pz-stat">${t('Moves')} <b class="pz-moves">0</b></span>
          <span class="pz-stat">${t('Time')} <b class="pz-time">0:00</b></span>
          <div class="pz-btns">
            ${btn('restart', 'Restart')}
            ${btn('peek', 'Preview', ' aria-pressed="false"')}
            ${btn('next', 'New picture')}
          </div>
        </div>
        <p class="pz-hint">${t('Tap a tile next to the gap, or use the arrow keys.')}</p>
        <div class="pz-result" aria-live="polite"></div>
      </div>
    </div>`;
  },
  // Плитка: номер лежит в кнопке (aria-label — тоже номер), картинку и позицию ставит puzzle.js.
  puzzleTile(v) {
    return `<button type="button" class="pz-tile" data-v="${v}" aria-label="${this.esc(this.t('Tile {n}').replace('{n}', v))}"><span class="pz-n" aria-hidden="true">${v}</span></button>`;
  },
  // Целая картинка под плитками: после сборки проявляется и закрывает швы (и пустую клетку).
  puzzleFull(img) {
    return `<div class="pz-full" style="background-image:url('${this.esc(img)}')"></div>`;
  },
  // Результат (вместо подсказки): имя (персонаж или место, не переводится) — оно же ссылка на статью вики,
  // рядом иконка «Поделиться». «Solved!» — в шапке справа от заголовка (puzzleShell, видна только после сборки).
  // Ходы/время уже в .pz-stats. Иконки — puzzleIcon.
  puzzleResult({ name, href }) {
    const t = (s) => this.t(s);
    return `
      <div class="pz-namerow">
        <a class="pz-wiki" href="${this.esc(href)}" title="${this.esc(t('Read on the wiki'))}"><h4 class="pz-place">${this.esc(name)}</h4><span class="pz-arrow" aria-hidden="true">→</span></a>
        <button type="button" class="pz-share" title="${this.esc(t('Share'))}" aria-label="${this.esc(t('Share'))}">${this.puzzleIcon('share')}</button>
      </div>`;
  },
  // Все иконки пятнашек (контур 24×24, цвет — currentColor): кнопки под полем, «Поделиться» и галочка «скопировано».
  puzzleIcon(name) {
    const d = {
      restart: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
      peek: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
      next: '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>',
      share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 3v13"/><path d="m7 8 5-5 5 5"/>',
      check: '<path d="m5 12 5 5 9-10"/>',
    }[name];
    return `<svg class="pz-ico" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  },
  // Тело окна GUIDE (windows.js openWindow) — базовый обзор сайта, 3 раздела (по запросу): что где
  // лежит (Navigation), как работают механики (Mechanics), что такое вики (Wiki, с мини-плиткой
  // ссылок — те же WIKI_META/wikiTile, что и в боковой панели, не отдельный шаблон).
  guidePanel() {
    const t = window.Render.t;
    return `
    <div class="aw-grid">
      <!-- MECHANICS первыми (23-08): «?» у виджета YOUR RESPECT ведёт сюда — объяснение
           Respect обязано быть первым экраном гайда, а не оглавление сайта. -->
      <h4 class="aw-shot-group">${t('MECHANICS')}</h4>
      <p><strong>${t('Respect')}</strong> — ${t('earn RP for actions around the site (playing the radio, opening feeds, opening map cards, entering chill mode). Log in to keep your progress saved across visits.')}</p>
      <p><strong>${t('Map cards')}</strong> — ${t('click a photo pin on the map to open its card. The first open of each card earns Respect and fills the progress bar in the collection.')}</p>
      <!-- Режим езды и слой Realistic в гайде не значились вообще («может стоит дополнить гайд?
           режим drive? режим наложения?», 16-08(7)) — две самые крупные механики карты игрок
           находил случайно или не находил. Порядок абзацев — по глубине: сначала что кликнуть,
           потом чем это водить, потом чем перекрасить. -->
      <p><strong>${t('Drive mode')}</strong> — ${t('the DRIVE button switches the map into car control mode. Explore by lifting the fog and seeing what it hides, collect cards and legendary fragments, outrun the police — what a run earned is locked in by saving at any safehouse.')}</p>
      <p><strong>${t('Realistic layer')}</strong> — ${t('MAP LAYER repaints the same area in an AI-made realistic style. Drag the handle to wipe between the two versions.')}</p>
      <p><strong>${t('Radio')}</strong> — ${t('Vice FM and Leonida Talk play from the corner widget. Hit the sunset icon for chill mode — a fullscreen player with a live music visualizer.')}</p>
      <h4 class="aw-shot-group">${t('NAVIGATION')}</h4>
      <p><strong>${t('Top bar')}</strong> — ${t('release countdown, Follow on X, Support.')}</p>
      <p><strong>${t('Left column')}</strong> — ${t('radio widget, Video of the Day, Official trailer &amp; screenshots.')}</p>
      <p><strong>${t('Center')}</strong> — ${t('the interactive map.')}</p>
      <p><strong>${t('Right column')}</strong> — ${t('your Respect &amp; Community, Leonida Wiki, Spotlight.')}</p>
      <p><strong>${t('Bottom dock')}</strong> — ${t('Live Wire (real news), Weazel (satire), Secret.')}</p>
      <h4 class="aw-shot-group">WIKI</h4>
      <p>${t('Everything we know about GTA VI so far, organized by topic — a few starting points:')}</p>
      <div class="aw-wiki-grid">${window.WIKI_META.map(item => this.wikiTile(item)).join('')}</div>
    </div>`;
  },
  // Окно COLLECTION, вкладка CARDS — витрина всех фото-карточек карты. Открытая карточка была
  // одноразовым событием: посмотреть собранное было негде, и смысл коллекции держался на одной
  // цифре "8 / 88". Здесь она разложена по редкости; закрытые — силуэтами, без названия (спойлер).
  // Данные — window.HeroTiles.allCards(), свой стор здесь не заводится.
  collectionPanel(cards) {
    const tiers = window.SITE_CONFIG.CARD_TIERS || {};
    const ORDER = ['legendary', 'epic', 'rare', 'common'];
    // Шапка витрины — вся статистика, уехавшая из панели Map Info: карточки, туман и метки.
    // В пульте шесть полос подряд читались как витрина, а не как приборы; здесь они наконец на
    // своём месте, рядом с самими карточками. Полоса меток пришла сюда последней («слайдер
    // маркеров убери в коллекции»): 369 точек — фон исследования, в панели ему места нет.
    const opened = cards.filter((c) => c.opened).length;
    const fog = window.DriveMode?.fogPct?.() || 0;
    const dots = window.LeonidaMap?.waveDots || [];
    const bar = (label, text, pct, cls = '') => `<div class="hero-explored">
        <span>${this.t(label)}</span> ${text}
        <div class="hero-explored-bar"><div class="hero-explored-bar-fill ${cls}"
          style="width:${pct}%"></div></div>
      </div>`;
    const head = `<div class="coll-summary">
      ${bar('CARDS', `${opened} / ${cards.length}`, cards.length ? opened / cards.length * 100 : 0)}
      ${bar('Explored', `${fog.toFixed(1)}%`, fog, 'fog')}
      ${dots.length ? bar('Markers', `${dots.filter((d) => d.collected).length} / ${dots.length}`,
        dots.filter((d) => d.collected).length / dots.length * 100, 'dots') : ''}
    </div>`;
    return head + ORDER.map((tier) => {
      const list = cards.filter((c) => (c.tier || 'common') === tier);
      if (!list.length) return '';
      const opened = list.filter((c) => c.opened).length;
      const color = tiers[tier]?.color || '#9aa4b8';
      const cells = list.map((c) => c.opened
        ? `<button class="coll-card open" type="button" data-card-id="${c.id}" style="--tier:${color}">
             <img src="${window.SITE_CONFIG.HERO_IMG_BASE}/${c.image}-300.webp" alt="${c.title}" loading="lazy">
             <span class="coll-card-title">${c.title}</span>
           </button>`
        : `<div class="coll-card" style="--tier:${color}"><span class="coll-card-lock">🔒</span></div>`
      ).join('');
      // Полоса прогресса прямо в заголовке тира («в коллекции можно рядом с названием тира делать
      // слайдер») — те самые четыре полосы, что раньше жили в панели Map Info, только теперь каждая
      // стоит над своей сеткой карточек и не требует расшифровки, что за LEGENDARY 4/6.
      // Legendary — единственный тир со своей механикой: на карте её плитки нет, вместо неё четыре
      // фрагмента, которые берутся только за рулём (js/card-fragments.js). В витрине она выглядела
      // как обычный закрытый замок, и правило игры приходилось угадывать — строка объясняет его
      // там, где на этот замок и смотрят. Полный разбор — вкладка HOW TO PLAY.
      const note = tier === 'legendary'
        ? `<div class="coll-tier-note">${this.t('Each is cut into four fragments — found only behind the wheel')}</div>`
        : '';
      return `<h4 class="aw-shot-group coll-head" style="--tier:${color};color:${color}">
        <span>${this.t(tiers[tier]?.label || tier.toUpperCase())}</span>
        <span class="coll-head-track"><i style="width:${opened / list.length * 100}%"></i></span>
        <span class="coll-count">${opened} / ${list.length}</span></h4>
        ${note}
        <div class="coll-grid">${cells}</div>`;
    }).join('');
  },
  // Окно COLLECTION, вкладка HOW TO PLAY — чего вообще добиваться на карте. Отдельно от GUIDE
  // (тот про устройство сайта: где что лежит, как работает радио) — здесь только цели игры,
  // и живёт это рядом с самой коллекцией, где вопрос "а зачем" и возникает.
  goalsPanel() {
    const t = (s) => this.t(s);
    const total = window.HeroTiles?.getCardsProgress?.()?.total || 88;
    return `
    <div class="aw-grid aw-goals">
      <h4 class="aw-shot-group">${t('THE GOAL')}</h4>
      <p>${t('Collect all')} <strong>${total}</strong> ${t('photo cards scattered across Leonida. The first open of a card earns Respect and fills the progress bar in the card collection.')}</p>
      <h4 class="aw-shot-group">${t('HOW TO GET THEM')}</h4>
      <p><strong>${t('Click')}</strong> — ${t('any photo pin on the map opens its card. Works without driving.')}</p>
      <p><strong>${t('Drive')}</strong> — ${t('hit DRIVE and roll over a card to grab it. Driving also burns off the fog of war, and the map remembers what you have uncovered.')}</p>
      <p><strong>${t('Rarity')}</strong> — ${t('common, rare, epic and legendary. Legendary cards are cut into four fragments you have to find and put back together.')}</p>
      <p><strong>${t('Sonar')}</strong> — ${t('the radar next to the speedometer pings when a legendary fragment is near. Down to the last piece of a set, it also marks the direction.')}</p>
      <!-- Три механики заезда, которых во вкладке не было вообще (16-08(16)): полиция, дома и
           самолёты. Без них правила читались как «катайся и собирай» — а заработанное за заезд
           на самом деле висит в эскроу и теряется, если не доехать до дома. Цифры — из
           SITE_CONFIG.DRIVE_MODE (police/safehouses/planeBonus), не выдуманные. -->
      <h4 class="aw-shot-group">${t('BEHIND THE WHEEL')}</h4>
      <p><strong>${t('Police')}</strong> — ${t('an outpost you have uncovered starts a chase when you get close. Every star sends two more cars, three hits and you are busted. Shake them off and the escape pays out per star.')}</p>
      <p><strong>${t('Safehouses')}</strong> — ${t('Respect earned on a run is held aside, and parking at a safehouse is the only thing that moves it into your balance. Every hit takes a share of it, an arrest takes the rest, and leaving Drive without saving at a house loses everything you piled up. A house will not save you while the police are still on you.')}</p>
      <p><strong>${t('Planes')}</strong> — ${t('grab the plane icon on the road — 15 seconds of fast flight.')}</p>
      <h4 class="aw-shot-group">${t('BEYOND CARDS')}</h4>
      <p><strong>${t('Markers')}</strong> — ${t('points of interest picked up while driving, one Respect each.')}</p>
      <p><strong>${t('Respect')}</strong> — ${t('everything you do around the hub adds up to a rank, from DRIFTER to KINGPIN.')}</p>
    </div>`;
  },
  // Тело окна LEGAL (windows.js openWindow) — дисклеймер fan-made проекта.
  legalPanel() {
    return `
    <div class="aw-grid">
      <p>${this.t('Leonida Hub is an independent, fan-made project. It is not affiliated with, endorsed by, or sponsored by Rockstar Games, Take-Two Interactive, or any of their subsidiaries.')}</p>
      <p>${this.t('Grand Theft Auto, GTA VI, Vice City, Leonida, and all related names, characters, and imagery are trademarks and copyrighted material of Rockstar Games / Take-Two Interactive. All rights reserved to their respective owners.')}</p>
      <p>${this.t('Official screenshots, trailers, and press materials shown here are used for commentary and community discussion, and remain the property of their copyright holders.')}</p>
      <p>${this.t('We do not host leaked, unreleased, or otherwise unauthorized game assets.')}</p>
      <p>${this.t('Rights holder or have a concern? Contact')} <a href="mailto:${window.SITE_CONFIG.contactEmail}">${window.SITE_CONFIG.contactEmail}</a> ${this.t('— reviewed and actioned within 24 hours.')}</p>
      <p class="support-note"><a href="#" class="legal-support-link">☕ ${this.t('SUPPORT')} →</a></p>
      <p class="aw-legal-links">
        <a href="/wiki/about/">About</a> ·
        <a href="/wiki/methodology/">Methodology</a> ·
        <a href="/wiki/terms/">Terms</a> ·
        <a href="/wiki/privacy/">Privacy</a>
      </p>
    </div>`;
  },
  // Рендерит #wikiLinks из текущего window.WIKI_META — вызывается дважды (news.js при загрузке,
  // data/wiki-meta.js повторно после fetch('/wiki/counts.json') с реальными числами), поэтому
  // здесь, а не инлайном в обоих местах.
  renderWikiLinks() {
    const el = document.getElementById('wikiLinks');
    if (!el) return;
    const isList = window.SITE_CONFIG.WIKI_TILE_STYLE === 'list';
    el.classList.toggle('wiki-list', isList);
    const render = isList ? this.wikiTileRow.bind(this) : this.wikiTile.bind(this);
    el.innerHTML = window.WIKI_META.map(render).join('');
  }
};
