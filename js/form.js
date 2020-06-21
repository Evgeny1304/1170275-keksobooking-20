'use strict';

(function () {
  var MAX_OFFER_ROOMS = 100;

  var adForm = document.querySelector('.ad-form');
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
})();
