<?php

                header("content-type:text/html;charset=utf-8");
                // 获取前端发送来的数据
                $name = $_POST["username"];


                // // // 连接数据库
                $conn = mysqli_connect("localhost","root","root","mydb2001");
                // 执行SQL语句
                $result = mysqli_query($conn,"insert into stu(username) value ('".$name."')");
                // 断开连接
                mysqli_close($conn);

                // // 给前端响应内容
                if($result){
                    echo "1";
                }else{
                    echo "0";
                }
?>