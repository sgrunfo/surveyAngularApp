//controller logout
app.controller('LogoutCtrl', function($scope, $location){
    $scope.submit = function(){

      sessionStorage.removeItem('loggedIn');
      $location.path('/');
  }
});
