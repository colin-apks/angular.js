/**
 * Created by Colin on 2015/1/5.
 */
angular.module('myApp',['ui.router','myCtr','myService'])
    .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise('index');
        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl:"box.html"
            })
            .state("language",{
                parent:"index",
                url:"/language",
                controller:'lang',
                templateUrl:"language.html"
            })
            .state("name",{
                parent:"index",
                url:"/name",
                controller:"name",
                templateUrl:"name.html"
            })
            .state("star",{
                parent:"index",
                url:"/star",
                controller:"star",
                templateUrl:"star.html"
            })
            .state("news",{
                parent:"index",
                url:"/news",
                templateUrl:"news.html",
                data:{
                    role:["国内","国外","体育","财经","娱乐",'美食']
                },

                controller:'news'
            })
            .state("news.guonei",{
                url:"/guonei",
                templateUrl:"newsCon.html"
            })
            .state("news.guowai",{
                url:"/guowai",
                templateUrl:"newsCon.html"
            })
            .state("news.tiyu",{
                url:"/tiyu",
                templateUrl:"newsCon.html"
            })
            .state("news.caijin",{
                url:"/caijin",
                templateUrl:"newsCon.html"
            })
            .state("news.yule",{
                url:"/yule",
                templateUrl:"newsCon.html"
            })
            .state("news.meishi",{
                url:"/meishi",
                templateUrl:"newsCon.html"
            })


    })