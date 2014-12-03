$(function(){
	cloud.mainBar(1);

    $('#buy').attr('href',url.c2);
    $('#more').attr('onclick', "browser.set('key',0)");
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
    
    //购物车 数据获取  model.cart


})

var status=0 //0:华东，1：华北
//获取云产品相关配置
var os_data=nodes_c2[0];
var model_data=nodes_c2[1][status];
var thread_data=nodes_c2[2][0];
var bandwidth_data=nodes_c2[3];
var model=avalon.define('cal',function(vm){
    vm.status=1;//华东、华北
    vm.total_price=[[0,0,0],[0,0,0],[0,0,0]];
    vm.cart={           //购物车
        city:'',        //华东、华北
        os:'',          //操作系统
        model:'',       //机型  超微 微型。。。
        thread:'',      //线路：单线、双线
        bandwidth:'',   //带宽:2m、3m
        disk:''         //云硬盘数量
    };
    setTimeout(function(){
        vm.status=0;
    },10);
    vm.change_status=function(i){
        vm.status=i;
        model.cart.city=(i==0?"华东":"华北");
    };

    vm.total_price_single=function(){
        var res=[0,0,0];
        for(var i=0;i<vm.total_price.length;i++){
            res[0]+=vm.total_price[i][0];
            res[1]+=vm.total_price[i][1];
            res[2]+=vm.total_price[i][2];
        }
        return res;
    };
    vm.$watch('total_price',function(a){
        //框架的原因，数组只能监控到自身长度变化
        switch (a[1]){
            case 'os':
                vm.total_price[0]=a[0];
                break;
            case 'thread':
                vm.total_price[1]=a[0];
                break;
            case 'disk':
                vm.total_price[2]=a[0];
                break;

        }
        vm.total_price.push(-1);
        vm.total_price.pop();

    });

});
model.$watch('status',function(now,old){
    model_os.data_model=nodes_c2[1][now];
    model.change_status(now);
});
model.cart.$watch('$all',function(name,a,b){
    model.cart[name]=a;
    //console.log(model.cart.$model)
});
//主机配置 控制器
var model_os=avalon.define('os',function(vm){
    vm.data_os=os_data;
    vm.data_model=nodes_c2[1][0];
    vm.status_os=1;
    vm.status_model='';
    vm.price_os=[0,0,0];
    vm.arr=[vm.price_os,'os'];
    vm.change_status=function(i){
        vm.status_os=i;
        model.cart.os=(i==0?"linux":"window");
        vm.$fire("up!total_price",vm.arr);
    };
    vm.change_model=function(i){
        vm.status_model=i
        model.cart.model=i[vm.price_jsk,0]
        vm.$fire("up!total_price",vm.arr);
    };
    setTimeout(function(){
        vm.status_os=0;
        vm.status_model='超微';
    },10);
    /*
     * 修改了价格配置文件的数据类型
     * */
    vm.model=[["超微","微型","小型","标准","大型","超大型"],["超微","微型","小型","标准","大型","超大型","巨大型"]];
    vm.index=vm.model[model.status].indexOf(vm.status_model);

});
model_os.$watch('status_os',function(now,old){
    model_os.change_status(now);
});
model_os.$watch('status_model',function(now,old){
    model_os.change_model(now);
})

//带宽套餐 控制器
var model_thread=avalon.define('thread',function(vm){
    vm.data_thread=nodes_c2[2][0];
    vm.data_bandwidth=nodes_c2[3];
    vm.status_thread=1;
    vm.status_bandwidth=10;

    vm.price_thread=[0,0,0];
    vm.arr=[vm.price_thread,'thread'];
    vm.change_status=function(i){
        vm.status_thread=i;
        model.cart.thread=(i==0?"单线 - 电信/联通":"双线 - 电信和联通");
        vm.$fire("up!total_price",vm.arr);
    };
    setTimeout(function(){
        vm.status_thread=0;
        vm.status_bandwidth=0;
    },10)
    vm.change_status_bandwidth=function(i){
        vm.status_bandwidth=i;
        model.cart.bandwidth=["2M", "5M", "10M", "20M", "50M", "100M", "200M"][i];
        vm.$fire("up!total_price",vm.arr);
    };

});
model_thread.$watch('status_thread',function(now){
    model_thread.change_status(now);
});
model_thread.$watch('status_bandwidth',function(now){
    model_thread.change_status_bandwidth(now);
})
//云硬盘 控制器
var model_disk=avalon.define('disk',function(vm){
    vm.num=0;
    vm.price_disk=[price_c2[2]*vm.num/24,0,0];
    vm.arr=[vm.price_disk,'disk'];
    setTimeout(function(){
        vm.num=1024
    },10);
    vm.$watch('num',function(now,old){
        if(now>=10240){
            vm.num=10240;
        }
        vm.price_disk=[price_c2[2]*vm.num/24,(price_c2[2]*vm.num)*30,(price_c2[2]*vm.num)*365];
        vm.arr=[vm.price_disk,'disk'];
        model.cart.disk=now;
        vm.$fire("up!total_price",vm.arr);

    })

});


/*...........................主机计费 start....................................*/
model.$watch('status',function(now,old){
    model_os.data_model=nodes_c2[1][now];
    
    if(now==1){
    	model_thread.price_thread=price_c2[1][1][0][model_thread.status_bandwidth];
    	model_thread.data_thread=['BGP线路'];
    }else{
    	model_thread.data_thread=['单线 - 电信/联通','双线 - 电信和联通'];
    	model_thread.price_thread=price_c2[1][0][model_thread.status_thread][model_thread.status_bandwidth];
    }
});
model_os.$watch('status_model',function(now,old){
    model_os.index=model_os.model[model.status].indexOf(now);
    model_os.price_os=price_c2[0][model.status][model_os.status_os][model_os.index];

    model_os.arr=[model_os.price_os,'os'];
});
model_os.$watch('status_os',function(now,old){
    model_os.price_os=price_c2[0][model.status][now][model_os.index];
    model_os.arr=[model_os.price_os,'os'];
});
model_os.$watch('status',function(now,old){
    model_os.price_os=price_c2[0][now][model_os.status_os][model_os.index];
    model_os.arr=[model_os.price_os,'os'];
});
/*...........................主机计费 end....................................*/

/*...........................带宽套餐 start....................................*/
model_thread.$watch('status_thread',function(now,old){
    if(model.status==0){
        model_thread.price_thread=price_c2[1][0][now][model_thread.status_bandwidth];
    }else{
        model_thread.price_thread=price_c2[1][1][0][model_thread.status_bandwidth];
    }

    model_thread.arr=[model_thread.price_thread,'thread'];
});
model_thread.$watch('status_bandwidth',function(now,old){
    if(model.status==0){
        model_thread.price_thread=price_c2[1][0][model_thread.status_thread][now];
    }else{
        model_thread.price_thread=price_c2[1][1][0][now];
    }

    model_thread.arr=[model_thread.price_thread,'thread'];
});
/*...........................带宽套餐 end....................................*/

/*...........................带宽套餐 end....................................*/