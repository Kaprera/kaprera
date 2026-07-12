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

  /* ── nav: scroll condense (mirrors the landing) ── */
  var nav = document.querySelector('header.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── mobile menu (hamburger → centered card) ── */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    var toggleMenu = function (force) {
      var open = force == null ? !navLinks.classList.contains('open') : force;
      navLinks.classList.toggle('open', open);
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);   // lock page scroll behind the card
    };
    menuBtn.addEventListener('click', function () { toggleMenu(); });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggleMenu(false); });
    });
    /* tap the dimmed backdrop (outside the card) to close */
    navLinks.addEventListener('click', function (e) { if (e.target === navLinks) toggleMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) toggleMenu(false);
    });
  }
})();
