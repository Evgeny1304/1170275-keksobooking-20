'use strict';

(function () {
  var isPageActive = false;

  window.main = {
    activatePage: function () {
      if (!isPageActive) {
        window.map.activate();
        window.form.activate();
        isPageActive = true;
      }
    },

    deactivatePage: function () {
      window.map.deactivate();
      window.form.deactivate();
      window.filterForm.reset();
      isPageActive = false;
    }
  };
})();
