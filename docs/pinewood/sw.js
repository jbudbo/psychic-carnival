self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open("pvt").then(function (cache) {
            return cache.addAll(['/']);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});