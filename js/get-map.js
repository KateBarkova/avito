'use strict';
(function () {
  var getGeolocation = function () {
    var geolocation = ymaps.geolocation;
    geolocation.get({
      provider: 'browser',
    }).then(
        function (result) {
          var userAddress = result.geoObjects.get(0).properties.get('text');
          window.userCountry = userAddress.split(',')[0];
        });
  };

  ymaps.ready(getGeolocation);

  window.getMap = function (lat, lng) {
    var getYandexMap = function () {
      var myMap = new ymaps.Map('map', {
        center: [lat, lng],
        zoom: 10
      });
      myMap.controls.remove('zoomControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('rulerControl');
      var myPlacemark = new ymaps.Placemark([lat, lng]);
      myMap.geoObjects.add(myPlacemark);
    };
    ymaps.ready(getYandexMap);
  };
})();
