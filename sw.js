self.addEventListener('fetch', function (event) {
    event.respondWith(caches.open('cache').then(function (cache) {
        return cache.match(event.request).then(function (response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function (networkResponse) {
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                console.log("Error in fetch()", e);

                e.waitUntil(
                    caches.open('cache').then(function (cache) {
                        return cache.addAll([
                            '/',
                            'blog/index.html',
                            'blog/index.html?homescreen=1',
                            '/?homescreen=1',
                            'blog/css/app.css',
                            'blog/images/one.svg',
                            'blog/images/two.svg',
                            'blog/favicon.png',
                            'blog/manifest.json',
                            'blog/package.json',
                            'blog/package-lock.json',
                            'blog/sw.js',
                            'posts/one.html',
                            'posts/two.html',
                            'css/one.css',
                            'https://www.google-analytics.com/analytics.js',
                            'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
                            'https://use.fontawesome.com/releases/v5.1.0/css/all.css'
                        ]);
                    })
                );
            });
            return response || fetchPromise;
        });
    }));
});