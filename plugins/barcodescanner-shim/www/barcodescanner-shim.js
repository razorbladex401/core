(function () {
  function scan(success, error, options) {
    try {
      var QR = window.QRScanner;
      if (!QR) {
        if (typeof error === 'function') error(new Error('QRScanner plugin not available'));
        return;
      }

      // Prepare camera
      QR.prepare(function (err, status) {
        if (err) {
          if (typeof error === 'function') error(err);
          return;
        }

        // Show camera below the webview
        QR.show();

        QR.scan(function (err, text) {
          // Always cleanup UI
          try { QR.hide(); } catch (e) {}
          try { QR.destroy(function () {}); } catch (e) {}

          if (err) {
            if (err.name === 'SCAN_CANCELED' || err.cancelled) {
              if (typeof success === 'function') success({ text: '', format: 'QR_CODE', cancelled: true });
            } else {
              if (typeof error === 'function') error(err);
            }
            return;
          }

          if (typeof success === 'function') success({ text: text || '', format: 'QR_CODE', cancelled: false });
        });
      });
    } catch (e) {
      if (typeof error === 'function') error(e);
    }
  }

  var shim = { scan: scan };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = shim;
  }

  if (window.cordova) {
    window.cordova.plugins = window.cordova.plugins || {};
    window.cordova.plugins.barcodeScanner = shim;
  } else {
    window.cordova = { plugins: { barcodeScanner: shim } };
  }
})();

