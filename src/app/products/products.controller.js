(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService) {
      var vm = this;
      vm.addProd = addProd;


      ProductService.getProducts().success(function(data){
        vm.products=data;
        
      });

      function addProd(id,title,price){
       
        ProductService.addProduct(id,title,price);
        

      }
        vm.getProductDetails=function(id){
          ProductService.getProductDetails(id).success(function(data){
            vm.theProduct=data;

        });
        }
        
      }
  })();
