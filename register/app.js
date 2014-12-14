
angular.module('formApp', ['ui.router','ngMessages'])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                views:{
                    '':{
                        templateUrl:"form.html"
                    },
                    "header@index":{
                        templateUrl:"header1.html"
                    },
                    "form@index":{
                        templateUrl:"step1.html"
                    }
                }
            })
            .state("index.step1",{
                url:"/step1",
                views:{
                    "header@index":{
                        templateUrl:"header1.html"
                    },
                    "form@index":{
                        templateUrl:"step1.html"
                    }
                }
            })
            .state("index.step2",{
                url:"/step2",
                views:{
                    "header@index":{
                        templateUrl:"header2.html"
                    },
                    "form@index":{
                        templateUrl:"step2.html"
                    }
                }
            })
            .state("index.step3",{
                url:"/step3",
                views:{
                    "header@index":{
                        templateUrl:"header3.html"
                    },
                    "form@index":{
                        templateUrl:"step3.html"
                    }
                }
            })


    })

    .controller('formController', function($scope) {
        $scope.formData = {
        };
        $scope.processForm = function() {
            alert('awesome!');
        };

    });