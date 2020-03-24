'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "77acb83154ecad1de87f4925bccce800",
"main.dart.js": "24ad06d2e18e308e3702dab379da753d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "01db11bf2b1f6220891e7153f1ffc7fa",
"assets/LICENSE": "f5b314b042b09c83a8f76756608e0bc0",
"assets/images/yumi_header.png": "166f3ef3b7cbe23915c3f1898da8b8f0",
"assets/images/github.png": "39d31072858e1fa47b6ddf6718b17206",
"assets/images/header.png": "2ef41b777614baf6f574ed35dc0b9009",
"assets/images/qq.png": "35280d0a6480c192c3f6bea111e41ce2",
"assets/images/bg_info.png": "81ee010b8bba1f4456057316cf015759",
"assets/images/yumi_logo.png": "2d3d310222e5b03eac7d3e2383af3363",
"assets/images/introduction.png": "2184726106773ad26490b9791c8b8fba",
"assets/AssetManifest.json": "989e8b5d13ef41fb4c074af5eea95495",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/loading_more_list/assets/empty.jpeg": "52a69bab9f87bcf0052d8e55ea314977",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16"
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
