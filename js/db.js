// ===== DB — единственная обёртка над Supabase SDK =====
// К этому файлу обращается ТОЛЬКО js/store.js (контракт из docs/SUPABASE.md §5). Остальной код
// про Supabase не знает: он говорит с window.Respect и window.RespectStore.
//
// SDK лежит в js/vendor/supabase.min.js (UMD, глобал window.supabase): на cdnjs его нет, а
// unpkg у нас блокируется, поэтому вендорим, как и договаривались для внешних скриптов. Если
// SDK не загрузился или конфиг пуст — window.LeonidaDB === null, и store.js живёт на
// localStorage, как будто логина не существует. Это штатный режим, а не ошибка.
//
// Ключ здесь публичный (publishable). Секретного ключа в браузере не бывает — вся запись идёт
// через SECURITY DEFINER RPC на стороне БД, см. supabase/migrations/001_respect_auth.sql.
(function () {
  const cfg = window.SITE_CONFIG?.SUPABASE;
  if (!cfg?.url || !cfg?.publishableKey || !window.supabase?.createClient) {
    window.LeonidaDB = null;
    return;
  }

  const sb = window.supabase.createClient(cfg.url, cfg.publishableKey, {
    auth: {
      // PKCE: Google возвращает ?code=..., SDK сам меняет его на сессию (detectSessionInUrl) и
      // чистит адрес. Сессия живёт в localStorage SDK, между вкладками синхронизируется сама.
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  // Все RPC сведены к «данные или исключение»: store.js ловит ошибку одним catch и кладёт
  // начисление в очередь повторов, не разбирая, какой именно слой упал.
  const unwrap = ({ data, error }) => { if (error) throw error; return data; };

  window.LeonidaDB = {
    // fn(event, session) — SIGNED_IN / SIGNED_OUT / TOKEN_REFRESHED / INITIAL_SESSION
    onAuth: (fn) => sb.auth.onAuthStateChange(fn),
    // Возврат на ТУ ЖЕ страницу, откуда ушли (локаль /ru/ остаётся /ru/). Без query и hash —
    // иначе ?code= от Google приклеится к чужим параметрам.
    signInWithGoogle: () => sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: location.origin + location.pathname }
    }),
    signOut: () => sb.auth.signOut(),

    loadState: () => sb.rpc('load_state').then(unwrap),
    // Сумму клиент не передаёт — только имя события; arg нужен одному правилу (police_escape,
    // звёзды), day — реплею daily-событий за прошлые дни.
    award: (id, arg = null, day = null) =>
      sb.rpc('award_respect', { p_event_id: id, p_arg: arg, p_day: day }).then(unwrap),
    awardBatch: (events) => sb.rpc('award_respect_batch', { p_events: events }).then(unwrap),
    claimOg: () => sb.rpc('claim_og_badge').then(unwrap),
    // Сколько номеров Vice Crew свободно — публичная RPC (003), доступна гостю, отдаёт одно число.
    spotsLeft: () => sb.rpc('og_spots_left').then(unwrap),
    // Фаза 2 (004): ник, публичный лидерборд (и гостю), прогресс карты по ключу.
    setNick: (nick) => sb.rpc('set_nick', { p_nick: nick }).then(unwrap),
    leaderboard: () => sb.rpc('leaderboard').then(unwrap),
    saveState: (key, value) => sb.rpc('save_state', { p_key: key, p_value: value }).then(unwrap)
  };
})();
