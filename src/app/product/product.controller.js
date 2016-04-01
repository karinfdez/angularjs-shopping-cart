(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ProductController', ProductController);

  /** @ngInject */
  function ProductController($log,ProductService,growl,$stateParams) {
    
      // $log.debug("route",$routeParams);
      var vm = this;
      
      vm.getDetails=getDetails();
      

      function getDetails(){
   
      var product=$stateParams;
      ProductService.getProductDetails(product.id).then(
        function(response){
          vm.specificProd = response.data;
         
        }
      ); 
    }
  }
})();