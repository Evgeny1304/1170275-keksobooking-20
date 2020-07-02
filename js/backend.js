'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';

  window.backend = {
    load: function (onLoad, onError) {
      window.util.makeRequest(null, 'GET', URL + '/data', onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      window.util.makeRequest(data, 'POST', URL, onLoad, onError);
    }
  };
})();
