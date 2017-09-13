//riepilogo sondaggio, bisogna passare per sondaggi

app.controller('riepilogoSondaggio', function($scope, $http, $location){

      var sondaggio_id = sessionStorage.sondaggio_id;

      var urlSurvey = 'http://localhost:3000/surveys?id='+sondaggio_id;
      var urlQuestions = 'http://localhost:3000/survey_questions?survey_id='+sondaggio_id;


      $http.get(urlSurvey)
            .then(function successCallback(response){

              $scope.sondaggio = response.data;

            }, function errorCallback(response){

              $scope.sondaggio = false;

            });


      $http.get(urlQuestions)
            .then(function successCallback(response){

              $scope.questions = response.data;

            }, function errorCallback(response){

              $scope.questions = false;

            });

      $scope.goQuestion = function( question_id ){

        sessionStorage.question_id = question_id;
        $location.path('/summary-question');
      }

});
