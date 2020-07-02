'use strict';

(function () {
  var cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

  var fragment = document.createDocumentFragment();

  var renderCardRooms = function (element, card) {
    var rooms = card.offer.rooms;
    var guests = card.offer.guests;
    var roomsMsg = window.util.declWord(rooms, ['комната', 'комнаты', 'комнат']);
    var guestsMsg = window.util.declWord(guests, ['гостя', 'гостей', 'гостей']);

    element.querySelector('.popup__text--capacity').textContent = rooms + ' ' + roomsMsg + ' для ' + guests + ' ' + guestsMsg;
  };

  var renderCardFeatures = function (element, card) {
    var offerFeatures = card.offer.features;
    var cardFeaturesContainer = element.querySelector('.popup__features');
    cardFeaturesContainer.innerHTML = '';

    for (var i = 0; i < offerFeatures.length; i++) {
      var feature = offerFeatures[i];
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      cardFeaturesContainer.appendChild(featureElement);
    }
  };

  var renderCardPhotos = function (element, card) {
    var offerPhotos = card.offer.photos;
    var cardPhotos = element.querySelector('.popup__photos');
    var cardPhoto = element.querySelector('.popup__photo');
    cardPhotos.innerHTML = '';

    for (var i = 0; i < offerPhotos.length; i++) {
      var clonePhoto = cardPhoto.cloneNode(true);
      clonePhoto.src = offerPhotos[i];
      cardPhotos.appendChild(clonePhoto);
    }
  };

  var renderCard = function (card) {
    var cardPopup = cardPopupTemplate.cloneNode(true);

    cardPopup.querySelector('.popup__title').textContent = card.offer.title;
    cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
    cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    cardPopup.querySelector('.popup__type').textContent = window.util.offerTypeSettings[card.offer.type].label;

    renderCardRooms(cardPopup, card);

    cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    renderCardFeatures(cardPopup, card);

    cardPopup.querySelector('.popup__description').textContent = card.offer.description;

    renderCardPhotos(cardPopup, card);

    cardPopup.querySelector('.popup__avatar').src = card.author.avatar;

    return cardPopup;
  };

  var closeCard = function () {
    var cardPopup = document.querySelector('.map__card');
    var pins = document.querySelectorAll('.map__pin');
    window.util.removeActiveStatesPins(pins);

    if (cardPopup !== null) {
      cardPopup.remove();
    }

    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeCard);
    });
  };

  window.card = {
    render: function (card, parentContainer, beforeContainer) {
      fragment.appendChild(renderCard(card));
      parentContainer.insertBefore(fragment, beforeContainer);
      var cardBtn = document.querySelector('.popup__close');
      cardBtn.addEventListener('click', closeCard);
      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, closeCard);
      });
    },

    remove: function (parentContainer) {
      var card = parentContainer.querySelector('.map__card');
      var isCard = parentContainer.contains(card);

      if (isCard) {
        parentContainer.removeChild(card);
      }
    }
  };
})();
