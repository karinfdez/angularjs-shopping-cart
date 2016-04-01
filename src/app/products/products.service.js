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

                var url = API + '/products/' + argument;
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
                var originalPrice = price;
                var array = [];
                // If id exist, evaluates to false,otherwise create a new one

                if (!($cookies.get(id))) {
                    quantity = 1;
                    totalPrice = price;
                } else {
                    array = this.convertToJson($cookies.get(id));
                    // Position 0 is for quantity.
                    quantity = parseInt(array[0]) + 1;
                    totalPrice = parseFloat(array[2]) + parseFloat(originalPrice);
                }
                productData.push(quantity, title, totalPrice, originalPrice);
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
            },
            convertToJson: function(text) {
                return angular.fromJson(text);
            }

        }
    }
})();