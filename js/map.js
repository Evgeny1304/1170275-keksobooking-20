'use strict';

(function () {
  var MIN_X = 0;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MAP_PIN_CURSOR_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapPinBtn = map.querySelector('.map__pin--main');
  var mapFilterContainer = document.querySelector('.map__filter--container');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter, .map__features');

  var mapWidth = map.offsetWidth;
  var mapHeight = map.offsetHeight;
  var mapPinBtnHalfWidth = Math.floor(mapPinBtn.offsetWidth / 2);

  var limitMoveMinX = MIN_X - mapPinBtnHalfWidth;
  var limitMoveMaxX = mapWidth - mapPinBtnHalfWidth;
  var limitMoveMinY = MIN_Y - mapPinBtn.offsetWidth - MAP_PIN_CURSOR_HEIGHT;
  var limitMoveMaxY = MAX_Y - mapPinBtn.offsetWidth - MAP_PIN_CURSOR_HEIGHT;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.map = {
    activate: function () {
      map.classList.remove('map--faded');
      window.backend.load(window.pin.render, errorHandler);
      window.util.enableInput(mapFilters);
    },

    deactivate: function () {
      window.util.disableInput(mapFilters);
    },

    width: mapWidth,
    height: mapHeight,

    mainContainer: map,
    filterContainer: mapFilterContainer,

    pinBtnHeight: mapPinBtn.offsetHeight
  };

  window.map.deactivate();

  var getAddressNewCoordinate = function () {
    var addressNewCoordinateX = Math.floor(mapPinBtn.offsetLeft + mapPinBtn.offsetWidth / 2);
    var addressNewCoordinateY = mapPinBtn.offsetTop + mapPinBtn.offsetHeight;

    window.form.writeAddressCoordinate(addressNewCoordinateX, addressNewCoordinateY);
  };

  var checkLimitPosition = function (position, minValue, maxValue) {
    var newPosition = '';

    if (position >= minValue && position <= maxValue) {
      newPosition = position;
    }

    return newPosition;
  };

  mapPinBtn.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.util.isMouseLeftEvent(evt, window.main.activatePage);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinBtn.style.left = checkLimitPosition(mapPinBtn.offsetLeft - shift.x, limitMoveMinX, limitMoveMaxX) + 'px';
      mapPinBtn.style.top = checkLimitPosition(mapPinBtn.offsetTop - shift.y, limitMoveMinY, limitMoveMaxY) + 'px';

      getAddressNewCoordinate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getAddressNewCoordinate();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.main.activatePage);
  });
})();
