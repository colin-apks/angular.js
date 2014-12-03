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
    vm.price=[0,0,0];
    vm.total_price=0;
    vm.cart={           //购物车
        city:'华东',        //
        os:'',          //操作系统
        model:'',       //机型
        telecom:'',      //带宽  电信
        unicom:''      //带宽  联通
    };

    vm.$watch('price',function(a){
        //框架的原因，数组只能监控到自身长度变化
        switch (a[1]){
            case 'os':
                vm.price[0]=a[0];
                break;
            case 'telecom':
                vm.price[1]=a[0];
                break;
            case 'unicom':
                vm.price[2]=a[0];
                break;

        }
        vm.price.push(-1);
        vm.price.pop();
        vm.total_price=vm.price[0]+vm.price[1]+vm.price[2];

    });

});

model.cart.$watch('$all',function(name,a,b){
    model.cart[name]=a;
});
//主机配置 控制器
var model_os=avalon.define('os',function(vm){
    vm.data_os=mix_node[0];
    vm.data_model=mix_node[1];
    vm.arr=[vm.price_os,'os'];
    vm.status_os=10;
    vm.status_model=10;
    vm.price_os=0;

    vm.change_status=function(i){
        vm.status_os=i;
        model.cart.os=(i==0?"linux":"window");
    };
    vm.change_model=function(i){
        vm.status_model=i
        vm.price_os=mix_node[1][i][4];
        var arr=[vm.price_os,'os'];
        model.cart.model=mix_node[1][i][2];
        vm.$fire("up!price",arr);
    };
    setTimeout(function(){
        vm.status_os=0;
        vm.status_model=0;
    },10);

});
model_os.$watch('status_os',function(now,old){
    model_os.change_status(now);
});
model_os.$watch('status_model',function(now,old){
    model_os.change_model(now);
})

//电信  带宽套餐
var model_thread_telecom=avalon.define('thread_telecom',function(vm){
    vm.thread_telecom=mix_node[2];
    vm.status_thread_telecom=10;
    vm.price_thread_telecom=0;
    vm.change_thread_telecom= function (i) {
        vm.status_thread_telecom=i;
        vm.price_thread_telecom=mix_node[2][i][3];
        var arr=[vm.price_thread_telecom,'telecom'];
        model.cart.telecom=mix_node[2][i][2];
        vm.$fire("up!price",arr);

    };
     setTimeout(function(){
         vm.status_thread_telecom=0;
     },10);


});
model_thread_telecom.$watch('status_thread_telecom',function(now,old){
    model_thread_telecom.change_thread_telecom(now)
});

//联通   带宽套餐
var model_thread_unicom=avalon.define('thread_unicom',function(vm){
    vm.thread_unicom=mix_node[3];
    vm.status_thread_unicom=10;
    vm.price_thread_unicom=0;
    vm.change_thread_unicom= function (i) {
        vm.status_thread_unicom=i;
        vm.price_thread_unicom=mix_node[3][i][3];
        var arr=[vm.price_thread_unicom,'unicom'];
        model.cart.unicom=mix_node[3][i][2];
        vm.$fire("up!price",arr);
    }
    setTimeout(function(){
        vm.status_thread_unicom=0;
    },10)


});
model_thread_unicom.$watch('status_thread_unicom',function(now,old){
    model_thread_unicom.change_thread_unicom(now)
})
