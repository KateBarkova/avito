'use strict';
(function () {
  var getActiveState = function () {
    window.card.close();
    window.formDisabled.change(true);
    window.formDisabled.changeFavorite(true);
    window.backend.startLoad();
    window.filter.listenChange();
  };
  getActiveState();

  window.startFirstRender = function () {
    window.renderProductList(window.filter.byPopular(window.mainArray));
    window.formDisabled.change(false);
    window.formDisabled.changeFavorite(false);
  };
})();
