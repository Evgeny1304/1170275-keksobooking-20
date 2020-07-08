'use strict';

(function () {
  var ANY_OFFER_TYPE = 'any';

  var houseTypeFilter = document.querySelector('#housing-type');
  var offerType;

  var updateOffers = function () {

    var sameTypeOffers = window.offers.filter(function (item) {
      return item.offer.type === offerType;
    });

    window.pin.remove();

    if (offerType === ANY_OFFER_TYPE) {
      window.pin.render(window.offers);
    }

    window.pin.render(sameTypeOffers);
  };

  var changeHouseType = function () {
    offerType = houseTypeFilter.value;
    window.card.remove(window.map.mainContainer);
    updateOffers();
  };

  houseTypeFilter.addEventListener('change', changeHouseType);
})();
