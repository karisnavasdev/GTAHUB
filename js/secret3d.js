// ===== SECRET: 3D-карусель наших моделей (01-10) =====
// Слой 2 (периферия, CORE_SPEC): ячейка дока под правой колонкой. Владелец 01-10: «на главную, где
// SECRET, встраиваем 3D с нашими 3D-моделями и ссылку на статью внизу под моделью».
// Данные — data/models3d.js (генерируется scripts/gen-models3d.js из флагов viewer3d вики), шаблон — Render.secret3d, вьюер — ESM-бандл js/vendor/hub3d.js (те же
// исходники, что у вики; npm run build:hub3d в wiki-src). three не грузится, пока ячейка не в кадре
// (с 03-10 на телефоне она первая под шапкой — старт после load, см. ниже). Каждая модель монтируется один раз при первом
// показе; скрытые виды не рисуют (их цикл стоит — IntersectionObserver ядра видит display:none).
// Модели сменяются сами каждые 9 с, пока посетитель не тронул ячейку (стрелка или drag).
(function () {
  const ROTATE_MS = 9000;

  function init() {
    const body = document.getElementById('secretBody');
    const data = window.MODELS_3D, R = window.Render;
    if (!body || !data?.items?.length || !R?.secret3d) return false;
    body.innerHTML = R.secret3d(data.items);

    const root = body.querySelector('.s3d');
    const views = [...root.querySelectorAll('.s3d-view')];
    const link = root.querySelector('.s3d-link');
    const loc = window.HUB_I18N?.locale || 'en';
    const hrefOf = (m) => (m.type === 'news'
      ? (loc !== 'en' && data.newsLocales.includes(loc) ? `/${loc}${m.href}` : m.href)
      : R.wikiHref(m.href));
    const webgl = !!document.createElement('canvas').getContext('webgl2');
    const mounted = new Set();
    let cur = 0, viewer = null, timer = 0, started = false, inView = false;

    function show(i) {
      cur = (i + views.length) % views.length;
      views.forEach((v, k) => { v.hidden = k !== cur; });
      const m = data.items[cur];
      link.href = hrefOf(m);
      link.textContent = `${R.modelTitle(m)} →`;
      if (!webgl || mounted.has(cur)) return;
      mounted.add(cur);
      const view = views[cur];
      (viewer ||= import('/js/vendor/hub3d.js'))
        .then((mod) => mod.mount(view, m.kind, m.opts))
        .catch(() => { /* без 3D: остаётся постер */ });
    }
    const stopAuto = () => { clearInterval(timer); timer = 0; };
    root.querySelector('.s3d-prev').addEventListener('click', () => { stopAuto(); show(cur - 1); });
    root.querySelector('.s3d-next').addEventListener('click', () => { stopAuto(); show(cur + 1); });
    root.querySelector('.s3d-stage').addEventListener('pointerdown', (e) => { if (e.target.tagName === 'CANVAS') stopAuto(); });

    // Старт — только когда ячейка в кадре; листаем тоже только в кадре: иначе карусель монтировала бы
    // модели, которых никто не видит (лишние WebGL-контексты, особенно на телефоне).
    // 03-10: на телефоне ячейка стоит первой под шапкой и видна сразу — без ожидания three (~600 КБ)
    // тянулся бы вместе со страницей и отодвигал отрисовку ленты. Поэтому старт — не раньше, чем
    // страница догрузилась (событие load + пауза); до этого в ячейке постер модели.
    let ready = false;
    const start = () => {
      if (started || !inView || !ready) return;
      started = true;
      show(0);
      timer = setInterval(() => { if (inView) show(cur + 1); }, ROTATE_MS);
    };
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; start(); }).observe(root);
    const onReady = () => setTimeout(() => { ready = true; start(); }, 600);
    if (document.readyState === 'complete') onReady(); else window.addEventListener('load', onReady, { once: true });
    // Ссылка видна и до старта.
    link.href = hrefOf(data.items[0]);
    link.textContent = `${R.modelTitle(data.items[0])} →`;
    return true;
  }

  window.Secret3D = { init };
})();
