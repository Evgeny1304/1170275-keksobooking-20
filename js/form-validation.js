'use strict';

(function () {
  var MAX_OFFER_ROOMS = 100;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var adSelectCapacity = document.querySelector('#capacity');
  var adSelectRooms = document.querySelector('#room_number');
  var adInputTitle = document.querySelector('#title');
  var adSelectType = document.querySelector('#type');
  var adInputPrice = document.querySelector('#price');
  var adSelectTimeIn = document.querySelector('#timein');
  var adSelectTimeOut = document.querySelector('#timeout');
  var adAvatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var adHousingFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarPreviewSource = avatarPreview.getAttribute('src');
  var housingPreviewBlock = document.querySelector('.ad-form__photo');
  var housingPreviewSize = housingPreviewBlock.offsetWidth;

  var checkIsCorrectRoomsGuests = function () {
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
    var isValid = checkIsCorrectRoomsGuests();

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

  adAvatarFileChooser.addEventListener('change', function () {
    window.util.choosePhoto(adAvatarFileChooser, avatarPreview);
  });

  adHousingFileChooser.addEventListener('change', function () {
    var housingPreview = document.createElement('img');
    housingPreview.width = housingPreviewSize;
    housingPreview.height = housingPreviewSize;
    housingPreviewBlock.appendChild(housingPreview);

    window.util.choosePhoto(adHousingFileChooser, housingPreview);
  });

  window.formValidation = {
    checkInputsAndControls: function () {
      validateTitle();
      validateRoomsAndGuests();
    },

    changeMinPrice: function () {
      changeMinPrice();
    },

    resetPhotoPreviews: function () {
      avatarPreview.src = avatarPreviewSource;
      housingPreviewBlock.innerHTML = '';
    }
  };
})();
