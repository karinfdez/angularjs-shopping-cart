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
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;
  }

    /** @ngInject */
    function NavbarController(moment,API,$log,$http,ShoppingService) {
      var vm = this;

      // navbar collapse, default value

      vm.isCollapsed = false;
      vm.toggleNavbar = toggleNavbar;


      // Update the total in the navbar cart.
      vm.getTotal=function(){
       return ShoppingService.getTotal();
      }

      function toggleNavbar(){
        vm.isCollapsed = !vm.isCollapsed;
        $log.debug(vm.isCollapsed);
      }

      // $log.debug("total products", ShoppingService.getTotal());
      // vm.relativeDate = moment(vm.creationDate).fromNow();
  }


})();
