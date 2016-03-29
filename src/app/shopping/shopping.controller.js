(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ShoppingController', ShoppingController)

    // This filter let me convert string to array the variables in the view
    .filter('toArray',function(){
      return function(text){
        return JSON.parse(text);
      }
    })

  /** @ngInject */
  function ShoppingController($log,ShoppingService,$cookies,$scope,ProductService) {
    var vm = this;
    vm.emptyCart=emptyCart;
    vm.addProdCart=addProdCart;
    vm.removeProdCart=removeProdCart;
    vm.removeProd=removeProd;

    function emptyCart(){
      ShoppingService.emptyCart();
    
    }
    

     vm.productList=function(){
      return $cookies.getAll();
     }
     


     $log.debug("List product", vm.productList);


     function addProdCart(id,title,price){
        ProductService.addProduct(id,title,price);
     }

     function removeProdCart(id,title,price){
        ShoppingService.removeProduct(id,title,price);
     }

     function removeProd(id){
      
        $cookies.remove(id);
     }

    $log.debug("How is the cookie now:", $cookies.getAll());
}

})();



