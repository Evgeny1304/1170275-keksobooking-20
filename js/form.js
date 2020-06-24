'use strict';

(function () {
  var MAX_OFFER_ROOMS = 100;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MIN_PRICES_BY_TYPE = {
    'flat': 1000,
    'house': 5000,
    'bungalo': 0,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adSelectCapacity = adForm.querySelector('#capacity');
  var adSelectRooms = adForm.querySelector('#room_number');
  var adInputTitle = adForm.querySelector('#title');
  var adSelectType = adForm.querySelector('#type');
  var adInputPrice = adForm.querySelector('#price');
  var adSelectTimeIn = adForm.querySelector('#timein');
  var adSelectTimeOut = adForm.querySelector('#timeout');

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

  var changeMinPrice = function () {
    adInputPrice.min = MIN_PRICES_BY_TYPE[adSelectType.value];
    adInputPrice.placeholder = MIN_PRICES_BY_TYPE[adSelectType.value];
  };

  var validateRoomsAndGuests = function () {
    var isValid = isCorrectRoomsGuests();

    if (isValid) {
      adSelectCapacity.setCustomValidity('');
    } else {
      adSelectCapacity.setCustomValidity('Выбрано недопустимое значение гостей.');
    }
  };

  var validateTitle = function () {
    if (adInputTitle.validity.valueMissing) {
      adInputTitle.setCustomValidity('Необходимо ввести заголовок объявления.');
    } else {
      adInputTitle.setCustomValidity('');
    }
  };

  var validatePrice = function () {
    var adSelectTypeValue = adSelectType.value;
    var adInputPriceValue = parseInt(adInputPrice.value, 10);

    if (adInputPriceValue < MIN_PRICES_BY_TYPE[adSelectTypeValue]) {
      adInputPrice.setCustomValidity('Введите другое значение. Минимальная цена за ночь для выбранного типа жилья: ' + MIN_PRICES_BY_TYPE[adSelectTypeValue]);
    } else {
      adInputPrice.setCustomValidity('');
    }
  };

  changeMinPrice();
  validateTitle();
  validateRoomsAndGuests();

  adSelectRooms.addEventListener('change', validateRoomsAndGuests);
  adSelectCapacity.addEventListener('change', validateRoomsAndGuests);
  adInputTitle.addEventListener('invalid', validateTitle);

  adInputTitle.addEventListener('input', function () {
    var valueLength = adInputTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      adInputTitle.setCustomValidity('Ещё необходимо ввести ' + (MIN_TITLE_LENGTH - valueLength) + ' символов');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      adInputTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' символы');
    } else {
      adInputTitle.setCustomValidity('');
    }
  });

  adInputPrice.addEventListener('input', validatePrice);
  adSelectType.addEventListener('change', changeMinPrice);

  adSelectTimeIn.addEventListener('change' , function () {
    adSelectTimeOut.value = adSelectTimeIn.value;
  });

  adSelectTimeOut.addEventListener('change' , function () {
    adSelectTimeIn.value = adSelectTimeOut.value;
  });
})();
