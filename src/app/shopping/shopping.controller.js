(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ShoppingController', ShoppingController);

  /** @ngInject */
  function ShoppingController($log,ShoppingService,$http,$cookies) {
    var vm = this;
    vm.emptyCart=emptyCart;

    // $scope.getCart=getCart;

    function emptyCart(){
      ShoppingService.emptyCart();
    }

    // function getCart(){
    //   return $cookies.getAll();
    // }

    $log.debug("How is the cookie now:", $cookies.getAll());

    vm.productList=ShoppingService.cartProducts();
    $log.debug("products",vm.productList);
    
  }
})();



