'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var MOUSE_BTN_LEFT = 0;
  var TIMEOUT_IN_MS = 10000;
  var DEBOUNCE_INTERVAL = 500;
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var StatusCode = {
    OK: 200
  };

  window.util = {
    offerTypeSettings: {
      'flat': {
        'label': 'Квартира',
        'minPrice': 1000
      },
      'house': {
        'label': 'Дом',
        'minPrice': 5000
      },
      'bungalo': {
        'label': 'Бунгало',
        'minPrice': 0
      },
      'palace': {
        'label': 'Дворец',
        'minPrice': 10000
      }
    },

    declWord: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    isMouseLeftEvent: function (evt, action) {
      if (evt.button === MOUSE_BTN_LEFT) {
        action();
      }
    },

    disableInput: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'disabled');
      }
    },

    enableInput: function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
      }
    },

    removeActiveStatesPins: function (pins) {
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('map__pin--active');
      }
    },

    makeRequest: function (data, method, url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(method, url);
      xhr.send(data);
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },

    choosePhoto: function (fileChooser, preview) {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };
})();
