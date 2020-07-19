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

  var maxOffersCount = window.pin.maxOffersCount;

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
    var offerType = houseTypeFilter.value;
    var offerPrice = priceFilter.value;
    var offerRooms = roomsFilter.value;
    var offerGuests = guestsFilter.value;
    var offerFeatures = Array.from(featuresFilter.querySelectorAll('.map__checkbox:checked')).map(function (checkbox) {
      return checkbox.value;
    });

    var sameOffers = [];

    for (var i = 0; i < window.offers.length; i++) {
      if (sameOffers.length === maxOffersCount) {
        break;
      } else {
        var item = window.offers[i];
        var isTypeSimilar = offerType === ANY_FILTER_VALUE ? true : item.offer.type === offerType;
        var isPriceSimilar = offerPrice === ANY_FILTER_VALUE ? true : getPriceType(item.offer.price) === offerPrice;
        var isRoomsSimilar = offerRooms === ANY_FILTER_VALUE ? true : item.offer.rooms === parseInt(offerRooms, 10);
        var isGuestsSimilar = offerGuests === ANY_FILTER_VALUE ? true : item.offer.guests === parseInt(offerGuests, 10);
        var isFeaturesSimilar = offerFeatures.length === 0 ? true : offerFeatures.every(function (element) {
          return item.offer.features.indexOf(element) >= 0;
        });

        if (isTypeSimilar && isPriceSimilar && isRoomsSimilar && isGuestsSimilar && isFeaturesSimilar) {
          sameOffers.push(item);
        }
      }
    }

    window.card.remove(window.map.mainContainer);
    window.pin.remove();
    window.pin.render(sameOffers);
  };

  houseTypeFilter.addEventListener('change', window.util.debounce(updateOffers));
  priceFilter.addEventListener('change', window.util.debounce(updateOffers));
  roomsFilter.addEventListener('change', window.util.debounce(updateOffers));
  guestsFilter.addEventListener('change', window.util.debounce(updateOffers));
  featuresFilter.addEventListener('change', window.util.debounce(updateOffers));
})();
