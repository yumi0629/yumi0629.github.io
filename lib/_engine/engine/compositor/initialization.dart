// Copyright 2013 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// @dart = 2.6
part of dart._engine;

/// EXPERIMENTAL: Enable the Skia-based rendering backend.
const bool experimentalUseSkia =
    bool.fromEnvironment('FLUTTER_WEB_USE_SKIA', defaultValue: false);

/// The URL to use when downloading the CanvasKit script and associated wasm.
///
/// When CanvasKit pushes a new release to NPM, update this URL to reflect the
/// most recent version. For example, if CanvasKit releases version 0.34.0 to
/// NPM, update this URL to `https://unpkg.com/canvaskit-wasm@0.34.0/bin/`.
const String canvasKitBaseUrl = 'https://unpkg.com/canvaskit-wasm@0.12.0/bin/';

/// Initialize the Skia backend.
///
/// This calls `CanvasKitInit` and assigns the global [canvasKit] object.
Future<void> initializeSkia() {
  final Completer<void> canvasKitCompleter = Completer<void>();
  StreamSubscription<html.Event> loadSubscription;
  loadSubscription = domRenderer.canvasKitScript.onLoad.listen((_) {
    loadSubscription.cancel();
    final js.JsObject canvasKitInitArgs = js.JsObject.jsify(<String, dynamic>{
      'locateFile': (String file, String unusedBase) => canvasKitBaseUrl + file,
    });
    final js.JsObject canvasKitInit =
        js.JsObject(js.context['CanvasKitInit'], <dynamic>[canvasKitInitArgs]);
    final js.JsObject canvasKitInitPromise = canvasKitInit.callMethod('ready');
    canvasKitInitPromise.callMethod('then', <dynamic>[
      (js.JsObject ck) {
        canvasKit = ck;
        canvasKitCompleter.complete();
      },
    ]);
  });

  /// Add a Skia scene host.
  skiaSceneHost = html.Element.tag('flt-scene');
  domRenderer.renderScene(skiaSceneHost);
  return canvasKitCompleter.future;
}

/// The entrypoint into all CanvasKit functions and classes.
///
/// This is created by [initializeSkia].
js.JsObject canvasKit;

/// The Skia font collection.
SkiaFontCollection skiaFontCollection;

/// The scene host, where the root canvas and overlay canvases are added to.
html.Element skiaSceneHost;
