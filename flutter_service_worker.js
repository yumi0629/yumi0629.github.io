'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/index.html": "afd59556d5912573fdaf74d42d3764e1",
"/main.dart.js": "0ba442653b200c48dc25fc9084330191",
"/favicon.png": "5dcef449791fa27946b3d35ad8803796",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/manifest.json": "26532b3e6074b70d52106ebc01c4f2f7",
"/assets/LICENSE": "964211db6a8b173b1744e68da77ce459",
"/assets/images/yumi_header.png": "166f3ef3b7cbe23915c3f1898da8b8f0",
"/assets/images/yumi_logo.png": "2d3d310222e5b03eac7d3e2383af3363",
"/assets/AssetManifest.json": "4acaf752917a3d1c55a451115b3d08b4",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
