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
            }
        }
    }
})();