'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinBtn = map.querySelector('.map__pin--main');

  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

  window.mapWidth = map.offsetWidth;
  window.mapHeight = map.offsetHeight;
  var offers = window.data.getOffers();

  window.map = {
    activate: function () {
      map.classList.remove('map--faded');
      window.pin.renderMapPins(offers);
      window.util.enableInput(mapFilters);
    },

    deactivate: function () {
      window.util.disableInput(mapFilters);
    }
  };

  window.map.deactivate();

  mapPinBtn.addEventListener('mousedown', function (evt) {
    window.util.isMouseLeftEvent(evt, window.main.activatePage);
  });

  mapPinBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.main.activatePage);
  });
})();
