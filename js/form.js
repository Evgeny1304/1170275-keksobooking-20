'use strict';

(function () {
  var MAP_PIN_CURSOR_HEIGHT = 22;

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  window.formValidation.checkInputsAndControls();

  var getAddress = function (isWithCursorHeight) {
    var offset = isWithCursorHeight ? MAP_PIN_CURSOR_HEIGHT + window.map.pinBtnHeight : 0;
    var addressX = window.map.width / 2;
    var addressY = window.map.height / 2 + offset;

    return addressX + ', ' + addressY;
  };

  var onSuccess = function () {
    window.main.deactivatePage();
    window.infoPopup.render('success');
  };

  var onError = function () {
    window.infoPopup.render('error');
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
      window.formValidation.changeMinPrice();
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
