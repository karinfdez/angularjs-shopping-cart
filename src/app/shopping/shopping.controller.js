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

     // $log.debug("List product", vm.productList);

     vm.addMore=function(id,array){
      array=JSON.parse(array);
      var title=array[1];
      var price=array[3];
      
      addProdCart(id,title,price);
     }

     function addProdCart(id,title,price){
        ProductService.addProduct(id,title,price);
     }

     function removeProdCart(id,array){
        array=JSON.parse(array);
        var title=array[1];
        var originalPrice=array[3];
        ShoppingService.removeProduct(id,title,originalPrice);
     }

     function removeProd(id){
      
        $cookies.remove(id);
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



