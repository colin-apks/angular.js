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
    vm.status=1;//页面加速、下载加速
    vm.total_price=0;
    vm.cart={           //购物车
        role:'',        //"页面加速":"下载加速"
        flow:''         //流量
    };
    setTimeout(function(){
        vm.status=0;
    },10);
    vm.change_status=function(i){
        vm.status=i;
        model.cart.role=(i==0?"页面加速":"下载加速");

        model.total_price=price_dds[i][0][0][0]*model_flow.num;

    };

    vm.$watch('total_price',function(a,b){
        vm.total_price=a;

    });

});
model.$watch('status',function(now,old){
    model.change_status(now);
});
model.cart.$watch('$all',function(name,a,b){
    model.cart[name]=a;
});



//流量---
var model_flow=avalon.define('flow',function(vm){
    vm.num=1023;
    vm.price_flow=price_dds[vm.status];
    setTimeout(function(){
        vm.num=1024;
    },10);
    vm.$watch('num',function(now,old){
        if(now>=102400){
            vm.num=102400;
        }
        vm.price_flow=price_dds[model.status][0][0][0]*now;
        model.cart.flow=now;
        vm.$fire("up!total_price", vm.price_flow);

    })

});

