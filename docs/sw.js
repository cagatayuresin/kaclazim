const CACHE_NAME = 'kaclazim-v2.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './stylesheet.css',
  './main.js',
  'https://kit.fontawesome.com/4ed1a77e89.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
