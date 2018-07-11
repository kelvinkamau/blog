var consoleMessages = ["Hey hey there! :)", "👀 I 👀 see 👀 you 👀", "Hope you're having a great day 😊", "How do you comfort a JavaScript bug? You console it 😎"],
    consoleMessage = consoleMessages[Math.floor(Math.random() * consoleMessages.length)];
console.log(consoleMessage);
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
                            'css/app.css',
                            'css/one.css',
                            'images/one.svg',
                            'images/two.svg',
                            'favicon.png',
                            'manifest.json',
                            'package.json',
                            'package-lock.json',
                            'sw.js',
                            'posts/angular_vs_react.html',
                            'posts/java_vs_javascript.html',
                            'posts/cyber_bullying_cyber_violence.html',
                            'posts/computer_basics_guide.html',
                            'posts/spill_fluids_on_your_computer.html',
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