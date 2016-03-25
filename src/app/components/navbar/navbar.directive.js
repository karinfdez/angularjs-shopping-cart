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
    function NavbarController(moment,API,$log,$http,ShoppingService) {
      var vm = this;
      vm.total=0;

      ShoppingService.getItems().success(function(data){
        var items=data;
         $log.debug(items);

          for ( var key in items) {
                 
            vm.total=vm.total+items[key];
            // $log.debug(vm.total);
           }
      })
      vm.relativeDate = moment(vm.creationDate).fromNow();
  }


})();
