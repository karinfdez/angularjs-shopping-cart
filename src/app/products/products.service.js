(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .factory('ProductService', ProductService);

  /** @ngInject */
  function ProductService($http, $q,API,$log,$cookies) {
    
   
    return{
        getProducts : function() {
            return $http({
                url: API+'/products.json',
                method: 'GET'
            })
        },
        getProductDetails: function (argument) {
          // console.log(argument);
            var url = '/products/' + argument;
            var defered = $q.defer();

            $http.get(url).then(
              function(response) {
                defered.resolve(response);
              },
              function(error){
                defered.reject(error);
                
              });

            return defered.promise;
        },
        // getCartTotal : function() {
        //     return $http({
        //         url: API + '/cart.json',
        //         method: 'GET'
        //     })
        // },
        addProduct: function(id){
            var quantity=0;

            // If cookie is undefined, create a new one:
            $log.debug("id",id);
            if (!($cookies.get(id))){
                quantity=1;
                $log.debug("entering here");
                $cookies.put(id,quantity);
                $cookies.remove('__utma');
                $cookies.remove('__utmz');
                $cookies.remove('XSRF-TOKEN');
                $cookies.remove('SQLiteManager_currentLangue');
            }else{
              $log.debug("before:", $cookies.get(id));
              quantity=parseInt($cookies.get(id))+1;
              $log.debug("quantity",quantity);
              $cookies.put(id,quantity);
            }
             // productsArray.push({id:id,amount: quantity,title:title});
             // return productsArray;
        },
        // getTotal: function(){
          
        //   $log.debug("cookies",$cookies.getAll());
        //   var total=0;
        //   for ( var key in $cookies.getAll()){
        //     total+=parseInt($cookies.get(key));
        //   }
        //   return total;

        // },
        showProducts: function(){

          var products;
          if ($cookies.getAll()){
             products=$cookies.getAll();
          }else{
            products="Your cart is currently empty";
          }
          return products;
        }

    }
  }
})();
