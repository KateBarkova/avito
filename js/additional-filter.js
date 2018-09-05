'use strict';
(function () {
  var VIDEO_RESOLUTION_ARRAY = ['HD', 'Full HD', '4K', '5K'];
  var filterProduct = document.querySelector('.products-filter');

  var filterArray = function (array, attribute, type) {
    var field = filterProduct.querySelector('.' + attribute);
    if (type === 'range') {
      array = array.filter(function (element) {
        return Number(element[attribute]) >= field.value;
      });
    } else {
      if (field.value !== 'any') {
        array = array.filter(function (element) {
          return element[attribute].toString() === field.value;
        });
      }
    }
    var historyItem = '&' + attribute + '=' + field.value;
    window.historyAdditionalFilters = window.historyAdditionalFilters + historyItem;
    return array;
  };

  var filterVideoResolution = function (array) {
    var field = filterProduct.querySelector('.video_resolution');
    array = array.filter(function (element) {
      var i = VIDEO_RESOLUTION_ARRAY.indexOf(element.video_resolution);
      return i + 1 >= field.value;
    });
    var historyItem = '&video_resolution' + field.textContent;
    window.historyAdditionalFilters = window.historyAdditionalFilters + historyItem;
    return array;
  };

  window.additionalFilter = {
    auto: function (array) {
      var arrayByAutoType = filterArray(array, 'body_type', 'select');
      var arrayByGearBox = filterArray(arrayByAutoType, 'gearbox', 'select');
      var arrayByYear = filterArray(arrayByGearBox, 'year', 'range');
      return arrayByYear;
    },
    immovable: function (array) {
      var arrayByPropertyType = filterArray(array, 'property_type', 'select');
      var arrayByRooms = filterArray(arrayByPropertyType, 'rooms', 'select');
      var arrayBySquare = filterArray(arrayByRooms, 'square', 'range');
      return arrayBySquare;
    },
    laptops: function (array) {
      var arrayByLaptopType = filterArray(array, 'laptop_type', 'select');
      var arrayByRam = filterArray(arrayByLaptopType, 'ram', 'range');
      var arrayByProcessor = filterArray(arrayByRam, 'processor', 'select');
      var arrayByScreen = filterArray(arrayByProcessor, 'screen', 'range');
      return arrayByScreen;
    },
    cameras: function (array) {
      var arrayByСameraType = filterArray(array, 'camera_type', 'select');
      var arrayByVideoResolution = filterVideoResolution(arrayByСameraType, 'video_resolution', 'select');
      var arrayByMatrixResolution = filterArray(arrayByVideoResolution, 'matrix_resolution', 'range');
      return arrayByMatrixResolution;
    }
  };

})();
