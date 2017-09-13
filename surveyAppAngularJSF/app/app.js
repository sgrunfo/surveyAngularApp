var app = angular.module('surveyApp', ['ngRoute', 'Devise']);


app.config(function($routeProvider){

  $routeProvider
  .when('/', {
    resolve: {
      "check": function($location) {
        if(sessionStorage.getItem('loggedIn')){
          $location.path('/surveys');
          }
        }
    },
    templateUrl: 'views/loginView.html'
  })
  .when('/register', {
    templateUrl: 'views/registerView.html'
  })
  .when('/surveys', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn')){
          $location.path('/');
        }
      }
    },
    templateUrl: 'views/surveysView.html'

  })
  .when('/account', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn')){
          $location.path('/');
        }
      }
    },
    templateUrl: 'views/accountView.html'

  })
  .when('/new-survey', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn')){
          $location.path('/');
        }
      }
    },
    templateUrl: 'views/newSurveyView.html'

  })
  .when('/users', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('role') != "admin" ){
          $location.path('/surveys');
        }
      }
    },
    templateUrl: 'views/usersView.html'

  })
  .when('/summary-survey', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('role') != "admin" ){
          $location.path('/surveys');
        }
      }
    },
    templateUrl: 'views/summarySurveyView.html'

  })
  .when('/summary-question', {

    resolve: {
      "check": function($location) {
        if(!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('role') != "admin" ){
          $location.path('/surveys');
        }
      }
    },
    templateUrl: 'views/summaryQuestionView.html'

  })
  .otherwise({
       redirectTo: '/surveys'
   });
});
