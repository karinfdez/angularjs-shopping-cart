(function() {
    'use strict';

    angular
        .module('shoppingCart')
        .factory('ShoppingService', ShoppingService);

    /** @ngInject */
    function ShoppingService($cookies,ProductService,$log) {

        return {
            emptyCart: function() {
                for (var key in $cookies.getAll()) {
                    $cookies.remove(key);

                }
                // $log.debug("cookies removed:", $cookies.getAll());
            },
            getTotal: function() {
                var total = 0;
                // $log.debug("the cookies", $cookies.getAll());

                for (var key in $cookies.getAll()) {
                    // To convert from string to array
                    var productInfo = ProductService.convertToJson($cookies.get(key));
                    // $log.debug("product info:", productInfo);
                    // Position 0 is the amount and position 1 is the title
                    total += parseInt(productInfo[0]);
                }

                return total;
            },
            cartProducts: function() {
                var productList = [];

                if ($cookies.getAll()) {
                    for (var key in $cookies.getAll()) {
                        productList.push(ProductService.convertToJson($cookies.get(key)));
                    }
                } else {
                    productList = [];
                }
                return productList;
            },
           removeProduct : function(id,title,price){
            // $log.debug("price",price);
                var quantity = 0;
                var totalPrice = 0;
                var productData = [];
               
                // $log.debug("The array",array);
                if ($cookies.get(id)){
                  var array=ProductService.convertToJson($cookies.get(id));
                  if( array[0]>1){
                    quantity=parseInt(array[0])-1;
                    totalPrice= parseFloat(array[2])-parseFloat(price);
                    productData.push(quantity, title, totalPrice,price);
                    $cookies.putObject(id, productData);
                  }else{
                     $cookies.remove(id);
                }
                 
            }
        }
    }
  }
})();