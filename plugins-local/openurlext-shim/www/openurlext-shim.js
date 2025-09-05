/* global cordova */
(function () {
  function open(url, success, fail) {
    try {
      if (typeof cordova !== 'undefined' && cordova.InAppBrowser && typeof cordova.InAppBrowser.open === 'function') {
        cordova.InAppBrowser.open(url, '_system', 'location=yes');
        if (typeof success === 'function') success();
        return;
      }
      // Fallbacks
      if (typeof window !== 'undefined' && typeof window.open === 'function') {
        window.open(url, '_system');
        if (typeof success === 'function') success();
        return;
      }
      if (typeof fail === 'function') fail(new Error('No method to open external URL'));
    } catch (e) {
      if (typeof fail === 'function') fail(e);
    }
  }

  // Expose as OpenUrlExt
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { open: open };
  } else {
    window.OpenUrlExt = { open: open };
  }
})();

