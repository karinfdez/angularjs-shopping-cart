/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API', "https://cart-project.herokuapp.com");

})();
