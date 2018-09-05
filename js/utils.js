'use strict';
(function () {
  var PRICE_STEP = 500;
  var START_DATE = new Date(2017, 5, 1);
  var PERIOD = 7;
  var nowDate = new Date();
  var nowYear = nowDate.getFullYear();
  moment.locale('ru');

  var getMaxOfArray = function (numArray) {
    return Math.max.apply(null, numArray);
  };

  var getMinOfArray = function (numArray) {
    return Math.min.apply(null, numArray);
  };

  var getMinMaxElements = function (array, name) {
    var list = array.map(function (element) {
      return element[name];
    });
    list = list.filter(function (element) {
      return (element !== undefined);
    });
    return {
      min: getMinOfArray(list),
      max: getMaxOfArray(list)
    };
  };

  window.utils = {
    getPrice: function (element) {
      if (element) {
        var str = element.toString();
        var separator = String.fromCharCode(8201);
        str = str.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + separator);
      }
      return str;
    },
    setMinMaxValue: function (array, name, input, spanMin, spanMax, step) {
      var value = getMinMaxElements(array, name);
      input.min = value.min;
      input.max = value.max;
      input.value = value.min;
      input.step = step;
      spanMin.textContent = value.min;
      spanMax.textContent = value.max;
      if (name === 'price') {
        input.min = value.min - value.min % PRICE_STEP;
        input.max = value.max + PRICE_STEP - value.max % PRICE_STEP;
        input.value = value.max + PRICE_STEP - value.max % PRICE_STEP;
        spanMin.textContent = window.utils.getPrice(value.min - value.min % PRICE_STEP);
        spanMax.textContent = window.utils.getPrice(value.max + PRICE_STEP - value.max % PRICE_STEP);
      }
    },
    getRandomDate: function () {
      var from = START_DATE.getTime();
      var to = nowDate.getTime();
      return new Date(from + Math.random() * (to - from));
    },
    getDate: function (date) {
      date = new Date(date);
      var year = date.getFullYear();
      var daysLag = Math.ceil(Math.abs(nowDate.getTime() - date.getTime()) / (1000 * 3600 * 24));
      var dateString = moment(date).format('LL');
      if (daysLag <= PERIOD) {
        dateString = moment(date).fromNow();
      } else if (nowYear === year) {
        dateString = moment(date).format('D MMMM');
      }
      return dateString;
    }
  };

})();
