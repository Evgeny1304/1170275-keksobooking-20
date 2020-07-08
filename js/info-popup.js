'use strict';

(function () {
  var OPENED_POPUP_CLASS = 'opened-popup';

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var main = document.querySelector('main');

  var fragment = document.createDocumentFragment();

  var closeInfoPopup = function () {
    var openedPopup = document.querySelector('.' + OPENED_POPUP_CLASS);

    if (openedPopup !== null) {
      openedPopup.remove();
    }

    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeInfoPopup);
    });
  };

  window.infoPopup = {
    render: function (messageType) {
      var infoMessageTemplate = messageType === 'success' ? successMessageTemplate : errorMessageTemplate;
      var infoMessage = infoMessageTemplate.cloneNode(true);
      infoMessage.classList.add(OPENED_POPUP_CLASS);
      fragment.appendChild(infoMessage);
      main.appendChild(fragment);

      var closeBtn = document.querySelector('.error__button');
      if (closeBtn !== null) {
        closeBtn.addEventListener('click', closeInfoPopup);
      }

      document.addEventListener('click', closeInfoPopup);

      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, closeInfoPopup);
      });
    }
  };
})();
