// Живая лента видео и стримов: подменяет содержимое window.VOTD_LIST / window.SHORTS_LIST
// (media.json) и window.TWITCH_STREAMS (streams.json) данными воркера (workers/media-hub), если он
// настроен и ответил.
//
// Схема «сначала хардкод, потом подмена» намеренная: data/media-feed.js грузится синхронно и
// окно MEDIA работает с первой миллисекунды, даже если воркер лежит, домен недоступен или
// SITE_CONFIG.mediaFeedUrl ещё null. Пустого состояния и спиннера у медиа не бывает вообще.
//
// Списки правим НА МЕСТЕ (splice), а не переприсваиваем: js/windows.js берёт pool один раз при
// открытии окна и держит его в замыкании «мешка» (makeBag). Присвоение нового массива в
// window.VOTD_LIST такое замыкание не увидит, а splice видно всем, кто держит ссылку.
(function () {
  const url = window.SITE_CONFIG?.mediaFeedUrl;
  const streamsUrl = window.SITE_CONFIG?.streamsEnabled ? window.SITE_CONFIG.streamsFeedUrl : null;

  // Минимальная проверка формы: воркер наш, но между ним и браузером стоит CDN, а на месте
  // упавшего домена может оказаться HTML-заглушка провайдера. Пустой список — тоже отказ:
  // лучше остаться на хардкоде, чем показать пустое окно.
  const usable = (list) =>
    Array.isArray(list) && list.length > 0 &&
    list.every((v) => v && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.channel === 'string');

  const replace = (target, next) => {
    if (!usable(next)) return false;
    target.splice(0, target.length, ...next);
    return true;
  };

  if (url) fetch(url, { mode: 'cors' })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then((data) => {
      const gotVideos = replace(window.VOTD_LIST, data.videos);
      const gotShorts = replace(window.SHORTS_LIST, data.shorts);
      if (!gotVideos && !gotShorts) throw new Error('ответ без пригодных списков');
      // Окно MEDIA собирает вкладки при открытии и подхватит новые списки само; VOTD в доке
      // уже нарисован, ему нужен пинок.
      document.dispatchEvent(new CustomEvent('media-feed-updated'));
    })
    .catch((e) => {
      // Тихо: пользователь и так видит рабочую подборку, а падать в консоль ошибкой из-за
      // недоступного воркера незачем — это штатный фолбэк, а не поломка.
      console.info('[media] живая лента недоступна, работаем на data/media-feed.js:', e.message);
    });

  // Стримы: воркер отдаёт топ живых Twitch-эфиров по игре (channel/name/tag/title/viewers).
  // Тот же приём — splice на месте (news.js держит ссылку на список), потом пинок доку.
  if (streamsUrl) fetch(streamsUrl, { mode: 'cors' })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .then((data) => {
      const list = data.streams;
      const ok = Array.isArray(list) && list.length > 0 && list.every((s) => s && typeof s.channel === 'string' && typeof s.name === 'string');
      if (!ok) throw new Error('ответ без пригодного списка');
      window.TWITCH_STREAMS.splice(0, window.TWITCH_STREAMS.length, ...list);
      document.dispatchEvent(new CustomEvent('streams-updated'));
    })
    .catch((e) => console.info('[streams] живой список недоступен, работаем на data/streams.js:', e.message));
})();
