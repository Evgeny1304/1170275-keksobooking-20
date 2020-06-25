'use strict';

(function () {
  var OFFER_TYPE_VALUES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filter--container');

  var cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

  var fragment = document.createDocumentFragment();

  window.card = {
    renderCardRooms: function (element, card) {
      var rooms = card.offer.rooms;
      var guests = card.offer.guests;
      var roomsMsg = window.util.declWord(rooms, ['комната', 'комнаты', 'комнат']);
      var guestsMsg = window.util.declWord(guests, ['гостя', 'гостей', 'гостей']);

      element.querySelector('.popup__text--capacity').textContent = rooms + ' ' + roomsMsg + ' для ' + guests + ' ' + guestsMsg;
    },

    renderCardFeatures: function (element, card) {
      var offerFeatures = card.offer.features;
      var cardFeaturesContainer = element.querySelector('.popup__features');
      cardFeaturesContainer.innerHTML = '';

      for (var i = 0; i < offerFeatures.length; i++) {
        var feature = offerFeatures[i];
        var featureElement = document.createElement('li');
        featureElement.className = 'popup__feature popup__feature--' + feature;
        cardFeaturesContainer.appendChild(featureElement);
      }
    },

    renderCardPhotos: function (element, card) {
      var offerPhotos = card.offer.photos;
      var cardPhotos = element.querySelector('.popup__photos');
      var cardPhoto = element.querySelector('.popup__photo');
      cardPhotos.innerHTML = '';

      for (var i = 0; i < offerPhotos.length; i++) {
        var clonePhoto = cardPhoto.cloneNode(true);
        clonePhoto.src = offerPhotos[i];
        cardPhotos.appendChild(clonePhoto);
      }
    },

    renderCard: function (card) {
      var cardPopup = cardPopupTemplate.cloneNode(true);

      cardPopup.querySelector('.popup__title').textContent = card.offer.title;
      cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
      cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

      cardPopup.querySelector('.popup__type').textContent = OFFER_TYPE_VALUES[card.offer.type];

      this.renderCardRooms(cardPopup, card);

      cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

      this.renderCardFeatures(cardPopup, card);

      cardPopup.querySelector('.popup__description').textContent = card.offer.description;

      this.renderCardPhotos(cardPopup, card);

      cardPopup.querySelector('.popup__avatar').src = card.author.avatar;

      var cardBtnClose = cardPopup.querySelector('.popup__close');

      cardBtnClose.addEventListener('click', function () {
        cardPopup.remove();
        var pins = document.querySelectorAll('.map__pin');
        window.pin.removeActiveStatePins(pins);
      });

      // cardBtnClose.addEventListener('keydown', function (evt) {
      //   window.util.isEscEvent(evt, cardPopup.remove());
      // });

      return cardPopup;
    },

    renderCardPopup: function (card) {
      fragment.appendChild(this.renderCard(card));
      map.insertBefore(fragment, mapFilterContainer);
    },

    removeCardPopup: function () {
      var offerCard = map.querySelector('.map__card');
      var isCard = map.contains(offerCard);

      if (isCard) {
        map.removeChild(offerCard);
      }
    }
  };
})();
