//Login Controller

    app.config(function(AuthProvider, AuthInterceptProvider){

      AuthProvider.registerPath('https://progettois.herokuapp.com/api/users');

    }).controller('RegisterCtrl', function($scope, $http, Auth) {

        var credentials = {
          name: $scope.name,
          lastname: $scope.lastname,
          email: $scope.email,
          password: $scope.password
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.register(credentials, config).then(function(registeredUser) {
            console.log(registeredUser); // => {id: 1, ect: '...'}
        }, function(error) {
            // Registration failed...
        });

        $scope.$on('devise:new-registration', function(event, user) {
              $location.path('/surveys');
        });
    });
