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
        getCartTotal : function() {
            return $http({
                url: API + '/cart.json',
                method: 'GET'
            })
        },
        addProduct: function(id,title,image){
            var quantity=0;
      
            // If cookie is undefined, create a new one:
            if (!($cookies.get(id))){
                quantity=1;
                $cookies.put(id,quantity,[title,image]);
            }else{
              quantity=parseInt($cookies.get(id))+1;
              $cookies.put(id,quantity);
            }
            // return $cookies.getObject(title);
            return {id: id,amount: $cookies.getObject(id),title: title,image: image};
           
        },
        getTotal: function(){
          $cookies.remove('__utma');
          $cookies.remove('__utmz');
          $cookies.remove('XSRF-TOKEN');
          $log.debug("cookies",$cookies.getAll());
          var total=0;
          for ( var key in $cookies.getAll()){
            total+=parseInt($cookies.get(key));
          }
          return total;

        }

    }
  }
})();
