<?php 
session_start(); 
switch ( $_GET['action'] ){ 
case "loginif"; 
//登陆验证,假定session储存的秘密应该等于123才为正确 
if ($_SESSION['pass']=="123"){echo "密码正确 您可以执行注销";}else{echo "密码错误，您可以重新登陆";} 
break; 
case "logout"; 
//注销登陆 
session_unset(); 
session_destroy(); 
echo "注销成功！可以判断一下密码是否正确来看看是不是成功注销"; 
break; 
case "login"; 
//写入session以供验证， 
$pass="123";//密码 
$_SESSION['pass']=$pass; 
echo "写入登陆密码了 去判断密码成功与否吧。"; 
break; 
} 
?> 
<p>假定本页名为php_session.php </p> 
<p><a href="php_session.php?action=login">用户进行登陆post，程序处理写入session</a></p> 
<p><a href="php_session.php?action=loginif">判断用户密码是否正确</a></p> 
<p><a href="php_session.php?action=logout">登陆成功的用户注销登陆</a></p>