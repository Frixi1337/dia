const CACHE_NAME = 'dia-app-v1';
const ASSETS = [
  '/',                   // на случай прямого доступа к корню repo page
  '/dia/',
  '/dia/index.html',
  '/dia/css/styles.css',
  '/dia/js/app.js',
  '/dia/js/jquery.min.js',
  '/dia/images/favicon.png'
];

// install — закешируем основной "app shell"
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// activate — удаляем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// fetch — сначала сеть, если нет — из кеша (simple strategy)
self.addEventListener('fetch', event => {
  const req = event.request;
  // только GET-запросы обрабатываем
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then(res => {
        // обновим кеш копией ответа (не для потоковых/opaque если нужен)
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(req, resClone).catch(()=>{});
        });
        return res;
      })
      .catch(() =>
        caches.match(req).then(matched => matched || caches.match('/dia/index.html'))
      )
  );
});