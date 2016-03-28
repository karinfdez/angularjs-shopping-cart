(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

    /** @ngInject */
    function NavbarController(moment,API,$log,$http,ShoppingService,$scope) {
      var vm = this;
      // Update the total in the navbar cart.
      $scope.getTotal=function(){
       return ShoppingService.getTotal();
      }

      $log.debug("total products", ShoppingService.getTotal());
      vm.relativeDate = moment(vm.creationDate).fromNow();
  }


})();
