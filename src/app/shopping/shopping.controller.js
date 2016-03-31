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

    vm.products = {};

    productList();

    function emptyCart(){
      ShoppingService.emptyCart();
    }

    function productList(){
      var products = $cookies.getAll();
      $log.debug(products);
      vm.products = products;
      $log.debug(products);
      vm.showChecloutTable = products === {} || !angular.isObject(products) || angular.isUndefined(products)? false : true;
      $log.debug(vm.showChecloutTable);
    }

     // $log.debug("List product", vm.productList);

     vm.addMore=function(id,array){
      array=JSON.parse(array);
      var title=array[1];
      var price=array[3];
      
      addProdCart(id,title,price);
     }

     function addProdCart(id,title,price){
        ProductService.addProduct(id,title,price);
        productList();
     }

     function removeProdCart(id,array){
        array=JSON.parse(array);
        var title=array[1];
        var originalPrice=array[3];
        ShoppingService.removeProduct(id,title,originalPrice);
        productList();
     }

     function removeProd(id){
        $cookies.remove(id);
        productList();
     }

     ProductService.getProducts().success(function(data){
        vm.originalProducts=data;
        
      });
     vm.totalProducts=function(){
      return ShoppingService.getTotal();
     }

     vm.totalPrice=function(){
      var total=0;
      for (var key in $cookies.getAll()){
        var array=JSON.parse($cookies.get(key));
        total+=parseFloat(array[2]);  
      }
      return total;
     }
}

})();



