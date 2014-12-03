var cloud={
	//主导航栏切换
	mainBar:function(n){
		var tab=$("#nav>li");
		var sub_tab=$(".sub-nav");
		if (n!=0) {

			$("#nav>li").eq(0).find('a').css('color','#666666');
		};
		tab.eq(n).addClass('active');
		tab.hover(function(){
		    $(this).css({
				cursor: 'pointer',
				background: "url('http://test-static.grandcloud.cn/www/media/v3/new/images/bg2.jpg') repeat-x",
				color:"white"
			});
			$(this).find("ul").stop().slideDown("fast");
			sub_tab.find("li").bind({
				"mouseover":function(){
					$(this).css({
						"background": '#4482D5',
						"cursor": 'pointer'
						
					}).find('a').css('color', 'white');
				},"mouseout":function(){
					$(this).css('background', 'white').find("a").css('color', '#666');
					
				}
			});	
		},function(){
            var i=$(this).index();
            if(n!=i){
                $(this).css({
                    cursor: 'pointer',
                    background: '#fff',
                    color:"#666666"
                }).find('ul').css('display', 'none');
            }

			$(this).find("ul").stop().slideUp("fast");	
		});
		
	},
	//侧导航栏的
	sideBar:function(){
		$(".out-bar li").mousemove(function(event) {
			$(this).css('cursor', 'pointer');
		});
		var span=$(".out-bar>li").has("i").find('span')
		span.toggle(function() {
			$(this).prev('i').css({
				"transform": "rotate(90deg)",
		        "-ms-transform": "rotate(90deg)",		/* IE 9 */
		        "-webkit-transform": "rotate(90deg)",	/* Safari and Chrome */
		        "-o-transform": "rotate(90deg)",		/* Opera */
		       " -moz-transform": "rotate(90deg)"	
			});
			$(this).next('.inner-bar').css('display', 'block');
		}, function() {
			$(this).prev('i').css({
				"transform": "rotate(-90deg)",
		        "-ms-transform": "rotate(-90deg)",		/* IE 9 */
		        "-webkit-transform": "rotate(-90deg)",	/* Safari and Chrome */
		        "-o-transform": "rotate(-90deg)",		/* Opera */
		       " -moz-transform": "rotate(-90deg)"	
			});

			$(this).next('.inner-bar').css('display', 'none');

		}).mouseover(function(event) {
			$(this).css('cursor', 'pointer');
		});
	
		

		
	}


}
function toutf8(msg){
	return eval('(' + msg + ')');
}
/*function setCookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}*/

function getQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/*//存储用户点击导航栏的项目id
$('.sub-nav a').click(function(event) {
	var attr=$(this).attr("data-id");
    //setcookie('id',attr);
    sessionStorage.setItem("id", attr);
});*/


//兼容ie8 indexOf
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}