/**
 * Created by pc on 2014/12/29.
 */
angular.module("todo",['ui.router','ngCookies'])
    .controller("dataShow",function($scope,$cookieStore,data){
        $scope.data=data.getData();
        //一定要加上第三个参数
        $scope.$watch('data',function(){
            var len=$scope.data.length;
            if(len==0){
                alert("数据删除完毕")
            }
            $scope.totalLen=len;
        },true);
        $scope.goEdit=function(val){
            $cookieStore.put("i",val);
            alert('ok')
            alert( $cookieStore.get("i"))
        }
        $scope.addNewData=function(){
            $scope.data.push({"name":$scope.inputdata});
        };
        $scope.del=function(i){
            $scope.data.splice(i,1);
        }
    })
    .controller("searchData",function($scope,data){
        $scope.data=data.getData();
        $scope.mode=false;
        $scope.$watch('search',function(newValue,oldValue,scope){
            $scope.condition={name:newValue};
            $scope.res=$scope.data.length;
            console.log($scope.data)
        },true);

    })
    .controller("editData",function($scope,$cookieStore,data){
        $scope.data=data.getData();
        $scope.i=$cookieStore.get("i");
    })
    .factory('data',function(){
        return {
            getData:function(){
                return [
                    {"name":"php"},
                    {"name":"javascript"},
                    {"name":"java"},
                    {"name":"python"},
                    {"name":"ruby"}
                ];
            }
        }
    })
    .config(function($stateProvider,$locationProvider){
        $locationProvider.html5Mode({enabled:true}).hashPrefix('!');
        $stateProvider.state('index', {
            url: '/angular-todo/index.html',
            templateUrl:"app.html",
            controller:"dataShow"
        }).state('edit',{
            url:'/edit',
            controller:'editData',
            templateUrl:"edit.html"
        }).state('search', {
            url: '/search',
            templateUrl:"search.html",
            controller:"searchData"
        })
    })
