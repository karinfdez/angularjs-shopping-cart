(function() {
    'use strict';

    angular
        .module('shoppingCart')
        .config(routerConfig);


    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, growlProvider) {
        // Set Globaly a timeout of 5 seconds for each message from growl
        growlProvider.globalTimeToLive(5000);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'app/products/products.html',
                controller: 'ProductsController',
                controllerAs: 'prod'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/contact.html',
                controller: 'MessageController',
                controllerAs: 'contact'
            })
            .state('shopping', {
                url: '/shopping',
                templateUrl: 'app/shopping/shopping.html',
                controller: 'ShoppingController',
                controllerAs: 'shop'
            })
            .state('product', {
                url: '/products/:id',
                templateUrl: 'app/product/product.html',
                controller: 'ProductController',
                controllerAs: 'product'
            });

        $urlRouterProvider.otherwise('/');
    }

})();