(function() {
    'use strict';

    angular
        .module('shoppingCart')
        .factory('ShoppingService', ShoppingService);

    /** @ngInject */
    function ShoppingService($cookies, $log) {

        return {
            emptyCart: function() {
                for (var key in $cookies.getAll()) {
                    $cookies.remove(key);
                }
                $log.debug("cookies removed:", $cookies.getAll());
            },
            getTotal: function() {
                var total = 0;
                $log.debug("the cookies", $cookies.getAll());

                for (var key in $cookies.getAll()) {
                    // To convert from string to array
                    var productInfo = JSON.parse($cookies.get(key));
                    $log.debug("product info:", productInfo);
                    // Position 0 is the amount and position 1 is the title
                    total += parseInt(productInfo[0]);
                }

                return total;
            },
            cartProducts: function() {
                var productList = [];

                if ($cookies.getAll()) {
                    for (var key in $cookies.getAll()) {
                        productList.push(JSON.parse($cookies.get(key)));
                    }
                } else {
                    productList = [];
                }
                return productList;
            },
           removeProduct : function(id,title,price){
            $log.debug("price",price);
                var quantity = 0;
                var totalPrice = 0;
                var productData = [];
                var array=JSON.parse($cookies.get(id));
                $log.debug("amount",array[0]);
                $log.debug("title",array[1]);
                $log.debug("price",array[2]);
                // if amount is greater than 0
                if (array[0]>1){
                  quantity=array[0]-1;
                  totalPrice= parseFloat(array[2])-parseFloat(price);
                  productData.push(quantity, title, totalPrice,price);
                  $cookies.putObject(id, productData);
                  
                }else{
                     $cookies.remove(id);
                }
                 
            }
        }
    }
})();