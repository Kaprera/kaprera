/* kaprera service worker — offline shell + smart caching */
const VERSION = 'kaprera-v8';
const PRECACHE = [
  '/',
  '/privacy-policy',
  '/careers',
  '/site.webmanifest',
  '/cookies.js',
  '/branding/logos/icon-192.png',
  '/branding/logos/favicon-512.png',
  '/branding/logos/kaprera-icon-mark.webp',
  '/branding/logos/kaprera-wordmark-dark.webp',
  '/branding/logos/kaprera-wordmark-light.webp'
];

/* Until 2026-07-12 everything under /cases/* went out with
   Cache-Control: public, max-age=31536000, immutable. A browser still holding
   one of those responses will not revalidate it — "immutable" suppresses the
   conditional request a normal reload would make — so it can keep rendering a
   year-old page against today's stylesheet, and nothing the server sends now
   can dislodge it. Re-issuing the request with cache:'no-cache' forces
   validation regardless of freshness, which defeats immutable and overwrites
   the poisoned entry. A 304 keeps the repair cheap on every later visit.

   Copy-construct so redirect mode survives: a navigation request is
   redirect:'manual', and this site 301s its clean URLs — building a fresh
   Request from the URL alone would default to 'follow', and a followed
   response cannot be handed back for a navigation. */
const revalidate = (req) => {
  try {
    return new Request(req, { cache: 'no-cache' });
  } catch (e) {
    return req;   /* older engines: fall back to the plain request */
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page navigations: network-first so visitors always get fresh content,
  // falling back to the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(revalidate(req))
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/')))
    );
    return;
  }

  const cachePut = (request, res) => {
    if (res && res.status === 200 && res.type === 'basic') {
      const copy = res.clone();
      return caches.open(VERSION).then((c) => c.put(request, copy));
    }
    return Promise.resolve();
  };

  if (url.origin === self.location.origin) {
    // CSS and JS are edited in place and ship alongside the markup, so a stale
    // copy paired with fresh HTML renders a broken page (the case-study pages
    // and /work/ carry no inline styles — they went unstyled this way).
    // Network-first keeps them in lockstep with the navigation response; the
    // cache is only the offline fallback.
    if (/\.(css|js)$/.test(url.pathname)) {
      event.respondWith(
        fetch(revalidate(req))
          .then((res) => {
            event.waitUntil(cachePut(req, res));
            return res;
          })
          .catch(() => caches.match(req))
      );
      return;
    }

    // Everything else same-origin (images, fonts, manifest) is content-addressed
    // or changes rarely: stale-while-revalidate. waitUntil keeps the worker
    // alive until the refreshed copy is actually written, otherwise the SW can
    // be killed mid-revalidation and serve the same stale entry forever.
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            event.waitUntil(cachePut(req, res));
            return res;
          })
          .catch(() => cached);
        if (cached) {
          event.waitUntil(network.catch(() => {}));
          return cached;
        }
        return network;
      })
    );
    return;
  }

  // Cross-origin (e.g. Google Fonts): cache-first with network fallback.
  event.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => cached)
    )
  );
});
