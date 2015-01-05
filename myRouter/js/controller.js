/**
 * Created by pc on 2015/1/5.
 */
angular.module('myCtr',['myService'])
    .controller("lang",function($scope,langsData){
        $scope.langs=langsData.data
    })
    .controller("name",function($scope,namesData){
        $scope.names=namesData.data;
    })
    .controller("star",function($scope,starData){
        $scope.data=starData.data;
    })
    .controller("news",function($scope,$state,$location){
        $scope.data= $state.current.data.role;
        var url=['/guonei','/guowai','/tiyu','/caijin','/yule','/meishi'];
        $scope.setUrl=function(i){
            $location.path('index/news'+url[i]);
        }
    })