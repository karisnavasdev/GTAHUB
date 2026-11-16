// ===== ЛИДЕРБОРД — реальные игроки + демо-строки (раунд-13, окно раунд-20, живые данные 004) =====
// Данные: window.RespectStore.board() — ответ публичной RPC leaderboard() ({all, today, me}),
// доступен и гостю; пока сервер не ответил (нет SDK / сети) — только демо. Решение владельца
// 21-08: реальных и фейковых показывать вперемешку, фейки уходят сами по мере роста базы —
// их ровно столько, чтобы общая таблица была на 10 строк (9 демо + YOU при пустой базе, 0 демо
// при 10+ реальных). Открытие окна и шаблон строки живут в windows.js/render.js (CORE_SPEC: один
// каркас окна, один дом шаблонов) — этот файл только даёт данные.
window.Leaderboard = {
  SIZE: 10,
  // today — сколько RP набрано за сутки; нужно секции "Best today" (порядок там свой, не по
  // общему счёту: смысл раздела ровно в том, что сегодня наверху может быть не лидер таблицы).
  FAKE_USERS: [
    { name: 'VercettiVibes', pts: 340, today: 18 },
    { name: 'weazel_watcher', pts: 285, today: 44 },
    { name: 'kalaga_climber', pts: 210, today: 9 },
    { name: 'DreQuanFan904', pts: 165, today: 31 },
    { name: 'boobie_ike_jr', pts: 120, today: 12 },
    { name: 'PortGellhornPete', pts: 95, today: 7 },
    { name: 'leonida_lurker', pts: 65, today: 3 },
    { name: 'hesoyam_hank', pts: 48, today: 21 },
    { name: 'RealDimezFan', pts: 30, today: 5 }
  ],
  // Реальные строки общей таблицы + своя + столько демо, чтобы вышло SIZE. Своя строка: участник —
  // ник и серверные цифры (из присланного топа, если попал, иначе из me); гость — YOU на локальном
  // балансе, как до логина.
  pool() {
    const b = window.RespectStore?.board?.() || null;
    const real = (b?.all || []).map((r) => ({ name: r.nick, pts: r.pts, today: 0, og: r.is_og, you: !!r.you }));
    const me = real.find((r) => r.you) || (b?.me
      ? { name: b.me.nick, pts: b.me.pts, today: b.me.today, you: true }
      : { name: 'YOU', pts: window.Respect?.get?.() ?? 0, today: window.Respect?.earnedToday?.() ?? 0, you: true });
    if (!real.includes(me)) real.push(me);
    const fakes = this.FAKE_USERS.slice(0, Math.max(0, this.SIZE - real.length));
    const today = (b?.today || []).map((r) => ({ name: r.nick, pts: r.pts, today: r.today, you: !!r.you }));
    return { real, fakes, me, today };
  },
  rows() {
    const { real, fakes, me } = this.pool();
    const top = [...real, ...fakes].sort((a, b) => b.pts - a.pts).slice(0, this.SIZE);
    if (!top.includes(me)) top.splice(this.SIZE - 1, 1, me); // своя строка всегда видна: вылетела за SIZE — последняя её
    return top;
  },
  // Топ дня. Игрок попадает сюда только если сегодня реально что-то заработал — пустая строка
  // "YOU 0" в разделе про активность выглядела бы упрёком, а не мотивацией.
  todayRows(limit = 5) {
    const { fakes, me, today } = this.pool();
    const mine = !today.some((r) => r.you) && me.today > 0 ? [me] : [];
    return [...today, ...fakes, ...mine].sort((a, b) => b.today - a.today).slice(0, limit);
  }
};
