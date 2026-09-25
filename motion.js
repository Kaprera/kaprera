/* ── kaprera · shared motion layer ───────────────────────────────────────
   Scroll reveals (single + staggered), parallax, a reading-progress bar,
   the home page's process rail, count-up metrics, magnetic buttons and
   card tilt. Pages opt in with data attributes; pages without them get
   sensible defaults from AUTO below, so the case studies and legal pages
   need no markup of their own.

   Nothing is hidden until html.motion is set here, and it is never set
   under prefers-reduced-motion, so the page is complete without this file. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  root.classList.add('motion');

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (sel, ctx) { return [].slice.call((ctx || document).querySelectorAll(sel)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ── defaults for pages that don't mark themselves up ──
     [selector, attribute, variant]. Skipped when the element already
     animates some other way (.reveal on the home page, .rev on /work/). */
  var AUTO = [
    /* containers first, so the leaf rules below can see what's taken */
    ['main > .hero', 'data-m-stagger', 'up'],
    ['.blk .two', 'data-m-stagger', 'up'],
    ['.blk .stats', 'data-m-stagger', 'up'],
    ['.blk .mgrid', 'data-m-stagger', 'up'],
    ['.blk .specs', 'data-m-stagger', 'up'],
    ['.blk .hl', 'data-m-stagger', 'start'],
    ['.blk .more', 'data-m-stagger', 'up'],
    ['.legal-hero .wrap', 'data-m-stagger', 'up'],
    ['.roles-grid', 'data-m-stagger', 'scale'],
    ['.faq-list', 'data-m-stagger', 'up'],
    /* single elements */
    ['main .shot', 'data-m', 'scale'],
    ['.blk h2', 'data-m', 'mask'],
    ['.blk > .label', 'data-m', 'fade'],
    ['.blk .mgroup-h', 'data-m', 'start'],
    ['.blk > .lede, .blk > .note', 'data-m', 'up'],
    ['.legal .inner > section', 'data-m', 'up']
  ];
  var TAKEN = '.reveal, .rev, [data-m], [data-m-stagger], #contact, footer';

  AUTO.forEach(function (rule) {
    $$(rule[0]).forEach(function (el) {
      /* a stagger over a lone wrapper staggers the wrapper's children */
      while (rule[1] === 'data-m-stagger' && el.children.length === 1) el = el.children[0];
      if (el.closest(TAKEN) || el.querySelector(TAKEN)) return;
      el.setAttribute(rule[1], rule[2]);
    });
  });

  /* case-study hero shot drifts inside its frame; motion.css oversizes it */
  $$('main .shot img').forEach(function (img) { img.setAttribute('data-m-parallax', '-0.06'); });

  /* links inside running copy get a drawn underline */
  $$('.legal .inner p a, .blk p a, .faq-a a').forEach(function (a) { a.classList.add('m-link'); });

  /* ── reveals ── */
  var settle = function (el, ms) {
    setTimeout(function () {
      el.classList.add('m-done');
      if (el.hasAttribute('data-m-stagger')) $$(':scope > *', el).forEach(function (c) { c.classList.add('m-done'); });
    }, ms);
  };
  var DUR = 1000, STEP = 80;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      io.unobserve(el);
      el.classList.add('m-in');
      var kids = el.hasAttribute('data-m-stagger') ? el.children.length : 1;
      if (el.hasAttribute('data-m-stagger')) $$(':scope > *', el).forEach(function (c) { c.classList.add('m-in'); });
      settle(el, DUR + 250 + (kids - 1) * STEP + (parseInt(el.style.getPropertyValue('--m-d'), 10) || 0));
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  $$('[data-m-stagger]').forEach(function (el) {
    $$(':scope > *', el).forEach(function (c, i) { c.style.setProperty('--m-i', Math.min(i, 10)); });
    io.observe(el);
  });
  $$('[data-m]').forEach(function (el) { io.observe(el); });

  /* ── count-up: plain numbers in metric cards tick up from zero ── */
  var COUNT = '.m-v, .stat .big, [data-m-count]';
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var node = e.target.__mNode, to = e.target.__mTo, dp = e.target.__mDp;
      var t0 = null, dur = 1100;
      var tick = function (t) {
        if (t0 === null) t0 = t;
        var p = clamp((t - t0) / dur, 0, 1);
        var v = to * (1 - Math.pow(1 - p, 3));
        node.nodeValue = e.target.__mPre + v.toFixed(dp) + e.target.__mPost;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$(COUNT).forEach(function (el) {
    var node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    var m = node.nodeValue.match(/^(\s*)(\d+(?:\.\d+)?)(\s*)$/);
    if (!m || parseFloat(m[2]) === 0) return;
    el.__mNode = node; el.__mPre = m[1]; el.__mPost = m[3];
    el.__mTo = parseFloat(m[2]);
    el.__mDp = (m[2].split('.')[1] || '').length;
    node.nodeValue = m[1] + (0).toFixed(el.__mDp) + m[3];
    cio.observe(el);
  });

  /* ── scroll-linked: parallax, reading progress, process rail ── */
  var parallax = $$('[data-m-parallax]');
  var rail = document.querySelector('.steps');
  var railSteps = rail ? $$('.step', rail) : [];
  var progress = null;
  if (document.querySelector('.crumb, .legal')) {
    progress = document.createElement('div');
    progress.className = 'm-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
  }

  var ticking = false;
  var update = function () {
    ticking = false;
    var vh = window.innerHeight;

    parallax.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var f = parseFloat(el.getAttribute('data-m-parallax')) || 0.12;
      var off = (r.top + r.height / 2 - vh / 2) * f;
      /* an image drifting inside a frame stops before it would show an edge */
      if (el.tagName === 'IMG') off = clamp(off, -r.height * 0.035, r.height * 0.035);
      el.style.translate = '0 ' + off.toFixed(1) + 'px';
    });

    if (progress) {
      var max = document.documentElement.scrollHeight - vh;
      progress.style.setProperty('--m-p', max > 0 ? clamp(window.scrollY / max, 0, 1).toFixed(4) : 0);
    }

    if (railSteps.length > 1) {
      /* the rail fills between 75% and 40% of the viewport height, split
         evenly across the segments between the step nodes */
      var rr = rail.getBoundingClientRect();
      var p = clamp((vh * 0.75 - rr.top) / (rr.height + vh * 0.35), 0, 1);
      var segs = railSteps.length - 1;
      railSteps.forEach(function (s, i) {
        s.style.setProperty('--m-rail', clamp(p * segs - i, 0, 1).toFixed(3));
      });
    }
  };
  var onScroll = function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  if (parallax.length || progress || railSteps.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ── pointer effects: mouse and trackpad only ── */
  if (!finePointer) return;

  /* each effect eases toward a target in rAF rather than through a CSS
     transition, so the element's own transition list is left untouched */
  var spring = function (el, prop, fmt) {
    var cur = [0, 0], to = [0, 0], raf = 0;
    var loop = function () {
      cur[0] += (to[0] - cur[0]) * 0.16; cur[1] += (to[1] - cur[1]) * 0.16;
      var settled = Math.abs(to[0] - cur[0]) < 0.02 && Math.abs(to[1] - cur[1]) < 0.02;
      if (settled && !to[0] && !to[1]) { el.style[prop] = ''; raf = 0; return; }
      el.style[prop] = fmt(cur[0], cur[1]);
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    return function (x, y) { to[0] = x; to[1] = y; if (!raf) raf = requestAnimationFrame(loop); };
  };
  var track = function (el, set, k) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width - 0.5) * k[0], ((e.clientY - r.top) / r.height - 0.5) * k[1]);
    });
    el.addEventListener('pointerleave', function () { set(0, 0); });
  };

  /* magnetic: buttons lean a few px toward the cursor */
  $$('.btn-primary, .nav-cta, [data-m-magnet]').forEach(function (el) {
    track(el, spring(el, 'translate', function (x, y) { return x.toFixed(2) + 'px ' + y.toFixed(2) + 'px'; }), [10, 8]);
  });

  /* tilt: cards turn slightly toward the cursor. rotateX + rotateY folded
     into one axis-angle `rotate`, which is exact enough at a few degrees */
  $$('.case-shot, .more-card, .role-card, .c-shot, [data-m-tilt]').forEach(function (el) {
    if (el.parentElement) el.parentElement.style.perspective = '1000px';
    var max = el.classList.contains('case-shot') ? 10 : 8;
    track(el, spring(el, 'rotate', function (x, y) {
      var ax = -y, ay = x, mag = Math.sqrt(ax * ax + ay * ay);
      if (mag < 0.001) return 'none';
      return (ax / mag).toFixed(3) + ' ' + (ay / mag).toFixed(3) + ' 0 ' + mag.toFixed(2) + 'deg';
    }), [max, max]);
  });
})();
