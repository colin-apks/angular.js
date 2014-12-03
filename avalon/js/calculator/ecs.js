$(function(){
	cloud.mainBar(1);
    //限定云硬盘数量输入只能为数字
    $('.slideControlInput').keydown(function(event){
        //this.value=this.value.replace(/\D/g,'');
        var keyCode=event.keyCode;
        if (keyCode >= 48 && keyCode <= 57 ) return true
        // 小数字键盘
        if (keyCode >= 96 && keyCode <= 105) return true
        if(keyCode==8) return true;
        return false
    });
    $('.cal_footer button').bind({
        'mouseover':function(){
            $(this).css('cursor','pointer');
        },
        'click':function(){
            alert(JSON.stringify(model.cart.$model));
        }
    })


})

var model=avalon.define('cal',function(vm){
    vm.status=1;//华东、华北
    vm.price=[0,0,0,0];
    vm.total_price=0;
    vm.cart={           //购物车
        city:'',        //华东、华北
        content:'',     //容量
        flow:'',        //流浪
        request:'',     //请求
        getHead:''      //getHead
    };
    setTimeout(function(){
        vm.status=0;
    },10);
    vm.change_status=function(i){
        vm.status=i;
        model.cart.city=(i==0?"华东":"华北");
    };

    vm.$watch('price',function(a){
        //框架的原因，数组只能监控到自身长度变化
        switch (a[1]){
            case 'content':
                vm.price[0]=a[0]*1;
                break;
            case 'flow':
                vm.price[1]=a[0]*1;
                break;
            case 'request':
                vm.price[2]=a[0]*1;
                break;
            case 'getHead':
                vm.price[3]=a[0]*1;
                break;

        }
        vm.total_price=(function(arr){
            /*var res=0;
            for(var i=0;i<arguments.length;i++){
                res+=arguments[i]*1;
            }*/
            return arr[0]+arr[1]+arr[2]+arr[3];
        })(vm.price);
        vm.price.push(-1);
        vm.price.pop();

    });

});
model.$watch('status',function(now,old){
    model.change_status(now);

    model_flow.price_flow_data=price_ecs[1][now];
    if(model_flow.num<=model_flow.price_flow_data[1][0]){
        model_flow.price_flow=model_flow.num*model_flow.price_flow_data[0][0];
    }else if(model_flow.price_flow_data[1][0]<model_flow.num&&model_flow.num<=model_flow.price_flow_data[1][1]){
        model_flow.price_flow=model_flow.price_flow_data[1][0]*model_flow.price_flow_data[0][0]+(model_flow.num-model_flow.price_flow_data[1][0])*model_flow.price_flow_data[0][1];
    }
    var arr=[model_flow.price_flow,'flow'];
    model.cart.flow=model_flow.num;
    model_flow.$fire("up!price",arr);

});
model.cart.$watch('$all',function(name,a,b){
    model.cart[name]=a;
});



//容量---
var model_content=avalon.define('content',function(vm){
    vm.num=1024;
    vm.price_content=price_ecs[0]*vm.num;
    setTimeout(function(){
        vm.num=10240;
    },10);
    vm.$watch('num',function(now,old){
        if(now>=102400){
            vm.num=102400;
        }
        vm.price_content=now*price_ecs[0];
        var arr=[vm.price_content,'content'];
        model.cart.content=now;
        vm.$fire("up!price",arr);

    })

});

//流量
var model_flow=avalon.define('flow',function(vm){
    vm.num=1024;
    vm.price_flow_data=price_ecs[1][vm.status];
    vm.price_flow=0;
    setTimeout(function(){
        vm.num=10240;
    },10);
    vm.$watch('num',function(now,old){
        if(now<=vm.price_flow_data[1][0]){
            vm.price_flow=now*vm.price_flow_data[0][0];
        }else if(vm.price_flow_data[1][0]<now&&now<=vm.price_flow_data[1][1]){
            vm.price_flow=vm.price_flow_data[1][0]*vm.price_flow_data[0][0]+(now-vm.price_flow_data[1][0])*vm.price_flow_data[0][1];

        }else if(now>=vm.price_flow_data[1][1]){
            vm.num=vm.price_flow_data[1][1];
        }
        var arr=[vm.price_flow,'flow'];
        model.cart.flow=vm.num;
        vm.$fire("up!price",arr);

    });



});

//请求
var model_request=avalon.define('request',function(vm){
    vm.num=1024;
    vm.price_request=0;
    setTimeout(function(){
        vm.num=10000;
    },10);
    vm.$watch('num',function(now,old){
        if(now>=100000){
            vm.num=100000;
        }
        vm.price_request=price_ecs[2]*now;
        var arr=[vm.price_request,'request'];
        model.cart.request=vm.num;
        vm.$fire("up!price",arr);

    });


});

//getHead
var model_getHead=avalon.define('getHead',function(vm){
    vm.num=1024;
    vm.price_getHead=0;
    setTimeout(function(){
        vm.num=10000;
    },10);
    vm.$watch('num',function(now,old){
        if(now>=100000){
            vm.num=100000;
        }
        vm.price_getHead=price_ecs[3]*now;
        var arr=[vm.price_getHead,'getHead'];
        model.cart.getHead=vm.num;
        vm.$fire("up!price",arr);

    });


});


