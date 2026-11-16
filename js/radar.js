// ===== РАДАР-СОНАР — «холодно/горячо» для поиска legendary-фрагментов =====
// Пассивный сонар: НЕ ведёт стрелкой, НЕ подсвечивает цель. Отвечает ровно на один вопрос —
// «близко ли что-то ценное?» — частотой и цветом пинга. Финальные метры игрок дожимает глазами,
// поиск остаётся блужданием.
// Единственное исключение (раунд 08-09): ПОСЛЕДНИЙ недостающий кусок сета (3 из 4 уже собраны)
// светится точкой на кромке — направление, но не дистанция. Причина: на четвёртом куске поиск
// вслепую перестаёт быть интригой и становится прочёсыванием карты; направление превращает
// финал сбора в погоню. Флаг last приходит из card-fragments.js targets().
// Цели «слышны» сквозь туман: карточка за неразведанной ячейкой всё равно считается целью — иначе
// радар отвечал бы «нет целей» ровно там, где искать и надо.
// Звука нет вовсе (радио — единственный звук режима езды).
window.Radar = (function () {
  const NOOP = { init() {}, enable() {}, disable() {}, isActive: () => false };
  const drive = window.SITE_CONFIG?.DRIVE_MODE;
  const cfg = drive?.radar;
  if (!cfg?.enabled || !window.LeonidaMap) return NOOP;

  const el = document.getElementById('driveRadar');
  if (!el) return NOOP;

  // Ближе этого — уже максимальная частота, дальше её поднимать некуда: цель фактически под
  // колёсами, а подсказывать «где именно» радару запрещено.
  const CLOSE_M = 150;
  // Второе кольцо — вокруг машинки — включается только вблизи ("кольцо радара у машины подключать,
  // когда приближаемся к чему-то важному"): на всей дистанции оно пульсировало бы всю поездку и
  // перестало бы что-либо значить. Иконка в HUD при этом пингует всегда, пока цель в радиусе.
  const CAR_PING_M = 400;
  const SCAN_MS = 300;   // перебор целей — не каждый кадр (§5 ТЗ)
  const IDLE_MS = 800;   // как часто перепроверять «тишину», когда целей в радиусе нет
  const COLD = '#cfe6ff'; // цвет дальнего, «холодного» пинга
  // Акцент вплотную — цвет тира цели из CARD_TIERS. Своей копии оранжевого тут больше нет:
  // legendary в конфиге перекрашен в оранжевый, и три места про один объект (маркер, бейдж, пинг)
  // наконец светятся одним цветом.
  const ACCENT = (tier) => window.SITE_CONFIG.CARD_TIERS?.[tier]?.color || COLD;

  let active = false;
  let paused = false;      // физика на паузе (модалка карточки / экран фрагментов) — прибор молчит
  let pingTimer = null, scanTimer = null;
  let nearest = null;      // {d, tier} ближайшей цели в радиусе, null = тишина

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Цели — ТОЛЬКО неподобранные куски legendary (максимум 24 точки на всю карту). Epic отсюда
  // убраны: 14 штук держали фон почти всю поездку, и пинг из события превращался в шум —
  // тишина должна быть нормальным состоянием сонара. Пересчитывается на каждом скане (раз в
  // 300мс), а не по событиям подбора: перебор дешевле подписки, которую можно забыть дёрнуть.
  function targets() {
    return window.CardFragments?.targets?.() || [];
  }

  // Тултип локализуется: число подставляем сами, переводится только хвост «целей в радиусе» —
  // так словарю не нужны отдельные формы под единственное/множественное в шести языках.
  const rangeLabel = () => window.Render?.t?.('targets in range') || 'targets in range';

  // Наложения на циферблат — три штуки, все одинаково устроены: <i> с классом, позиция через
  // CSS-переменные, геометрию считает CSS. Общий кусок ровно один — сам узел.
  // RIM_PX — радиус кромки в пикселях: прибор 92px минус padding 8 = svg 76px, внешнее кольцо
  // развертки r=17 из viewBox 40 -> 32px. 30 — чуть внутри него, чтобы точка не съедала обод.
  const RIM_PX = 30;
  const dot = (cls) => {
    const node = document.createElement('i');
    node.className = cls;
    el.appendChild(node);
    return node;
  };

  // Пеленги на кромке. Два вида, одна механика: оранжевый — последний кусок сета, красный —
  // ближайшая застава (что там впереди опасно). Элемент создаётся лениво и удаляется вместе с
  // целью — состояние «пеленга нет» = нет узла в DOM, отдельного флага держать не надо.
  const bearings = new Map();   // css-класс -> элемент
  function setBearing(cls, deg) {
    let node = bearings.get(cls);
    if (deg === null) { node?.remove(); bearings.delete(cls); return; }
    if (!node) bearings.set(cls, node = dot(cls));
    node.style.setProperty('--rd-a', `${deg.toFixed(1)}deg`);
  }
  // Угол по часовой от «вверх»: карта не вращается (Leaflet), север всегда вверх, поэтому
  // atan2(восток, север) — без оглядки на курс машины.
  const bearingTo = (car, t) => Math.atan2(t.x - car.x, t.y - car.y) * 180 / Math.PI;

  // Копы — точками ВНУТРИ циферблата (js/police.js chasers()). Единственное, что радар показывает
  // позицией, а не пеленгом на кромке: во время погони «двое сзади слева» — рабочая информация,
  // а не подсказка, где лежит добыча. Дальше copRangeM точка прижимается к кромке.
  const copDots = [];
  function renderCops(car) {
    const list = window.Police?.chasers?.() || [];
    const range = cfg.copRangeM || 900;
    while (copDots.length > list.length) copDots.pop().remove();
    list.forEach((c, i) => {
      const node = copDots[i] || (copDots[i] = dot('rd-cop'));
      // Экранные оси: x на восток, y ВНИЗ (север вверху) — карта не вращается, как и у пеленга.
      const dx = (c.x - car.x) / range, dy = (car.y - c.y) / range;
      const m = Math.hypot(dx, dy);
      const k = m > 1 ? 1 / m : 1;   // за радиусом — прижимаем к кромке, не выкидываем
      node.style.setProperty('--cx', `${(dx * k * RIM_PX).toFixed(1)}px`);
      node.style.setProperty('--cy', `${(dy * k * RIM_PX).toFixed(1)}px`);
    });
  }

  // Снять всё, что нарисовано поверх циферблата: тишина радара и выход из режима — один случай.
  function clearOverlays() {
    for (const n of bearings.values()) n.remove();
    bearings.clear();
    while (copDots.length) copDots.pop().remove();
  }

  // Ближайшая точка списка в пределах warn — общая арифметика заставы и сейф-хауса: обе показываются
  // одинаковым пеленгом на кромке, отличаются только источником, дистанцией и цветом.
  function nearestOf(list, car, warn) {
    if (!warn) return null;
    let best = null, bestD = warn;
    for (const p of list) {
      const d = Math.hypot(p.x - car.x, p.y - car.y);
      if (d < bestD) { bestD = d; best = p; }
    }
    return best;
  }
  // Сейф-хаус показывается, только когда есть что фиксировать: без заработка (или под погоней, где
  // фиксация запрещена) пеленг вёл бы к дому, который ничего не сделает. Условие — то же
  // Police.canBank(), что зажигает сами дома на карте: своей копии правила тут нет.

  function scan() {
    if (paused) return;   // мир на паузе — прибор не пересчитывается вообще (16-08(12))
    const car = window.DriveMode?.getCarPos?.();
    if (!car) { nearest = null; clearOverlays(); el.title = `0 ${rangeLabel()}`; return; }
    renderCops(car);
    let best = null, bestD = Infinity, count = 0, last = null, lastD = Infinity;
    for (const t of targets()) {
      const d = Math.hypot(t.x - car.x, t.y - car.y);
      if (d > cfg.rangeM) continue;
      count++;
      if (d < bestD) { bestD = d; best = t; }
      if (t.last && d < lastD) { lastD = d; last = t; }
    }
    nearest = best ? { d: bestD, tier: best.tier } : null;
    setBearing('rd-bearing', last ? bearingTo(car, last) : null);
    // Красный пеленг — застава впереди. Дистанцию не показываем, как и по кускам: радар отвечает
    // «там опасно», а не «до блокпоста 480 м».
    const outpost = nearestOf(window.Police?.outposts?.() || [], car, cfg.outpostWarnM || 0);
    setBearing('rd-outpost', outpost ? bearingTo(car, outpost) : null);
    // Бирюзовый пеленг — ближайший сейф-хаус («дома надо тоже отмечать на радаре»). Дистанции опять
    // нет: направление есть, а сколько до него ехать — видно по самой карте, дома туманом не скрыты.
    const house = window.Police?.canBank?.()
      ? nearestOf(window.DriveMode?.safehouses?.() || [], car, cfg.safehouseWarnM || 0) : null;
    setBearing('rd-house', house ? bearingTo(car, house) : null);
    // В тултипе по-прежнему только счётчик: сколько целей слышно, без дистанций (§4 ТЗ).
    el.title = `${count} ${rangeLabel()}`;
    el.classList.toggle('rd-hot', !!nearest);
    // Нагрев циферблата: 0 на границе радиуса, 1 ближе CLOSE_M. Та же формула, что у частоты
    // и цвета пинга (intervalFor/colorFor), только вывернутая — «холодно/горячо» одним числом.
    el.style.setProperty('--rd-heat', nearest ? (1 - clamp((nearest.d - CLOSE_M) / Math.max(1, cfg.rangeM - CLOSE_M), 0, 1)).toFixed(2) : '0');
  }

  function intervalFor(d) {
    const f = clamp((d - CLOSE_M) / Math.max(1, cfg.rangeM - CLOSE_M), 0, 1);
    return cfg.pingIntervalMinMs + (cfg.pingIntervalMaxMs - cfg.pingIntervalMinMs) * f;
  }
  // Холодный на границе радиуса -> акцентный тира вплотную. color-mix, а не ручной лерп каналов:
  // цвета тиров живут строками в конфиге, разбирать их в rgb ради этого не за чем.
  function colorFor(t) {
    const f = clamp((t.d - CLOSE_M) / Math.max(1, cfg.rangeM - CLOSE_M), 0, 1);
    return `color-mix(in srgb, ${ACCENT(t.tier)} ${Math.round((1 - f) * 100)}%, ${COLD})`;
  }

  // Расходящееся кольцо от иконки в HUD + такое же вокруг машинки. Одноразовые элементы, снимает
  // себя сам animationend — таймеров на них не заводим.
  function ping(t) {
    const color = colorFor(t);
    const ring = document.createElement('span');
    ring.className = 'rd-ping';
    ring.style.setProperty('--rd-color', color);
    ring.addEventListener('animationend', () => ring.remove(), { once: true });
    el.appendChild(ring);
    if (t.d > CAR_PING_M) return;
    // Кольцо у машинки живёт в её же иконке (drive-mode.js iconHtml) — само едет вместе с ней.
    const carPing = document.querySelector('.drive-car-ping');
    if (carPing) {
      carPing.style.setProperty('--rd-color', color);
      window.LeonidaMap.restartAnim(carPing, 'on');
    }
  }

  function pingLoop() {
    if (!active || paused) return;
    if (nearest) ping(nearest);
    pingTimer = setTimeout(pingLoop, nearest ? intervalFor(nearest.d) : IDLE_MS);
  }

  function enable() {
    if (active) return;
    active = true;
    el.hidden = false;
    scan();
    scanTimer = setInterval(scan, SCAN_MS);
    pingLoop();
  }
  function disable() {
    if (!active) return;
    active = false;
    clearInterval(scanTimer); scanTimer = null;
    clearTimeout(pingTimer); pingTimer = null;
    nearest = null;
    clearOverlays();
    el.hidden = true;
    el.classList.remove('rd-hot');
    el.style.setProperty('--rd-heat', '0');
  }

  document.addEventListener('leonida:drivechange', () => {
    window.DriveMode?.isActive?.() ? enable() : disable();
  });
  // Погоня (js/police.js): пока висит WANTED, приборка краснеет («если преследуют копы, то радар
  // красный»). Частоту и цвет пинга не трогаем — радар продолжает искать, просто теперь одним
  // взглядом видно, что сейчас важнее.
  document.addEventListener('leonida:policechange', (e) => {
    el.classList.toggle('rd-chase', !!e.detail?.chasing);
  });
  // Пауза — ровно та же, что у физики (js/drive-mode.js шлёт 'leonida:drivepause' из pausePhysics).
  // Раньше тут слушалось 'leonida:herocard', то есть радар замирал только на модалке карточки, а
  // под экраном сбора фрагментов (он паузит через DriveMode.pause) продолжал сканировать и пинговать
  // над замершим миром — 16-08(12).
  document.addEventListener('leonida:drivepause', (e) => {
    if (!active) return;
    if (e.detail?.paused) {
      paused = true;
      clearTimeout(pingTimer); pingTimer = null;
    } else if (paused) {
      paused = false;
      scan();
      pingLoop();
    }
  });

  return { init() {}, enable, disable, isActive: () => active };
})();
