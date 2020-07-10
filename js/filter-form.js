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
      priceType = 'middle'
    }

    return priceType;
  };

  var updateOffers = function () {
    var sameOffers = window.offers.filter(function (item) {
      var isTypeSimilar = offerType === ANY_FILTER_VALUE ? true : item.offer.type === offerType;
      var isPriceSimilar = offerPrice === ANY_FILTER_VALUE ? true : getPriceType(item.offer.price) === offerPrice;
      var isRoomsSimilar = offerRooms === ANY_FILTER_VALUE ? true : item.offer.rooms === parseInt(offerRooms, 10);
      var isGuestsSimilar = offerGuests === ANY_FILTER_VALUE ? true : item.offer.guests === parseInt(offerGuests, 10);

      return isTypeSimilar && isPriceSimilar && isRoomsSimilar && isGuestsSimilar;
    });

    window.card.remove(window.map.mainContainer);
    window.pin.remove();
    window.pin.render(sameOffers);
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

  houseTypeFilter.addEventListener('change', filterByType);
  priceFilter.addEventListener('change', filterByPrice);
  roomsFilter.addEventListener('change', filterByRooms);
  guestsFilter.addEventListener('change', filterByGuests);

  featuresFilter.addEventListener('change', function (evt) {
    if (evt.target.checked) {
      offerFeatures.push(evt.target.value);
    } else {
      var index = offerFeatures.findIndex(function (item) {
        return item === evt.target.value;
      });
      offerFeatures.splice(index, 1);
    }

    console.log(offerFeatures);
  });
})();
