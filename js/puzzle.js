// ===== ПЯТНАШКИ (режим GAMES на главной) =====
// Слой 2 (периферия): режим центральной зоны, как ARTICLES/RELATIONS — карта скрыта .map-frame.view-games,
// не перекрыта; своего оверлея и окна нет. Шаблоны — Render.puzzle* (js/render.js), картинки —
// window.PUZZLE_PICS (data/puzzle-pics.js), домен/цена — SITE_CONFIG. Подключается из view-mode.js:
// ленивый init при первом входе в режим, onHide/onShow.
//
// Порядок картинок (владелец 11-10 и 12-10): список data/puzzle-pics.js упорядочен — светлые кадры и главные
// персонажи впереди, — а у каждого посетителя он «мягко» перемешан (shuffleOrder: картинка уходит от своего
// места не дальше SHUFFLE_SPREAD позиций). Seed и последняя показанная картинка хранятся у посетителя: новый
// заход продолжает его последовательность. Собранные пропускаются, «New picture» — следующая.
//
// Раскладка — случайное блуждание пустой клетки от собранного состояния: решаема по построению (каждый ход
// обратим), поэтому парность перестановки не проверяется. Чистое ядро (core) отдаётся через module.exports —
// его гоняет scripts/puzzle-core-test.js (из корня репо), браузерный код от него не отличается.
(function (root) {
  const SIZE_KEY = 'leonida.puzzle.size';
  const LAST_KEY = 'leonida.puzzle.last'; // id последней показанной картинки: новый заход начинает со следующей
  const SEED_KEY = 'leonida.puzzle.seed'; // seed личной последовательности посетителя
  const SHUFFLE_SPREAD = 24; // на сколько позиций (максимум) картинка может уйти от своего места в списке
  // Длина блуждания: не меньше 80 для 3x3 и 200 для 4x4 (бриф). Запас сверху — чтобы раскладка
  // не выходила «почти собранной» на удачной прогулке.
  const SCRAMBLE_MOVES = { 3: 100, 4: 240 };

  // ---------- чистое ядро ----------
  // Следующая по списку после current (по кругу), из ещё не собранных (done(i) === false). Всё собрано —
  // просто следующая. current = -1 — с начала списка.
  function pickIndex(len, current, done) {
    for (let k = 1; k <= len; k++) {
      const i = (current + k + len) % len;
      if (i !== current && !done(i)) return i;
    }
    return (current + 1) % len;
  }
  // Мягкое перемешивание: индексы 0..len-1, отсортированные по i + rand·spread. Картинка уходит от своего места
  // меньше чем на spread позиций; тот же seed — та же последовательность.
  function shuffleOrder(len, seed, spread) {
    const rand = rng(seed);
    const key = Array.from({ length: len }, (_, i) => i + rand() * spread);
    return key.map((_, i) => i).sort((a, b) => key[a] - key[b]);
  }
  // mulberry32: маленький детерминированный ГСЧ
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const solvedTiles = (n) => Array.from({ length: n * n }, (_, i) => (i + 1) % (n * n)); // 1..n²-1, пусто (0) — в конце
  const isSolved = (t) => t.every((v, i) => v === (i + 1) % t.length);
  function neighbours(b, n) {
    const r = Math.floor(b / n), c = b % n, out = [];
    if (r > 0) out.push(b - n);
    if (r < n - 1) out.push(b + n);
    if (c > 0) out.push(b - 1);
    if (c < n - 1) out.push(b + 1);
    return out;
  }
  // Блуждание пустой клетки без немедленного отката. path — позиции пустой клетки, начиная с угла.
  function scrambleWalk(n, seed, moves) {
    const rand = rng(seed);
    const t = solvedTiles(n);
    let b = n * n - 1, prev = -1;
    const path = [b];
    // Не собрано на выходе: если прогулка ровно вернулась — гуляем дальше (на практике почти не бывает).
    for (let i = 0; i < moves || isSolved(t); i++) {
      let opts = neighbours(b, n).filter((p) => p !== prev);
      if (!opts.length) opts = neighbours(b, n);
      const p = opts[Math.floor(rand() * opts.length)];
      t[b] = t[p]; t[p] = 0;
      prev = b; b = p;
      path.push(b);
    }
    return { tiles: t, path };
  }
  // Ход по клику на позицию p: плитка в одной строке/столбце с пустой клеткой сдвигает цепочку.
  // Возвращает новый массив или null, если ход невозможен.
  function slide(t, n, p) {
    const b = t.indexOf(0);
    if (p === b) return null;
    const rb = Math.floor(b / n), cb = b % n, rp = Math.floor(p / n), cp = p % n;
    if (rb !== rp && cb !== cp) return null;
    const step = rb === rp ? (p > b ? 1 : -1) : (p > b ? n : -n);
    const out = t.slice();
    for (let i = b; i !== p; i += step) out[i] = out[i + step];
    out[p] = 0;
    return out;
  }
  // Стрелка → позиция плитки, которая поедет В ЭТУ сторону (вверх = плитка под пустой клеткой).
  function keyTarget(t, n, key) {
    const b = t.indexOf(0), r = Math.floor(b / n), c = b % n;
    if (key === 'ArrowUp') return r < n - 1 ? b + n : -1;
    if (key === 'ArrowDown') return r > 0 ? b - n : -1;
    if (key === 'ArrowLeft') return c < n - 1 ? b + 1 : -1;
    if (key === 'ArrowRight') return c > 0 ? b - 1 : -1;
    return -1;
  }
  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const core = { pickIndex, shuffleOrder, rng, solvedTiles, isSolved, scrambleWalk, slide, keyTarget, fmtTime, SCRAMBLE_MOVES };
  if (typeof module === 'object' && module.exports) { module.exports = core; return; }

  // ---------- браузерная часть ----------
  const ga = (...a) => { if (typeof window.gtag === 'function') window.gtag(...a); };
  // localStorage бросает в приватном режиме и при запрете cookies — тогда игра просто ничего не помнит
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const randomSeed = () => (Math.random() * 2 ** 32) >>> 0;
  // id картинки — имя файла без -press.webp (параметр pic в GA4); событие Respect — puzzle-<id>
  const picId = (e) => e.img.split('/').pop().replace(/-press\.webp$/, '');
  const respectId = (e) => `puzzle-${picId(e)}`;

  function init(container) {
    const cfg = window.SITE_CONFIG, R = window.Render, list = window.PUZZLE_PICS;
    const frame = document.querySelector('.map-frame');

    // Личная последовательность: list[order[cur]] — текущая картинка, cur = -1 — ещё ни одной
    const savedSeed = store.get(SEED_KEY);
    const seed = savedSeed && Number.isInteger(+savedSeed) ? +savedSeed >>> 0 : randomSeed();
    store.set(SEED_KEY, String(seed));
    const order = shuffleOrder(list.length, seed, SHUFFLE_SPREAD);
    const isDone = (p) => !!window.Respect?.has(respectId(list[order[p]]));
    const last = store.get(LAST_KEY);
    let cur = order.findIndex((i) => picId(list[i]) === last);
    let size = Number(store.get(SIZE_KEY)) === 4 ? 4 : 3;

    container.innerHTML = R.puzzleShell({ size });
    const $ = (sel) => container.querySelector(sel);
    const pz = $('.pz'), board = $('.pz-board'), result = $('.pz-result');
    const movesEl = $('.pz-moves'), timeEl = $('.pz-time'), peekBtn = $('[data-act="peek"]');
    const boardLabel = board.getAttribute('aria-label');

    let entry, aspect = 16 / 9, imgState = 'loading'; // imgState: 'loading' | 'ok' | 'error'
    let startTiles, tiles, moves, solved, els;

    // ---- часы: acc — накопленное время, startedAt — момент последнего пуска (0 — стоят) ----
    let acc = 0, startedAt = 0, ticker = null;
    const elapsed = () => acc + (startedAt ? Date.now() - startedAt : 0);
    const paintTime = () => { timeEl.textContent = fmtTime(Math.floor(elapsed() / 1000)); };
    function runClock() {
      startedAt = Date.now();
      if (!ticker) ticker = setInterval(paintTime, 250);
    }
    function stopClock() {
      acc = elapsed(); startedAt = 0;
      clearInterval(ticker); ticker = null;
    }

    // ---- поле ----
    function place() {
      tiles.forEach((v, p) => {
        if (!v) return;
        els[v].style.setProperty('--r', Math.floor(p / size));
        els[v].style.setProperty('--c', p % size);
      });
    }
    function buildTiles() {
      const n = size;
      board.style.setProperty('--n', n);
      board.innerHTML = R.puzzleFull(entry.img) + Array.from({ length: n * n - 1 }, (_, i) => R.puzzleTile(i + 1)).join('');
      els = {};
      board.querySelectorAll('.pz-tile').forEach((el) => {
        const v = Number(el.dataset.v), r0 = Math.floor((v - 1) / n), c0 = (v - 1) % n;
        // Картинка тянется по высоте поля (background-size: auto n*100%) и режется по центру по ширине:
        // доля сдвига для столбца c — (c + n(a-1)/2) / (n·a - 1), где a — пропорция кадра; по вертикали r/(n-1).
        const px = (c0 + n * (aspect - 1) / 2) / (n * aspect - 1) * 100, py = r0 / (n - 1) * 100;
        el.style.backgroundImage = `url("${entry.img}")`;
        el.style.backgroundPosition = `${px}% ${py}%`;
        els[v] = el;
      });
      place();
    }

    // newLayout — другая картинка/размер (новая случайная раскладка); иначе «Restart» к той же стартовой
    function reset(newLayout) {
      if (newLayout) startTiles = scrambleWalk(size, randomSeed(), SCRAMBLE_MOVES[size]).tiles;
      tiles = startTiles.slice();
      moves = 0; solved = false;
      movesEl.textContent = '0';
      stopClock(); acc = 0; paintTime();
      pz.classList.remove('solved');
      setPeek(false);
      board.setAttribute('aria-label', boardLabel);
      result.innerHTML = '';
      if (imgState !== 'loading') buildTiles();
    }

    function newPicture() {
      cur = pickIndex(list.length, cur, isDone);
      const pic = list[order[cur]];
      entry = pic;
      store.set(LAST_KEY, picId(pic));
      imgState = 'loading';
      board.innerHTML = '';
      board.classList.add('pz-loading');
      const im = new Image();
      const loaded = (state) => {
        if (entry !== pic) return; // пока грузилась, успели сменить кадр
        imgState = state;
        if (state === 'ok') aspect = im.naturalWidth / im.naturalHeight || 16 / 9;
        board.classList.remove('pz-loading');
        board.classList.toggle('pz-noimg', state === 'error');
        buildTiles();
      };
      im.onload = () => loaded('ok');
      im.onerror = () => loaded('error');
      im.src = pic.img;
      reset(true);
    }

    function setSize(n) {
      if (n === size) return;
      size = n;
      store.set(SIZE_KEY, String(n));
      container.querySelectorAll('.pz-size').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.size) === n)));
      reset(true);
    }

    // «Образец»: целая картинка поверх поля, пока кнопка нажата. Любой ход сначала убирает образец.
    const peeking = () => pz.classList.contains('peek');
    function setPeek(on) {
      pz.classList.toggle('peek', on);
      peekBtn.setAttribute('aria-pressed', String(on));
    }

    function tryMove(p) {
      if (peeking()) { setPeek(false); return false; }
      if (solved || imgState === 'loading') return false;
      const next = slide(tiles, size, p);
      if (!next) return false;
      if (!moves) { runClock(); ga('event', 'puzzle_start', { size, pic: picId(entry) }); }
      tiles = next; moves++;
      movesEl.textContent = String(moves);
      place();
      if (isSolved(tiles)) win();
      return true;
    }

    function win() {
      solved = true;
      stopClock(); paintTime();
      const seconds = Math.floor(acc / 1000);
      pz.classList.add('solved');
      board.querySelectorAll('.pz-tile').forEach((el) => { el.disabled = true; });
      board.setAttribute('aria-label', entry.alt);
      const shareText = `Leonida Puzzle · ${size}×${size} · ${moves} moves · ${fmtTime(seconds)} — ${cfg.siteDomain}`;
      result.innerHTML = R.puzzleResult({ name: entry.name, href: R.wikiHref('/wiki/' + entry.wiki) });
      result.querySelector('.pz-share').addEventListener('click', (e) => share(e.currentTarget, shareText));
      ga('event', 'puzzle_solve', { size, moves, seconds, pic: picId(entry) });
      // Разовое событие на картинку: имя файла в id, повторная сборка той же картинки платит 0. Ограничитель
      // по CORE_SPEC — сама once-механика и конечный список (серверное правило — supabase/migrations/008).
      window.Respect?.award(respectId(entry), cfg.PUZZLE_RESPECT_AMOUNT, 'once');
    }

    async function share(btn, text) {
      if (navigator.share) {
        try { await navigator.share({ text }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
      }
      let ok = false;
      try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {}
      if (!ok) { // нет Clipboard API / нет разрешения
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove();
      }
      if (!ok) return;
      // Галочка и подсказка «Copied!» на 1.8 с, потом обратно «Поделиться»
      const mark = (icon, label) => { btn.innerHTML = R.puzzleIcon(icon); btn.title = label; btn.setAttribute('aria-label', label); };
      const label = btn.title;
      mark('check', R.t('Copied!'));
      setTimeout(() => mark('share', label), 1800);
    }

    // ---- события ----
    board.addEventListener('click', (e) => {
      const tile = e.target.closest('.pz-tile');
      if (tile) tryMove(tiles.indexOf(Number(tile.dataset.v)));
    });
    container.querySelectorAll('.pz-size').forEach((b) => b.addEventListener('click', () => setSize(Number(b.dataset.size))));
    $('[data-act="restart"]').addEventListener('click', () => reset(false));
    $('[data-act="next"]').addEventListener('click', newPicture);
    peekBtn.addEventListener('click', () => setPeek(!peeking()));
    // Стрелки: только пока виден режим и не открыто окно/поле ввода. Прокрутку гасим лишь когда ход
    // состоялся — иначе на узком экране стрелки перестали бы листать плитку.
    document.addEventListener('keydown', (e) => {
      if (!frame?.classList.contains('view-games') || document.body.classList.contains('win-open')) return;
      if (e.altKey || e.ctrlKey || e.metaKey || !e.key.startsWith('Arrow')) return;
      if (e.target.closest?.('input,textarea,select,[contenteditable]')) return;
      const p = keyTarget(tiles, size, e.key);
      if (p >= 0 && tryMove(p)) e.preventDefault();
    });

    newPicture();

    return {
      onShow() { if (!startedAt && moves && !solved) runClock(); },
      // Уход из режима = пауза часов: время «на другой вкладке» в результат не идёт
      onHide() { stopClock(); },
    };
  }

  root.Puzzle = { init, core };
})(typeof window !== 'undefined' ? window : globalThis);
