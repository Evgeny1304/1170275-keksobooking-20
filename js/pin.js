'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  window.pin = {
    renderMapPin: function (pin) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var mapPinImg = mapPin.querySelector('img');

      mapPin.style.left = (pin.location.x + MAP_PIN_WIDTH / 2) + 'px';
      mapPin.style.top = (pin.location.y - MAP_PIN_HEIGHT) + 'px';
      mapPinImg.src = pin.author.avatar;
      mapPinImg.alt = pin.offer.title;

      return mapPin;
    },

    renderMapPins: function (pins) {
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(this.renderMapPin(pins[i]));
      }
      mapPins.appendChild(fragment);
    }
  };
})();
