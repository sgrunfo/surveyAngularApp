//controller sondaggi
app.controller('mostraSondaggi', function($scope, $http, $location){

  var currentUserJson = JSON.parse(sessionStorage.getItem('currentUser'));//per avere i sondaggi dell current user

  $http.get('http://localhost:3000/surveys')
        .then(function successCallback(response){

          $scope.mostraSondaggi = response.data;
        }, function errorCallback(response){

          $scope.mostraSondaggi = false;
        });

    $scope.goSondaggio = function(id){
      sessionStorage.sondaggio_id = id;
      $location.path('/summary-survey');
    }

    $scope.deleteSurvey = function(id){

      $http({
        method: 'DELETE',
        url: 'http://localhost:3000/surveys/'+id

      }).then(function successCallback(response) {

        $http.get('http://localhost:3000/surveys')
              .then(function successCallback(response){

                $scope.mostraSondaggi = response.data;

              }, function errorCallback(response){

                $scope.mostraSondaggi = false;

              });

        }, function errorCallback(response) {

          return false;

        });

    }


});
