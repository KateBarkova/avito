'use strict';
(function () {
  var LOAD_TIMEOUT = 10000;
  var ERROR_TIMEOUT = 3000;
  var SUCCESS_STATUS = 200;
  var URL_LOAD = 'https://avito.dump.academy/products';
  var URL_LOAD_SELLERS = 'https://avito.dump.academy/sellers';

  var onXhrLoad = function (xhr, onLoad, onError) {
    return function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  var onXhrError = function (onError) {
    return function () {
      onError('Произошла ошибка соединения');
    };
  };

  var onXhrTimeout = function (onError, xhr) {
    return function () {
      xhr.timeout = LOAD_TIMEOUT;
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', onXhrLoad(xhr, onLoad, onError));
    xhr.addEventListener('error', onXhrError(window.backend.onError));
    xhr.addEventListener('timeout', onXhrTimeout(onError, xhr));
    xhr.open('GET', url);
    xhr.send();
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error-message');
    errorMessage.remove();
  };

  var onSuccsess = function (array) {
    window.mainArray = array.data;
    load(URL_LOAD_SELLERS, onSellersArraySuccsessLoad, window.backend.onError);
    window.filter.setPrice(window.mainArray);
    window.getAddress(window.mainArray);
    Object.keys(window.mainArray).forEach(function (i) {
      window.mainArray[i].date = window.utils.getRandomDate();
    });
  };

  var onSellersArraySuccsessLoad = function (array) {
    var sellersArray = array.data;
    Object.keys(window.mainArray).forEach(function (i) {
      var number = window.mainArray[i].relationships.seller;
      window.mainArray[i].rating = sellersArray[number].rating;
      window.mainArray[i].sellerName = sellersArray[number].name;
    });
  };

  window.backend = {
    startLoad: function () {
      load(URL_LOAD, onSuccsess, window.backend.onError);
    },
    onError: function (message) {
      var node = document.createElement('div');
      node.classList.add('error-message');
      node.style.zIndex = '1';
      node.style.position = 'absolute';
      node.style.textAlign = 'center';
      node.style.backgroundColor = '#fdbcb4';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = 0;
      node.style.fontSize = '28px';
      node.style.lineHeight = '50px';
      node.textContent = message + '. Пожалуйста, перезагрузите страницу или попробуйте позже';
      document.body.insertAdjacentElement('afterbegin', node);
      if (node) {
        setTimeout(removeErrorMessage, ERROR_TIMEOUT);
      }
    }
  };

})();

