(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('MessageController', MessageController);

  /** @ngInject */
  function MessageController($log,API,$http,$timeout) {
    var vm = this;
    vm.sendMessage = sendMessage;
    vm.showMessage = false;
    vm.showSign=false;
    vm.message={};

    function sendMessage(){
      vm.sendingMessage="Sending Message..."
      vm.showSign=true;
      var data={message: {name: vm.message.name, email: vm.message.email,content: vm.message.content}};
      // $log.debug(data);
       $http.post(API+'/contact',data).success(function(){
          vm.showSign=false;
          // To leave inputs field in blank
          // $timeout(function () { vm.showSign= false }, 3000); 
        
          vm.message={};
          vm.sentMessage="Thanks, your message have been sent to Karin Fernandez.";
          vm.showMessage=true;
          $timeout(function () { vm.showMessage= false }, 6000);  
          
       })
       .error(function(error){
          $log.debug(error);
       })
    }
  }
})();



     