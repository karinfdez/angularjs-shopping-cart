(function() {
  'use strict';

  angular
    .module('shoppingCart')
    .controller('MessageController', MessageController);

  /** @ngInject */
  function MessageController($log,API,$http) {
    var vm = this;
    vm.sendMessage = sendMessage;
    vm.message={};

    function sendMessage(){
      
      var data={message: {name: vm.message.name, email: vm.message.email,content: vm.message.content}};
      $log.debug(data);
       $http.post(API+'/contact',data).success(function(){
          // alert("Message sent");
       })
       .error(function(error){
          $log.debug(error);
       })
    }
  }
})();



     



//       var data={message: {name: $scope.message.name, email: $scope.message.email,content: $scope.message.content}};
//       // console.log(data);
//      $http.post("https://cart-project.herokuapp.com/contact",data).success(function(data){
//         $scope.message = angular.copy(resetMessage);
//         alert("Message sent");
//      })
//      .error(function(error){
//       console.log("Couldn't send message");
//      })
//     }
// }])