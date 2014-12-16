angular.module('ownApp',['my_services','my_filters'])
    .config(function($httpProvider){
        $httpProvider.defaults.cache=$cacheFactory('myCache',{capacity:20})//缓存前20个请求
    })
    .controller('MainCtrl', ['$scope', 'UserInfo', function ($scope, UserInfo) { // 引用我们定义的UserInfo服务
        var promise = UserInfo.query(); // 同步调用，获得承诺接口
        promise.then(function(data) {  // 调用承诺API获取数据 .resolve
            $scope.data = data;
        }, function(data) {  // 处理错误 .reject
            $scope.data= {error: '用户不存在！'};
        });
    }]);