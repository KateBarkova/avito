'use strict';
(function () {
  var DATA_URL = 'https://geocode-maps.yandex.ru/1.x/?format=json&callback=callback&geocode=';
  var LENGTH_OF_ARRAY = 100;
  var addressArray = [];

  var onLoadError = function () {
    window.backend.onError('Не удалоь загрузить адреса');
  };

  window.callback = function (data) {
    var adressObject = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData;
    window.country = adressObject.Address.Components[0].name;
    window.address = adressObject.Address.formatted;
    window.house = adressObject.kind;
  };

  var loadAddress = function (URL, id) {
    var loader = document.createElement('script');
    loader.src = URL;
    loader.classList.add('yandex');
    loader.addEventListener('load', function () {
      loader.remove();
      var item = {
        address: window.address,
        country: window.country,
        id: id
      };
      if (window.house === 'house') {
        var shortAddress = item.address.split(',');
        shortAddress.pop();
        shortAddress = shortAddress.join();
        item.shortAddress = shortAddress;
      }
      addressArray.push(item);
      if (addressArray.length === LENGTH_OF_ARRAY) {
        window.mainArray.forEach(function (product) {
          addressArray.forEach(function (element) {
            if (product.id === element.id) {
              product.textAddress = element.address;
              product.country = element.country;
              if (element.shortAddress) {
                product.shortAddress = element.shortAddress;
              }
            }
          });
        });
        window.startFirstRender();
      }
    });
    loader.addEventListener('error', onLoadError);
    document.body.append(loader);
  };

  window.getAddress = function (array) {
    array.forEach(function (element) {
      var lat = element.address.lat;
      var lng = element.address.lng;
      var id = element.id;
      var URL = DATA_URL + lng + ',' + lat;
      loadAddress(URL, id);
    });
  };
})();
