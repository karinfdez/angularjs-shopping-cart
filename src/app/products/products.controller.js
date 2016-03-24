(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService) {
    var vm = this;

    vm.addProd = addProd;


    // $log.debug(vm.product);

    ProductService.getProducts().success(function(data){
      vm.products=data;
      $log.debug(vm.products);
    });

    function addProd(id){
      ProductService.addToCart(id).then(
        function(response){
          vm.cart = response.data;
          // $log.debug(data);
        },
        function(error){
          $log.debug(error);
        }
      );
    }
  }
})();
