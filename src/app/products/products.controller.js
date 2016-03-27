(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService,$http,API,$cookies) {
      var vm = this;
      vm.addProd = addProd;


      ProductService.getProducts().success(function(data){
        vm.products=data;
        
      });

      function addProd(id,title,image){
        
        $log.debug(ProductService.addProduct(id));
        $log.debug("All products",$cookies.getAll());
        $log.debug("total",ProductService.getTotal());
      }

  }
})();
