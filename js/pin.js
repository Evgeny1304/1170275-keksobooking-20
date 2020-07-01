'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var MAX_OFFER_COUNT = 8;

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  var offers = window.backend.getOffers();

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

  window.pin = {
    render: function (pins) {
      for (var i = 0; i < MAX_OFFER_COUNT; i++) {
        fragment.appendChild(renderMapPin(pins[i]));
      }
      mapPins.appendChild(fragment);
    },

    removeActiveStates: function (pins) {
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('map__pin--active');
      }
    }
  };

  var openOfferCardPopup = function (evt) {
    var target = evt.target;
    var pinBtn = target.closest('.map__pin');

    if (pinBtn !== null && !pinBtn.classList.contains('map__pin--main')) {
      var pins = document.querySelectorAll('.map__pin');
      window.pin.removeActiveStates(pins);
      window.card.remove(window.map.mainContainer);

      var idBtn = parseInt(pinBtn.dataset.id, 10);
      var offer = offers.find(function (item) {
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
})();
