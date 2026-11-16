// ===== ПОЛИЦЕЙСКИЕ ПОГОНИ ОТ ЗАСТАВ (режим езды) =====
// Единственный источник опасности в режиме езды. Заехал в радиус открытой заставы — от неё
// отделяется коп и едет за тобой; чем дольше висит погоня, тем их больше (до maxCops). Оторвался
// или пересидел вне агро — погоня гаснет, +RESPECT за побег.
// Цена погони — только то, что заработано ЭТИМ заездом (счётчик BONUS RESPECT в приборке): каждый толчок
// копа забирает долю (hitFine), арест — весь остаток (bust). Старый баланс не трогается никогда.
//
// ЧЕГО ТУТ НЕТ И НЕ БУДЕТ:
//   - Звука. Ни сирен, ни эффектов: радио — единственный звук режима езды.
//   - Смерти/game over/экрана WASTED. Арест (14-08) есть, но он кончает ПОГОНЮ, а не поездку:
//     машина встала, минус RESPECT, копы уехали, едешь дальше.
//   - Ассетов и стилистики Rockstar: коп — тот же абстрактный силуэт сверху, что машинка игрока
//     (тёмный корпус + два мигающих пикселя вместо мигалки), WANTED — слово плюс обычные
//     пятиконечные ★ шрифтом пульта. Ни Pricedown, ни узнаваемых силуэтов, ни шестиконечных звёзд.
//   - Pathfinding'а. Копы — стая: вектор на игрока плюс предпочтение дорог, маршрут никто не строит.
//
// Позиции застав — из assets/map-tiles/police-outposts.json (scripts/build-police-outposts.js),
// рантайм ничего не генерит. Состояние погони и кулдауны — сессионные, не персистятся; открытость
// заставы туманом персистится сама, это состояние тумана (drive-mode.js).
window.Police = (function () {
  const NOOP = { tick: () => false, isChasing: () => false, outposts: () => [],
    chasers: () => [], runEarned: () => 0, bank: () => 0, canBank: () => false };
  const drive = window.SITE_CONFIG?.DRIVE_MODE;
  const cfg = drive?.police;
  if (!cfg?.enabled || !window.LeonidaMap || typeof L === 'undefined') return NOOP;

  const map = window.LeonidaMap.map;
  const gameLatLng = window.LeonidaMap.gameLatLng;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const CHECK_MS = 300;        // агро/побег/видимость — раз в ~300мс, как скан радара (не каждый кадр)
  // Рад/сек доворота копа. 2.6 -> 4.2 («полицейские машины очень плавно разворачиваются»)
  // -> 3.4 -> 2.8 («заставу не объехать, они в тебя врезаются — сделай поворот меньше»): на 2.6
  // проскочивший коп уходил широкой дугой вбок, будто у него нет руля, на 4.2 крутился резче
  // игрока. 2.8 против 3.8 у игрока — коп, выехавший наперерез, физически не успевает довернуть
  // на пролетающую мимо машинку, и застава проезжается, а не таранится.
  const COP_TURN_RATE = 2.8;
  // Во сколько раз режется потолок скорости на полном (>=90°) отвороте от цели. Без него коп
  // разворачивался на полном ходу — та самая «плавная дуга»: теперь он сначала осаживает, потом
  // выкручивает руль, как настоящая машина.
  const TURN_BRAKE = 0.3;
  // Сек до выхода на свой потолок скорости. 0.8 -> 2.2 («начальную скорость меньше»): коп
  // спавнится ровно на заставе, то есть в паре метров от проезжающего игрока, и на прежнем
  // разгоне выходил на полный ход раньше, чем тот успевал миновать точку — отсюда «объехать
  // заставу нельзя». Со стартом с нуля за 2.2с у машины на скорости есть фора на проезд, а
  // догоняет коп по-прежнему на том же потолке: цифра трогает только разгон.
  const COP_ACCEL_SEC = 2.2;
  const ROAD_PROBE_M = 45;     // на сколько вперёд коп щупает дорогу при выборе курса
  const RETREAT_ARRIVE_M = 60; // подъехал к своей заставе — деспавн (второй путь: ушёл за кадр)
  // Кулдаун удара НА КОПА. Без него дистанция < collideDistM держится десятки кадров подряд, и
  // carSpeed *= 0.4 каждый кадр схлопывал скорость игрока в ноль: коп садился сверху и машинка
  // больше не двигалась вообще (поймано на первом же живом прогоне 14-08). Удар должен быть
  // событием — «догнал и толкнул», а не непрерывным трением.
  // 1200 -> 700: четыре машины на бампере успевали толкнуть за секунду один раз на всех, и удар
  // читался как «ничего не происходит».
  const HIT_COOLDOWN_MS = 700;
  const BUST_HOLD_MS = 2200;   // сколько плашка висит словом BUSTED, прежде чем погаснуть

  let outposts = [];   // {id, x, y, marker, cooldownT, aggroedThisChase}
  let cops = [];       // {x, y, angle, speed, marker, home, retreating}
  let loaded = false, active = false, chasing = false;
  let escalateT = 0, outOfAggroT = 0, checkT = 0, respectCdT = 0;
  let coolT = 0;       // сколько держится дистанция отрыва — по starCoolMs гаснет звезда
  let hits = 0;        // ударов за ТЕКУЩУЮ погоню (hitsToBust — арест)
  let shownStars = 0;  // сколько звёзд уже показано: рост показываем тостом, падение — молча
  // Максимум звёзд за погоню. Награда за побег считается по нему, а не по звёздам в момент отрыва:
  // с остыванием (starCoolMs) уровень к финалу почти всегда падает до одной звезды, и платить по
  // ней значило бы обнулить смысл держаться трёх.
  let peakStars = 0;
  // Заработанное за заезд лежит в эскроу js/respect.js (16-08(9)) — не в балансе. Своего счётчика
  // тут нет намеренно: раньше «заработанное» считалось как баланс минус база на старте, и штраф
  // приходилось списывать с общего баланса, из-за чего счётчик RP в углу дёргался вверх-вниз по
  // ходу погони, а фиксация в доме ничего не прибавляла.
  const runEarned = () => window.Respect?.escrowGet?.() ?? 0;
  const group = L.layerGroup();

  const wantedEl = document.getElementById('driveWanted');
  const wantedStarsEl = document.getElementById('driveWantedStars');

  // ---------- спрайты ----------
  // Коп: тот же силуэт сверху и тот же размер, что машинка игрока (13x21, drive-mode.js), только
  // корпус тёмный со стальной обводкой + мигалка из двух пикселей (анимация в style.css).
  // Второй силуэт в той же иконке — полицейский катер (тот же приём, что у машинки игрока в
  // drive-mode.js): нос лодки вместо корпуса, показывается классом on-water. Копы теперь ездят
  // по воде (cfg.copWaterFactor), и без смены силуэта это выглядело бы как автомобиль в заливе.
  const COP_HTML = '<div class="cop-rot"><svg class="cop-car" viewBox="0 0 16 26" width="13" height="21">' +
    '<rect x="1" y="1" width="14" height="24" rx="5" fill="#161226" stroke="#8b93a8" stroke-width="1.5"/>' +
    '<rect x="3.5" y="4" width="9" height="6" rx="2" fill="rgba(11,6,32,.55)"/>' +
    '</svg><svg class="cop-boat" viewBox="0 0 16 26" width="13" height="21">' +
    '<path d="M8 1c4.6 6 6 13.5 5.4 23H2.6C2 14.5 3.4 7 8 1z" fill="#161226" stroke="#8b93a8" stroke-width="1.5"/>' +
    '<rect x="4.5" y="9" width="7" height="7" rx="2" fill="rgba(11,6,32,.55)"/>' +
    '</svg><i class="cop-beacon"><b></b><b></b></i></div>';
  // Застава: щит с пятиконечной звездой. Шеврон над полосатым барьером («не нравится, как выглядит
  // лого полицейских») читался как дорожный знак, а не как полиция, и на 26 точках рябил.
  // Звезда — та же обычная пятиконечная, что в WANTED; фирменной графики по-прежнему ноль.
  const OUTPOST_HTML = '<div class="police-outpost"><svg viewBox="0 0 24 24" width="26" height="26">' +
    '<path d="M12 2.4 20 5.4v6.3c0 4.6-3.2 8.4-8 9.9-4.8-1.5-8-5.3-8-9.9V5.4z" ' +
    'fill="rgba(11,6,32,.85)" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M12 7.4 13.6 10.7 17.2 11.2 14.6 13.7 15.2 17.2 12 15.6 8.8 17.2 9.4 13.7 6.8 11.2 10.4 10.7z" ' +
    'fill="currentColor"/>' +
    '</svg></div>';

  const surfaceAt = (x, y) => window.DriveMode?.surfaceAt?.(x, y) || 'road';
  const revealedAt = (x, y) => window.DriveMode?.isRevealedAt?.(x, y) !== false;
  // Ночью радиус агро сжимается: у копов нет конуса фар, только мигалка — замечают позже.
  const aggroR = () => cfg.aggroRadiusM * (window.LeonidaNight?.isOn?.() ? (cfg.nightAggroFactor ?? 1) : 1);

  // ---------- заставы ----------
  function loadOutposts() {
    if (loaded) return Promise.resolve();
    loaded = true;
    return fetch(`${window.SITE_CONFIG.MAP_DATA_BASE}/${cfg.outpostsFile}`)
      .then((r) => r.json())
      .then((list) => {
        outposts = list.slice(0, cfg.outposts).map((o) => ({
          ...o, cooldownT: 0, aggroedThisChase: false,
          marker: L.marker(gameLatLng(o.x, o.y), {
            icon: L.divIcon({ className: '', html: OUTPOST_HTML, iconSize: [26, 26] }),
            interactive: false, zIndexOffset: 350 // ниже фото-плиток (500) и фрагментов (400)
          })
        }));
      })
      .catch(() => { outposts = []; }); // нет файла — режим езды работает как раньше, без полиции
  }

  // Застава видна только на открытой туманом ячейке. Однажды открытая ячейка не закрывается —
  // значит и застава остаётся видимой навсегда, отдельного «уже видел» флага не нужно.
  function syncOutpostVisibility() {
    for (const o of outposts) {
      const show = revealedAt(o.x, o.y);
      const on = group.hasLayer(o.marker);
      if (show && !on) o.marker.addTo(group);
      else if (!show && on) group.removeLayer(o.marker);
    }
  }

  // ---------- копы ----------
  function spawnCop(home) {
    if (cops.length >= cfg.maxCops) return;
    const marker = L.marker(gameLatLng(home.x, home.y), {
      icon: L.divIcon({ className: '', html: COP_HTML, iconSize: [13, 21], iconAnchor: [6.5, 10.5] }),
      interactive: false,
      pane: 'driveCarPane',   // та же пана, что у машинки игрока (создаётся в drive-mode.js ensureInit)
      zIndexOffset: 9000      // ...но под ней: у игрока 10000
    }).addTo(group);
    // seen — был ли коп хоть раз в кадре. См. правило «ушёл за экран = вышел из погони» в tick():
    // без этого флага оно срабатывало на копа, который ещё НЕ появлялся. Кадр на боевом зуме
    // ~936x897 м (1 м/px), то есть полкадра ~450 м при радиусе агро 480: застава, замеченная
    // с краю кольца, спавнила копа за границей вьюпорта, тот в тот же тик помечался retreating,
    // погоня закрывалась и застава уходила в 20-секундный кулдаун. Снаружи это выглядело ровно
    // как «полэкрана до участка, а полицейские не реагируют» — они реагировали и мгновенно
    // сдавались. Уйти за экран теперь может только тот, кто в этом экране был.
    cops.push({ x: home.x, y: home.y, angle: 0, speed: 0, marker, home, retreating: false, hitCdT: 0, seen: false });
    renderWanted();
  }

  // Волна = одна звезда. Все машины волны выезжают из одной заставы, расталкивание (separateCops)
  // разводит их в первые же кадры.
  function spawnWave(home) {
    for (let i = 0; i < (cfg.copsPerStar || 1); i++) spawnCop(home);
  }

  function despawnCop(cop) {
    group.removeLayer(cop.marker);
    cops = cops.filter((c) => c !== cop);
  }

  function clearCops() {
    cops.forEach((c) => group.removeLayer(c.marker));
    cops = [];
  }

  // Курс копа: вектор на цель, но с предпочтением дорог — щупаем три направления вперёд
  // (прямо и ±35°) и, если прямо не дорога, а вбок дорога, доворачиваем туда. Это не маршрут,
  // а «стая держится асфальта»: за поворотом коп по-прежнему не видит ничего.
  function steer(cop, tx, ty, dt) {
    const want = Math.atan2(tx - cop.x, ty - cop.y);
    let best = want;
    if (surfaceAt(cop.x + Math.sin(want) * ROAD_PROBE_M, cop.y + Math.cos(want) * ROAD_PROBE_M) !== 'road') {
      for (const d of [-0.6, 0.6]) {
        const a = want + d;
        if (surfaceAt(cop.x + Math.sin(a) * ROAD_PROBE_M, cop.y + Math.cos(a) * ROAD_PROBE_M) === 'road') {
          best = a; break;
        }
      }
    }
    // Кратчайший доворот к best, ограниченный COP_TURN_RATE. Возвращаем модуль невязки — на неё
    // moveCop гасит скорость (машина не поворачивает на 180° на полном ходу).
    let diff = ((best - cop.angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
    cop.angle += clamp(diff, -COP_TURN_RATE * dt, COP_TURN_RATE * dt);
    return Math.abs(diff);
  }

  function moveCop(cop, tx, ty, dt) {
    const off = steer(cop, tx, ty, dt);
    // Потолок скорости считается по ТОЙ ЖЕ физике, что у игрока (drive-mode.js): офф-роуд режет
    // обоих, поэтому по бездорожью коп не отстаёт волшебным образом, а по прямой асфальта игрок
    // отрывается ровно на (1 - copSpeedFactor). Плюс тормоз в повороте: 1 на прямой, TURN_BRAKE
    // на отвороте в 90° и круче.
    const vMaxM = window.DriveMode?.vMaxM?.() || 0;
    const surf = surfaceAt(cop.x, cop.y);
    const turnBrake = clamp(1 - off / (Math.PI / 2) * (1 - TURN_BRAKE), TURN_BRAKE, 1);
    // Вода больше не стена («полицейские тоже могут пересаживаться на яхты, просто двигаются в 2
    // раза медленнее»): раньше коп упирался в берег, стоял и в итоге уезжал домой — весь блок
    // «застрял/сдался» отсюда удалён вместе с этим правилом. Теперь вода — просто третья
    // поверхность со своим капом, вдвое ниже дорожного: у игрока на катере 0.8 vMax против
    // 0.39 у копа, так что уплыть по-прежнему можно, но не мгновенно и не насовсем.
    const surfFactor = surf === 'road' ? 1 : surf === 'land' ? drive.offRoadFactor : cfg.copWaterFactor;
    const cap = vMaxM * surfFactor * cfg.copSpeedFactor * turnBrake;
    cop.speed += (cap - cop.speed) * Math.min(1, dt / COP_ACCEL_SEC);
    cop.x += Math.sin(cop.angle) * cop.speed * dt;
    cop.y += Math.cos(cop.angle) * cop.speed * dt;
  }

  // Расталкивание (14-08). Все копы правят на одну точку с одинаковой физикой, поэтому к третьей
  // звезде стая складывалась ровно друг в друга: на карте одна машинка, а звёзд три. Маршрута тут
  // по-прежнему нет — просто после шага разводим пары ближе COP_SEP_M на половину нехватки каждого.
  // Пар максимум три (maxCops=3) — цена нулевая.
  // Проверки «не столкнуть в воду» тут больше нет: вода для копов проходима (moveCop), топить
  // расталкиванием стало нечем.
  const COP_SEP_M = 26;
  function separateCops() {
    for (let i = 0; i < cops.length; i++) {
      for (let j = i + 1; j < cops.length; j++) {
        const a = cops[i], b = cops[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy);
        if (d >= COP_SEP_M) continue;
        // d ~ 0 бывает у копов, вышедших из одной заставы в один кадр — разводим по оси X
        const ux = d > 0.01 ? dx / d : 1, uy = d > 0.01 ? dy / d : 0;
        const push = (COP_SEP_M - d) / 2;
        a.x -= ux * push; a.y -= uy * push;
        b.x += ux * push; b.y += uy * push;
      }
    }
  }

  function renderCop(cop) {
    cop.marker.setLatLng(gameLatLng(cop.x, cop.y));
    const el = cop.marker.getElement();
    if (!el) return;
    const rot = el.querySelector('.cop-rot');
    if (rot) {
      rot.style.transform = `rotate(${(cop.angle * 180 / Math.PI).toFixed(1)}deg)`;
      // Тот же приём, что у машинки игрока: не меняем иконку, а переключаем силуэт классом —
      // divIcon пересоздал бы DOM вместе с мигалкой на каждом заезде в воду.
      rot.classList.toggle('on-water', surfaceAt(cop.x, cop.y) === 'water');
    }
    // Под закрытым туманом коп не рисуется, но продолжает ехать — «вынырнул из тумана» вместо
    // «появился из ниоткуда». Ночью у копов нет конуса фар, только мигалка (см. style.css).
    el.style.visibility = revealedAt(cop.x, cop.y) ? '' : 'hidden';
  }

  // ---------- WANTED ----------
  // Кто реально гонится: retreating-копы едут домой и в звёздах/побеге не считаются. Одно место
  // на все три вопроса — сколько звёзд, показывать ли плашку, оторвался ли (checkEscape).
  const chasers = () => cops.filter((c) => !c.retreating);
  // Звёзд = волн в погоне: копов, делённых на размер волны, вверх. Отдельного счётчика уровня нет
  // намеренно — иначе звёзды и стая могли бы разъехаться (коп утонул/отстал, звезда осталась).
  const starCount = () => Math.ceil(chasers().length / (cfg.copsPerStar || 1));
  // Потолок шкалы — сколько звёзд физически может набраться при maxCops. Нужен для погашенных
  // ★ в спокойной плашке: игрок должен видеть длину шкалы до того, как на ней что-то загорится.
  const MAX_STARS = Math.ceil(cfg.maxCops / (cfg.copsPerStar || 1));

  // Полоска ударов — сколько ещё выдержишь до ареста. Раньше жила в плашке WANTED и была там
  // мёртвым грузом («неочевидные полоски под звёздами убрать, они прям супер неочевидны»): в углу
  // кадра её не читал никто, потому что во время погони игрок смотрит на машинку. Теперь она НАД
  // МАШИНКОЙ («когда в нас врезаются, полоску hp рисовать над машиной») и появляется ровно на
  // удар: три секунды после последнего толчка — и гаснет обратно.
  // Контейнер .drive-car-hp пустой лежит в иконке машинки (drive-mode.js iconHtml), сегменты
  // строит police.js: их число = hitsToBust, а конфиг знает только этот модуль.
  const HP_SHOW_MS = 3000;
  let hpHideT = null;
  function renderHp(show) {
    // Иконка машинки создаётся лениво (ensureInit) и живёт до конца страницы, но искать узел
    // каждый раз всё равно дешевле, чем ловить момент её появления: вызовов пара за погоню.
    const el = document.querySelector('.drive-car-hp');
    if (!el) return;
    if (!el.childElementCount) el.innerHTML = '<b></b>'.repeat(cfg.hitsToBust);
    [...el.children].forEach((b, i) => b.classList.toggle('spent', i < hits));
    el.classList.toggle('dch-last', chasing && hits === cfg.hitsToBust - 1);
    clearTimeout(hpHideT);
    el.classList.toggle('on', !!show);
    if (show) hpHideT = setTimeout(() => el.classList.remove('on'), HP_SHOW_MS);
  }
  // Удар: плашка дёргается. Слушатель ОДИН на всё время жизни, а не once на каждый удар: рестарт
  // через remove+reflow отменяет текущую анимацию, а отменённая шлёт animationcancel вместо
  // animationend — once-слушатели копились бы по одному на удар и никогда не снимались.
  wantedEl?.addEventListener('animationend', (e) => {
    if (e.animationName === 'dwHit') wantedEl.classList.remove('dw-hit');
  });
  const flashHit = () => window.LeonidaMap.restartAnim(wantedEl, 'dw-hit'); // рестарт при ударах подряд

  // Плашка — прибор, а не всплывашка: висит весь заезд рядом с радаром, как спидометр. Раньше она
  // появлялась только с первой звездой, и до первой погони игрок не знал ни что розыск существует,
  // ни какой длины у него шкала. Спокойное состояние (dw-calm) — погашенные ★ и целая полоска HP.
  function renderWanted() {
    if (!wantedEl) return;
    const stars = starCount();
    wantedEl.hidden = !active;
    wantedEl.classList.toggle('dw-calm', stars === 0);
    // Погашенный хвост шкалы — отдельным <i>, цвет даёт CSS: одна строка вместо двух элементов.
    wantedStarsEl.innerHTML = '★'.repeat(stars) +
      (stars < MAX_STARS ? `<i>${'★'.repeat(MAX_STARS - stars)}</i>` : '');
    if (stars === 0) { shownStars = 0; return; }
    peakStars = Math.max(peakStars, stars);
    // «Не понимаю, как начисляются звёзды»: звезда = волна машин, и приезд волны теперь объявляется.
    // Только рост: потерял копа (утонул, отстал) — звезда гаснет молча, об этом сообщать нечего.
    if (stars > shownStars) {
      window.Respect?.toast?.(stars === 1
        ? 'WANTED ★ — POLICE ON YOU'
        : `WANTED ${'★'.repeat(stars)} — BACKUP CALLED`);
    }
    shownStars = stars;
  }

  // ---------- погоня ----------
  // Все счётчики погони обнуляются в одном месте: их шесть, и жили они тремя копиями (начало
  // погони, START, STOP), которые разъезжались при каждом новом счётчике.
  function resetChaseCounters() {
    escalateT = 0; outOfAggroT = 0; coolT = 0;
    hits = 0; shownStars = 0; peakStars = 0;
  }

  function startChase(from) {
    chasing = true;
    resetChaseCounters();
    spawnWave(from);
    document.dispatchEvent(new CustomEvent('leonida:policechange', { detail: { chasing: true } }));
  }

  // Общий хвост обоих исходов погони: копы разворачиваются домой, заставы уходят в кулдаун,
  // плашка гаснет, радар и всё остальное узнают событием. Отличается только цена (см. вызовы).
  function closeChase() {
    chasing = false;
    resetChaseCounters();   // peakStars тут уже прочитан вызывающим (endChase), обнулять безопасно
    cops.forEach((c) => { c.retreating = true; });
    for (const o of outposts) {
      if (o.aggroedThisChase) o.cooldownT = cfg.cooldownMs;
      o.aggroedThisChase = false;
    }
    shownStars = 0;
    renderWanted();   // все копы retreating -> звёзд ноль -> плашка возвращается в спокойный вид
    renderHp(false);  // погоня кончилась — полоска над машинкой не досиживает свои 3 секунды
    document.dispatchEvent(new CustomEvent('leonida:policechange', { detail: { chasing: false } }));
  }

  // ---------- арест ----------
  // Условие проигрыша погони, которого раньше не было вовсе: «вокруг меня 4 полицейские машины,
  // они в меня врезаются, три звезды и ничего не происходит». Смерти/game over по-прежнему нет —
  // поездка продолжается, — но погоня кончается на условиях полиции: без награды за побег и со
  // штрафом. Скорость в ноль ставит drive-mode.js по возврату 'bust' из tick().
  function bust() {
    closeChase();
    if (wantedEl) {
      const label = wantedEl.querySelector('.dw-label');
      const was = label.textContent;
      // closeChase() выше уже перевёл плашку в спокойный вид (звёзд ноль) — на время BUSTED
      // спокойный класс снимаем, иначе два состояния разбираются порядком правил в CSS.
      wantedEl.classList.remove('dw-calm');
      wantedEl.classList.add('dw-bust');
      label.textContent = 'BUSTED';
      setTimeout(() => {
        wantedEl.classList.remove('dw-bust');
        label.textContent = was;
        renderWanted();
      }, BUST_HOLD_MS);
    }
    const frame = window.LeonidaMap.frame;            // .map-frame — красная вспышка по кадру
    frame.classList.add('drive-bust');
    setTimeout(() => frame.classList.remove('drive-bust'), 1000);
    // Арест забирает ОСТАТОК заработанного за заезд: удары по дороге сюда уже сняли свои доли
    // (hitFine), так что полный набор ударов стоит ровно «всё, что заработал», и ни очком больше.
    // Старый баланс не трогается — фиксированные −10 выносили новичка с шестью очками в ноль.
    const fine = window.Respect?.escrowTake?.(runEarned()) ?? 0;
    // Эскроу опустел — второму аресту забирать уже нечего, отдельного сброса базы не нужно.
    window.Respect?.toast?.(fine > 0 ? `−${fine} RESPECT` : 'BUSTED', 'neg');
  }

  // Цена ОДНОГО толчка («уменьшение должно быть при каждом врезании, чтобы игрок чувствовал урон»).
  // Раньше вся потеря приходила разом на аресте: два удара из трёх не стоили ничего, и полоска HP
  // была единственным следом. Доля — 1/hitsToBust от ОСТАТКА заработанного, а не число из конфига:
  // поменяется число ударов до ареста — цена толчка поедет за ним сама. Забирает всегда только
  // заработанное этим заездом — из эскроу, до накопленного баланса удар не дотягивается вовсе.
  // Кап тут не нужен (CORE_SPEC про начисления): это списание, и потолок ему ставит сам заработок.
  function hitFine() {
    const fine = window.Respect?.escrowTake?.(Math.ceil(runEarned() / cfg.hitsToBust)) ?? 0;
    if (fine > 0) window.Respect.toast(`−${fine} RESPECT`, 'neg');
    return fine;
  }

  // ---------- фиксация выигрыша (16-08(4)) ----------
  // «Надо как-то понять, как игрок будет фиксировать выигрыш». До этого способ был ровно один и
  // необъявленный — выйти из режима (STOP ENGINE). Теперь то же самое делается, не выходя из
  // заезда: эскроу переливается в баланс (Respect.escrowCommit), и удару с арестом забирать
  // становится нечего. С 16-08(9) это ЕДИНСТВЕННЫЙ момент посреди заезда, когда счётчик RP в углу
  // двигается: до дома заработанное лежит в эскроу и в баланс не попадает.
  // Под погоней запрещено: иначе первая же звезда обесценивалась бы кликом, и вся полицейская
  // механика превращалась бы в «успей нажать». Отрывайся, потом фиксируй.
  // «Есть что фиксировать» — одно условие на всех: сам bank(), свечение домов на карте
  // (drive-mode.js updateHouses) и бирюзовый пеленг на радаре (radar.js). Раньше каждый считал
  // его сам, и правило «под погоней дом не сохраняет» пришлось бы менять в трёх местах.
  const canBank = () => active && !chasing && runEarned() > 0;

  // Своего тоста тут нет: фиксация происходит на карте, у дома, и сообщать о ней надо там же —
  // оранжевой плашкой над машинкой («SECURED лучше показывать оранжевой плашкой над машиной»).
  // Рисует её вызывающий (drive-mode.js updateHouses), ему же принадлежит иконка машинки.
  function bank() {
    if (!canBank()) return 0;
    return window.Respect?.escrowCommit?.() ?? 0;
  }

  function endChase() {
    // Цена побега — по максимуму звёзд за погоню (peakStars), а не по тому, что осталось в момент
    // отрыва: остывание успевает срезать уровень до одной звезды раньше, чем засчитается побег.
    const stars = Math.max(1, peakStars);
    // Копы разворачиваются к своим заставам и деспавнятся, уйдя за кадр (или доехав) — не
    // растворяются в воздухе на глазах у игрока.
    closeChase();
    // Respect за побег: без once-капа (побег — повторяемое действие), но с кулдауном начисления —
    // круги вокруг одной заставы не фармятся. Тост свой: award зовём тихо, чтобы не показать
    // дважды. Кулдаун и есть ограничитель повторяемого источника (CORE_SPEC, 16-08(15)) —
    // глобального дневного капа больше нет, кроме него побег ничем не ограничен.
    if (respectCdT <= 0 && window.Respect) {
      respectCdT = cfg.cooldownMs;
      // Цена по звёздам: уйти от троих дороже, чем от одного — иначе держаться погони незачем,
      // выгоднее было гаснуть на первой же звезде.
      const pts = cfg.respectEscape * stars;
      // id фиксированный, режим 'always': уникальный id на каждый побег засорял бы список
      // событий в localStorage без всякой пользы — при 'always' он всё равно только пишется.
      const paid = window.Respect.award('police_escape', pts, 'always', true);
      if (paid) window.Respect.toast(`+${paid} RESPECT — ESCAPED ${'★'.repeat(stars)}`);
    }
  }

  // Агро: въезд в радиус ОТКРЫТОЙ заставы вне кулдауна. Первая — начинает погоню, вторая во
  // время погони — добавляет копа (до maxCops).
  function checkAggro(carX, carY) {
    let inAnyAggro = false;
    for (const o of outposts) {
      if (Math.hypot(o.x - carX, o.y - carY) > aggroR()) continue;
      if (!revealedAt(o.x, o.y)) continue;   // застава под туманом ещё не существует для игрока
      inAnyAggro = true;
      if (o.cooldownT > 0 || o.aggroedThisChase) continue;
      o.aggroedThisChase = true;
      if (!chasing) startChase(o); else spawnWave(o);
    }
    return inAnyAggro;
  }

  function checkEscape(carX, carY, inAnyAggro, ms) {
    outOfAggroT = inAnyAggro ? 0 : outOfAggroT + ms;
    const live = chasers();
    if (!live.length) { endChase(); return; }
    // И, а не ИЛИ (правка 14-08). Радиус агро всего 260м, поэтому «вне агро дольше escapeTimeMs»
    // наступало через 6 секунд после выезда за околицу заставы — с тремя копами на бампере, и
    // погоня обесценивалась. Теперь оторваться надо по-настоящему: копы дальше escapeDistanceM
    // И сам ты не в чьём-то патрульном радиусе. При равных потолках скорости разница
    // (1 - copSpeedFactor) даёт ~16 м/с — 900м по прямой набираются почти за минуту, так что
    // реальные пути отрыва — повороты (у копов руль медленнее), бездорожье и вода.
    const dists = live.map((c) => Math.hypot(c.x - carX, c.y - carY));
    if (dists.every((d) => d > cfg.escapeDistanceM) && outOfAggroT > cfg.escapeTimeMs) { endChase(); return; }
    // Остывание («звёзды держатся очень долго»). Держишь дистанцию starCoolDistM и не светишься
    // в агро заставы — раз в starCoolMs домой уезжает самая дальняя ВОЛНА, то есть гаснет ровно
    // одна звезда. Уровень теперь опадает лестницей, а не только целиком на полном отрыве.
    const cool = !inAnyAggro && Math.min(...dists) > cfg.starCoolDistM;
    coolT = cool ? coolT + ms : 0;
    if (coolT < cfg.starCoolMs) return;
    coolT = 0;
    // Домой уезжают САМЫЕ ДАЛЬНИЕ: сортируем уже посчитанные dists, а не меряем дистанции второй раз.
    const byFar = live.map((c, i) => [dists[i], c]).sort((a, b) => b[0] - a[0]);
    for (let i = 0; i < (cfg.copsPerStar || 1) && i < byFar.length; i++) byFar[i][1].retreating = true;
    if (chasers().length) renderWanted(); else endChase();
  }

  // ---------- кадр ----------
  // Возвращает 'bust' на аресте, true на обычном толчке, false если не догнали — скорость игрока и
  // тряску камеры применяет drive-mode.js (физика игрока живёт там, здесь про неё знать не надо).
  function tick(carX, carY, dt) {
    if (!active) return false;
    const ms = dt * 1000;
    for (const o of outposts) if (o.cooldownT > 0) o.cooldownT -= ms;
    if (respectCdT > 0) respectCdT -= ms;

    checkT += ms;
    if (checkT >= CHECK_MS) {
      const inAnyAggro = checkAggro(carX, carY);
      if (chasing) checkEscape(carX, carY, inAnyAggro, checkT);
      syncOutpostVisibility();
      checkT = 0;
    }

    if (chasing) {
      escalateT += ms;
      if (escalateT >= cfg.escalateAfterMs && cops.length < cfg.maxCops) {
        escalateT = 0;
        // Эскалация «по времени» — от заставы, ближайшей к игроку: приехали соседи, а не
        // очередная машина из той же будки за 3 км позади.
        const near = outposts.filter((o) => revealedAt(o.x, o.y))
          .sort((a, b) => Math.hypot(a.x - carX, a.y - carY) - Math.hypot(b.x - carX, b.y - carY))[0];
        if (near) spawnWave(near);
      }
    }

    // Сначала все шаги, потом расталкивание, и только потом рисуем: иначе маркер показывал бы
    // позицию до разведения, то есть ровно ту слипшуюся кучу, ради которой всё и затевалось.
    for (const cop of cops) {
      if (cop.retreating) moveCop(cop, cop.home.x, cop.home.y, dt);
      else moveCop(cop, carX, carY, dt);
    }
    separateCops();

    let hit = false;
    // В самолёте копы физически не достают («бонус на 15 секунд») — гнаться продолжают, но
    // толкнуть и арестовать не могут. Приземлился — всё как было, погоня не сбрасывается.
    const flying = !!window.DriveMode?.isFlying?.();
    const view = map.getBounds();   // один раз на кадр, а не по разу на копа
    for (const cop of cops.slice()) {
      renderCop(cop);
      const inFrame = view.contains(gameLatLng(cop.x, cop.y));
      if (inFrame) cop.seen = true;
      // Ушёл за кадр — вышел из погони, звезда гаснет сразу («звёзды убирать, когда уходим за
      // экран»). Экранная граница честнее любого таймера: того, кого не видно, в погоне нет.
      // Дальше он едет домой обычным путём и там же деспавнится. Но только тот, кто в кадре УЖЕ
      // был (cop.seen, см. spawnCop): выехавший из-за края застава-коп ещё догоняет, а не сдался.
      if (!cop.retreating && cop.seen && !inFrame) {
        cop.retreating = true;
        if (chasers().length) renderWanted(); else endChase();
        continue;
      }
      if (cop.retreating) {
        const home = Math.hypot(cop.x - cop.home.x, cop.y - cop.home.y) < RETREAT_ARRIVE_M;
        if (home || !inFrame) despawnCop(cop);
        continue;
      }
      if (cop.hitCdT > 0) cop.hitCdT -= ms;
      else if (!flying && Math.hypot(cop.x - carX, cop.y - carY) < cfg.collideDistM) {
        hit = true;
        cop.hitCdT = HIT_COOLDOWN_MS; // один толчок за контакт, не трение каждый кадр
      }
    }
    // Удар считается один за кадр, даже если дотянулись двое: иначе стая из шести машин арестовала
    // бы за один контакт, а по ощущению это был бы всё тот же единственный толчок.
    if (hit) {
      hits++;
      renderHp(true);   // полоска всплывает над машинкой ровно на удар
      flashHit();
      if (hits >= cfg.hitsToBust) { bust(); return 'bust'; }
      const fine = hitFine();
      // Предупреждение о последнем сегменте — поверх тоста списания: тост в проекте один, и если
      // просто дать обоим сработать, «−N RESPECT» затрётся и удар выйдет бесплатным на вид.
      // Поэтому на предпоследнем ударе показываем ОДНУ строку с обеими новостями.
      if (hits === cfg.hitsToBust - 1) {
        window.Respect?.toast?.(fine ? `−${fine} RESPECT — ONE MORE HIT` : 'ONE MORE HIT — BUSTED', 'neg');
      }
    }
    return hit;
  }

  // ---------- жизненный цикл ----------
  function start() {
    if (active) return;
    active = true;
    window.Respect?.escrowStart?.();   // с этого момента награды копятся в эскроу, а не в балансе
    resetChaseCounters();
    renderWanted();   // прибор на месте с первой секунды заезда, ещё до всякой погони
    Promise.resolve(loadOutposts()).then(() => {
      if (!active) return;
      group.addTo(map);
      syncOutpostVisibility();
    });
  }

  function stop() {
    if (!active) return;
    active = false;
    // STOP/Esc — копы и WANTED уходят мгновенно. Кулдауны застав и начисления остаются в памяти
    // сессии как есть: они тикают только в тике, то есть просто замирают до следующего DRIVE.
    chasing = false;
    // Незафиксированное СГОРАЕТ (16-08(10): «не сохранился — твои проблемы»). Дом — единственный
    // путь заработанного в баланс, иначе фиксация была бы формальностью: доедешь — хорошо, не
    // доедешь — всё равно зачислят. Тост обязателен: молча отобранные RP выглядят поломкой.
    const lost = window.Respect?.escrowEnd?.() ?? 0;
    if (lost > 0) window.Respect?.toast?.(`−${lost} RP LOST — NO SAFEHOUSE`, 'neg');
    resetChaseCounters();
    clearCops();
    for (const o of outposts) o.aggroedThisChase = false;
    if (wantedEl) { wantedEl.hidden = true; wantedEl.classList.remove('dw-bust'); }
    renderHp(false);
    map.removeLayer(group);
    document.dispatchEvent(new CustomEvent('leonida:policechange', { detail: { chasing: false } }));
  }

  // Вход/выход из режима — тем же событием, что слушает радар. Пауза на время модалки карточки
  // не нужна отдельным обработчиком: drive-mode.js на паузе просто не зовёт tick(), а все таймеры
  // тут накапливаются из dt, а не из часов — значит замирают вместе с физикой.
  document.addEventListener('leonida:drivechange', () => {
    window.DriveMode?.isActive?.() ? start() : stop();
  });

  // outposts — для радара (js/radar.js): только ОТКРЫТЫЕ туманом точки, закрытая застава для
  // игрока ещё не существует и подсказывать про неё нечего. Отдаём координаты, а не маркеры:
  // радару нужен пеленг, лезть в Leaflet ему незачем.
  // chasers — для радара: позиции копов, которые сейчас реально гонятся (уезжающие домой на
  // циферблате не нужны, они уже не угроза). Тоже голые координаты, без маркеров.
  // runEarned — для приборки (js/drive-mode.js): сколько Respect набрано с начала заезда. Ровно
  // эту сумму забирают копы (по доле за удар, остаток на аресте), поэтому считает её тот же модуль,
  // что и списывает — второй копии runBase заводить нельзя, иначе счётчик и штраф разойдутся.
  // bank/canBank — фиксация заработанного в сейф-хаусе (js/drive-mode.js) и общее условие «есть
  // что фиксировать» для домов на карте и пеленга на радаре (js/radar.js).
  return {
    tick, bank, canBank, isChasing: () => chasing,
    outposts: () => outposts.filter((o) => revealedAt(o.x, o.y)).map((o) => ({ x: o.x, y: o.y })),
    chasers: () => chasers().map((c) => ({ x: c.x, y: c.y })),
    runEarned
  };
})();
