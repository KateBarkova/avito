'use strict';
(function () {
  var filterProduct = document.querySelector('.products-filter');
  var category = filterProduct.querySelector('#category');
  var priceRange = filterProduct.querySelector('input[name=price-range]');
  var priceMin = filterProduct.querySelector('.price-range-min');
  var priceMax = filterProduct.querySelector('.price-range-max');
  var submitButton = filterProduct.querySelector('.products-filter-submit');
  var favorite = filterProduct.querySelector('#favorite');

  var filterByCategory = function (array) {
    history.replaceState(null, null, '?category=' + category.value);
    if (category.value !== 'all') {
      array = array.filter(function (element) {
        return element.category === category.value;
      });
    }
    return array;
  };

  var raitingComparator = function (a, b) {
    var r = 0;
    if (a.rating > b.rating) {
      r = -1;
    }
    if (a.rating < b.rating) {
      r = 1;
    }
    return r;
  };

  var priceComparator = function (a, b) {
    var r = 0;
    if (a.price === undefined) {
      r = 1;
    }
    if (a.price > b.price) {
      r = 1;
    }
    if (a.price < b.price) {
      r = -1;
    }
    return r;
  };

  var sortByPrice = function (array, direction) {
    var listUndefined = array.filter(function (element) {
      return element.price === undefined;
    });
    var priceList = array.filter(function (element) {
      return element.price !== undefined;
    });
    priceList.sort(priceComparator);
    if (direction === 'cheap') {
      array = priceList.concat(listUndefined);
    } else {
      priceList.reverse();
      array = priceList.concat(listUndefined);
    }
    return array;
  };

  var sortList = function (array) {
    var sortChecked = filterProduct.querySelector('input[name=sort]:checked');
    if (sortChecked.value === 'popular') {
      var listBySorting = window.filter.byPopular(array);
      history.pushState(null, '3', '?sort=popular');
    } else if (sortChecked.value === 'cheap-first') {
      listBySorting = sortByPrice(array, 'cheap');
    } else {
      listBySorting = sortByPrice(array, 'expensive');
    }
    return listBySorting;
  };

  var filterByPrice = function (array) {
    var list = array.filter(function (element) {
      return element.price <= priceRange.value;
    });

    var listUndefined = array.filter(function (element) {
      return element.price === undefined;
    });
    list = list.concat(listUndefined);
    history.pushState(null, '3', '?price=' + priceRange.value);
    return list;
  };

  var updateListByCategory = function () {
    var list = window.mainArray.slice();
    var listByCategory = filterByCategory(list);
    return listByCategory;
  };

  var onCategoryChange = function () {
    var ListByCategory = updateListByCategory();
    window.filter.setPrice(ListByCategory);
    window.renderSettings(ListByCategory);
  };

  var createMessage = function () {
    var productList = document.querySelector('.products-list');
    productList.textContent = 'Ничего не найдено';
  };

  var updateList = function () {
    var listByCategory = updateListByCategory();
    var listByPrice = filterByPrice(listByCategory);
    var listByAdditionalFilter = listByPrice;
    if (category.value !== 'all') {
      listByAdditionalFilter = window.additionalFilter[category.value](listByPrice);
    }
    var listBySorting = sortList(listByAdditionalFilter);
    window.renderProductList(listBySorting);
    if (listBySorting.length === 0) {
      createMessage();
    }
    return listBySorting;
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    updateList();
    var sortChecked = filterProduct.querySelector('input[name=sort]:checked');
    var historyFilters = '?category=' + category.value + '&price=' + priceRange.value + '&sort=' + sortChecked.value;
    history.replaceState(null, null, historyFilters + window.historyAdditionalFilters);
    window.historyAdditionalFilters = '';
  };

  var onFavoriteClick = function () {
    if (favorite.checked) {
      window.renderProductList(window.filter.byPopular(window.favoriteArray));
      window.formDisabled.change(true);
      history.pushState(null, null, '?favorite');
    } else {
      window.renderProductList(window.mainArray);
      window.formDisabled.change(false);
      filterProduct.reset();
      window.history.replaceState(null, null, '?all');
      window.renderSettings();
    }
  };

  window.filter = {
    setPrice: function (array) {
      window.utils.setMinMaxValue(array, 'price', priceRange, priceMin, priceMax, '500');
    },
    byPopular: function (array) {
      array.sort(raitingComparator);
      return array;
    },
    listenChange: function () {
      category.addEventListener('change', onCategoryChange);
      submitButton.addEventListener('click', onSubmitButtonClick);
      favorite.addEventListener('click', onFavoriteClick);
    },
    removeListenChange: function () {
      category.removeEventListener('change', onCategoryChange);
      submitButton.removeEventListener('click', onSubmitButtonClick);
      favorite.removeEventListener('click', onFavoriteClick);
    }
  };

})();
