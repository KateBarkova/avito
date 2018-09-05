'use strict';
(function () {
  var AutoSettings = {
    'year': 'Минимальный год выпуска',
    'gearbox': 'Тип коробки передач',
    'body_type': 'Тип кузова'
  };

  var ImmovableSettings = {
    'property_type': 'Тип',
    'square': 'Минимальная площадь',
    'rooms': 'Количество комнат'
  };

  var CamerasSettings = {
    'camera_type': 'Тип',
    'matrix_resolution': 'Минимальное разрешение матрицы',
    'video_resolution': 'Минимальное разрешение видео'
  };

  var LaptopsSettings = {
    'laptop_type': 'Тип',
    'ram': 'Минимальный объем оперативной памяти',
    'screen': 'Минимальная диагональ экрана',
    'processor': 'Тип процессора'
  };

  var Gearbox = {
    'any': 'Любая',
    'automatic': 'Автоматическая',
    'manual': 'Механическая'
  };

  var BodyType = {
    'any': 'Любой',
    'sedan': 'Седан',
    'wagon': 'Универсал',
    'hatchback': 'Хэтчбэк',
    'suv': 'Внедорожник'
  };

  var PropertyType = {
    'any': 'Любой',
    'flat': 'Квартира',
    'apartment': 'Апартаменты',
    'house': 'Дом'
  };

  var Rooms = {
    'any': 'Любой',
    '1': 'Одна комната',
    '2': 'Две комнаты',
    '3': 'Три комнаты'
  };

  var CameraType = {
    'any': 'Любой',
    'slr': 'Зеркальный',
    'digital': 'Цифровой'
  };

  var VideoResolution = {
    1: 'HD',
    2: 'Full HD',
    3: '4K',
    4: '5K'
  };

  var LaptopType = {
    'any': 'Любой',
    'home': 'Домашний',
    'professional': 'Ультрабук',
    'gaming': 'Игровой'
  };

  var Ram = {
    4: '4 ГБ',
    8: '8 ГБ',
    16: '16 ГБ'
  };

  var Processor = {
    'any': 'Любой',
    'i3': 'i3',
    'i5': 'i5',
    'i7': 'i7'
  };

  var Screen = {
    13: '13 дюймов',
    14: '14 дюймов',
    15: '15 дюймов',
    17: '17 дюймов'
  };

  var filterProduct = document.querySelector('.products-filter');
  var category = filterProduct.querySelector('#category');
  var submitButton = filterProduct.querySelector('.products-filter-submit');

  var createSelect = function (type, name, list) {
    var fragment = document.createElement('fieldset');
    fragment.className = 'products-settings products-filter-group';
    var label = document.createElement('label');
    label.textContent = type[name];
    var br = document.createElement('br');
    var select = document.createElement('select');
    select.className = name;

    Object.keys(list).forEach(function (index) {
      var option = document.createElement('option');
      option.value = index;
      option.textContent = list[index];
      select.appendChild(option);
    });
    fragment.appendChild(label);
    fragment.appendChild(br);
    fragment.appendChild(select);
    filterProduct.insertBefore(fragment, submitButton);
  };

  var createRange = function (array, type) {
    var fragment = document.createElement('fieldset');
    fragment.className = 'products-settings products-filter-group';
    var label = document.createElement('label');
    label.textContent = array[type];
    var br = document.createElement('br');
    var spanMin = document.createElement('span');
    var spanMax = document.createElement('span');
    var inputRange = document.createElement('input');
    inputRange.type = 'range';
    inputRange.className = type;
    window.utils.setMinMaxValue(window.mainArray, type, inputRange, spanMin, spanMax, '1');

    fragment.appendChild(label);
    fragment.appendChild(br);
    fragment.appendChild(spanMin);
    fragment.appendChild(inputRange);
    fragment.appendChild(spanMax);
    filterProduct.insertBefore(fragment, submitButton);
  };

  var renderSettings = {
    auto: function () {
      createSelect(AutoSettings, 'body_type', BodyType);
      createSelect(AutoSettings, 'gearbox', Gearbox);
      createRange(AutoSettings, 'year');
    },
    laptops: function () {
      createSelect(LaptopsSettings, 'laptop_type', LaptopType);
      createSelect(LaptopsSettings, 'ram', Ram);
      createSelect(LaptopsSettings, 'processor', Processor);
      createSelect(LaptopsSettings, 'screen', Screen);
    },
    cameras: function () {
      createSelect(CamerasSettings, 'camera_type', CameraType);
      createSelect(CamerasSettings, 'video_resolution', VideoResolution);
      createRange(CamerasSettings, 'matrix_resolution');
    },
    immovable: function () {
      createSelect(ImmovableSettings, 'property_type', PropertyType);
      createSelect(ImmovableSettings, 'rooms', Rooms);
      createRange(ImmovableSettings, 'square');
    }
  };

  window.renderSettings = function () {
    var oldSettings = document.querySelectorAll('.products-settings');
    if (oldSettings) {
      oldSettings.forEach(function (element) {
        element.remove();
      });
    }
    var valueCategory = category.value;
    if (category.value !== 'all') {
      renderSettings[valueCategory]();
    }
  };

})();
