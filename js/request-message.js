'use strict';

(function () {
  var fragment = document.createDocumentFragment();

  var closeMsg = function (msg) {
    var msgPopup = document.querySelector('.' + msg);

    if (msgPopup !== null) {
      msgPopup.remove();
    }

    document.removeEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, function () {
        closeMsg(msg);
      });
    });
  };

  window.requestMessage = {
    render: function (msg) {
      var requestMsgTemplate = document.querySelector('#' + msg).content.querySelector('.' + msg);
      var main = document.querySelector('main');
      var requestMsg = requestMsgTemplate.cloneNode(true);
      fragment.appendChild(requestMsg);
      main.appendChild(fragment);

      var closeBtn = document.querySelector('.error__button');
      if (closeBtn !== null) {
        closeBtn.addEventListener('click', function () {
          closeMsg(msg);
        });
      }

      document.addEventListener('click', function () {
        closeMsg(msg);
      });

      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, function () {
          closeMsg(msg);
        });
      });
    }
  };
})();
