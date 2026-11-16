// Баннер согласия на аналитику + Google Consent Mode v2.
//
// Почему отдельный vanilla-файл, а не Astro-компонент: баннер нужен и вики (Astro), и пульту
// (plain-JS, отдельное приложение без общих импортов). Файл лежит в public/ и уезжает в корень
// домена — пульт подключит его тем же тегом <script src="/consent.js" defer>, когда выкатится.
// Поэтому здесь свой мини-словарь, а не импорт из src/i18n/ui.ts: из public/ импортировать нечего.
//
// Модель согласия: gtag грузится всегда, но с analytics_storage=denied по умолчанию (Consent
// Mode v2) — до нажатия «Принять» GA4 шлёт обезличенные cookieless-пинги, что и разрешено в EU
// без согласия. «Принять» → consent update + куки. «Отклонить» → остаёмся на denied навсегда.
//
// ВАЖНО: это баннер под АНАЛИТИКУ. Для показа рекламы в EEA Google требует
// сертифицированный TCF-CMP — он ставится отдельно вместе с рекламной сетью (MONETIZATION_SLOTS).
(function () {
  var KEY = 'lh-consent'; // 'granted' | 'denied'
  var T = {
    en: {
      text: 'We collect usage statistics to make your experience better and improve how the site works.',
      accept: 'Accept',
      decline: 'Decline',
      more: 'Privacy',
    },
    ru: {
      text: 'Мы собираем статистику посещений, чтобы сделать ваш опыт более качественным и улучшать работу сайта.',
      accept: 'Принять',
      decline: 'Отклонить',
      more: 'Приватность',
    },
    es: {
      text: 'Recopilamos estadísticas de uso para mejorar tu experiencia y el funcionamiento del sitio.',
      accept: 'Aceptar',
      decline: 'Rechazar',
      more: 'Privacidad',
    },
    'pt-br': {
      text: 'Coletamos estatísticas de uso para melhorar sua experiência e o funcionamento do site.',
      accept: 'Aceitar',
      decline: 'Recusar',
      more: 'Privacidade',
    },
    fr: {
      text: 'Nous collectons des statistiques d’usage pour améliorer votre expérience et le fonctionnement du site.',
      accept: 'Accepter',
      decline: 'Refuser',
      more: 'Confidentialité',
    },
    de: {
      text: 'Wir erheben Nutzungsstatistiken, um Ihr Erlebnis und die Funktion der Seite zu verbessern.',
      accept: 'Annehmen',
      decline: 'Ablehnen',
      more: 'Datenschutz',
    },
  };

  function strings() {
    var lang = (document.documentElement.lang || 'en').toLowerCase();
    return T[lang] || T[lang.split('-')[0]] || T.en;
  }

  function update(state) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: state === 'granted' ? 'granted' : 'denied',
    });
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, state);
    } catch (e) {
      /* приватный режим — согласие живёт до перезагрузки, баннер спросит снова */
    }
    update(state);
  }

  var stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {
    /* см. выше */
  }
  if (stored === 'granted' || stored === 'denied') {
    update(stored);
    return;
  }

  function render() {
    var s = strings();
    var box = document.createElement('div');
    box.className = 'lh-consent';
    box.innerHTML =
      '<p>' + s.text + ' <a href="/wiki/privacy/">' + s.more + '</a></p>' +
      '<div class="lh-consent-btns">' +
        '<button type="button" data-consent="denied">' + s.decline + '</button>' +
        '<button type="button" data-consent="granted" class="lh-consent-primary">' + s.accept + '</button>' +
      '</div>';
    box.addEventListener('click', function (e) {
      var state = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!state) return;
      save(state);
      box.remove();
    });
    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
