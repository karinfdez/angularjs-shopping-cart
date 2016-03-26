(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('ShoppingController', ShoppingController);

  /** @ngInject */
  function ShoppingController($log,ProductService,$http) {
    var vm = this;
     vm.productsArray=[];
     vm.total=0;
     vm.totalPrice=0;
     vm.count=0;
   
    ProductService.getProducts().success(function(data){
        var productCart=data;
        $log.debug(productCart);

         $http.get('https://cart-project.herokuapp.com/cart.json').success(function(data){
            var carts=data; 
            // $log.debug("cart",carts);
          
            if (Object.keys(carts).length === 0){
                 vm.message="Your cart is currently empty";
            }
            else {
                for ( var key in carts) {
                  productCart.forEach(function(product){
                    if (product.id===parseInt(key)){
                      vm.totalPrice+=product.price * carts[key]
                      var count=carts[product.id];
                       vm.productsArray.push({id:product.id,title:product.title,image:product.image,price:product.price,amount:count});
                       $log.debug("count",vm.count);
                    }
                   
                  });
                  // console.log("tax",vm.totalTax);
                  vm.total=vm.total+carts[key];
                  $log.debug("array of products",vm.productsArray);
                }
            }
         
        });
      });
    
  }
})();



