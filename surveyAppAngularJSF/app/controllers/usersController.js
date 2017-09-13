//controller Mostra Users
app.controller('mostraUsers', function($scope, $http, $location){


  $(document).ready(function() { $('select').material_select(); }); // inizilizzazione select

  $http.get('http://localhost:3000/users')
        .then(function successCallback(response){

          $scope.mostraUsers = response.data;

        }, function errorCallback(response){

          $scope.mostraUsers = false;

        });

    $scope.deleteUser = function(user_id){

      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/users/'+user_id

      }).then(function successCallback(response) {

        $http.get('http://localhost:3000/users')
              .then(function successCallback(response){

                $scope.mostraUsers = response.data;

              }, function errorCallback(response){

                $scope.mostraUsers = false;

              });

        }, function errorCallback(response) {

          return false;

        });

    }

    $scope.creaUser = function(){

      console.log($scope);

      $http({
          method: 'POST',
          url: 'http://localhost:3000/users',
          data: {
            email: $scope.email,
            password: $scope.password,
            role: $scope.role
          }
        }).then(function successCallback(response) {

          $scope.email = "";
          $scope.password = "";
          $scope.role = "";

          $http.get('http://localhost:3000/users')
                .then(function successCallback(response){

                  $scope.mostraUsers = response.data;

                }, function errorCallback(response){

                  $scope.mostraUsers = false;

                });

          }, function errorCallback(response) {

            return false;

          });

    }


});
