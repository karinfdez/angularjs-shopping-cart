(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService,$cookies) {
      var vm = this;
      vm.addProd = addProd;


      ProductService.getProducts().success(function(data){
        vm.products=data;
        
      });

      function addProd(id){
       
        ProductService.addProduct(id);
        $log.debug("cookies: ",$cookies.getAll());
        
      }

  }
})();
