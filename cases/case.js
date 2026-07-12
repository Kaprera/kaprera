/* ── kaprera · case-study + work pages · shared behaviour ──────────────
   Theme toggle (light/dark) and language toggle (en / ar rtl). The pre-paint
   inline <head> script has already applied the saved/system theme + language
   attributes before first paint; this file wires the toggles and swaps the
   visible text between the data-en / data-ar copies. */
(function () {
  var root = document.documentElement;

  /* ── theme ── */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    var syncTheme = function () {
      themeToggle.setAttribute('aria-checked', String(root.getAttribute('data-theme') === 'dark'));
    };
    syncTheme();
    themeToggle.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', dark ? 'light' : 'dark');
      try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
      syncTheme();
    });
  }

  /* ── language ── */
  var langToggle = document.getElementById('langToggle');
  var currentLang = root.lang === 'ar' ? 'ar' : 'en';

  var applyLang = function (lang) {
    var ar = lang === 'ar';
    if (ar && window.loadArabicFont) window.loadArabicFont();
    currentLang = lang;
    root.lang = lang;
    root.dir = ar ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var t = el.getAttribute(ar ? 'data-ar' : 'data-en');
      if (t != null) el.textContent = t;
    });
    if (langToggle) langToggle.setAttribute('aria-checked', String(ar));
    try { localStorage.setItem('lang', lang); } catch (e) {}
  };

  /* the pre-paint script set lang/dir; make the visible copy match on load */
  if (currentLang === 'ar') applyLang('ar');

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLang(currentLang === 'ar' ? 'en' : 'ar');
    });
  }
})();
