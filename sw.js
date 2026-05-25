// ══════════════════════════════════════════
// JawiKids Service Worker
// Versi cache — ubah nombor ini bila deploy baru
// ══════════════════════════════════════════
const CACHE_NAME = 'jawikids-v1';

// Fail yang dicache untuk guna offline
const PRECACHE = [
  '/',
  '/auth.html',
  '/index.html',
  '/dashboard.html',
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// ── INSTALL — cache semua fail penting ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache fail lokal sahaja (external mungkin gagal)
      return cache.addAll(['/', '/auth.html', '/index.html', '/dashboard.html'])
        .catch(err => console.warn('Cache install error:', err));
    })
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

// ── FETCH — strategi: Network dulu, cache sebagai backup ──
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
        // Simpan salinan dalam cache
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => {
        // Offline — guna cache
        return caches.match(e.request).then(cached => {
          if (cached) return cached;
          // Fallback ke auth.html untuk navigasi
          if (e.request.mode === 'navigate') return caches.match('/auth.html');
          return new Response('Tiada sambungan internet', { status: 503 });
        });
      })
  );
});
