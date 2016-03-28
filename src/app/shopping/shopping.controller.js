(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ShoppingController', ShoppingController);

  /** @ngInject */
  function ShoppingController($log,ShoppingService,$cookies,$scope,ProductService) {
    var vm = this;
    vm.emptyCart=emptyCart;
    vm.addProdCart=addProdCart;
    vm.removeProdCart=removeProdCart;

    function emptyCart(){
      ShoppingService.emptyCart();
    
    }
    
     vm.productList=ShoppingService.cartProducts();

     function addProdCart(id,title,price){
        ProductService.addProduct(id,title,price);
     }

     function removeProdCart(id,title,price){
        ShoppingService.removeProduct(id,title,price);
     }

    $log.debug("How is the cookie now:", $cookies.getAll());


    
  }
})();



