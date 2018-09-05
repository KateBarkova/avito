'use strict';
(function () {
  var filterProduct = document.querySelector('.products-filter');
  var filterFieldset = document.querySelectorAll('.products-filter-group');
  var inputs = filterProduct.querySelectorAll('input');
  var selects = filterProduct.querySelectorAll('select');
  var favoriteButton = filterProduct.querySelector('#favorite');
  var favoriteFieldset = filterProduct.querySelector('.products-filter-favorite');
  var submitButton = filterProduct.querySelector('.products-filter-submit');

  window.formDisabled = {
    change: function (boolean) {
      inputs.forEach(function (element) {
        if (element.id !== 'favorite') {
          element.disabled = boolean;
        }
      });
      selects.forEach(function (element) {
        element.disabled = boolean;
      });
      submitButton.disabled = boolean;
      if (boolean) {
        filterFieldset.forEach(function (element) {
          if (!element.classList.contains('products-filter-favorite')) {
            element.style.opacity = '0.3';
          }
        });
        submitButton.style.opacity = '0.3';
      } else {
        submitButton.style.opacity = '1';
        filterFieldset.forEach(function (element) {
          element.style.opacity = '1';
        });
      }
    },
    changeFavorite: function (boolean) {
      favoriteButton.disabled = boolean;
      favoriteFieldset.style.opacity = boolean ? '0.3' : '1';
    }
  };

})();
