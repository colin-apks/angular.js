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
    vm.status=1;
    vm.total_price=0;
    vm.cart={           //购物车
        city:'',
        disk:''
    };
    setTimeout(function(){
        vm.status=0;
    },10);
    vm.change_status=function(i){
        vm.status=i;
        vm.cart.city=(i==0 ?"华东":"华北");
    };

    vm.$watch('total_price',function(a,b){
        vm.total_price=a;

    });

});
model.$watch('status',function(now,old){
    model.change_status(now);
})
model.cart.$watch('$all',function(name,a,b){
    model.cart[name]=a;
});



//流量---
var model_disk=avalon.define('disk',function(vm){
    vm.num=1024;
    vm.price_disk=price_c2[2]*vm.num;
    setTimeout(function(){
        vm.num=10240;
    },10);
    vm.$watch('num',function(now,old){
        if(now>=102400){
            vm.num=102400;
        }
        vm.price_disk=price_c2[2]*now;
        model.cart.disk=now;
        vm.$fire("up!total_price", vm.price_disk);

    })

});

