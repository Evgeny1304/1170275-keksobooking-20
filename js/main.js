'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_OFFER_COUNT = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_CURSOR_HEIGHT = 22;
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_OFFER_PRICE = 1000000;
var MAX_OFFER_ROOMS = 100;
var MAX_OFFER_GUESTS = 3;
var OFFER_TYPE_VALUES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
  'palace': 'Дворец'
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinBtn = map.querySelector('.map__pin--main');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapFilterContainer = document.querySelector('.map__filter--container');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var adSelectCapacity = adForm.querySelector('#capacity');
var adSelectRooms = adForm.querySelector('#room_number');

var cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');

var mapWidth = map.offsetWidth;
var mapHeight = map.offsetHeight;
var fragment = document.createDocumentFragment();


var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArray = function (arr) {
  var randomArr = [];
  var randomIndex = getRandom(0, arr.length - 1);

  for (var i = randomIndex; i < arr.length; i++) {
    randomArr.push(arr[i]);
  }

  return randomArr;
};

var declWord = function (number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var getOffers = function () {
  var offers = [];

  for (var i = 0; i < MAX_OFFER_COUNT; i++) {
    var locationX = getRandom(0, mapWidth);
    var locationY = getRandom(MIN_Y, MAX_Y);

    var offer = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Сдается в аренду',
        'address': locationX + ', ' + locationY,
        'price': getRandom(0, MAX_OFFER_PRICE),
        'type': OFFER_TYPE[getRandom(0, OFFER_TYPE.length - 1)],
        'rooms': getRandom(1, MAX_OFFER_ROOMS),
        'guests': getRandom(0, MAX_OFFER_GUESTS),
        'checkin': OFFER_CHECKIN[getRandom(0, OFFER_CHECKIN.length - 1)],
        'checkout': OFFER_CHECKIN[getRandom(0, OFFER_CHECKIN.length - 1)],
        'features': getRandomArray(OFFER_FEATURES),
        'description': 'Отличное жилье с комфортом',
        'photos': getRandomArray(OFFER_PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      },
    };
    offers.push(offer);
  }

  return offers;
};

var offers = getOffers();

var renderMapPin = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);
  var mapPinImg = mapPin.querySelector('img');

  mapPin.style.left = (pin.location.x + MAP_PIN_WIDTH / 2) + 'px';
  mapPin.style.top = (pin.location.y - MAP_PIN_HEIGHT) + 'px';
  mapPinImg.src = pin.author.avatar;
  mapPinImg.alt = pin.offer.title;

  return mapPin;
};

var renderMapPins = function (pins) {
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderMapPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};


var disabledInput = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

var removeDisabledInput = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var getAddress = function (isWithCursorHeight) {
  var offset = isWithCursorHeight ? MAP_PIN_CURSOR_HEIGHT : 0;
  var addressX = mapWidth / 2;
  var addressY = mapHeight / 2 + offset;

  return addressX + ', ' + addressY;
};

disabledInput(adFormElements);
disabledInput(mapFilters);
adFormAddress.value = getAddress();

var activatePage = function () {
  map.classList.remove('map--faded');
  renderMapPins(offers);
  adForm.classList.remove('ad-form--disabled');
  removeDisabledInput(adFormElements);
  removeDisabledInput(mapFilters);
  adFormAddress.value = getAddress(true);
};

mapPinBtn.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

mapPinBtn.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

var isCorrectRoomsGuests = function () {
  var isCorrect = true;
  var adSelectRoomsValue = parseInt(adSelectRooms.value, 10);
  var adSelectCapacityValue = parseInt(adSelectCapacity.value, 10);

  if (adSelectRoomsValue === MAX_OFFER_ROOMS && adSelectCapacityValue >= 1) {
    isCorrect = false;
  } else if (adSelectCapacityValue > 0 && adSelectCapacityValue > adSelectRoomsValue) {
    isCorrect = false;
  } else if (adSelectCapacityValue === 0 && adSelectRoomsValue < MAX_OFFER_ROOMS) {
    isCorrect = false;
  }

  return isCorrect;
};

var validateRoomsAndGuests = function () {
  var isValid = isCorrectRoomsGuests();

  if (isValid) {
    adSelectCapacity.setCustomValidity('');
  } else {
    adSelectCapacity.setCustomValidity('Выбрано недопустимое значение гостей.');
  }
};

validateRoomsAndGuests();

adSelectRooms.addEventListener('change', validateRoomsAndGuests);
adSelectCapacity.addEventListener('change', validateRoomsAndGuests);

var renderCardRooms = function (element, card) {
  var rooms = card.offer.rooms;
  var guests = card.offer.guests;
  var roomsMsg = declWord(rooms, ['комната', 'комнаты', 'комнат']);
  var guestsMsg = declWord(guests, ['гостя', 'гостей', 'гостей']);

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

var renderCardPopup = function (card) {
  var cardPopup = cardPopupTemplate.cloneNode(true);

  cardPopup.querySelector('.popup__title').textContent = card.offer.title;
  cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
  cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

  cardPopup.querySelector('.popup__type').textContent = OFFER_TYPE_VALUES[card.offer.type];

  renderCardRooms(cardPopup, card);

  cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  renderCardFeatures(cardPopup, card);

  cardPopup.querySelector('.popup__description').textContent = card.offer.description;

  renderCardPhotos(cardPopup, card);

  cardPopup.querySelector('.popup__avatar').src = card.author.avatar;

  return cardPopup;
};

fragment.appendChild(renderCardPopup(offers[0]));
map.insertBefore(fragment, mapFilterContainer);
