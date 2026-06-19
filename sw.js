// ══════════════════════════════════════════
// JawiKids Service Worker
// Ubah CACHE_NAME bila deploy versi baru
// ══════════════════════════════════════════
const CACHE_NAME = 'jawikids-v2';

const PRECACHE = [
  '/',
  '/auth.html',
  '/index.html',
  '/sambung.html',
  '/sukukata.html',
  '/dashboard.html'
];

// ── INSTALL ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .catch(err => console.warn('Cache install error:', err))
  );
  self.skipWaiting();
});

// ── ACTIVATE — padam cache lama ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH — Network dulu, cache sebagai backup ──
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Jangan cache Supabase API calls
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Jangan cache POST requests
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached => {
          if (cached) return cached;
          if (e.request.mode === 'navigate') return caches.match('/auth.html');
          return new Response('Tiada sambungan internet', { status: 503 });
        })
      )
  );
});
