(function() {
    'use strict';

    angular
        .module('shoppingCart')
        .controller('ProductController', ProductController);

    /** @ngInject */
    function ProductController($log, ProductService, growl, $stateParams) {

        // $log.debug("route",$routeParams);
        var vm = this;

        vm.getDetails = getDetails();
        vm.addTheProd = addTheProd;


        function getDetails() {

            var product = $stateParams;
            ProductService.getProductDetails(product.id).then(
                function(response) {
                    vm.specificProd = response.data;

                }
            );
        }

        function addTheProd(product) {
            $log.debug(product);
            ProductService.addProduct(product.id, product.title,product.price);
            // Show sucess message using the angular-growl library.Close message after 2 seconds:
            growl.addSuccessMessage("Poduct added to cart", {
                ttl: 2000
            });
        }
    }
})();