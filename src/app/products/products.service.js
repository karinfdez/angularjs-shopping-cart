(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .factory('ProductService', ProductService);

  /** @ngInject */
  function ProductService($http, $q,API) {
    return{
      getProducts : function() {
          return $http({
              url: API+'/products.json',
              method: 'GET'
          })
      },
      getProductDetails: function (argument) {
        // console.log(argument);
          var url = '/products/' + argument;
          var defered = $q.defer();

          $http.get(url).then(
            function(response) {
              defered.resolve(response);
            },
            function(error){
              defered.reject(error);
              
            });

          return defered.promise;
      },
      getCartTotal : function() {
          return $http({
              url: '/cart.json',
              method: 'GET'
          })
      },
      addToCart: function(id){
        var url = API + '/cart/' + id + '/add';
        var defered = $q.defer();

        $http.get(url).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
            
          });

        return defered.promise;
      }
    }
  }
})();
