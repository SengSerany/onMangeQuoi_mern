/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const PREFIX = 'V1';
const CACHED_FILES = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap',
  'https://res.cloudinary.com/dve7kukxh/image/upload/v1655466977/x2msuldopv4lbrv0anmh.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PREFIX);
      await Promise.all(
        [...CACHED_FILES, './offline.html'].map((path) => {
          return cache.add(new Request(path));
        })
      );
    })()
  );
  // console.log(`${PREFIX} Install`);
});

self.addEventListener('activate', (event) => {
  clients.claim();
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(PREFIX)) {
            return caches.delete(key);
          } else {
            // eslint-disable-next-line array-callback-return
            return;
          }
        })
      );
    })()
  );
  // console.log(`${PREFIX} Active`);
});

self.addEventListener('fetch', (event) => {
  // console.log(
  //   `${PREFIX} Fetch: ${event.request.url}, Mode: ${event.request.mode}`
  // );
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          return await fetch(event.request);
        } catch (error) {
          const cache = await caches.open(PREFIX);
          return await cache.match('/offline.html');
        }
      })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    event.respondWith(caches.match(event.request));
  }
});
