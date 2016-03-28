(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .factory('ShoppingService', ShoppingService);

  /** @ngInject */
  function ShoppingService($cookies,$log) {

  	return{
  	 	emptyCart : function() {
  	 		for (var key in $cookies.getAll()){
    			 $cookies.remove(key);
		    }
        $log.debug("cookies removed:",$cookies.getAll());
  	 	},
  	 	getTotal : function(){
  	 		var total=0;
  	 		for (var key in $cookies.getAll()){
  	 			total+=parseInt($cookies.get(key));
  	 		}
  	 		
  	 		return total;
  	 	}
  	}
  }
})();