// ===== ПРОГРЕСС ИССЛЕДОВАНИЯ — hero-tiles T1 (docs/PROMPT_map_hero_tiles.md §6) =====
// Доступ к открытым плиткам только через этот адаптер (get/add/all). Сейчас — localStorage,
// когда появится Supabase Auth — подменяется реализация внутри файла, вызовы в hero-tiles.js
// не переписываются. Известное ограничение: localStorage правится руками в devtools, защиты
// от накрутки счётчика нет — появится только с серверным хранением.
(function () {
  const KEY = 'leonida.map.explored';

  function readSet() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); }
    catch { return new Set(); }
  }
  function writeSet(set) {
    try { localStorage.setItem(KEY, JSON.stringify([...set])); } catch {}
    document.dispatchEvent(new CustomEvent('leonida:state-changed', { detail: { key: KEY } })); // store.js: в аккаунт
  }

  window.ProgressStore = {
    get(id) { return readSet().has(id); },
    // true — это было первое открытие (только что записали), false — уже было открыто раньше
    add(id) {
      const set = readSet();
      if (set.has(id)) return false;
      set.add(id);
      writeSet(set);
      return true;
    },
    all() { return readSet(); }
  };
})();
