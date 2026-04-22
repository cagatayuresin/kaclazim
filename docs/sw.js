const CACHE_NAME = 'kaclazim-v3.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './stylesheet.css',
  './main.js',
  'https://kit.fontawesome.com/4ed1a77e89.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(ASSETS_TO_CACHE);
    } catch (error) {
      console.error('Service Worker install failed:', error);
    }
  })());
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    } catch (error) {
      console.error('Service Worker fetch failed:', error);
      return fetch(event.request);
    }
  })());
});
