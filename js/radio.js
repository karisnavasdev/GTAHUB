// ===== RADIO WIDGET — Vice FM =====
// Никакого автоплея: звук стартует только по явному клику/клавише пользователя.
(function () {
  // Astro ClientRouter (вики, RadioDock.astro): при soft-навигации между страницами вики
  // .wiki-radio-dock физически персистится (transition:persist), но сам <script is:inline>
  // внутри него всё равно выполняется заново поверх того же DOM — без этого гварда на второй
  // и т.д. запуске навешивались бы дублирующиеся обработчики кликов (playing у каждого своя
  // копия, рассинхрон) и виджет ложно мигал бы flash/resume поверх реально играющего трека.
  if (window.__lhRadioInit) return;
  window.__lhRadioInit = true;

  const stations = window.RADIO_STATIONS || [];
  if (!stations.length) return;

  const widget   = document.getElementById('radioWidget');
  const audio    = document.getElementById('radioAudio');
  const toggleBtn = document.getElementById('radioToggle');
  const prevBtn  = document.getElementById('radioPrev');
  const nextBtn  = document.getElementById('radioNext');
  const trackPrevBtn = document.getElementById('radioTrackPrev');
  const trackNextBtn = document.getElementById('radioTrackNext');
  const marquee     = document.getElementById('radioMarquee');
  const marqueeText = document.getElementById('radioMarqueeText');
  const muteBtn  = document.getElementById('radioMute');
  const volSlider = document.getElementById('radioVol');
  const tip      = document.getElementById('radioTip');
  // Кубики чилл-режима + мини-эквалайзер на кнопке радио на карте (map.js) — один общий vizLoop
  const vizBars  = document.querySelectorAll('#cdoViz span, .map-player-btn .mpb-viz i');
  const cdOverlayEl = document.getElementById('cdOverlay');

  const K_ON = 'lh_radio_on', K_STATION = 'lh_radio_station', K_VOL = 'lh_radio_volume',
        K_TIP = 'lh_radio_tip_shown', K_TRACK = 'lh_radio_track', K_POS = 'lh_radio_pos';

  let stationIdx = Math.max(0, stations.findIndex(s => s.id === localStorage.getItem(K_STATION)));
  let trackIdx = parseInt(localStorage.getItem(K_TRACK), 10) || 0;
  if (trackIdx < 0 || trackIdx >= stations[stationIdx].tracks.length) trackIdx = 0;
  let playing = false;
  let pendingResume = localStorage.getItem(K_ON) === '1';
  // Снимок на момент старта: pendingResume ниже гасится сам (once-слушатель), а сюда попадаем
  // только на самом первом audio.src в этой загрузке страницы — сохранённую позицию из localStorage
  // (не случайную, как при смене станции) нужно применить именно тогда, не позже.
  const isResumedSession = pendingResume;
  let errAttempts = 0;

  const setState = s => { widget.dataset.state = s; };
  const currentStation = () => stations[stationIdx];
  const updateMuteIcon = () => { muteBtn.classList.toggle('muted', audio.muted || audio.volume === 0); };
  const flash = (el, cls, ms) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };
  const applyVolume = v => {
    audio.volume = v;
    volSlider.value = v;
    volSlider.style.setProperty('--vol-pct', (v * 100) + '%');
  };

  const savedVol = parseFloat(localStorage.getItem(K_VOL));
  applyVolume(isNaN(savedVol) ? 0.4 : savedVol);

  // Один текст "СТАНЦИЯ — ТРЕК": короткий стоит на месте, длинный — бесшовно едет.
  // Лента дублирует контент и крутит на -50% (см. .radio-marquee.scrolling в style.css) — без рывка в пустоту,
  // на который ловилась предыдущая версия с одноразовым translateX(-100%).
  let marqueeClone = null;
  function updateMarquee(trackTitle) {
    widget.dataset.station = currentStation().id; // инверсия акцента виджета/chill-кнопки — см. .radio-widget[data-station] в style.css
    if (cdOverlayEl) cdOverlayEl.dataset.station = currentStation().id; // дублируем на оверлей — визуализатор ему потомок, а не виджету
    const text = trackTitle ? `${currentStation().name} — ${trackTitle}` : currentStation().name;
    marqueeText.textContent = text + '        ';
    if (marqueeClone) { marqueeClone.remove(); marqueeClone = null; }
    marquee.classList.remove('scrolling');
    marquee.style.animationDuration = '';
    requestAnimationFrame(() => {
      const copyWidth = marqueeText.scrollWidth;
      if (copyWidth <= widget.querySelector('.radio-station').clientWidth) return;
      marqueeClone = marqueeText.cloneNode(true);
      marqueeClone.setAttribute('aria-hidden', 'true');
      marquee.appendChild(marqueeClone);
      marquee.style.animationDuration = `${Math.max(8, copyWidth / 24)}s`; // ~24px/s — комфортный темп чтения
      marquee.classList.add('scrolling');
    });
  }

  // Станции идут ПАРАЛЛЕЛЬНО (правка 14-08): переключатель — ручка настройки приёмника, а не
  // плейлист. Уходя со станции, запоминаем трек, секунду и момент ухода; вернувшись — доматываем
  // реально прошедшее время. Длительностей треков в данных нет (duration: 0 у локальных файлов),
  // поэтому крутим по кругу ТЕКУЩЕГО трека, а не перескакиваем по списку: эфир идёт, но своей
  // сетки вещания у станции нет. Сессионное — при перезагрузке станция стартует как раньше.
  const stationMem = new Map(); // id -> {trackIdx, pos, at}

  // seek: true — случайная точка (первое включение станции в сессии, DJ-эффект); 'resume' —
  // восстановить сохранённые trackIdx/currentTime (переход пульт<->вики с тем же треком);
  // 'continue' — подхватить станцию там, где она «доиграла» без нас (см. stationMem).
  function loadTrack(seek) {
    const track = currentStation().tracks[trackIdx];
    if (!track) return;
    audio.src = track.url;
    updateMarquee(track.title);
    if (seek) {
      // Сик — только после метаданных (с preload="auto" они приходят сами, но не мгновенно), поэтому его нельзя
      // ставить в очередь ПЕРЕД play() (он никогда не запустится). Ставим его, когда придут метаданные;
      // если это отменит ещё не resolved промис play() (AbortError) — attemptPlay сам ретраит один раз.
      audio.addEventListener('loadedmetadata', function onMeta() {
        audio.removeEventListener('loadedmetadata', onMeta);
        const dur = audio.duration || track.duration || 0;
        if (seek === 'resume') {
          const savedPos = parseFloat(localStorage.getItem(K_POS));
          if (!isNaN(savedPos) && savedPos > 0 && savedPos < dur) audio.currentTime = savedPos;
        } else if (seek === 'continue') {
          const mem = stationMem.get(currentStation().id);
          if (mem && dur > 0) audio.currentTime = (mem.pos + (Date.now() - mem.at) / 1000) % dur;
        } else if (dur > 0) {
          audio.currentTime = Math.random() * dur;
        }
      });
    }
  }

  // Трек + секунда — на уход со страницы (переход вики<->пульт, закрытие вкладки), не на каждый
  // тик: pagehide покрывает и hard-навигацию, и закрытие, дороже дёргать localStorage на timeupdate.
  function savePosition() {
    localStorage.setItem(K_TRACK, String(trackIdx));
    localStorage.setItem(K_POS, String(audio.currentTime || 0));
  }
  window.addEventListener('pagehide', savePosition);

  // Соседние треки — в HTTP-кэш заранее, пока играет текущий (23-08, «трек прогружается с
  // задержкой»): следующий на этой станции и текущий трек каждой другой станции, чтобы ›, конец
  // трека и переключение станции не ждали сети. assets/music/* отдаётся immutable (_headers), так
  // что обычный fetch кладёт файл в тот же кэш, из которого потом читает <audio>. Один раз на URL.
  const warmed = new Set();
  const memTrackIdx = (s) => stationMem.get(s.id)?.trackIdx ?? 0; // что заиграет при переходе на станцию s
  function prefetchNeighbours() {
    const cur = currentStation();
    const urls = [cur.tracks[(trackIdx + 1) % cur.tracks.length].url,
      ...stations.filter((s) => s !== cur).map((s) => s.tracks[memTrackIdx(s)].url)];
    for (const url of urls) {
      if (warmed.has(url)) continue;
      warmed.add(url);
      fetch(url, { priority: 'low' }).catch(() => {});
    }
  }

  // Каждый вызов play() метит себя токеном: если пока он грузился подоспел следующий
  // (next/prev/смена станции меняют audio.src и обрывают текущий промис) — его результат игнорируется,
  // состояние виджета решает только самый свежий вызов. Так плеер не гаснет из-за уже неактуального промиса.
  let playToken = 0;
  function attemptPlay(onSuccess, isRetry) {
    const myToken = ++playToken;
    audio.play().then(() => {
      if (myToken !== playToken || localStorage.getItem(K_ON) !== '1') { audio.pause(); return; }
      playing = true;
      setState('playing');
      prefetchNeighbours();
      if (onSuccess) onSuccess();
    }).catch(() => {
      if (myToken !== playToken) return;
      // Сик из loadTrack(randomStart) может оборвать этот самый play() (AbortError) — один тихий
      // повтор перед тем, как реально сдаться, чтобы это не выглядело так, будто плеер погас.
      if (!isRetry) { attemptPlay(onSuccess, true); return; }
      setState('off');
    });
  }

  // ===== Визуализатор в чилл-режиме (#cdoViz) — реальный спектр трека через AnalyserNode =====
  // createMediaElementSource можно вызвать только один раз за жизнь audio-элемента, поэтому analyser
  // ставится лениво при первом успешном play (внутри клика — нужен user gesture для AudioContext).
  let analyser = null, vizData = null, vizRunning = false, vizMin = null, vizMax = null;
  function ensureAnalyser() {
    if (analyser || !vizBars.length) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const source = ctx.createMediaElementSource(audio);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyser.connect(ctx.destination); // без этого звук уйдёт только в анализатор и замолчит
    vizData = new Uint8Array(analyser.frequencyBinCount);
    vizMin = new Array(vizBars.length).fill(255);
    vizMax = new Array(vizBars.length).fill(0);
  }
  const VIZ_SKIP = 4; // первые бины = бас/суббас, почти всегда громкий в абсолютных цифрах
  // Пропуск бинов не решил дело — низкие частоты у музыки почти всегда самые громкие в АБСОЛЮТНОЙ шкале
  // 0-255, какой бин ни возьми. Вместо абсолютного значения каждый кубик нормализуется по СВОЕМУ
  // недавнему диапазону (min/max с экспоненциальным сглаживанием): пик трека = верх кубика, тишина/спад =
  // низ, независимо от того, насколько громким этот бин бывает в среднем. Гарантированно двигается.
  function vizLoop() {
    if (!playing || !analyser) { vizRunning = false; return; }
    analyser.getByteFrequencyData(vizData);
    const step = Math.floor((vizData.length - VIZ_SKIP) / vizBars.length) || 1;
    vizBars.forEach((bar, i) => {
      const raw = vizData[VIZ_SKIP + i * step];
      vizMin[i] += (raw - vizMin[i]) * (raw < vizMin[i] ? 0.3 : 0.01);
      vizMax[i] += (raw - vizMax[i]) * (raw > vizMax[i] ? 0.3 : 0.01);
      const range = Math.max(1, vizMax[i] - vizMin[i]);
      const norm = Math.min(1, Math.max(0, (raw - vizMin[i]) / range));
      bar.style.height = Math.max(3, norm * (bar.dataset.max || 24)) + 'px'; // data-max — мини-бары кнопки радио
    });
    requestAnimationFrame(vizLoop);
  }
  function resetViz() { vizBars.forEach(b => { b.style.height = '3px'; }); }

  function turnOn() {
    if (widget.dataset.state === 'loading' || widget.dataset.state === 'playing') return;
    hideTip();
    setState('loading');
    localStorage.setItem(K_ON, '1');
    if (!audio.src) loadTrack(isResumedSession ? 'resume' : true); // resuming from pause: keep existing src/position, don't reload
    attemptPlay(() => {
      toggleBtn.title = window.Render.t('Click to pause');
      flash(widget, 'flash', 900);
      // Цифру берём из возврата award: сверх дневного потолка он платит меньше запрошенного
      // (мягкий кап, 16-08(8)), и «+5 RP» поверх начисленного одного было бы враньём.
      const paidRadio = window.Respect.award('radio-on', 5, 'daily');
      if (paidRadio) window.Respect.popup(toggleBtn, `+${paidRadio} RP`);
      ensureAnalyser();
      if (analyser && !vizRunning) { vizRunning = true; requestAnimationFrame(vizLoop); }
    });
  }

  // Общая остановка воспроизведения — БЕЗ записи K_ON: "пользователь выключил" (turnOff)
  // и "временная уступка видео" (pauseForVideo) различаются только этим флагом.
  function stopPlayback() {
    audio.pause();
    playing = false;
    setState('off');
    toggleBtn.title = window.Render.t('Vice FM — click to play');
    resetViz();
  }

  function turnOff() {
    localStorage.setItem(K_ON, '0');
    stopPlayback();
  }

  // Публичный API для других модулей: открывшийся видео-плеер (windows.js) не должен звучать
  // поверх играющего радио — пауза без localStorage K_ON, чтобы при обычном reload радио как
  // и раньше само возобновилось (это не "пользователь выключил", а временная уступка видео).
  window.LeonidaRadio = {
    pauseForVideo() {
      if (playing) stopPlayback();
    },
    // Режим езды (drive-mode.js): радио стартует с первым нажатием газа. Вызывается строго из
    // keydown-обработчика (user gesture — требование autoplay-политики).
    playForDrive() {
      if (!playing) turnOn();
    },
    // Точки-переключатель станций на кнопке плеера в углу карты (map.js): клик по точке — прыжок
    // на станцию, а не шаг вперёд/назад, поэтому наружу отдаётся именно индекс.
    setStation: goToStation
  };

  function nextTrack() {
    trackIdx = (trackIdx + 1) % currentStation().tracks.length;
    loadTrack(false);
    if (playing) attemptPlay();
  }

  function prevTrack() {
    const len = currentStation().tracks.length;
    trackIdx = (trackIdx - 1 + len) % len;
    loadTrack(false);
    if (playing) attemptPlay();
  }

  // Переход на станцию по индексу — общая точка для стрелок ‹/› виджета и точек-переключателя
  // на кнопке плеера в углу карты (map.js). Индекс заворачивается по кругу, как и раньше.
  function goToStation(idx) {
    const next = (idx % stations.length + stations.length) % stations.length;
    if (next === stationIdx) return;
    stationMem.set(currentStation().id, { trackIdx, pos: audio.currentTime || 0, at: Date.now() });
    stationIdx = next;
    const mem = stationMem.get(currentStation().id);
    trackIdx = memTrackIdx(currentStation());
    localStorage.setItem(K_STATION, currentStation().id);
    loadTrack(mem ? 'continue' : true);
    if (playing) attemptPlay();
  }

  function switchStation(dir) { goToStation(stationIdx + dir); }

  audio.addEventListener('ended', nextTrack);
  audio.addEventListener('canplay', () => { errAttempts = 0; });
  audio.addEventListener('error', () => {
    // ponytail: no dedicated static/white-noise asset yet — just skip to the next track, cap retries
    errAttempts++;
    const totalTracks = stations.reduce((n, s) => n + s.tracks.length, 0);
    if (errAttempts < totalTracks) nextTrack();
    else { turnOff(); errAttempts = 0; }
  });

  toggleBtn.addEventListener('click', () => { playing ? turnOff() : turnOn(); });
  prevBtn.addEventListener('click', () => switchStation(-1));
  nextBtn.addEventListener('click', () => switchStation(1));
  trackPrevBtn.addEventListener('click', prevTrack);
  trackNextBtn.addEventListener('click', nextTrack);

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateMuteIcon();
  });
  volSlider.addEventListener('input', () => {
    applyVolume(parseFloat(volSlider.value));
    localStorage.setItem(K_VOL, String(audio.volume));
    if (audio.volume > 0) audio.muted = false;
    updateMuteIcon();
  });

  // --- Resume after reload: no autoplay, wait for first user gesture anywhere on the page ---
  function resumeFromPointer() {
    if (!pendingResume) return;
    pendingResume = false;
    toggleBtn.title = window.Render.t('Vice FM — click to play');
    turnOn();
  }
  updateMarquee();
  updateMuteIcon();
  // Прогрев стартового трека (23-08): src ставим сразу при загрузке страницы — с preload="auto"
  // (index.html / RadioDock.astro) браузер тянет трек и сразу подгружает окрестность точки старта
  // (случайной или сохранённой), пока человек ещё не нажал play; раньше всё это начиналось по клику
  // и первые секунды уходили на холодную загрузку. turnOn() видит готовый src и сразу играет.
  // На вики — только если радио было включено (pendingResume): на статьях 4 МБ музыки всем подряд
  // не качаем.
  if (!location.pathname.startsWith('/wiki') || pendingResume) loadTrack(isResumedSession ? 'resume' : true);
  if (pendingResume) {
    setState('resume');
    toggleBtn.title = window.Render.t('Click to resume Vice FM');
    document.addEventListener('pointerdown', resumeFromPointer, { once: true });
    document.addEventListener('keydown', resumeFromPointer, { once: true });
  }

  // --- Tooltip раз за визит: sessionStorage вместо localStorage — не спамит на каждый reload
  // внутри вкладки, но всплывает заново в новой сессии (новая вкладка/после закрытия браузера) ---
  // Гасим ТОЛЬКО из turnOn() — подсказка живёт, пока радио не включили (владелец, 31-08).
  // До этого висел setTimeout на 8с и pointerdown по всей странице: подсказку сдувало раньше,
  // чем её успевали прочитать, и она пропадала от любого клика мимо — то есть ровно в тех
  // случаях, когда пользователь ещё не понял, что радио вообще есть.
  function hideTip() { tip.hidden = true; }
  if (!sessionStorage.getItem(K_TIP) && !pendingResume) {
    tip.hidden = false;
    sessionStorage.setItem(K_TIP, '1');
  }
})();
