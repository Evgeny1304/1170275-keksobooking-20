'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var MAX_OFFER_COUNT = 5;

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  var renderMapPin = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');
    mapPin.dataset.id = pin.id;

    mapPin.style.left = (pin.location.x + MAP_PIN_WIDTH / 2) + 'px';
    mapPin.style.top = (pin.location.y - MAP_PIN_HEIGHT) + 'px';
    mapPinImg.src = pin.author.avatar;
    mapPinImg.alt = pin.offer.title;

    return mapPin;
  };

  var openOfferCardPopup = function (evt) {
    var target = evt.target;
    var pinBtn = target.closest('.map__pin');

    if (pinBtn !== null && !pinBtn.classList.contains('map__pin--main')) {
      var pins = document.querySelectorAll('.map__pin');
      window.util.removeActiveStatesPins(pins);
      window.card.remove(window.map.mainContainer);

      var idBtn = parseInt(pinBtn.dataset.id, 10);
      var offer = window.offers.find(function (item) {
        return item.id === idBtn;
      });

      window.card.render(offer, window.map.mainContainer, window.map.filterContainer);
      pinBtn.classList.add('map__pin--active');
    }
  };

  document.addEventListener('click', openOfferCardPopup);

  document.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      openOfferCardPopup(evt);
    });
  });

  window.pin = {
    render: function (pins) {
      var offersCount = pins.length > MAX_OFFER_COUNT ? MAX_OFFER_COUNT : pins.length;
      for (var i = 0; i < offersCount; i++) {
        fragment.appendChild(renderMapPin(pins[i]));
      }
      mapPins.appendChild(fragment);
    },

    remove: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
