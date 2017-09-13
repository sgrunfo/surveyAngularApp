//controller New Survey
app.controller('newSurveyCtrl', function($scope, $http, $compile, $location){

  $(document).ready(function() { $('select').material_select(); }); // inizilizzazione select

  var titleSurvey = $scope.surveyTitle;//da usare nel submit!

  var currentUserJson = JSON.parse(sessionStorage.getItem('currentUser'));

  var questionSurvey = angular.element(document.querySelector('#questionSurvey'));


  var n_question = 0;
  var n_question_o = 0;

  var n_option = 0;

  $scope.addQuestion = function(){//aggiunge una Domanda aperta

    n_question++;

    var question = '<div id=\"s_question_a_'+n_question+'\" class="col s12 question question_open"><div class=\"input-field col s12\"><input id=\"s_question_title_'+n_question+'\" type=\"text\" class=\"validate\" ng-model=\"newSurvey.questions.s_question_'+n_question+'.title\"><label for=\"s_question_title_'+n_question+'\">Question Title</label></div><div class=\"input-field col s12\"><input id=\"s_question_'+n_question+'\" type=\"text\" class=\"validate\"ng-model=\"newSurvey.questions.s_question_'+n_question+'.data.domanda\"><label for=\"s_question_'+n_question+'\">Testo Domanda</label></div></div>';

    questionSurvey.append(question);
    $compile(questionSurvey.contents())($scope);
  }

  $scope.addQuestionOption = function(){//aggiunge una domanda con opzioni (una opzione di default)


    n_question_o++;
    n_option = 0;
    n_option++;

    var question_option = '<div id="s_question_o_'+n_question_o+'" class="col s12 question question_option"><div class=\"input-field col s12\"><input id=\"s_question_o_title_'+n_question_o+'\" type=\"text\" class=\"validate\" ng-model=\"newSurvey.questions.s_question_o_'+n_question_o+'.title\"><label for=\"s_question_o_title_'+n_question_o+'\">Question Title</label></div><div class=\"input-field col s11\"><input id=\"s_question_o_'+n_question_o+'\" type=\"text\" class=\"validate\" ng-model=\"newSurvey.questions.s_question_o_'+n_question_o+'.data.domanda\"><label for=\"s_question_o_'+n_question_o+'\">Question</label></div><div class="col s1"><a class="btn-floating btn-medium waves-effect waves-light green" is-clickable="true" ng-click="addOption($event)"><i class="material-icons">add</i></a></div></div>';

    questionSurvey.append(question_option);
    var question_option_el = angular.element(document.querySelector('#s_question_o_'+n_question_o));

    var option = '<div class=\"input-field col s3\"><input id=\"s_option_'+n_question_o+'_'+n_option+'\" type=\"text\" class=\"validate\" ng-model=\"newSurvey.questions.s_question_o_'+n_question_o+'.data.opzioni['+n_option+']\"><label for=\"s_option_'+n_question_o+'_'+n_option+'\">Opzione '+n_option+'</label></div>';

    question_option_el.append(option);
    option = "";
    $compile(question_option_el.contents())($scope);//serve a compilare il contenuto html (altrimenti non funziona il javascript di angular)

  }

  $scope.addOption = function(el){//aggunge una opzione al blocco domanda con opzione dove è chiamata



    n_option++;
    var s_question_el_id = el.target.parentNode.parentNode.parentNode.id; //per id .id
    var s_question_el_id_number = s_question_el_id.substring(13);
    var s_question_el = angular.element(document.querySelector('#'+s_question_el_id));

    var option = '<div class=\"input-field col s3\"><input id=\"s_option_'+s_question_el_id_number+'_'+n_option+'\" type=\"text\" class=\"validate\" ng-model=\"newSurvey.questions.s_question_o_'+s_question_el_id_number+'.data.opzioni['+n_option+']\"><label for=\"s_option_'+s_question_el_id_number+'_'+n_option+'\">Opzione '+n_option+'</label></div>';
    /*start-compile*/
    var template = angular.element(option);
    var linkFn = $compile(template);
    var element_option = linkFn($scope);
    /*end-compile*/
    s_question_el.append(element_option);

  }

  $scope.saveSurvey = function(){//salva il sondaggio...

    //console.log($scope);
    //console.log(currentUserJson);

    var survey = {
      "user_id" : currentUserJson.id,
      "title" : $scope.newSurvey.title,
      "topic_id" : 1,
      "status" : "on",
      "max-users" : 1000
    };



    //POST SURVEY
    $http({
        method: 'POST',
        url: 'http://localhost:3000/surveys',
        data: survey

      }).then(function successCallback(response) {



        Object.keys($scope.newSurvey.questions).forEach( function(question){

          //console.log($scope.newSurvey.questions[question].data.opzioni);

          if( $scope.newSurvey.questions[question].data.opzioni != undefined ){

            var domanda = {
              "survey_id" : 7, // l'id va preso dopo inserimento del survey, come ultimo id inserito
              "title" : "titolo domanda",
              "order" : "bho",
              "type" : "risposta_multipla",
              "data" : {
                "domanda" : $scope.newSurvey.questions[question].data.domanda,
                "opzioni" : []
              }
            };
          } else {

            var domanda = {
              "survey_id" : 7, // l'id va preso dopo inserimento del survey, come ultimo id inserito
              "title" : "titolo domanda",
              "order" : "bho",
              "type" : "aperta",
              "data" : {
                "domanda" : $scope.newSurvey.questions[question].data.domanda
              }
            };

          }

          if(domanda.data.opzioni != undefined){
              var array_options = [];

              Object.keys($scope.newSurvey.questions[question].data.opzioni).forEach( function(option){
                array_options.push($scope.newSurvey.questions[question].data.opzioni[option]);
              });

              domanda.data.opzioni = array_options;

          }

          //console.log(domanda);
          //POST DOMANDA !!!

          //POST SURVEY
          $http({
              method: 'POST',
              url: 'http://localhost:3000/survey_questions',
              data: domanda
            }).then(function successCallback(response) {

                domanda = {};
                $location.path('/surveys');

              }, function errorCallback(response) {

                return false;

              });

        }); // object loop



        }, function errorCallback(response) {

          return false;

        });


  }//save survey

});
