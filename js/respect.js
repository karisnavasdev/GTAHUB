// ===== RESPECT — очки за события (каркас) =====
// Анонимный счёт в localStorage. Позже: "залогинься чтобы сохранить" → Supabase.
// Правило §6: баллы за СОБЫТИЯ (once/daily), не за каждый клик. Антифрод — на бэкенде.
(function () {
  // См. radio.js — тот же is:inline-скрипт внутри персистящегося RadioDock повторно выполняется
  // при soft-навигации между страницами вики; без гварда это заново триггерило daily-visit и
  // пересоздавало #respectToast.
  if (window.Respect) return;

  const K_BAL = 'lh_respect';
  const K_EVT = 'lh_respect_events';
  // Сколько RP набрано СЕГОДНЯ — для секции "Best today" в окне RESPECT. Из events это не
  // восстановить: там once-события без даты, а daily-события хранят дату, но не цену.
  const K_DAY = 'lh_respect_today';
  // Заработанное в текущем заезде (16-08(9)): лежит ОТДЕЛЬНО от баланса, пока не зафиксировано в
  // сейф-хаусе. См. эскроу ниже.
  const K_ESC = 'lh_respect_run';

  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  let balance = load(K_BAL, 0);
  let events  = load(K_EVT, {});          // { eventId: 'once' | 'YYYY-MM-DD' }
  const today = () => new Date().toISOString().slice(0, 10);
  // { d: 'YYYY-MM-DD', all } — всё набранное за сутки, единственный потребитель — «Best today»
  // в окне RESPECT. Дневной потолок УДАЛЁН в 16-08(15) («может вообще это уберём») — вместе с
  // зонами, счётчиком «сегодня N/60» и плашкой лимита: балансировать его на конечной экономике
  // оказалось дороже, чем он защищал. Повторяемые источники ограничивают себя сами по месту:
  // серии — слоты в день (drive-mode.js), просмотры — слоты в день (timer.js), побеги — кулдаун
  // (police.js), радио и визит — daily. Новый фарм-источник обязан приходить со своим таким же
  // ограничителем (CORE_SPEC).
  const day   = load(K_DAY, { d: today(), all: 0 });
  // Миграция: до 16-08(15) запись была { d, pts:{map,site}, all }, ещё раньше pts числом.
  if (typeof day.all !== 'number') {
    const pts = day.pts;
    day.all = typeof pts === 'object' && pts ? Object.values(pts).reduce((a, b) => a + b, 0) : Number(pts) || 0;
  }
  delete day.pts;

  // ---------- эскроу заезда (16-08(9)) ----------
  // «Прибавляется к общему балансу только если мы сохраняем в доме». Раньше начисление сразу
  // ложилось в баланс, а копы отбирали его обратно через spend — счётчик в углу дёргался вверх-вниз,
  // и плашка SECURED ничего не прибавляла (нечего было прибавлять, эти RP уже лежали в балансе).
  // Теперь на время заезда начисления уходят в эскроу: баланс стоит, приборка показывает BONUS RP,
  // а дом переливает эскроу в баланс — и «+15 RP SECURED» снова означает ровно то, что написано.
  let escrow = 0, escrowOn = false;
  // Хвост от прерванного заезда (F5 посреди поездки) СГОРАЕТ — 16-08(10): «а я бы STOP ENGINE не
  // зачислял, не сохранился — твои проблемы». Зачислять его при загрузке было бы дырой в том же
  // правиле: доехать до дома важно, а перезагрузить страницу — тот же выход из заезда.
  if (load(K_ESC, 0) > 0) save(K_ESC, 0);
  const escrowSave = () => save(K_ESC, escrow);
  // Фиксация: эскроу переливается в баланс. Единственное место, где заработанное за заезд
  // становится неприкосновенным, — и единственное, где счётчик RP в углу двигается.
  function escrowCommit() {
    const v = escrow;
    escrow = 0; escrowSave();
    if (v > 0) { balance += v; save(K_BAL, balance); render(); }
    return v;
  }

  // Счётчиков баланса на странице теперь два: бейдж верхнего бара и секция YOUR RESPECT в панели
  // карты (в фуллскрине бар не виден). Второго источника правды не заводим — оба пишет render().
  const numEls = document.querySelectorAll('#respectNum, [data-respect-num]');
  const levelFillEl = document.getElementById('respectLevelFill');
  const levelLabelEl = document.getElementById('respectLevelLabel');
  const rankEl = document.getElementById('respectRank');
  const PTS_PER_LEVEL = 50; // ponytail: flat threshold, revisit if progression needs curving later
  // Анимация награды (владелец 01-10: «прикольную анимацию на респект»): при росте баланса
  // счётчик докручивается до нового значения и вспыхивает; тост — ниже, в toast(). Без анимации,
  // если система просит меньше движения.
  const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let shown = balance, rollRaf = 0;
  function rollTo(to) {
    cancelAnimationFrame(rollRaf);
    const from = shown, t0 = performance.now(), dur = Math.min(900, 300 + (to - from) * 40);
    numEls.forEach((el) => { el.classList.remove('rp-bump'); void el.offsetWidth; el.classList.add('rp-bump'); });
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      numEls.forEach((el) => { el.textContent = v.toLocaleString(); });
      shown = v;
      if (k < 1) rollRaf = requestAnimationFrame(step);
    };
    rollRaf = requestAnimationFrame(step);
  }
  const render = () => {
    if (balance > shown && numEls.length && !calm()) rollTo(balance);
    else { cancelAnimationFrame(rollRaf); shown = balance; numEls.forEach((el) => { el.textContent = balance.toLocaleString(); }); }
    if (levelFillEl) {
      const level = Math.floor(balance / PTS_PER_LEVEL) + 1;
      const progress = (balance % PTS_PER_LEVEL) / PTS_PER_LEVEL * 100;
      levelFillEl.style.width = progress + '%';
      levelLabelEl.textContent = `LEVEL ${level}`;
    }
    // Строка под полосой — СВОЁ звание, с подписью («можно LOOKOUT вниз и подпись перед ним
    // текущий ранг», 16-08(8)). До этого тут стояла цель — «→ RUNNER · 25 RP», и она читалась как
    // текущее звание («убирай строку, ну не очевидно же»): игрок видел на экране одно-единственное
    // имя ранга, и это было чужое имя. Сколько осталось до следующего, показывает сама полоса
    // выше, второй раз цифрами это не нужно.
    // Перевод подписи и звания — напрямую из window.HUB_I18N.strings (инлайнится в index.html ДО
    // всех js/*): Render.t сюда не достаёт, respect.js грузится раньше render.js.
    if (rankEl) {
      const rank = rankOf(balance);
      rankEl.hidden = !rank;
      // Подпись обычным шрифтом, само звание жирным (16-08(9)): выделять надо ранг, а не слово
      // «текущий». Строки свои, из словаря — не пользовательский ввод.
      if (rank) rankEl.innerHTML = `${t('Current rank')} · <b>${rankName(rank)}</b>`;
    }
  };

  // Self-contained CSS: этот скрипт грузится и на пульте (где style.css уже стилизует .respect-toast
  // под верхний бар), и на вики (своего style.css вообще нет) — раньше тост на вики рендерился
  // безо всякого CSS (голый текст в потоке документа), что и было тем самым "мелькает респект".
  // var(--top-h, 3.2rem) подхватывает реальную высоту бара пульта, если он есть, иначе — дефолт.
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .respect-toast{position:fixed;top:calc(var(--top-h, 3.2rem) + .4rem);right:1.1rem;z-index:1200;
      font-family:var(--mono);font-size:.8rem;font-weight:600;letter-spacing:.1em;
      color:#fff;background:var(--pink);border-radius:6px;padding:.35rem .8rem;
      box-shadow:0 0 18px rgba(255,46,136,.7);opacity:0;transform:translateY(-8px);pointer-events:none;
      transition:opacity .25s,transform .25s}
    .respect-toast.show{opacity:1;transform:translateY(0)}
    .respect-toast.neg{background:#3d1029;color:var(--orange);box-shadow:0 0 14px rgba(255,158,79,.5)}
    /* На мобильном тост в top-right неизбежно перекрывает угол .cd-widget (таймер занимает
       всю ширину экрана, увернуться вбок некуда) — читалось как посторонний тёмный прямоугольник
       поверх таймера. Снизу-по-центру (snackbar) — свободная зона на любой странице пульта/вики. */
    @media (max-width:900px){
      .respect-toast{top:auto;bottom:1rem;left:50%;right:auto;transform:translate(-50%,8px)}
      .respect-toast.show{transform:translate(-50%,0)}
    }
    /* За рулём угол экрана не работает: игрок смотрит в центр кадра, на машинку и приборы —
       «что ты показываешь в правом верхнем углу, перенеси в центр над спидометром» (16-08(7)).
       Пока видна приборка, toast() переселяет плашку внутрь неё, и та встаёт над спидометром
       ровно как кнопка RESET (bottom:100% от .drive-hud). Правило перебивает и мобильный
       снэкбар ниже: два класса против одного. */
    /* nowrap — иначе плашка сжимается до ширины спидометра (142px) и «WANTED ★★ — BACKUP CALLED»
       разваливается на три строки. Отступ 1.4rem поднимает её над верхней кромкой приборки:
       ponytail — с кнопкой RESET (она тоже над приборкой) плашка пересечётся, но RESET вылезает
       только при застревании в воде, ради этого стыка городить очередь уведомлений незачем. */
    .drive-speedo .respect-toast{position:absolute;top:auto;right:auto;bottom:100%;left:50%;
      margin-bottom:1.4rem;white-space:nowrap;transform:translate(-50%,8px)}
    .drive-speedo .respect-toast.show{transform:translate(-50%,0)}
    /* Награда: плашка выпрыгивает градиентом пульта, по ней пробегает блик, вокруг — искры. */
    .respect-toast.win{background:linear-gradient(100deg,var(--orange,#ff9e4f),#ff7a45 45%,var(--pink,#ff2e88));
      color:#12082e;overflow:visible;animation:rpIn .55s cubic-bezier(.2,1.6,.4,1)}
    .respect-toast.win::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
      background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.75) 50%,transparent 70%) -150% 0/250% 100% no-repeat;
      animation:rpShine .9s .25s ease-out}
    @keyframes rpIn{0%{scale:.5}60%{scale:1.15}100%{scale:1}}
    @keyframes rpShine{to{background-position:250% 0}}
    .rp-spark{position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;pointer-events:none;
      background:var(--c);box-shadow:0 0 6px var(--c);animation:rpSpark .7s ease-out forwards}
    @keyframes rpSpark{from{transform:translate(0,0) scale(1);opacity:1}to{transform:translate(var(--x),var(--y)) scale(.2);opacity:0}}
    .rp-bump{display:inline-block;animation:rpBump .6s ease-out}
    @keyframes rpBump{30%{scale:1.35;color:var(--pink,#ff2e88);text-shadow:0 0 12px rgba(255,46,136,.9)}}
    @media (prefers-reduced-motion:reduce){.respect-toast.win,.respect-toast.win::after,.rp-bump{animation:none}.rp-spark{display:none}}
    .respect-pop{position:absolute;bottom:100%;left:50%;margin-bottom:.4rem;transform:translate(-50%,4px);z-index:5;
      font-family:var(--mono);font-size:.85rem;font-weight:700;letter-spacing:.06em;white-space:nowrap;
      color:#fff;background:var(--pink);border-radius:6px;padding:.3rem .7rem;
      box-shadow:0 0 14px rgba(255,46,136,.7);opacity:0;pointer-events:none;
      transition:opacity .3s,transform .3s}
    .respect-pop.show{opacity:1;transform:translate(-50%,-4px)}
  `;
  document.head.appendChild(styleEl);

  // Тост "+N RESPECT" у бейджа
  let toastT;
  // Пока на экране карточка или экран сбора фрагментов, тост ЖДЁТ (16-08(8): «пока открыта
  // карточка, табличка +3 respect над спидометром показалась и пропала, пока я менял карточки» —
  // награда за сет выстреливала за спиной у модалки и пролетала мимо глаз). Очередь ровно на одно
  // сообщение: тост и так один на всех, копить их значит показывать устаревшее.
  const blocked = () => !!document.querySelector('.frag-screen, #heroCardOverlay:not([hidden])');
  let pendingToast = null;
  function flush() {
    if (!pendingToast || blocked()) return;
    const p = pendingToast;
    pendingToast = null;
    toast(p.text, p.cls);
  }
  function toast(text, cls) {
    if (blocked()) { pendingToast = { text, cls }; return; }
    let el = document.getElementById('respectToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'respectToast';
      el.className = 'respect-toast';
      document.body.appendChild(el);
    }
    // Дом плашки — приборка, пока она на экране, иначе угол страницы. Позицию даёт CSS, здесь
    // только переезд: своей второй плашки для режима езды не заводим.
    const host = document.querySelector('.drive-hud:not([hidden]) .drive-speedo') || document.body;
    if (el.parentElement !== host) host.appendChild(el);
    el.textContent = text;
    el.classList.remove('show', 'neg', 'win');
    if (cls) el.classList.add(cls);
    void el.offsetWidth;                   // рестарт анимации
    el.classList.add('show');
    if (cls === 'win' && !calm()) {
      // Искры разлетаются по кругу из центра плашки; живут дольше анимации — тост их снесёт
      // следующим textContent.
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + Math.random() * .4, r = 38 + Math.random() * 26;
        const sp = document.createElement('i');
        sp.className = 'rp-spark';
        sp.style.cssText = `--x:${Math.cos(a) * r * 1.6}px;--y:${Math.sin(a) * r}px;--c:${i % 2 ? '#ff2e88' : '#ff9e4f'}`;
        el.appendChild(sp);
      }
    }
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 3000); // было 1800 — не успевали прочитать "-25 RESPECT"
  }

  // Плавающий "+N RP" рядом с произвольной кнопкой (радио-тумблер, claim-кнопка на вики и т.п.).
  // Раньше каждый вызывающий код таскал свой собственный <span>+CSS под это (см. radio-rp-pop) —
  // теперь один переиспользуемый пузырь; anchorEl должен быть position:relative.
  function popup(anchorEl, text, duration = 1600) {
    if (!anchorEl) return;
    let pop = anchorEl.querySelector('.respect-pop');
    if (!pop) {
      pop = document.createElement('span');
      pop.className = 'respect-pop';
      anchorEl.appendChild(pop);
    }
    pop.textContent = text;
    pop.classList.remove('show');
    void pop.offsetWidth;
    pop.classList.add('show');
    clearTimeout(pop._t);
    pop._t = setTimeout(() => pop.classList.remove('show'), duration);
  }

  // Уровень и звание — одна лестница: level = balance/PTS_PER_LEVEL + 1, звание = имя уровня из
  // SITE_CONFIG.RESPECT_RANKS. Выше длины массива держится последнее звание (KINGPIN), иначе
  // потолок прогрессии превращался бы в "звания кончились".
  const RANKS = () => window.SITE_CONFIG?.RESPECT_RANKS || [];
  // Перевод звания. Словарь рантайм-строк лежит в window.HUB_I18N.strings — раньше здесь читали
  // сам HUB_I18N, без .strings, и звание на всех локалях молча оставалось английским (Render.t
  // сюда не годится: respect.js грузится раньше render.js).
  const t = (s) => window.HUB_I18N?.strings?.[s] || s;
  const rankName = (r) => t(r.title);
  const levelOf = (pts) => Math.floor(pts / PTS_PER_LEVEL) + 1;
  const rankOf = (pts) => {
    const list = RANKS();
    if (!list.length) return null;
    return list[Math.min(levelOf(pts) - 1, list.length - 1)];
  };

  window.Respect = {
    get: () => balance,
    PTS_PER_LEVEL, // окно RANKS (windows.js/render.js) читает тот же порог, что рисует полосу здесь
    level: levelOf,
    rank: rankOf,
    // Набрано за сегодня — секция "Best today" в окне RESPECT. Считается только с момента, когда
    // появился этот ключ: у старых игроков первый день покажет неполную цифру, это разовое.
    earnedToday: () => (day.d === today() ? day.all : 0),

    // mode: 'once' — один раз навсегда; 'daily' — раз в день; 'always' — без лимита.
    // quiet — без углового тоста: вызывающий код показывает награду сам (сбор точек на карте
    // рисует "+1 RESPECT" прямо у точки, раунд-10 "бонус на экране, а не сбоку").
    // Возвращает СКОЛЬКО начислено (0 = отказ): исторический контракт с дней мягкого капа,
    // вызывающий код по нему уже написан. Для проверок `if (award(...))` 0 ложно, выплата истинна.
    award(id, pts, mode = 'once', quiet = false) {
      if (mode === 'once'  && events[id]) return 0;
      if (mode === 'daily' && events[id] === today()) return 0;
      if (day.d !== today()) { day.d = today(); day.all = 0; }
      events[id] = mode === 'daily' ? today() : 'once';
      day.all += pts;
      // В заезде награда идёт в эскроу, а не в баланс: копам есть что отбирать, дому — что
      // фиксировать.
      if (escrowOn) { escrow += pts; escrowSave(); } else { balance += pts; save(K_BAL, balance); }
      save(K_EVT, events); save(K_DAY, day);
      render();
      if (!quiet) toast(`+${pts} RESPECT`, 'win');
      // Сигнал для js/store.js (аккаунт): локально событие уже записано, сервер досчитает
      // его сам по своему каталогу — сумму отсюда не берёт.
      document.dispatchEvent(new CustomEvent('leonida:respect-award', { detail: { id, pts, mode } }));
      return pts;
    },

    // Списание с БАЛАНСА. Штрафы полиции сюда больше не ходят (16-08(9)): они забирают из эскроу
    // заезда, а не из накопленного. Остаётся публичным API модуля (CORE_SPEC) под покупки.
    spend(pts) {
      if (balance < pts) { toast(`NEED ${pts} RP`, 'neg'); return false; }
      balance -= pts;
      save(K_BAL, balance);
      render();
      toast(`−${pts} RESPECT`, 'neg');
      return true;
    },

    // ---------- эскроу заезда ----------
    // Владелец им пользуется через js/police.js (штрафы, арест, фиксация) — прямых вызовов из
    // другого кода быть не должно, иначе «сколько у меня на руках» опять расползётся по файлам.
    escrowStart() { escrow = 0; escrowOn = true; escrowSave(); },
    escrowGet: () => escrow,
    // Забрать из эскроу (удар копа, арест). Больше, чем есть, забрать нельзя — возвращает сколько
    // реально снято, тост рисует вызывающий: у удара и ареста тексты разные.
    escrowTake(pts) {
      const took = Math.min(escrow, Math.max(0, Math.round(pts)));
      escrow -= took; escrowSave();
      return took;
    },
    escrowCommit,
    // Конец заезда (STOP ENGINE). Незафиксированное СГОРАЕТ (16-08(10), «не сохранился — твои
    // проблемы»): дом — единственный способ забрать заработанное, иначе он был бы не выбором, а
    // украшением. Возвращает СКОЛЬКО сгорело — вызывающий показывает это игроку, тихо отнимать
    // заработанное нельзя.
    escrowEnd() {
      escrowOn = false;
      const lost = escrow;
      escrow = 0; escrowSave();
      return lost;
    },

    // ---------- для js/store.js (аккаунт) ----------
    // Карта событий как есть — store.js считает по ней дифф к серверу. Копия, снаружи не правят.
    events: () => ({ ...events }),
    // Баланс с сервера: после входа правда там, локальная цифра — кэш. Перерисовка сразу.
    setBalance(n) { balance = Math.max(0, Number(n) || 0); save(K_BAL, balance); render(); },
    // Ключи событий с сервера (id или id:дата): чтобы has() и дневные капы знали о сделанном
    // на другом устройстве. Прошлые даты daily не переносим — кап касается только сегодня.
    mergeEvents(keys) {
      (keys || []).forEach((k) => {
        const i = k.indexOf(':');
        if (i < 0) { events[k] = 'once'; return; }
        const id = k.slice(0, i), v = k.slice(i + 1);
        if (v === today()) events[id] = v;
      });
      save(K_EVT, events);
    },

    has: id => !!events[id],
    popup,
    // Тот же угловой тост, но без начисления — для событий, у которых своя награда позже
    // (подбор фрагмента legendary: сказать "2/4" надо сразу, отдельно от начисления).
    // Второй системы тостов заводить не за чем.
    toast,
    // Показать отложенный тост, если экран освободился. Зовёт тот, кто этот экран закрыл
    // (js/card-fragments.js), плюс сам respect.js по событию карточки ниже.
    flush
  };

  render();
  // Ежедневный визит
  window.Respect.award('daily-visit', 5, 'daily');

  // Карточку закрыли — можно показывать то, что накопилось за время модалки (см. blocked()).
  document.addEventListener('leonida:herocard', (e) => { if (!e.detail?.open) flush(); });

  // Шина 'leonida:respect' убрана в 16-08(7). Её единственный отправитель (js/hero-tiles.js) и так
  // дёргал window.Respect.popup напрямую, то есть развязки не было, зато был побочный эффект:
  // слушатель звал award без quiet и рисовал второй «+3» в углу поверх попапа у карточки.
})();
