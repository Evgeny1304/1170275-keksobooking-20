'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  var offers = window.data.getOffers();

  window.pin = {
    renderMapPin: function (pin) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var mapPinImg = mapPin.querySelector('img');
      mapPin.dataset.id = pin.id;

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
    },

    removeActiveStatePins: function (pins) {
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
      window.pin.removeActiveStatePins(pins);
      window.card.removeCardPopup();

      var idBtn = parseInt(pinBtn.dataset.id, 10);
      var offer = offers.find(function (item) {
        return item.id === idBtn;
      });

      window.card.renderCardPopup(offer);
      pinBtn.classList.add('map__pin--active');
    }
  };

  document.addEventListener('click', openOfferCardPopup);

  // document.addEventListener('keydown', function (evt) {
  //   window.util.isEnterEvent(evt, openOfferCardPopup);
  // });
})();
