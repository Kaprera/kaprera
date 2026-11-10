/* kaprera cookie consent — lightweight, bilingual (en/ar), theme-aware */
(function () {
  var KEY = 'cookie-consent';
  if (localStorage.getItem(KEY)) return;

  var T = {
    en: {
      msg: 'We use cookies to improve the site and analyse traffic. See our',
      policy: 'privacy policy',
      tail: '.',
      accept: 'accept all',
      decline: 'necessary only'
    },
    ar: {
      msg: 'نستخدم ملفات تعريف الارتباط لتحسين الموقع وتحليل الزيارات. اطّلع على',
      policy: 'سياسة الخصوصية',
      tail: '.',
      accept: 'قبول الكل',
      decline: 'الضرورية فقط'
    }
  };

  var css =
    '.ck-bar{position:fixed;z-index:80;inset-inline:12px;bottom:12px;max-width:380px;' +
    'margin-inline:auto;background:var(--white,#fff);color:var(--ink,#0a0a0a);' +
    'border:1px solid var(--hair,#e6e6e6);border-radius:var(--radius,14px);' +
    'box-shadow:0 12px 36px rgba(0,0,0,.14);padding:12px 14px;display:flex;' +
    'flex-direction:column;gap:10px;font-family:Inter,system-ui,sans-serif;' +
    'transform:translateY(160%);opacity:0;transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .4s ease}' +
    '.ck-bar.ck-show{transform:translateY(0);opacity:1}' +
    '.ck-bar.ck-hide{transform:translateY(160%);opacity:0}' +
    '.ck-text{margin:0;font-size:13px;line-height:1.5;color:var(--muted,#5b5b5b)}' +
    '.ck-link{color:var(--blue-text,#0079a8);font-weight:600;text-decoration:none}' +
    '.ck-link:hover{text-decoration:underline}' +
    '.ck-actions{display:flex;gap:10px;justify-content:flex-end}' +
    'html[dir="rtl"] .ck-actions{justify-content:flex-start}' +
    '.ck-btn{font:inherit;font-weight:600;font-size:13px;padding:0 18px;min-height:44px;border-radius:999px;' +
    'cursor:pointer;border:1px solid transparent;text-transform:lowercase;' +
    'transition:background .2s,color .2s,border-color .2s,transform .2s}' +
    '.ck-btn:hover{transform:translateY(-1px)}' +
    /* both choices carry the same weight, so neither is the "default" */
    '.ck-accept,.ck-decline{background:transparent;color:var(--ink,#0a0a0a);border-color:var(--hair,#e6e6e6)}' +
    '.ck-accept:hover,.ck-decline:hover{border-color:var(--blue,#008cc1);color:var(--blue-text,#0079a8)}' +
    /* wide screens: a corner card, clear of the hero's slider controls */
    '@media(min-width:720px){.ck-bar{inset-inline:auto 16px;bottom:16px;margin:0;width:360px}}' +
    'html[lang="ar"] .ck-bar{font-family:Cairo,system-ui,sans-serif}' +
    '.ck-actions .ck-btn{flex:1}' +
    '@media(prefers-reduced-motion:reduce){.ck-bar{transform:none;transition:opacity .3s ease}.ck-bar.ck-hide{transform:none}}';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'ck-bar';
    // a dialog is not a live region; announcing it both ways makes screen
    // readers read the banner twice
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'cookie consent');
    bar.innerHTML =
      '<p class="ck-text"></p>' +
      '<div class="ck-actions">' +
      '<button type="button" class="ck-btn ck-decline"></button>' +
      '<button type="button" class="ck-btn ck-accept"></button>' +
      '</div>';
    document.body.appendChild(bar);

    var textEl = bar.querySelector('.ck-text');
    var acceptEl = bar.querySelector('.ck-accept');
    var declineEl = bar.querySelector('.ck-decline');

    function render() {
      var ar = document.documentElement.lang === 'ar';
      var t = ar ? T.ar : T.en;
      textEl.innerHTML =
        t.msg + ' <a class="ck-link" href="/privacy-policy">' + t.policy + '</a>' + t.tail;
      acceptEl.textContent = t.accept;
      declineEl.textContent = t.decline;
    }
    render();

    // keep the banner in sync with the site's language toggle
    new MutationObserver(render).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    function dismiss(value) {
      try { localStorage.setItem(KEY, value); } catch (e) {}
      // let analytics/SEO scripts react without a page reload
      document.dispatchEvent(new CustomEvent('cookieconsent', { detail: value }));
      bar.classList.remove('ck-show');
      bar.classList.add('ck-hide');
      setTimeout(function () { bar.remove(); style.remove(); }, 500);
    }
    // 'all' = analytics/marketing allowed · 'necessary' = strictly necessary only
    acceptEl.addEventListener('click', function () { dismiss('all'); });
    declineEl.addEventListener('click', function () { dismiss('necessary'); });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add('ck-show'); });
    });
  }

  // wait for the intro overlay to finish before adding a fourth thing to look at
  function whenSettled() {
    if (!document.getElementById('preloader')) { init(); return; }
    var started = false;
    var go = function () { if (!started) { started = true; init(); } };
    document.addEventListener('kaprera:loaded', go, { once: true });
    setTimeout(go, 3000);   // safety net if the event never fires
  }

  if (document.body) whenSettled();
  else document.addEventListener('DOMContentLoaded', whenSettled);
})();
