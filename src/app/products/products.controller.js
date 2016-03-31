(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController($log,ProductService,growl) {
    
      // $log.debug("route",$routeParams);
      var vm = this;
      vm.addProd = addProd;
      vm.show=false;

      ProductService.getProducts().success(function(data){
        // $log.debug(data);
        vm.products=data;
        
      });

      function addProd(product){
       
        ProductService.addProduct(product.id,product.title,product.price);
        // Show sucess message using the angular-growl library.Close message after 2 seconds:
         growl.addSuccessMessage("Poduct added to cart", {ttl: 2000});
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
