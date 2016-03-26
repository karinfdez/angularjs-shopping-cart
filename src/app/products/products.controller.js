(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService,$http,API) {
    var vm = this;

    vm.addProd = addProd;


    // $log.debug(vm.product);

    ProductService.getProducts().success(function(data){
      vm.products=data;
      
    });

    function addProd(id){
      
      $log.debug(ProductService.addProduct(id));
      
    }

  }
})();
