<?php
    header("content-type:text/html;charset=utf-8");
    // 一、接收前端的数据
    $name = $_POST['username'];
    $pass = $_POST['userpass'];


    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","mydb2001");

    // 2、执行sql语句
    $result = mysqli_query($conn,"select * from stu where username='{$name}' and userpass='{$pass}'");

    // 3、关闭数据库
    mysqli_close($conn);

    // 三、响应结果
    $arr = mysqli_fetch_all($result, MYSQL_ASSOC);
 
    if(count($arr)==1){
        echo "1"; 
    }else{
        echo "0"; 
    }

?>