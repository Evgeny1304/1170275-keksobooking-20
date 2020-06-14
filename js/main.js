'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_OFFER_COUNT = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_WIDTH = document.querySelector('.map').offsetWidth;
var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
var MAP_PIN_BTN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
var MAP_PIN_BTN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
var MAP_PIN_CURSOR_HEIGHT = 22;
var MIN_Y = 130;
var MAX_Y = 630;
var MAX_OFFER_PRICE = 1000000;
var MAX_OFFER_ROOMS = 100;
var MAX_OFFER_GUESTS = 3;
var ERROR_MSG_ROOMS_GUESTS = {
  'rooms': 'Выбрано недопустимое количество комнат',
  'capacity': 'Выбрано недопустимое количество гостей'
};

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

var getOffers = function () {
  var offers = [];

  for (var i = 0; i < MAX_OFFER_COUNT; i++) {
    var locationX = getRandom(0, MAP_WIDTH);
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

var map = document.querySelector('.map');


var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderMapPin = function (pin) {
  var mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style.left = (pin.location.x + MAP_PIN_WIDTH / 2) + 'px';
  mapPin.style.top = (pin.location.y - MAP_PIN_HEIGHT) + 'px';
  mapPin.querySelector('img').src = pin.author.avatar;
  mapPin.querySelector('img').alt = pin.offer.title;

  return mapPin;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var renderMapPins = function (pins) {
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderMapPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var mapPinBtn = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormPhoto = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
var mapFeatures = mapFilterForm.querySelector('.map__features');

var addInputAdFormDisabled = function () {
  adFormPhoto.setAttribute('disabled', 'disabled');

  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].setAttribute('disabled', 'disabled');
  }
};

addInputAdFormDisabled();

var addMapFilterDisabled = function () {
  mapFeatures.setAttribute('disabled', 'disabled');

  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', 'disabled');
  }
};

addMapFilterDisabled();

var removeInputAdFormDisabled = function () {
  adFormPhoto.removeAttribute('disabled');

  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
};

var removeMapFilterDisabled = function () {
  mapFeatures.removeAttribute('disabled');

  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
};

var getAddressNonActive = function () {
  var addressX = (MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2;
  var addressY = (MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2;

  return addressX + ', ' + addressY;
};

var inputAddress = document.querySelector('#address');
inputAddress.value = getAddressNonActive();

var getAddressActive = function () {
  var addressX = (MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2;
  var addressY = (MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2 + MAP_PIN_CURSOR_HEIGHT;

  return addressX + ', ' + addressY;
};

var activatePage = function () {
  map.classList.remove('map--faded');
  renderMapPins(offers);
  adForm.classList.remove('ad-form--disabled');
  removeInputAdFormDisabled();
  removeMapFilterDisabled();
  inputAddress.value = getAddressActive();
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

var adSelectCapacity = adForm.querySelector('#capacity');
var adSelectRooms = adForm.querySelector('#room_number');

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

isCorrectRoomsGuests();

adForm.addEventListener('submit', function (evt) {
  if (!isCorrectRoomsGuests()) {
    evt.preventDefault();
  }
});

var validateRoomsAndGuests = function (evt) {
  var isValid = isCorrectRoomsGuests();
  var target = evt.target;
  var type = target.dataset.type;

  if (isValid) {
    adSelectRooms.setCustomValidity('');
    adSelectCapacity.setCustomValidity('');
  } else {
    target.setCustomValidity(ERROR_MSG_ROOMS_GUESTS[type]);
  }
};

adSelectRooms.addEventListener('change', validateRoomsAndGuests);
adSelectCapacity.addEventListener('change', validateRoomsAndGuests);


// var cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
//
// var renderCardType = function (element, card) {
//   if (card.offer.type === 'flat') {
//     element.querySelector('.popup__type').textContent = 'Квартира';
//   } else if (card.offer.type === 'bungalo') {
//     element.querySelector('.popup__type').textContent = 'Бунгало';
//   } else if (card.offer.type === 'house') {
//     element.querySelector('.popup__type').textContent = 'Дом';
//   } else {
//     element.querySelector('.popup__type').textContent = 'Дворец';
//   }
// };
//
// var renderCardRooms = function (element, card) {
//   var rooms = card.offer.rooms;
//   var roomsStr = card.offer.rooms.toString();
//   var guests = card.offer.guests;
//   var guestsMsg = '';
//   var roomsMsg = '';
//
//   if (guests === 1) {
//     guestsMsg = ' гостя';
//   } else {
//     guestsMsg = ' гостей';
//   }
//
//   if (rooms >= 10 && rooms <= 20) {
//     roomsMsg = ' комнат';
//   } else if (rooms === 1 || +roomsStr[roomsStr.length - 1] === 1) {
//     roomsMsg = ' комната';
//   } else if ((rooms >= 2 && rooms <= 4) || (+roomsStr[roomsStr.length - 1] >= 2 && +roomsStr[roomsStr.length - 1] <= 4)) {
//     roomsMsg = ' комнаты';
//   } else {
//     roomsMsg = ' комнат';
//   }
//
//   element.querySelector('.popup__text--capacity').textContent = rooms + roomsMsg + ' для ' + guests + guestsMsg;
//
// };
//
// var renderCardFeatures = function (element, card) {
//   var cardFeatures = element.querySelectorAll('.popup__feature');
//
//   for (var j = 0; j < cardFeatures.length; j++) {
//     cardFeatures[j].classList.add('hidden');
//     for (var k = 0; k < card.offer.features.length; k++) {
//       if (cardFeatures[j].classList.contains('popup__feature--' + card.offer.features[k])) {
//         cardFeatures[j].classList.remove('hidden');
//       }
//     }
//   }
// };
//
// var renderCardPhotos = function (element, card) {
//   if (card.offer.photos.length > 1) {
//     for (var l = 1; l <= card.offer.photos.length - 1; l++) {
//       var photo = element.querySelector('.popup__photo').cloneNode(true);
//       element.querySelector('.popup__photos').appendChild(photo);
//     }
//   }
//
//   var cardPhotos = element.querySelectorAll('.popup__photo');
//
//   for (var m = 0; m < cardPhotos.length; m++) {
//     cardPhotos[m].src = card.offer.photos[m];
//   }
// };
//
// var renderCardPopup = function (card) {
//   var cardPopup = cardPopupTemplate.cloneNode(true);
//
//   cardPopup.querySelector('.popup__title').textContent = card.offer.title;
//   cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
//
//   renderCardType(cardPopup, card);
//
//   renderCardRooms(cardPopup, card);
//
//   cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//
//   renderCardFeatures(cardPopup, card);
//
//   cardPopup.querySelector('.popup__description').textContent = card.offer.description;
//
//   renderCardPhotos(cardPopup, card);
//
//   cardPopup.querySelector('.popup__avatar').src = card.author.avatar;
//
//   return cardPopup;
// };
//
// var mapFilter = document.querySelector('.map__filter--container');
// fragment.appendChild(renderCardPopup(offers[0]));
// map.insertBefore(fragment, mapFilter);
