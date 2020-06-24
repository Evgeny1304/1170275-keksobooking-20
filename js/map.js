'use strict';

(function () {
  var MAP_PIN_CURSOR_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinBtn = map.querySelector('.map__pin--main');

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');

  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var offers = window.data.getOffers();

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
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      window.pin.renderMapPins(offers);
      adForm.classList.remove('ad-form--disabled');
      removeDisabledInput(adFormElements);
      removeDisabledInput(mapFilters);
      adFormAddress.value = getAddress(true);
    }
  };

  mapPinBtn.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  });

  mapPinBtn.addEventListener('keydown', function (evt) {
    window.main.isEnterEvent(evt, activatePage());
  });
})();
