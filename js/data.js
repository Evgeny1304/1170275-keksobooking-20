'use strict';

(function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAX_OFFER_COUNT = 8;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAX_OFFER_PRICE = 1000000;
  var MAX_OFFER_ROOMS = 100;
  var MAX_OFFER_GUESTS = 3;

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

  window.data = {
    getOffers: function () {
      var offers = [];

      for (var i = 0; i < MAX_OFFER_COUNT; i++) {
        var locationX = window.util.getRandom(0, mapWidth);
        var locationY = window.util.getRandom(MIN_Y, MAX_Y);

        var offer = {
          'id': (i + 1),
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Сдается в аренду',
            'address': locationX + ', ' + locationY,
            'price': window.util.getRandom(0, MAX_OFFER_PRICE),
            'type': OFFER_TYPE[window.util.getRandom(0, OFFER_TYPE.length - 1)],
            'rooms': window.util.getRandom(1, MAX_OFFER_ROOMS),
            'guests': window.util.getRandom(0, MAX_OFFER_GUESTS),
            'checkin': OFFER_CHECKIN[window.util.getRandom(0, OFFER_CHECKIN.length - 1)],
            'checkout': OFFER_CHECKIN[window.util.getRandom(0, OFFER_CHECKIN.length - 1)],
            'features': window.util.getRandomArray(OFFER_FEATURES),
            'description': 'Отличное жилье с комфортом',
            'photos': window.util.getRandomArray(OFFER_PHOTOS)
          },
          'location': {
            'x': locationX,
            'y': locationY
          },
        };
        offers.push(offer);
      }

      return offers;
    }
  };
})();
