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
        
        addProduct: function(id,title,price){
            $log.debug("title",title);
            $log.debug("price",price);
            var quantity=0;
            var productData=[];

            // If cookie is undefined, create a new one:
            $log.debug("id",id);
            if (!($cookies.get(id))){
                quantity=1;
                
            }else{
              $log.debug("before:", $cookies.getAll());
              var array = JSON.parse($cookies.get(id));
              quantity=array[0]+1;
              $log.debug("This quantity",quantity);
             
            }
           
            productData.push(quantity);
            productData.push(title);
            productData.push(price);
            $log.debug("array data: ",productData);
            // Saving for specific id the amount and product title
             $cookies.putObject(id,productData);
            },
      
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
