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
      // $log.debug(vm.products);
    });

    function addProd(id){
      $log.debug("id",id);
      ProductService.addToCart(id).then(
        function(response){
          vm.cart = response;
          $log.debug("cart",vm.cart);
        },
        function(error){
          $log.debug(error);
        }
      );
    }
  }
})();
