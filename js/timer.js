// ===== TIMERS =====
(function () {
  const cfg = window.SITE_CONFIG;
  const release = new Date(cfg.releaseDate).getTime();
  const trailer = new Date(cfg.showcaseDate).getTime();

  const cells = {
    d: document.querySelector('#cdRelease [data-u="d"]'),
    h: document.querySelector('#cdRelease [data-u="h"]'),
    m: document.querySelector('#cdRelease [data-u="m"]'),
    s: document.querySelector('#cdRelease [data-u="s"]')
  };
  const trailerEl = document.getElementById('cdTrailer');
  const pad = n => String(n).padStart(2, '0');
  // Единственная переводимая строка таймера (после даты трейлера цифры сменяются текстом).
  // Читаем window.HUB_I18N напрямую: он инлайнится в <head> локальной главной, то есть готов уже
  // к первому tick(), а window.Render грузится ПОСЛЕ timer.js — на него тут опираться нельзя.
  const t = s => window.HUB_I18N?.strings?.[s] || s;
  const flash = (el, cls, ms) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); };

  // Chill-режим — оверлей с закатом, открывается кнопкой в радио-виджете, пока играет музыка.
  // Сам radio-widget физически переезжает в оверлей (единственный источник состояния плеера, без дублей).
  const cdOverlay = document.getElementById('cdOverlay');
  const radioChill = document.getElementById('radioChill');
  const cdoPlayerSlot = document.getElementById('cdoPlayerSlot');
  const radioWidgetEl = document.getElementById('radioWidget');
  const radioAudioEl = document.getElementById('radioAudio');
  function openCdOverlay() {
    if (cdoPlayerSlot && radioWidgetEl) cdoPlayerSlot.appendChild(radioWidgetEl);
    cdOverlay.classList.add('open', 'cdo-started'); // .cdo-started запускает фоновые анимации спрайтов один раз навсегда
  }
  function closeCdOverlay() {
    cdOverlay.classList.remove('open');
    if (radioAudioEl && radioWidgetEl) radioAudioEl.parentNode.insertBefore(radioWidgetEl, radioAudioEl);
  }
  if (cdOverlay) {
    if (radioChill) radioChill.addEventListener('click', openCdOverlay);
    cdOverlay.querySelector('.cdo-close').addEventListener('click', closeCdOverlay);
    cdOverlay.addEventListener('click', e => { if (e.target === cdOverlay) closeCdOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCdOverlay(); });
  }

  function split(ms) {
    if (ms < 0) ms = 0;
    return {
      d: Math.floor(ms / 864e5),
      h: Math.floor(ms / 36e5) % 24,
      m: Math.floor(ms / 6e4) % 60,
      s: Math.floor(ms / 1e3) % 60
    };
  }
  const sun = document.querySelector('.sun-mini');
  const cdWidget = document.querySelector('.cd-widget');
  function tick() {
    const now = Date.now();
    const r = split(release - now);
    cells.d.textContent = r.d;
    cells.h.textContent = pad(r.h);
    cells.m.textContent = pad(r.m);
    cells.s.textContent = pad(r.s);

    const dt = trailer - now;
    const tt = split(dt);
    trailerEl.textContent = dt > 0 ? `~${tt.d}d ${pad(tt.h)}h ${pad(tt.m)}m ${pad(tt.s)}s` : t('watch for the drop');

    // пульс: секунды — подсветка цифры, смена минуты — вспышка солнца
    flash(cells.s, 'pulse', 260);
    if (r.s === 59 && sun) {
      flash(sun, 'pulse-min', 850);
      // подсветка рамки таймера + респект за минуту на сайте (кап 5/день — 08-09(6) «чуть
      // уменьшить»: с капом 10 счёт рос сам по себе быстрее, чем от осмысленных действий).
      // Respect?. — первый tick() может выпасть на :59 раньше, чем загрузится js/respect.js
      // (подключён следующим тегом), ловилось как TypeError на старте.
      if (cdWidget) flash(cdWidget, 'glow-min', 1200);
      const day = new Date().toISOString().slice(0, 10);
      for (let i = 0; i < 5; i++) {
        if (window.Respect?.award(`watch-${day}-${i}`, 1, 'once')) break;
      }
    }
  }
  tick(); setInterval(tick, 1000);

  const d = document.getElementById('discordTop');
  if (d) d.href = cfg.discordUrl;

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();
  const footerContact = document.getElementById('footerContact');
  if (footerContact && cfg.contactEmail) footerContact.href = `mailto:${cfg.contactEmail}`;
})();
