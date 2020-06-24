'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  window.main = {
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getRandomArray: function (arr) {
      var randomArr = [];
      var randomIndex = this.getRandom(0, arr.length - 1);

      for (var i = randomIndex; i < arr.length; i++) {
        randomArr.push(arr[i]);
      }

      return randomArr;
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
    }
  };
})();
