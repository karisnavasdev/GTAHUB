// ===== STORE — синхронизация Respect и прогресса с аккаунтом (Supabase Auth, Google) =====
// Единственный потребитель js/db.js. Публичный API Respect.award/spend/has не меняется: этот
// файл слушает события respect.js и досылает их на сервер, а сервер (supabase/migrations/
// 001_respect_auth.sql) сам решает, сколько это стоит.
//
// Как это устроено (docs/SUPABASE.md §4):
//   гость      — всё как раньше, localStorage, этот файл только тянет публичный лидерборд;
//   вход       — локальная карта событий respect.js прогоняется через award_respect_batch,
//                сервер пересчитывает цену каждого события по каталогу (не переносим сумму!);
//                прогресс карты (плитки / фрагменты / туман) объединяется с серверным и уезжает
//                обратно — см. mergeState();
//   дальше     — каждое новое событие досылается тем же способом (дифф «что есть локально минус
//                что уже отправлено»), баланс берётся с сервера — он правда, локальный — кэш;
//                изменения прогресса уезжают с задержкой (leonida:state-changed от модулей карты);
//   нет SDK / нет сети — window.LeonidaDB === null или RPC падает: гостевой режим, всё остаётся
//                в localStorage и уедет при следующем удачном sync. Повторять начисления не
//                страшно: на сервере ключи событий уникальны, дубль возвращает 0.
//
// Бейдж «Vice Crew» — маркетинговое имя; в БД и RPC он по-прежнему og_* (is_og, og_number,
// og_limit, claim_og_badge, og_spots_left). Переименовывать внутренности не стали — имя на
// витрине может поменяться ещё раз, схема — нет.
(function () {
  if (window.RespectStore) return;

  const db = window.LeonidaDB;
  const NOOP = {
    ready: false, user: () => null, spotsLeft: () => null, board: () => null,
    signIn() {}, signOut() {}, setNick: () => Promise.reject(new Error('offline'))
  };
  if (!db || !window.Respect || !window.Render) { window.RespectStore = NOOP; return; }

  const R = window.Render;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const t = (s) => R.t(s);
  // Ключи событий, уже доставленные на сервер, — на каждый аккаунт свой список: на одном
  // браузере могут смениться два аккаунта, и второй не должен считать чужую отправку своей.
  const K_SYNCED = (uid) => 'lh_respect_synced:' + uid;
  const K_NICK_SEEN = (uid) => 'lh_nick_seen:' + uid;

  let session = null;
  let user = null;        // профиль с сервера: { id, handle, nick, nick_changed_at, avatar_url, balance, is_og, og_number }
  let spotsLeft = null;   // свободных номеров Vice Crew; null = сервер не ответил, крючок не показываем
  let board = null;       // leaderboard(): { all, today, me }; null = сервер не ответил, доска на демо
  let syncing = false;

  // ---------- дифф локального прогресса против отправленного ----------
  // Локальная карта событий respect.js — источник правды о том, что игрок сделал: once-события
  // хранятся как 'once', daily — как дата. Ключ на сервере: id для once, id:дата для daily.
  function pendingDiff(uid) {
    const synced = new Set(load(K_SYNCED(uid), []));
    const out = [];
    for (const [id, v] of Object.entries(window.Respect.events())) {
      const daily = /^\d{4}-\d{2}-\d{2}$/.test(v);
      const key = daily ? `${id}:${v}` : id;
      if (synced.has(key)) continue;
      out.push(daily ? { id, day: v } : { id });
    }
    return out;
  }

  async function push(uid) {
    const diff = pendingDiff(uid);
    for (let i = 0; i < diff.length; i += 500) {
      const part = diff.slice(i, i + 500);
      await db.awardBatch(part);
      const synced = load(K_SYNCED(uid), []);
      part.forEach((e) => synced.push(e.day ? `${e.id}:${e.day}` : e.id));
      save(K_SYNCED(uid), synced);
    }
  }

  // Баланс и список событий с сервера → в respect.js. Сервер — правда: он мог отказать в части
  // локальных начислений (кап, чужое устройство уже взяло once-событие), локальная цифра — кэш.
  async function pull() {
    const st = await db.loadState();
    if (!st?.profile) return null;
    user = st.profile;
    if (typeof st.og_left === 'number') spotsLeft = st.og_left;
    window.Respect.setBalance(user.balance);
    window.Respect.mergeEvents(st.events || []);
    return st;
  }

  // ---------- прогресс карты (004: user_state) ----------
  // Три ключа localStorage, которыми владеют модули карты: открытые плитки (progress.js,
  // массив id), фрагменты legendary-карточек (card-fragments.js, {cardId: [индексы]}), туман
  // езды (drive-mode.js, {v:2, cols, rows, bits: base64, pos, angle}). Сервер хранит последнее
  // присланное, объединяет клиент: множества — union, туман той же сетки — OR битов, иначе
  // локальная запись (сетка сменилась — серверная устарела). Ничего не теряется ни на одном
  // устройстве; модули кэшируют состояние в памяти и перечитывают его по leonida:state-merged.
  const STATE_KEYS = {
    explored: 'leonida.map.explored',
    fragments: 'leonida.map.fragments.v1',
    fog: window.SITE_CONFIG?.DRIVE_MODE?.storageKey || 'leonida_fog_v1'
  };
  const readRaw = (lsKey) => { try { return JSON.parse(localStorage.getItem(lsKey)); } catch { return null; } };
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const union = (a, b) => [...new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])];
  function mergeValue(key, local, server) {
    if (server == null) return local;
    if (local == null) return server;
    if (key === 'explored') return union(local, server);
    if (key === 'fragments') {
      const out = {};
      for (const k of new Set([...Object.keys(local), ...Object.keys(server)])) out[k] = union(local[k], server[k]);
      return out;
    }
    if (local.v === 2 && server.v === 2 && local.cols === server.cols && local.rows === server.rows
        && typeof local.bits === 'string' && typeof server.bits === 'string') {
      const a = atob(local.bits), b = atob(server.bits);
      if (a.length !== b.length) return local;
      let bits = '';
      for (let i = 0; i < a.length; i++) bits += String.fromCharCode(a.charCodeAt(i) | b.charCodeAt(i));
      return { ...local, bits: btoa(bits) };
    }
    return local;
  }
  async function mergeState(serverState) {
    let changed = false;
    for (const [key, lsKey] of Object.entries(STATE_KEYS)) {
      const local = readRaw(lsKey);
      const server = serverState?.[key] ?? null;
      const merged = mergeValue(key, local, server);
      if (merged == null) continue;
      if (!same(merged, local)) { try { localStorage.setItem(lsKey, JSON.stringify(merged)); } catch {} changed = true; }
      if (!same(merged, server)) await db.saveState(key, merged).catch(() => {});
    }
    if (changed) document.dispatchEvent(new CustomEvent('leonida:state-merged'));
  }
  // Живые изменения: модуль записал localStorage и кинул leonida:state-changed {key: <ключ ls>}.
  // Туман пишется каждые 2 с во время езды (~80 КБ), поэтому пауза 10 с, а при уходе со
  // вкладки — сразу. Запись, не успевшая уехать при закрытии, уедет при следующем входе через
  // mergeState — это потеря не прогресса, а только свежести серверной копии.
  const stateT = {};
  function pushState(key) {
    clearTimeout(stateT[key]); stateT[key] = null;
    const v = readRaw(STATE_KEYS[key]);
    if (v != null) db.saveState(key, v).catch(() => {});
  }
  document.addEventListener('leonida:state-changed', (e) => {
    if (!session) return;
    const key = Object.keys(STATE_KEYS).find((k) => STATE_KEYS[k] === e.detail?.key);
    if (!key) return;
    clearTimeout(stateT[key]);
    stateT[key] = setTimeout(() => pushState(key), key === 'fog' ? 10000 : 3000);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'hidden' || !session) return;
    for (const key of Object.keys(stateT)) if (stateT[key]) pushState(key);
  });

  // ---------- лидерборд ----------
  // Публичная RPC — доступна и гостю; leaderboard.js подмешивает реальных игроков к демо-строкам.
  function fetchBoard() {
    db.leaderboard().then((b) => {
      if (!b || !Array.isArray(b.all)) return;
      board = b;
      // Окно RESPECT уже открыто на доске — перерисовать, иначе реальные строки появятся только
      // при следующем открытии.
      if (document.querySelector('.cc-leaderboard')) window.refreshOpenWindow?.();
    }).catch(() => {});
  }

  async function sync() {
    if (!session || syncing) return;
    syncing = true;
    try {
      const uid = session.user.id;
      await push(uid);
      const st = await pull();
      // Бейдж Vice Crew: первым N вошедшим через Google. RPC идемпотентна — у кого бейдж уже
      // есть, вернёт его номер, лишнего бонуса не будет.
      if (user && !user.is_og) {
        const n = await db.claimOg();
        if (n) {
          window.Respect.toast(`VICE CREW #${n}`);
          await pull(); // бонус subscribe-og уже лёг в баланс на сервере
        }
      }
      if (st) await mergeState(st.state);
      fetchBoard();
      // Первый вход: ник сгенерирован сервером из имени Google — показать окно RESPECT, где
      // форма ника (Render.nickForm) открыта, пока игрок ни разу его не менял.
      if (user && !user.nick_changed_at && !load(K_NICK_SEEN(uid), false)) {
        save(K_NICK_SEEN(uid), true);
        document.getElementById('ccLbToggle')?.click();
      }
    } catch (e) {
      console.warn('[store] sync:', e.message || e);
    } finally {
      syncing = false;
      renderAuth();
    }
  }

  // Гостю — сколько номеров осталось (публичная RPC, отдаёт одно число). Нет ответа — крючок
  // просто не рисуется, страница об этом не знает.
  function fetchSpots() {
    db.spotsLeft().then((n) => { if (typeof n === 'number') { spotsLeft = n; renderAuth(); } }).catch(() => {});
  }

  // ---------- живые начисления ----------
  // once/daily — через дифф (карта событий respect.js уже обновлена, досылаем разницу с паузой,
  // чтобы серия быстрых событий уехала одной пачкой). always (побег от копов) в карте не
  // различим от once, поэтому идёт напрямую: arg — запрошенные очки, сервер режет их потолком
  // правила (max_mult), больше положенного не начислит.
  let pushT;
  document.addEventListener('leonida:respect-award', (e) => {
    if (!session) return;
    const { id, pts, mode } = e.detail || {};
    if (mode === 'always') { db.award(id, pts).catch(() => {}); return; }
    clearTimeout(pushT);
    pushT = setTimeout(() => {
      push(session.user.id).then(pull).catch(() => {}).then(renderAuth);
    }, 800);
  });

  // ---------- auth ----------
  db.onAuth((event, s) => {
    session = s || null;
    if (!session) {
      user = null;
      renderAuth();
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_OUT') { fetchSpots(); fetchBoard(); }
      return;
    }
    // INITIAL_SESSION на загрузке, SIGNED_IN после возврата от Google. SDK может повторять
    // SIGNED_IN при фокусе вкладки — профиль уже есть, второй раз не синхронизируем.
    if (!user) sync(); else renderAuth();
  });

  function signIn() {
    db.signInWithGoogle().catch(() => window.Respect.toast('SIGN-IN FAILED', 'neg'));
  }
  function signOut() {
    db.signOut().catch(() => {});
  }
  // Смена ника (004 set_nick): первая — бесплатно, дальше раз в 30 дней; уникален без учёта
  // регистра. Ошибки сервера — кодами в message, переводим в строки словаря здесь.
  async function setNick(nick) {
    try {
      const r = await db.setNick(String(nick || '').trim());
      if (user) { user.nick = r.nick; user.nick_changed_at = r.nick_changed_at; }
      window.Respect.toast(t('Nick saved').toUpperCase());
      renderAuth();
      fetchBoard();
      return { ok: true };
    } catch (e) {
      const m = String(e?.message || '');
      if (m.includes('nick_taken')) return { ok: false, error: t('That nick is taken') };
      if (m.includes('nick_cooldown')) return { ok: false, error: t('Next change in {n} days').replace('{n}', e.details || '30') };
      return { ok: false, error: t('Nick must be 3–20 letters, digits or underscores') };
    }
  }

  // ---------- UI: шапка, виджет YOUR RESPECT, окно RESPECT ----------
  // Шапка: место под кнопку зарезервировано с LAUNCH_PRIORITY_24-07 — #subBtn (в разметке
  // disabled «Sign in with Google», до 23-08 «Coming soon») оживает как Sign in; залогиненному на том же месте аватар и ник с меню (Sign out).
  // Виджет YOUR RESPECT: гостю — строка «🔒 Log in to save your progress» + крючок «осталось мест»
  // (если сервер ответил; из шапки убран 22-08 — там он читался как третья кнопка), участнику —
  // плашка Vice Crew #N (в шапке и меню её нет — дублировали виджет), залогиненному без номера —
  // пусто. Шаблоны — Render.userMenu / crewHook / crewBadge / authCta (render.js), здесь только
  // подмена узлов. Новых окон нет: клик по плашке/крючку открывает окно RESPECT.
  let menuEl = null;
  function renderAuth() {
    const btn = document.getElementById('subBtn');
    const note = document.querySelector('.ccr-login-note');
    if (!btn) return;
    if (note) note.dataset.guest ??= note.innerHTML; // исходный текст из разметки/локали — вернуть после Sign out
    if (user) {
      const wrap = document.createElement('div');
      wrap.innerHTML = R.userMenu(user);
      const next = wrap.firstElementChild;
      if (menuEl) menuEl.replaceWith(next); else btn.after(next);
      menuEl = next;
      // Кнопка остаётся на своём месте в шапке, просто не рисуется. Именно style.display, а не
      // атрибут hidden: у .btn стоит display:inline-block, он перебивает hidden — и кнопка,
      // которую раньше уносили в конец body, вылезала розовой полосой под футером (баг 21-08).
      btn.style.display = 'none';
      if (note) note.innerHTML = user.is_og ? R.crewBadge(user.og_number) : '';
    } else {
      if (menuEl) { menuEl.remove(); menuEl = null; }
      btn.style.display = '';
      btn.disabled = false;
      btn.title = t('Join the Vice Crew — first 500 get numbered badges');
      btn.textContent = t('Sign in with Google');
      btn.dataset.auth = 'sign-in';
      if (note) note.innerHTML = note.dataset.guest + (spotsLeft === null ? '' : R.crewHook(spotsLeft));
    }
    // Блок входа в открытом окне RESPECT: перерисовать на месте, иначе после Sign out там
    // остался бы статус залогиненного рядом с кнопкой Sign in в шапке.
    document.querySelectorAll('.cc-lb-login').forEach((el) => { el.innerHTML = R.authCta(); });
    document.dispatchEvent(new CustomEvent('leonida:auth', { detail: { user } }));
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-auth]');
    if (!el || el.tagName === 'FORM') return;
    e.preventDefault();
    if (el.dataset.auth === 'sign-in') signIn();
    if (el.dataset.auth === 'sign-out') signOut();
    // Плашка/крючок — в окно RESPECT, там объяснение механики (тот же тоггл, что у кнопки
    // под счётчиком: один способ открыть окно, не два).
    if (el.dataset.auth === 'crew-info') document.getElementById('ccLbToggle')?.click();
  });
  // Форма ника в окне RESPECT (Render.nickForm): ошибка — в её же строку, без тостов.
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest?.('form[data-auth="nick"]');
    if (!form) return;
    e.preventDefault();
    const msg = form.querySelector('.nick-msg');
    form.querySelector('button').disabled = true;
    const r = await setNick(form.elements.nick.value);
    form.querySelector('button').disabled = false;
    if (!r.ok && msg) msg.textContent = r.error;
  });

  window.RespectStore = {
    ready: true, user: () => user, spotsLeft: () => spotsLeft, board: () => board, signIn, signOut, setNick
  };
  renderAuth();
})();
