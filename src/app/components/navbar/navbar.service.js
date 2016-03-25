(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .factory('ShoppingService', ShoppingService);

  /** @ngInject */
  function ShoppingService($http,API) {
    return{
      getItems : function() {
          return $http({
              url: API+'/cart.json',
              method: 'GET'
          })
      }
    }
  }
})();


 