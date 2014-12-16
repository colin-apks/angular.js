/**
 * Created by pc on 2014/12/16.
 */
angular.module("my_filters",[])
    //过滤count小与num的数据
    .filter('filter1',function(){
        return function (inputs,num){
            var arr=[];
            angular.forEach(inputs,function(input){
                if(angular.isNumber(num)&&input.count<num){
                    arr.push(input)
                }

            });
            return arr;
        }
    })
    //将过滤出来数据中的每个count值加上10;
    .filter('filter2',function(){
        return function(input,num){
            if(angular.isNumber(num)){
                return input+num;
            }else{
                return input;
            }

        }
    })