<?php 
	header("Content-type: text/html; charset=utf-8");
	//随便找的豆瓣接口
	echo file_get_contents('http://api.douban.com/v2/book/1220562');

 ?>