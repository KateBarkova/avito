'use strict';
(function () {
  var TIME_OUT = 10000;
  var product = document.querySelector('.product');
  var productList = document.querySelector('.products-list');
  productList.textContent = '';

  var renderProduct = function (item) {
    var newElement = product.cloneNode(true);
    newElement.id = item.id;
    var title = newElement.querySelector('.product-title a');
    var price = newElement.querySelector('.product-price');
    var photo = newElement.querySelector('.product-pic img');
    var address = newElement.querySelector('.product-address');
    var numberOfPhoto = newElement.querySelector('.product-pic-number');
    var favoriteButton = newElement.querySelector('.product-favorite');
    var date = newElement.querySelector('.product-date');

    title.textContent = item.title;
    price.textContent = window.utils.getPrice(item.price);
    photo.src = 'https:' + item.pictures[0];
    if (item.shortAddress) {
      address.textContent = item.shortAddress;
    } else {
      address.textContent = item.textAddress;
    }
    numberOfPhoto.textContent = item.pictures.length;
    date.textContent = window.utils.getDate(item.date);

    for (var j = 0; j < window.favoriteArray.length; j++) {
      if (window.favoriteArray[j].id === item.id) {
        favoriteButton.classList.add('product-favorite__click');
      }
    }

    var onBtnClick = function (evt) {
      window.addToFavorite(evt, item);
    };

    var onTitleClick = function (evt) {
      window.card.open(evt, item);
    };

    favoriteButton.addEventListener('click', onBtnClick);
    title.addEventListener('click', onTitleClick);
    return newElement;
  };

  window.renderProductList = function (arr) {
    clearInterval(changePhoto, TIME_OUT);
    productList.textContent = '';
    var array = arr.slice();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      var item = renderProduct(array[i]);
      fragment.appendChild(item);
    }
    productList.appendChild(fragment);
    window.productArray = document.querySelectorAll('.product');

    i = 0;
    var j = 1;
    var productArray = document.querySelectorAll('.product');
    productArray = [].slice.call(productArray);

    var changePhoto = function () {
      var currentProduct = productArray[i];
      var photo = currentProduct.querySelector('img');
      photo.classList.add('photo-show');
      var currentElement = window.mainArray.filter(function (element) {
        return element.id === currentProduct.id;
      });
      if (j > currentElement[0].pictures.length - 1) {
        j = 0;
      }
      if (i === 0) {
        var previousPhoto = productArray[productArray.length - 1].querySelector('img');
      } else {
        previousPhoto = productArray[i - 1].querySelector('img');
      }
      previousPhoto.classList.remove('photo-show');
      photo.src = 'https:' + currentElement[0].pictures[j];
      i = i + 1;
      if (i > productArray.length - 1) {
        i = 0;
        j = j + 1;
      }
    };
    if (productArray.length > 0) {
      setInterval(changePhoto, TIME_OUT);
    }
  };

})();
