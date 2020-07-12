'use strict';

(function () {
  var ANY_FILTER_VALUE = 'any';
  var LOWER_PRICE = 10000;
  var HIGHER_PRICE = 50000;

  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('#housing-features');
  var offerType = houseTypeFilter.value;
  var offerPrice = priceFilter.value;
  var offerRooms = roomsFilter.value;
  var offerGuests = guestsFilter.value;
  var offerFeatures = [];

  var getPriceType = function (price) {
    var priceType = 'high';

    if (price < LOWER_PRICE) {
      priceType = 'low';
    } else if (price >= LOWER_PRICE && price < HIGHER_PRICE) {
      priceType = 'middle';
    }

    return priceType;
  };

  var updateOffers = function () {
    var sameOffers = window.offers.filter(function (item) {
      var isTypeSimilar = offerType === ANY_FILTER_VALUE ? true : item.offer.type === offerType;
      var isPriceSimilar = offerPrice === ANY_FILTER_VALUE ? true : getPriceType(item.offer.price) === offerPrice;
      var isRoomsSimilar = offerRooms === ANY_FILTER_VALUE ? true : item.offer.rooms === parseInt(offerRooms, 10);
      var isGuestsSimilar = offerGuests === ANY_FILTER_VALUE ? true : item.offer.guests === parseInt(offerGuests, 10);
      var isFeaturesSimilar = offerFeatures.length === 0 ? true : offerFeatures.every(function (element) {
        return item.offer.features.indexOf(element) >= 0;
      });

      return isTypeSimilar && isPriceSimilar && isRoomsSimilar && isGuestsSimilar && isFeaturesSimilar;
    });

    window.card.remove(window.map.mainContainer);
    window.pin.remove();
    window.pin.render(sameOffers);
  };

  var resetSelection = function () {
    var selectFilters = document.querySelectorAll('.map__filter');
    selectFilters.forEach(function (filter) {
      filter.value = ANY_FILTER_VALUE;
    });
  };

  var resetFeatures = function () {
    var features = featuresFilter.querySelectorAll('.map__checkbox');
    features.forEach(function (feature) {
      feature.checked = false;
    });
    offerFeatures = [];
  };

  var filterByType = function () {
    offerType = houseTypeFilter.value;
    updateOffers();
  };

  var filterByPrice = function () {
    offerPrice = priceFilter.value;
    updateOffers();
  };

  var filterByRooms = function () {
    offerRooms = roomsFilter.value;
    updateOffers();
  };

  var filterByGuests = function () {
    offerGuests = guestsFilter.value;
    updateOffers();
  };

  var filterByFeatures = function (evt) {
    var target = evt.target;
    var targetValue = target.value;

    if (target.checked) {
      offerFeatures.push(targetValue);
    } else {
      var index = offerFeatures.findIndex(function (item) {
        return item === targetValue;
      });
      offerFeatures.splice(index, 1);
    }
    updateOffers();
  };

  houseTypeFilter.addEventListener('change', window.util.debounce(filterByType));
  priceFilter.addEventListener('change', window.util.debounce(filterByPrice));
  roomsFilter.addEventListener('change', window.util.debounce(filterByRooms));
  guestsFilter.addEventListener('change', window.util.debounce(filterByGuests));
  featuresFilter.addEventListener('change', window.util.debounce(filterByFeatures));

  window.filterForm = {
    reset: function () {
      resetSelection();
      resetFeatures();
    }
  };
})();
