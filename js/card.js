'use strict';
(function () {
  var overlay = document.querySelector('.overlay');
  var card = document.querySelector('.details');
  var buttonClose = card.querySelector('.details-close');
  var title = card.querySelector('.details-title');
  var price = card.querySelector('.details-price');
  var address = card.querySelector('.details-address-text');
  var rating = card.querySelector('.details-seller-rating-val');
  var ratingIcon = card.querySelector('.details-seller-rating');
  var description = card.querySelector('.details-description');
  var mainPhoto = card.querySelector('.details-gallery-preview');
  var photos = card.querySelector('.details-gallery-thumbnails');
  var sellerName = card.querySelector('.details-seller-name');
  var map = card.querySelector('.details-address-map');
  var date = card.querySelector('.details-date');

  var GOOD_RATING = 4.8;
  var BAD_RATING = 4;

  var createMapLink = function () {
    var mapLink = document.createElement('a');
    mapLink.classList.add('map-link');
    mapLink.id = 'map';
    mapLink.style.display = 'block';
    mapLink.style.width = '100%';
    mapLink.style.height = '100%';
    mapLink.target = '_blank';
    map.append(mapLink);
  };
  createMapLink();

  var onButtonClick = function () {
    window.card.close();
  };

  var getRatingIcon = function (ratingValue) {
    ratingIcon.classList = 'details-seller-rating';
    if (ratingValue < BAD_RATING) {
      ratingIcon.classList.add('details-seller-rating-bad');
    } else if (ratingValue <= GOOD_RATING) {
      ratingIcon.classList.add('details-seller-rating-average');
    } else {
      ratingIcon.classList.add('details-seller-rating-good');
    }
  };

  window.card = {
    close: function () {
      overlay.style.display = 'none';
      card.style.display = 'none';
      if (window.mainArray !== null) {
        window.history.back();
      }    
      buttonClose.removeEventListener('click', onButtonClick);
      window.filter.listenChange();
    },
    open: function (evt, item) {
      evt.preventDefault();
      window.filter.removeListenChange();
      overlay.style = '';
      card.style = '';
      card.id = item.id;
      title.textContent = item.title;
      history.pushState(null, null, '?id=' + item.id);
      price.textContent = window.utils.getPrice(item.price);
      address.textContent = item.textAddress;
      if (item.country !== window.userCountry) {
        address.textContent = item.country + ', ' + item.textAddress;
      }
      address.textContent = item.textAddress;
      rating.textContent = item.rating;
      getRatingIcon(item.rating);
      sellerName.textContent = item.sellerName;
      description.textContent = 'Описание';
      photos.textContent = '';
      mainPhoto.src = 'https:' + item.pictures[0];
      item.pictures.forEach(function (element, index) {
        if (index !== 0) {
          var photo = document.createElement('img');
          photo.src = 'https:' + element;
          photo.classList.add('details-gallery-item');
          photos.appendChild(photo);
        }
      });
      var mapLink = card.querySelector('.map-link');
      mapLink.textContent = '';
      var googleMapAddress = 'https://www.google.ru/maps/@' + item.address.lat + ',' + item.address.lng + ',15z';
      mapLink.href = googleMapAddress;
      window.getMap(item.address.lat, item.address.lng);
      date.textContent = window.utils.getDate(item.date);
      buttonClose.addEventListener('click', onButtonClick);
    }
  };
})();
