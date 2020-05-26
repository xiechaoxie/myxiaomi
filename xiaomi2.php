<?php

    // 一、接收前端的数据
    $xiaominame = $_GET['name'];

    // 二、连接数据库，查询
    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","mydb2001");

    // 2、执行sql语句
    $sqlstr = "select xiaominame from xiaomi";
    
    $result = mysqli_query($conn,$sqlstr);

    // 3、关闭数据库
    mysqli_close($conn);

    // 三、响应结果
    $arr = mysqli_fetch_all($result, MYSQL_ASSOC);

    echo json_encode($arr);


?>