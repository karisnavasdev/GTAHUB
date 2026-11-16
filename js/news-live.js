// Живая лента LIVE WIRE: подменяет window.INTEL_NEWS записями таблицы Supabase `news`
// (пишет воркер media-hub/src/news.js из RSS изданий, 005_news.sql + 006_news_rss.sql). Та же схема, что у media-live.js:
// хардкод data/news-data.js рисуется сразу, живые записи приезжают следом и заменяют его на месте
// (splice — windows.js читает window.INTEL_NEWS при открытии окна). Чтение анонимное через
// PostgREST с publishable key, SDK не нужен — лента работает и если js/vendor/supabase.min.js упал.
(function () {
  const sb = window.SITE_CONFIG?.SUPABASE;
  if (!sb?.url) return;
  const t = (s) => window.Render.t(s);
  const lang = document.documentElement.lang || 'en';
  // Метка времени как у хардкода («Jul 11»), свежее суток — «N h ago», как у Weazel.
  const when = (iso) => {
    const min = Math.max(1, Math.floor((Date.now() - Date.parse(iso)) / 6e4));
    if (min < 60) return t('{n} min ago').replace('{n}', min);
    if (min < 1440) return t('{n} h ago').replace('{n}', Math.floor(min / 60));
    return new Date(iso).toLocaleDateString(lang, { month: 'short', day: 'numeric' });
  };
  const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };

  fetch(`${sb.url}/rest/v1/news?select=id,category,title,body,url,source_name,published_at&order=published_at.desc&limit=12`,
    { headers: { apikey: sb.publishableKey } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then((rows) => {
      if (!Array.isArray(rows) || !rows.length) throw new Error('пусто'); // таблица ещё не наполнена — остаёмся на хардкоде
      // id стабильный → реакции react-n-<id> не задваиваются при обновлении ленты (news.js item()).
      const items = rows.map((r) => ({
        id: 'n-' + r.id, category: r.category, title: r.title, body: r.body,
        url: r.url, source: r.source_name || host(r.url), time: when(r.published_at) // у Google News url — редирект, издание из source_name
      }));
      window.INTEL_NEWS.splice(0, window.INTEL_NEWS.length, ...items);
      document.dispatchEvent(new CustomEvent('intel-updated'));
    })
    .catch((e) => console.info('[news] живая лента недоступна, работаем на data/news-data.js:', e.message));
})();
