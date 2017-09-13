//riepilogo domanda, bisogna passare per summarySurvey

app.controller('summaryQuestion', function($scope, $http, $location){

      var question_id = sessionStorage.question_id;

      var urlQuestions = 'http://localhost:3000/survey_questions?id='+question_id;
      var urlAnswers = 'http://localhost:3000/survey_answers?survey_question_id='+question_id;


      $http.get(urlQuestions)
            .then(function successCallback(response){

              $scope.question = response.data;
              console.log($scope.question);

            }, function errorCallback(response){

              $scope.question = false
              console.log(response);

            });

      $http.get(urlAnswers)
            .then(function successCallback(response){

              $scope.answers = response.data;

            }, function errorCallback(response){

              $scope.answers = false;

            });

});
