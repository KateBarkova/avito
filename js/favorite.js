'use strict';
(function () {

  var favoriteLocal = localStorage.getItem('favoriteArray');
  window.favoriteArray = JSON.parse(favoriteLocal);
  if (window.favoriteArray === null) {
    window.favoriteArray = [];
  }

  window.addToFavorite = function (evt, item) {
    var btn = evt.target;
    if (btn.classList.contains('product-favorite__click')) {
      window.favoriteArray = window.favoriteArray.filter(function (element) {
        return (element.id !== item.id);
      });
      btn.classList.remove('product-favorite__click');
    } else {
      btn.classList.add('product-favorite__click');
      window.favoriteArray.push(item);
    }
    localStorage.clear();
    localStorage.setItem('favoriteArray', JSON.stringify(window.favoriteArray));
    favoriteLocal = localStorage.getItem('favoriteArray');
    window.favoriteArray = JSON.parse(favoriteLocal);
  };

})();
