// ===== Relationship Map — ядро графа (F20, PROMPT_relationship_graph_03-09 + рефактор 03-09) =====
// ЕДИНСТВЕННАЯ точка правды по рендеру/физике/поведению графа. Потребители:
//   1) вики /wiki/characters/relationship-map/ (SEO-объяснение; данные инлайнятся страницей);
//   2) пульт, режим RELATIONS центральной зоны (js/view-mode.js; данные —
//      data/relationship-graph.<locale>.js, генерирует wiki-src/scripts/build-graph-data.mjs).
// Лежит в wiki-src/public/graph/ и раздаётся с корня домена ОБОИМ приложениям (в dev пульта
// путь /graph/ проксируется на wiki dev-сервер, см. .claude/serve.ps1). Классический скрипт,
// не ESM — контракт скриптов пульта. Стили — соседний relationship-graph.css.
//
// Физика: d3-force (вендоренный /vendor/d3-force-bundle.min.js -> window.d3). После
// установления сим держится на alphaTarget BREATHE — «обсидиановское дыхание».
// prefers-reduced-motion: прогон до устойчивости и полная остановка, drag работает.
//
// API: window.RelationshipGraph.init(stage, data, opts) -> { onShow, onHide } | null
//   stage — контейнер .rg-stage (ядро строит ВЕСЬ DOM внутри него: svg, фильтры, ⛶, карточку);
//   data  — { nodes: [{id,name,img,role,desc,url}], edges: [{source,target,type,status}] };
//   opts.t        — перевод UI-строк (default identity; пульт передаёт Render.t);
//   opts.fullscreen — свой тоггл разворота вместо Fullscreen API (пульт передаёт .deck.fs —
//                 родной паттерн fullscreen-кнопки карты; браузерный API в его окружении
//                 режется permissions-политикой). Без опции — нативный requestFullscreen (вики);
//   opts.charHash — интеграция с историей: { parse: () => slug|null — прочитать выбранного
//                   персонажа из location, build: (slug|null) => url для pushState }. Нужна,
//                   потому что у пульта hash уже занят режимами (#view=..., js/view-mode.js) —
//                   каждая поверхность строит свой формат. Без opts.charHash история не трогается.
//   opts.onNodeOpen — (slug) => void при каждом открытии карточки персонажа (тап, переход по
//                   связи, восстановление из истории). Пульт вешает сюда Respect-цель
//                   «открой всех» (js/view-mode.js); вики опцию не передаёт.
//   opts.quiz  — включает квиз STREET KNOWLEDGE (кнопка ▶ внизу): { award(id, pts) —
//                 начислить once-награду, 0 при повторе }. Пульт передаёт Respect-обёртку;
//                 вики квиз не включает. Механика — в блоке квиза внизу файла.
//   onShow/onHide — для поверхностей, где граф скрывается (режимы пульта): hide глушит
//                   симуляцию, show центрует вьюпорт (после display:none размеры нулевые)
//                   и возвращает дыхание.
(function () {
  'use strict';

  // Порядок и подписи панели фильтров; словарь типов фиксированный (см. relationship-graph.md)
  const FILTERS = [
    ['romantic', 'Romantic'], ['family', 'Family'], ['ally', 'Allies'], ['rival', 'Rivals'],
    ['boss', 'Boss / employee'], ['crew', 'Crew'], ['associate', 'Associates'],
  ];
  // Существительные — с двоеточием («romantic partner: Jason Duval»); глагольные формы
  // boss-связи выбираются по направлению в openCard («works for X» / «boss of X»).
  const TYPE_WORD = {
    romantic: 'romantic partner:', family: 'family:', ally: 'ally:', rival: 'rival:',
    boss: 'works for', crew: 'crew:', associate: 'associate:',
  };
  const R = 26;          // радиус ноды
  const BREATHE = 0.012; // фоновое alphaTarget «дыхания» (0.005–0.02 по промту)
  // Дистанции рёбер по типу: родственные/романтические короче, ассоциации длиннее
  const DIST = { romantic: 95, family: 95, boss: 125, crew: 125, ally: 135, rival: 135, associate: 165 };
  const DRAG_SLOP = 5;   // px: меньший сдвиг — дрожание руки, а не драг (ноды «дышат»)

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  function init(stage, data, opts) {
    if (!stage || stage.dataset.rgInit || typeof window.d3 === 'undefined') return null;
    if (!data || !Array.isArray(data.nodes) || !data.nodes.length) return null;
    stage.dataset.rgInit = '1';
    const d3 = window.d3;
    const t = (opts && opts.t) || ((s) => s);
    const charHash = (opts && opts.charHash) || null;
    const nodes = data.nodes.map((n) => ({ ...n }));
    const links = data.edges.map((e, i) => ({ ...e, index: i }));
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ga = (...a) => { if (typeof window.gtag === 'function') window.gtag(...a); };

    // ---- разметка (целиком из JS: одна копия на обе поверхности, в страницах — только контейнер) ----
    stage.classList.add('rg-stage');
    stage.insertAdjacentHTML('beforeend', `
      <button class="rg-filters-toggle" type="button" aria-label="${esc(t('Toggle filters'))}">⚙ ${esc(t('Filters'))}</button>
      <div class="rg-filters">
        <div class="rg-filters-head">${esc(t('Connections'))}</div>
        ${FILTERS.map(([type, label]) => `<label class="rg-filter"><input type="checkbox" value="${type}" checked> <i class="rg-dot rg-t-${type}"></i> ${esc(t(label))}</label>`).join('')}
        <button class="rg-reset" type="button">${esc(t('Reset'))}</button>
      </div>
      <button class="rg-fs" type="button" title="${esc(t('Full screen'))}">⛶</button>
      <aside class="rg-card" hidden></aside>`);
    const card = stage.querySelector('.rg-card');
    const filtersBox = stage.querySelector('.rg-filters');

    const NS = 'http://www.w3.org/2000/svg';
    const el = (tag, attrs, parent) => {
      const node = document.createElementNS(NS, tag);
      for (const k in attrs) node.setAttribute(k, attrs[k]);
      if (parent) parent.appendChild(node);
      return node;
    };
    const svg = el('svg', { class: 'rg-svg', role: 'application', 'aria-label': t('Interactive relationship graph of GTA 6 characters') });
    stage.insertBefore(svg, stage.firstChild);
    const defs = el('defs', {}, svg);
    const clip = el('clipPath', { id: 'rgClip', clipPathUnits: 'userSpaceOnUse' }, defs);
    el('circle', { cx: 0, cy: 0, r: R }, clip);
    const marker = el('marker', { id: 'rgArrow', viewBox: '0 0 10 10', refX: 22, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, defs);
    el('path', { d: 'M 0 0 L 10 5 L 0 10 z', class: 'rg-arrow' }, marker);
    const view = el('g', {}, svg);
    const edgesG = el('g', {}, view);
    const nodesG = el('g', {}, view);

    for (const l of links) {
      // pathLength=1 — нормированная длина под тизер входа (draw-in через dashoffset 1->0)
      l.el = el('line', {
        class: `rg-edge rg-t-${l.type}${l.status === 'speculation' ? ' rg-spec' : ''}`,
        pathLength: 1,
        ...(l.type === 'boss' ? { 'marker-end': 'url(#rgArrow)' } : {}),
      }, edgesG);
    }
    for (const n of nodes) {
      n.el = el('g', { class: 'rg-node', tabindex: '0', role: 'button', 'aria-label': n.name, 'data-slug': n.id }, nodesG);
      el('circle', { class: 'rg-ring', r: R + 2 }, n.el);
      el('image', {
        href: `/img/graph/${n.img}`, x: -R, y: -R, width: R * 2, height: R * 2,
        'clip-path': 'url(#rgClip)', preserveAspectRatio: 'xMidYMid slice',
      }, n.el);
      el('text', { class: 'rg-label', y: R + 16, 'text-anchor': 'middle' }, n.el).textContent = n.name;
    }

    // ---- физика ----
    // Тюнинг «веса» по ревью владельца 03-09 (5 итераций, история в
    // docs/REVIEW_relationship-graph.md): velocityDecay ниже дефолтных 0.4 — меньше трения,
    // ноды инертные, планируют. Жёсткость пружины нормирована степенью ноды (0.2/deg):
    // иначе хабы (Boobie, 5 рёбер) суммой связей дёргали отпущенную ноду назад.
    // Speculation-рёбра (пары Рауля, 04-09) в геометрии почти не участвуют: у их пар уже есть
    // confirmed-ребро с полноценной пружиной, вторая тяга к другой дистанции дёргала бы пару в
    // противоречии. Слух рисуем, но держит пару факт: из степеней исключаем, пружина 0.03.
    const deg = new Map();
    for (const l of links) {
      if (l.status === 'speculation') continue;
      deg.set(l.source, (deg.get(l.source) || 0) + 1);
      deg.set(l.target, (deg.get(l.target) || 0) + 1);
    }
    for (const l of links) {
      l.k = l.status === 'speculation' ? 0.03
        : 0.2 / Math.min(deg.get(l.source) || 1, deg.get(l.target) || 1);
    }
    // Параллельные рёбра одной пары (crew + speculation) разводим перпендикулярным сдвигом
    // ±6px в tick — иначе линии ложатся друг на друга и пунктир слуха не виден. Считается
    // здесь, пока source/target — ещё строки (forceLink ниже заменит их на объекты нод).
    // Больше двух рёбер на пару словарь типов не порождает — третьего off не бывает.
    const pairOf = new Map();
    for (const l of links) {
      const key = l.source < l.target ? `${l.source}|${l.target}` : `${l.target}|${l.source}`;
      const twin = pairOf.get(key);
      if (twin) { twin.off = -6; l.off = 6; } else pairOf.set(key, l);
    }
    const sim = d3.forceSimulation(nodes)
      .velocityDecay(0.16)
      .force('link', d3.forceLink(links).id((d) => d.id).distance((l) => DIST[l.type] || 140).strength((l) => l.k))
      .force('charge', d3.forceManyBody().strength(-420).distanceMax(600))
      // strength 0.15 в 1 итерацию: collide — единственная сила БЕЗ масштаба alpha, на
      // полной жёсткости (1/×2) он выстреливал задетую ноду мгновенно (~120px за 100мс,
      // qa-bump.js) — теперь пересечение выдавливается за несколько тиков, удар «мягкий»
      .force('collide', d3.forceCollide(R + 26).strength(0.15))
      .force('center', d3.forceCenter(0, 0))
      .on('tick', tick);

    function tick() {
      for (const l of links) {
        let x1 = l.source.x, y1 = l.source.y, x2 = l.target.x, y2 = l.target.y;
        if (l.off) { // параллельное ребро пары — сдвиг поперёк линии (см. byPair выше)
          const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
          const ox = (-dy / len) * l.off, oy = (dx / len) * l.off;
          x1 += ox; y1 += oy; x2 += ox; y2 += oy;
        }
        l.el.setAttribute('x1', x1); l.el.setAttribute('y1', y1);
        l.el.setAttribute('x2', x2); l.el.setAttribute('y2', y2);
      }
      for (const n of nodes) n.el.setAttribute('transform', `translate(${n.x},${n.y})`);
    }

    // Разложить граф ДО первого кадра (05-09): alpha симуляции стартует с 1, и первые
    // секунды ноды неслись к центру на глазах — тизер рисовал линии по летящим нодам,
    // «не успеваешь понять». Установление прогоняется синхронно, зритель получает уже
    // спокойный граф; alpha сразу гасится до дыхания.
    sim.stop();
    sim.tick(300);
    tick();
    // Жёсткость «стенок» дрейфа: в квизе трение вдвое ниже и пружин нет — мячики на штатных
    // стенках всё равно доплывали до края кадра (замер: Real Dimez 74px за кадром через 15с),
    // quizPhysics ужесточает стенки на время игры
    let wallK = 0.00015;
    if (!reduced) {
      // Дрейф покоя (05-09, владелец: «баблы слегка дрейфуют — провоцируют клик»).
      // Каждой ноде — свой медленный синус скорости (фаза/частота случайны, период ~10–20с);
      // сила НЕ масштабируется alpha: на дыхании BREATHE любой alpha-зависимый вклад
      // неразличим. Пружины держат ноду у своего места — получается блуждание в паре
      // десятков px, а не разлёт. reduced-motion дрейфа не получает (ветка выше).
      for (const n of nodes) {
        n.dp = Math.random() * Math.PI * 2;
        n.dw = 0.004 + Math.random() * 0.006;
      }
      let driftT = 0;
      sim.force('drift', () => {
        driftT += 1;
        for (const n of nodes) {
          // синус — блуждание; -pos*wallK — «стенки стола»: в квизе пружин нет, и на одном
          // дрейфе мячики уползали за кадр (замер: радиус 350 -> 467px за 10с). Обе
          // составляющие вне масштаба alpha — alpha-скейл на дыхании их не удержал бы.
          n.vx += 0.05 * Math.sin(driftT * n.dw + n.dp) - n.x * wallK;
          n.vy += 0.05 * Math.cos(driftT * n.dw * 1.3 + n.dp) - n.y * wallK;
        }
      });
      // сим был синхронно установлен и остановлен выше — будим сразу на дыхании
      sim.alpha(BREATHE).alphaTarget(BREATHE).restart();
    }
    // ClientRouter вики уводит со страницы soft-nav-ом — не тикать по отвязанному DOM
    document.addEventListener('astro:before-swap', () => sim.stop(), { once: true });

    // ---- pan/zoom ----
    let tx = 0, ty = 0, scale = 1;
    let userZoomed = false; // после первого wheel/pinch авто-fit больше не трогает масштаб
    const applyView = () => view.setAttribute('transform', `translate(${tx},${ty}) scale(${scale})`);
    const size = () => svg.getBoundingClientRect();
    function centerView() {
      const s = size();
      if (!s.width) return;
      // Авто-fit: разлёт графа ~760px в поперечнике (дистанции DIST + подписи) — на узком
      // кадре (мобайл, 45vh-кадр пульта) без даунскейла половина нод уезжала за край
      // (поймано Playwright-QA, чек №14). Держится до первого ручного зума.
      // кап 0.94, не 1: у крайних нод не оставалось запаса до кромки — на переходном толчке
      // старта квиза периферийный мячик коротко выныривал за кадр (QA-вёрстка 05-09, 1440×900)
      if (!userZoomed) scale = Math.min(0.94, Math.max(0.45, Math.min(s.width, s.height) / 760));
      tx = s.width / 2; ty = s.height / 2;
      applyView();
    }
    centerView();
    window.addEventListener('resize', centerView);

    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      userZoomed = true;
      const s = size();
      const mx = e.clientX - s.left, my = e.clientY - s.top;
      const next = Math.min(3, Math.max(0.35, scale * Math.exp(-e.deltaY * 0.0015)));
      tx = mx - ((mx - tx) / scale) * next;
      ty = my - ((my - ty) / scale) * next;
      scale = next;
      applyView();
    }, { passive: false });

    // ---- pointer-логика: drag ноды / pan фона / pinch ----
    const pointers = new Map();
    let dragNode = null, panStart = null, pinchStart = null, moved = false;
    let downAt = null, suppressClick = false;
    let dragPrev = null, dragVel = { x: 0, y: 0 }; // скорость руки -> бросок ноды на отпускании
    let dragOff = { x: 0, y: 0 }, dragHot = false; // смещение курсор-центр; сим разбужен драгом
    let quizActive = false, quizTap = null, quizTease = null; // STREET KNOWLEDGE — см. блок квиза внизу

    const toLocal = (e) => {
      const s = size();
      return { x: (e.clientX - s.left - tx) / scale, y: (e.clientY - s.top - ty) / scale };
    };

    svg.addEventListener('pointerdown', (e) => {
      // try: у синтетических PointerEvent (тесты) и части устройств нет активного указателя
      try { svg.setPointerCapture(e.pointerId); } catch (err) {}
      pointers.set(e.pointerId, e);
      moved = false;
      downAt = { x: e.clientX, y: e.clientY };
      if (pointers.size === 2) { // pinch
        const [a, b] = [...pointers.values()];
        pinchStart = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), scale };
        dragNode = null; panStart = null;
        return;
      }
      const g = e.target.closest('.rg-node');
      if (g) {
        dragNode = byId.get(g.dataset.slug);
        const p = toLocal(e);
        // Фиксируем ноду там, где она стоит, и запоминаем смещение курсор-центр: раньше
        // fx ставился в точку курсора, и нода прыгала центром под палец — «резкое дёрганье»
        // при обычном клике (ревью 05-09). Сим здесь НЕ будим — тап физику не трогает,
        // разогрев уезжает в pointermove на реальное начало драга.
        dragOff = { x: dragNode.x - p.x, y: dragNode.y - p.y };
        dragNode.fx = dragNode.x; dragNode.fy = dragNode.y;
        dragPrev = p; dragVel = { x: 0, y: 0 };
        dragHot = false;
      } else {
        panStart = { x: e.clientX - tx, y: e.clientY - ty };
      }
    });

    svg.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, e);
      if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > DRAG_SLOP) moved = true;
      if (pinchStart && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        userZoomed = true;
        scale = Math.min(3, Math.max(0.35, pinchStart.scale * (d / pinchStart.d)));
        applyView();
        return;
      }
      if (dragNode) {
        const p = toLocal(e);
        // 0.1, не стандартные 0.3: с горячей симуляцией соседи бежали за тянутой нодой
        // почти без отставания — «жвачка»-эффект (связь тянется, сосед догоняет лениво)
        // живёт на слабых силах + низком трении (velocityDecay)
        // reduced-motion тоже будит сим на драг: иначе fx менялся, а тиков не было, и нода
        // стояла под пальцем мёртвой (владелец 25-09: «на мобиле баблы не двигаются» — на
        // телефонах reduced включает энергосбережение). Движение от руки пользователя —
        // не фоновая анимация; дрейф покоя под reduced по-прежнему не заводится.
        if (!dragHot && moved) { dragHot = true; sim.alphaTarget(0.1).restart(); }
        dragNode.fx = p.x + dragOff.x; dragNode.fy = p.y + dragOff.y;
        // сглаженная скорость последних движений (px/событие ~ px/тик симуляции)
        dragVel.x = dragVel.x * 0.6 + (p.x - dragPrev.x) * 0.4;
        dragVel.y = dragVel.y * 0.6 + (p.y - dragPrev.y) * 0.4;
        dragPrev = p;
      } else if (panStart) {
        tx = e.clientX - panStart.x; ty = e.clientY - panStart.y;
        applyView();
      }
    });

    // Перезапуск CSS-анимации классом: remove + принудительный reflow + add. Общий для
    // тап-пульса (rg-pop) и вспышки верной пары (rg-flash, блок квиза).
    const reanimate = (el2, cls) => {
      el2.classList.remove(cls);
      void el2.getBoundingClientRect();
      el2.classList.add(cls);
    };

    // Тап по ноде: «пульс» аватара (CSS rgPop — тактильный отклик клика, ревью 05-09)
    // и действие режима — выбор в квизе либо карточка.
    const tapNode = (n) => {
      reanimate(n.el, 'rg-pop');
      quizActive ? quizTap(n) : openCard(n, true);
    };

    const release = (e) => {
      pointers.delete(e.pointerId);
      pinchStart = null;
      if (dragNode) {
        // Тап без движения — выбор, а не драг: карточка открывается ЗДЕСЬ, по ноде с
        // pointerdown. На click полагаться нельзя: alphaTarget(0.3) на захвате толкает
        // граф, нода уезжает из-под курсора и target клика становится фон (Playwright-QA).
        if (!moved) {
          tapNode(dragNode);
          suppressClick = true;
        }
        dragNode.fx = null; dragNode.fy = null; // нода пружинит назад, соседи плавают
        if (!reduced && moved) {
          // Бросок: нода улетает со скоростью руки (кламп ±35 px/тик). Alpha на отпускании
          // ГАСИМ: силы масштабируются alpha, и с drag-овских ~0.1 пружина утаскивала ноду
          // назад рывком («очень резко, не реалистично»). Скорость броска от alpha не
          // зависит — инерция остаётся, а тянет назад слабо и плавно. 0.035 -> 0.02 (05-09):
          // после удара нодой об ноду обе «очень быстро возвращались на место».
          const cl = (v) => Math.max(-35, Math.min(35, v));
          dragNode.vx = cl(dragVel.x); dragNode.vy = cl(dragVel.y);
          sim.alpha(0.02);
        }
        // reduced: цель 0 — сим сам затухает за пару секунд (нода плавно встаёт на место) и
        // останавливается на alphaMin; мгновенный stop() замораживал граф посреди движения.
        sim.alphaTarget(reduced ? 0 : BREATHE);
        dragNode = null;
      }
      panStart = null;
    };
    svg.addEventListener('pointerup', release);
    svg.addEventListener('pointercancel', release);

    // Клик по пустому полю (не драг и не только что открытая карточка) -> закрыть
    svg.addEventListener('click', (e) => {
      if (suppressClick) { suppressClick = false; return; }
      if (moved) return;
      if (e.target.closest('.rg-node')) return;
      if (quizActive) { quizTap(null); return; } // клик по полю снимает выбор ноды
      closeCard(true);
    });
    nodesG.addEventListener('keydown', (e) => {
      const g = e.target.closest('.rg-node');
      if (g && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        tapNode(byId.get(g.dataset.slug));
      }
    });

    // ---- hover: активная нода и её рёбра в полную силу, остальное гасится ----
    svg.addEventListener('pointerover', (e) => {
      const g = e.target.closest('.rg-node');
      if (!g || quizActive) return; // в квизе подсветка рёбер соседа = подсказка ответа
      const n = byId.get(g.dataset.slug);
      svg.classList.add('rg-hovering');
      g.classList.add('rg-hot');
      for (const l of links) {
        if (l.source === n || l.target === n) {
          l.el.classList.add('rg-hot');
          (l.source === n ? l.target : l.source).el.classList.add('rg-warm');
        }
      }
    });
    svg.addEventListener('pointerout', (e) => {
      if (!e.target.closest('.rg-node')) return;
      svg.classList.remove('rg-hovering');
      svg.querySelectorAll('.rg-hot, .rg-warm').forEach((x) => x.classList.remove('rg-hot', 'rg-warm'));
    });

    // ---- фильтры ----
    const active = new Set(FILTERS.map(([type]) => type));
    filtersBox.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', () => {
        cb.checked ? active.add(cb.value) : active.delete(cb.value);
        applyFilters();
      });
    });
    filtersBox.querySelector('.rg-reset').addEventListener('click', () => {
      filtersBox.querySelectorAll('input[type="checkbox"]').forEach((cb) => { cb.checked = true; active.add(cb.value); });
      applyFilters();
    });
    function applyFilters() {
      for (const l of links) l.el.classList.toggle('rg-off', !active.has(l.type));
      for (const n of nodes) {
        const visible = links.some((l) => (l.source === n || l.target === n) && active.has(l.type));
        n.el.classList.toggle('rg-dim', !visible); // гаснет до 30%, не исчезает
      }
    }
    stage.querySelector('.rg-filters-toggle').addEventListener('click', () => stage.classList.toggle('rg-filters-open'));

    // ---- fullscreen ----
    // opts.fullscreen — тоггл поверхности (пульт: .deck.fs, свой паттерн кнопки карты;
    // Fullscreen API на пульте падает "Permissions check failed"). Дефолт — нативный API (вики).
    stage.querySelector('.rg-fs').addEventListener('click', () => {
      if (opts && opts.fullscreen) {
        opts.fullscreen();
        requestAnimationFrame(centerView); // кадр перемерился — заново отцентровать/подогнать
        return;
      }
      if (document.fullscreenElement) document.exitFullscreen();
      else if (stage.requestFullscreen) stage.requestFullscreen();
    });
    document.addEventListener('fullscreenchange', centerView);

    // ---- карточка персонажа + история/GA4 ----
    function openCard(n, push) {
      if (quizActive) return; // карточка называет связи словами — в квизе это ответы
      const rels = links
        .filter((l) => l.source === n || l.target === n)
        .map((l) => ({
          other: l.source === n ? l.target : l.source,
          word: l.type === 'boss' ? (l.source === n ? t('boss of') : t('works for')) : t(TYPE_WORD[l.type]),
          type: l.type,
          status: l.status,
        }));
      card.innerHTML = `
        <button class="rg-card-close" aria-label="${esc(t('Close'))}">✕</button>
        <img class="rg-card-img" src="/img/graph/${esc(n.img)}" alt="${esc(n.name)} — official Rockstar press art (cropped)">
        <h2 class="rg-card-name">${esc(n.name)}</h2>
        <div class="rg-card-role">${esc(t(n.role))}</div>
        <p class="rg-card-desc">${esc(n.desc)}</p>
        <div class="rg-card-rels">${rels.map((r) => `
          <button class="rg-card-rel" data-slug="${esc(r.other.id)}" type="button">
            <i class="rg-dot rg-t-${r.type}"></i> <span class="rg-rel-word">${esc(r.word)}</span> <b>${esc(r.other.name)}</b>
            ${r.status !== 'confirmed' ? `<span class="wiki-badge rg-badge" data-status="${r.status === 'speculation' ? 'supposed' : 'rumor'}">${esc(t(r.status))}</span>` : ''}
          </button>`).join('')}
        </div>
        <a class="rg-card-open" href="${esc(n.url)}">${esc(t('Open wiki article'))} →</a>`;
      card.hidden = false;
      stage.classList.add('rg-card-open-state');
      card.querySelector('.rg-card-close').addEventListener('click', () => closeCard(true));
      card.querySelectorAll('.rg-card-rel').forEach((b) => b.addEventListener('click', () => {
        const next = byId.get(b.dataset.slug);
        recenterOn(next);
        openCard(next, true);
      }));
      if (push && charHash) {
        history.pushState({ char: n.id }, '', charHash.build(n.id));
        ga('event', 'page_view', { page_location: location.href, page_title: document.title });
        ga('event', 'graph_node_open', { slug: n.id });
      }
      if (opts && opts.onNodeOpen) opts.onNodeOpen(n.id);
    }

    function closeCard(push) {
      if (card.hidden) return;
      card.hidden = true;
      stage.classList.remove('rg-card-open-state');
      if (push && charHash) {
        history.pushState({}, '', charHash.build(null));
        ga('event', 'page_view', { page_location: location.href, page_title: document.title });
      }
    }

    function recenterOn(n) {
      const s = size();
      tx = s.width / 2 - n.x * scale;
      ty = s.height / 2 - n.y * scale;
      applyView();
    }

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCard(true); });
    if (charHash) {
      window.addEventListener('popstate', () => {
        const slug = charHash.parse();
        if (slug && byId.has(slug)) openCard(byId.get(slug), false);
        else closeCard(false);
      });
      // Прямой заход с выбранным персонажем — карточка сразу
      const slug = charHash.parse();
      if (slug && byId.has(slug)) {
        const n = byId.get(slug);
        // Граф разложен синхронно при init — но перецентровку откладываем на кадр:
        // на пульте сразу после init зовётся onShow -> centerView, который перебил бы её
        requestAnimationFrame(() => recenterOn(n));
        openCard(n, false);
      }
    }

    // ---- квиз STREET KNOWLEDGE (opts.quiz — включает пульт; вики живёт без него) ----
    // Рёбра прячутся (.rg-quiz на stage), игрок «стучит» связи: тап по двум нодам =
    // предложение пары. Верное — ребро загорается насовсем (+2 RP), промах — красная линия
    // тает, и всё: проигрыша НЕТ (владелец 05-09 снял механику BUSTED/розыска — «не надо
    // игру, где можно проиграть»), играешь до полного сбора. Полный сбор: +5 RP и reveal
    // всего графа, включая пунктирные слухи. Награды платит поверхность (opts.quiz.award,
    // once-события): id версионируются парой (`quiz-e-<a>|<b>`) и числом рёбер
    // (`quiz-clear-N`) — переигровка не фармится, а новые связи после трейлеров сами
    // становятся новой целью.
    if (opts && opts.quiz) {
      const qa = new Map(); // ключ пары -> confirmed-ребро (слухи не загадываются)
      const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
      for (const l of links) if (l.status !== 'speculation') qa.set(pairKey(l.source.id, l.target.id), l);
      let sel = null;
      const found = new Set();
      stage.insertAdjacentHTML('beforeend', `
        <button class="rg-play" type="button">▶ STREET KNOWLEDGE</button>
        <div class="rg-qhud" hidden>
          <span class="rg-q-count"></span>
          <button class="rg-q-exit" type="button" aria-label="${esc(t('Close'))}">✕</button>
        </div>
        <div class="rg-qhint" hidden>${esc(t('Tap two characters that know each other'))}</div>
        <div class="rg-qpanel" hidden></div>`);
      const playBtn = stage.querySelector('.rg-play'), hud = stage.querySelector('.rg-qhud'),
        hint = stage.querySelector('.rg-qhint'), panel = stage.querySelector('.rg-qpanel');
      const renderHud = () => {
        hud.querySelector('.rg-q-count').textContent = `${found.size}/${qa.size}`;
      };
      const deselect = () => { if (sel) { sel.el.classList.remove('rg-sel'); sel = null; } };
      // «До соединения — физика мячика пинг-понга» (владелец 05-09): в квизе пружины
      // рёбер отключаются — они и выдавали ответы, стягивая связанных соседей, — а
      // столкновение становится упругим (радиус плотнее, strength 0.9×2 против фоновых
      // 0.15×1). Найденная пара получает свою пружину обратно и стягивается на глазах.
      const foundLinks = () => links.filter((l) => l.status !== 'speculation' && found.has(pairKey(l.source.id, l.target.id)));
      const quizPhysics = (on) => {
        // 0.4 вместо штатной 0.2/deg: у одинокой пары слабая пружина проигрывает charge,
        // и стягивание находки было бы незаметно
        sim.force('link').strength(on ? 0.4 : (l) => l.k).links(on ? foundLinks() : links);
        // charge вполовину: без пружин расталкивание раздувало поле на alpha-пинке старта —
        // крайний мячик выезжал за кадр (QA-вёрстка 05-09); тесноту мячиков держит collide
        sim.force('charge').strength(on ? -200 : -420);
        sim.force('collide', on
          ? d3.forceCollide(R + 14).strength(0.9).iterations(2)
          : d3.forceCollide(R + 26).strength(0.15));
        // трение вдвое ниже: задетый мячик катится с инерцией, а не гаснет за полсекунды
        // (владелец 05-09: «второй как-то быстро гасит инерцию — добавь скорости»)
        sim.velocityDecay(on ? 0.07 : 0.16);
        wallK = on ? 0.0004 : 0.00015; // см. комментарий у объявления wallK
        // 0.04, не 0.08: пинок нужен только чтобы новая физика включилась, на 0.08 крайний
        // мячик (Real Dimez) на секунду выныривал за кромку кадра (QA-вёрстка 05-09)
        if (!reduced) sim.alpha(0.04).restart();
      };
      const start = () => {
        closeCard(true);
        // фильтры прячутся CSS-ом, но их rg-off/rg-dim скрыли бы и найденные рёбра — сброс
        filtersBox.querySelector('.rg-reset').click();
        quizActive = true; found.clear(); deselect();
        for (const l of links) l.el.classList.remove('rg-found');
        stage.classList.add('rg-quiz');
        quizPhysics(true);
        playBtn.hidden = true; panel.hidden = true; hint.hidden = false; hud.hidden = false;
        renderHud();
        ga('event', 'quiz_start', {});
      };
      const stop = () => { // выход в обычный граф; rg-found вне .rg-quiz безвреден
        quizActive = false; deselect();
        stage.classList.remove('rg-quiz');
        quizPhysics(false);
        hud.hidden = true; hint.hidden = true; panel.hidden = true; playBtn.hidden = false;
      };
      const win = () => {
        quizActive = false; deselect();
        hud.hidden = true;
        stage.classList.remove('rg-quiz'); // reveal: весь граф, слухи Рауля в подарок
        quizPhysics(false);
        opts.quiz.award(`quiz-clear-${qa.size}`, 5);
        panel.innerHTML = `
          <b class="rg-q-title rg-q-win">${esc(t('You know the streets'))}</b>
          <span class="rg-q-score">${found.size}/${qa.size}</span>
          <button class="rg-q-done" type="button">${esc(t('Close'))}</button>`;
        panel.hidden = false;
        panel.querySelector('.rg-q-done').addEventListener('click', stop);
        ga('event', 'quiz_clear', { found: found.size });
      };
      quizTap = (n) => {
        hint.hidden = true;
        if (!n || sel === n) { deselect(); return; }
        if (!sel) { sel = n; n.el.classList.add('rg-sel'); return; }
        const a = sel;
        deselect();
        const key = pairKey(a.id, n.id);
        const hit = qa.get(key);
        if (!hit) { // промах: красная линия тает — фидбек без наказания
          const w = el('line', { class: 'rg-wrong', x1: a.x, y1: a.y, x2: n.x, y2: n.y }, edgesG);
          setTimeout(() => w.remove(), 700);
          ga('event', 'quiz_miss', { pair: key });
          return;
        }
        if (found.has(key)) return; // уже открытая пара — не начисляем повторно
        found.add(key);
        hit.el.classList.add('rg-found');
        // оба бабла пары вспыхивают в цвет находки (владелец 05-09); снятие по таймеру —
        // чтобы класс не залипал (иначе на кольце навсегда побеждало бы rgFlash-правило
        // и тап-пульс кольца пропадал)
        for (const m of [a, n]) {
          reanimate(m.el, 'rg-flash');
          setTimeout(() => m.el.classList.remove('rg-flash'), 950);
        }
        // пружина найденной пары включается — связанные стягиваются, находка видна физикой
        sim.force('link').links(foundLinks());
        if (!reduced) sim.alpha(0.05).restart();
        // quiet: тост на мобиле — снэкбар внизу по центру, ровно поверх HUD квиза;
        // фидбек за ребро и так есть (вспышка + счётчик), громкий тост — только финальному +5
        opts.quiz.award(`quiz-e-${key}`, 2, true);
        renderHud();
        ga('event', 'quiz_edge_found', { pair: key });
        if (found.size === qa.size) win();
      };
      playBtn.addEventListener('click', start);
      hud.querySelector('.rg-q-exit').addEventListener('click', stop);

      // Тизер входа в режим (владелец 05-09: «буквально за секунду пробегается линия…
      // все связи быстро показываются анимацией, а потом исчезают»): рёбра рисуются
      // пробегом (dashoffset по pathLength=1, стаггер по индексу), гаснут — и режим
      // начинается сразу С ИГРЫ. Один раз на загрузку страницы; выход ✕ оставляет
      // обычный граф до конца сессии. reduced-motion: без анимации, сразу квиз.
      let teased = false;
      quizTease = () => {
        if (teased) return;
        teased = true;
        if (reduced) { start(); return; }
        stage.classList.add('rg-teasing');
        links.forEach((l, i) => { l.el.style.animationDelay = `${i * 50}ms`; });
        // 2400 = длительность rgTease в relationship-graph.css (1.4s -> 2.4s, владелец 05-09:
        // «+1 сек») — менять только парой
        setTimeout(() => {
          stage.classList.remove('rg-teasing');
          for (const l of links) l.el.style.animationDelay = '';
          start();
        }, 2400 + links.length * 50);
      };
    }

    // Для поверхностей, где граф живёт в переключаемом режиме (пульт): hide глушит сим,
    // show заново центрует (после display:none размеры были нулевые) и будит дыхание.
    return {
      onShow() {
        centerView();
        if (!reduced) sim.alphaTarget(BREATHE).restart();
        // Первый показ: тизер связей -> сразу квиз. НЕ при открытой карточке — диплинк
        // #view=relations&char=<slug> (кнопки со статей) пришёл за конкретным персонажем,
        // автоквиз захлопнул бы его карточку.
        if (quizTease && card.hidden) quizTease();
      },
      onHide() { sim.stop(); },
    };
  }

  window.RelationshipGraph = { init };
})();
