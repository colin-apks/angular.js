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
            alert(JSON.stringify(model.cart));
        }
    })


})


/*
 *               数据库云
 *
 */
var parent_sjk=avalon.define('parent_sjk',function(vm){
    vm.total_price=[0,0,0];
    vm.$watch('total_price',function(a){
        switch (a[1]){
            case 0:
                vm.total_price[0]=a[0];
                break;
            case 1:
                vm.total_price[1]=a[0];
        }
        vm.total_price[2]=vm.total_price[0]+vm.total_price[1];
        vm.total_price.push(-1);
        vm.total_price.pop();
    });

});

//数据库云 控制器
var sub_sjk = avalon.define('sub_sjk',function(vm){
    vm.num=100;
    vm.price_sjk=0;
    vm.$watch('num',function(now,old){
        if(now>=1000){
            vm.num=1000;
        }
        //vm.price_jsk=price_cds[1]*now;
        vm.price_sjk=price_cds[1]*now;
        var arr=[vm.price_sjk,0];
        vm.$fire("up!total_price",arr);

    });

});
//数据库云 控制器
var sub_model=avalon.define('sub_model',function(vm){
    vm.data_model=nodes_cds[0];
    vm.status_model=2;
    vm.price_model=price_cds[0][vm.status_model];
    vm.change_model=function(i){
        vm.status_model=i;
        vm.price_model=price_cds[0][i];
        var arr=[vm.price_model,1];
        vm.$fire("up!total_price",arr);
    };
    //促发监听数据变化
    setTimeout(function(){
        vm.status_model=0;
    },10);
    vm.$watch('status_model',function(now,old){
        vm.change_model(now);
    });


})
