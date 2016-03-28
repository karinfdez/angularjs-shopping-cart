(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService,$cookies) {
      var vm = this;
      vm.addProd = addProd;
      vm.deactivate=false;


      ProductService.getProducts().success(function(data){
        vm.products=data;
        
      });

      function addProd(id,title,price){
       
        ProductService.addProduct(id,title,price);
        $log.debug("cookies: ",$cookies.getAll());

      }
  }
})();
