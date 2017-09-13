//controller Account
app.controller('accountCtrl', function($scope, $http){

  $('.modal').modal();

  var currentUserJson = JSON.parse(sessionStorage.getItem('currentUser'));

  $scope.id = currentUserJson.id;
  $scope.email = currentUserJson.email;
  $scope.role = currentUserJson.role;

  $scope.changePass = function(){

    $http.get('http://localhost:3000/authenticate')
    .then(function successCallback(response){

      var auth = response.data[0].authenticate;

      if(auth == true){

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/users/'+$scope.id,
            data: {
              email: $scope.email,
              password: $scope.newPassword,
              role: $scope.role
            }
          }).then(function successCallback(response) {

            $('#modal1').modal('close');
            return true;

            }, function errorCallback(response) {

              $('#modal1').modal('close');
              return false;

            });


      } else {

        $('#modal1').modal('close');
        return false;
      }
    }, function errorCallback(response){

        $('#modal1').modal('close');
        return false;
    });


  }

});
