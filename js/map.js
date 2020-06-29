'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinBtn = map.querySelector('.map__pin--main');
  var mapFilterContainer = document.querySelector('.map__filter--container');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var offers = window.data.getOffers();

  window.map = {
    activate: function () {
      map.classList.remove('map--faded');
      window.pin.render(offers);
      window.util.enableInput(mapFilters);
    },

    deactivate: function () {
      window.util.disableInput(mapFilters);
    },

    width: mapWidth,
    height: mapHeight,

    mainContainer: map,
    filterContainer: mapFilterContainer
  };

  window.map.deactivate();

  mapPinBtn.addEventListener('mousedown', function (evt) {
    window.util.isMouseLeftEvent(evt, window.main.activatePage);
  });

  mapPinBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.main.activatePage);
  });
})();
