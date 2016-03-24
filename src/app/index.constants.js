/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    // Add the constant API to do request to my heroku app.
    .constant('API', "https://cart-project.herokuapp.com");

})();
