(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService) {
    
      // $log.debug("route",$routeParams);
      var vm = this;
      vm.addProd = addProd;
      

      ProductService.getProducts().success(function(data){
        vm.products=data;
        
      });

      function addProd(id,title,price){
       
        ProductService.addProduct(id,title,price);

      }

    // var product = $routeParams;
    // $log.debug("product",product);
    getDetails();
    function getDetails(){
      // $log.debug("params",$routeParams)
      
      ProductService.getProductDetails(4).then(
        function(response){
          vm.specificProd = response.data;
        },
        function(error){
          $log.debug(error);
        }
      ); 
    }
    
       
    }
  })();
