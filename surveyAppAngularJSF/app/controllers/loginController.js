//Login Controller

    app.config(function(AuthProvider, AuthInterceptProvider){

      AuthProvider.loginPath('https://progettois.herokuapp.com/api/users/sign_in');

    }).controller('LoginCtrl', function($scope, $http, Auth) {
        var credentials = {
            email: $scope.email,
            password: $scope.password
        };
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        Auth.login(credentials, config).then(function(user) {
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            // Authentication failed...
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
            $location.path('/surveys');
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
            $location.path('/surveys');
        });
    });
