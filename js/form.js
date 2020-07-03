'use strict';

(function () {
  var MAP_PIN_CURSOR_HEIGHT = 22;
  var MAX_OFFER_ROOMS = 100;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var adForm = document.querySelector('.ad-form');
  var adSelectCapacity = adForm.querySelector('#capacity');
  var adSelectRooms = adForm.querySelector('#room_number');
  var adInputTitle = adForm.querySelector('#title');
  var adSelectType = adForm.querySelector('#type');
  var adInputPrice = adForm.querySelector('#price');
  var adSelectTimeIn = adForm.querySelector('#timein');
  var adSelectTimeOut = adForm.querySelector('#timeout');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var getAddress = function (isWithCursorHeight) {
    var offset = isWithCursorHeight ? MAP_PIN_CURSOR_HEIGHT + window.map.pinBtnHeight : 0;
    var addressX = window.map.width / 2;
    var addressY = window.map.height / 2 + offset;

    return addressX + ', ' + addressY;
  };

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
    var minPrice = window.util.offerTypeSettings[adSelectType.value].minPrice;
    adInputPrice.min = minPrice;
    adInputPrice.placeholder = minPrice;
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
    var adInputPriceValue = parseInt(adInputPrice.value, 10);
    var minPrice = window.util.offerTypeSettings[adSelectType.value].minPrice;

    if (adInputPriceValue < minPrice) {
      adInputPrice.setCustomValidity('Введите другое значение. Минимальная цена за ночь для выбранного типа жилья: ' + minPrice);
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

  adSelectTimeIn.addEventListener('change', function () {
    adSelectTimeOut.value = adSelectTimeIn.value;
  });

  adSelectTimeOut.addEventListener('change', function () {
    adSelectTimeIn.value = adSelectTimeOut.value;
  });

  var onSuccess = function () {
    window.main.deactivatePage();
    window.requestMessage.render('success');
  };

  var onError = function () {
    window.requestMessage.render('error');
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSuccess, onError);
    evt.preventDefault();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  });

  window.form = {
    activate: function () {
      adForm.classList.remove('ad-form--disabled');
      window.util.enableInput(adFormElements);
      adFormAddress.value = getAddress(true);
    },

    deactivate: function () {
      window.util.disableInput(adFormElements);
      adForm.reset();
      changeMinPrice();
      adFormAddress.value = getAddress();
      adForm.classList.add('ad-form--disabled');
    },

    writeAddressCoordinate: function (coordinateX, coordinateY) {
      var addressX = coordinateX;
      var addressY = coordinateY + MAP_PIN_CURSOR_HEIGHT;

      adFormAddress.value = addressX + ', ' + addressY;
    }
  };

  window.form.deactivate();
})();
