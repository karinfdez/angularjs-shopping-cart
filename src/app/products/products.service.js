(function() {
    'use strict';

    angular
        .module('shoppingCart')
        .factory('ProductService', ProductService);

    /** @ngInject */
    function ProductService($http, $q, API, $log, $cookies) {


        return {
            getProducts: function() {
                return $http({
                    url: API + '/products.json',
                    method: 'GET'
                })
            },
            getProductDetails: function(argument) {
                // console.log(argument);
                var url = '/products/' + argument;
                var defered = $q.defer();

                $http.get(url).then(
                    function(response) {
                        defered.resolve(response);
                    },
                    function(error) {
                        defered.reject(error);

                    });

                return defered.promise;
            },

            addProduct: function(id, title, price) {

                var quantity = 0;
                var totalPrice = 0;
                var productData = [];

                // If cookie is undefined, create a new one:
                if (!($cookies.get(id))) {
                    quantity = 1;
                    totalPrice = price;

                } else {
                    $log.debug("before:", $cookies.getAll());
                    var array = JSON.parse($cookies.get(id));
                    // Position 1 is for quantity.
                    quantity = array[1] + 1;
                    totalPrice = parseFloat(array[3]) + parseFloat(price);

                }

                productData.push(id,quantity, title, totalPrice);

                // Saving for specific id the amount,product title and price
                $cookies.putObject(id, productData);
            },

            showProducts: function() {

                var products;
                if ($cookies.getAll()) {
                    products = $cookies.getAll();
                } else {
                    products = "Your cart is currently empty";
                }
                return products;
            }

        }
    }
})();