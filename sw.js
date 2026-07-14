const CACHE_NAME = 'coffee-methods-v1';

// Install Event
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Fetch Event - Network first, fallback to generic cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});