function getShoppingCar(cb) {
    let username = getCookie("username")
    $.get("./php2/getShoppingCart.php", { "vipName": username }, function(datas) {
        let htmlStr = `
             <table class="clear_fix">
                <tr>
                    <td>
                        <input type="checkbox" >
                    </td>
                    <td>商品编号</td>
                    <td>商品名称</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>金额</td>
                    <td>操作</td>
                </tr>               
        `

        datas.forEach(goods => {
            htmlStr += `
            <tr>
            <td>
                <input type="checkbox" >
            </td>
            <td class="goodsId">${goods.goodsId}</td>
            <td>${goods.goodsName}</td>
            <td>${goods.goodsPrice}</td>
            <td>
                <input type="button" class="reduceBtn" value="-">
                <span>${goods.goodsCount}</span>
                <input type="button" class="addBtn" value="+">
            </td>
            <td>${goods.goodsPrice*goods.goodsCount}</td>
            <td>
                <input class="delBtn" type="button" value="删除">
            </td>
        </tr>
        `
        })

        htmlStr += `
                    <tr>
                        <td colspan="8" style="text-align: center" >
                            总金额：<span>0</span>
                        </td>
                    </tr>
                </table>
                `
            // 把产生html字符串放在html页面上
        $(".che_t").html(htmlStr);

        $(".che_t table").css({
            "border-collapse": "collapse",
            "width": "100%",
            "min-height": "492px",
            "text-align": "center",
        })

        $(".che_t table td").css({
            "border": " 2px solid red"
        })

        $(".che_t table td input:nth-child(2)").css({
            "width": "50px"
        })
        cb(); //给dom元素添加事件
    }, "json")
}

//修改购物车中商品的数量()
// 参数:
// 商品编号，修改后的商品数量
function updateCount(goodsId, goodsCount, cb) {
    let username = getCookie("username")
    $.get("./php2/updateGoodsCount.php", {
        "vipName": username,
        "goodsId": goodsId,
        "goodsCount": goodsCount
    }, function(data) {
        if (data == "0") {
            alert("服务器出错：修改数量失败");
        } else {
            // 前端修改数量
            cb();
        }
    });
}

// 删除购物车的商品
function removegoods(vipName, goodsId, callback) {
    $.get("./php2/deleteGoods.php", {
        "vipName": vipName,
        "goodsId": goodsId,
    }, function(data) {
        if (data == "0") {
            alert("服务器出错：删除失败");
        } else {
            // 前端修改数量
            callback();
        }
    })
}

function addEvent() {
    $("table :checkbox:eq(0)").check($("table :checkbox:gt(0)"));
    $(":checkbox").click(function() {
        totalMoney();
    });
    $(".addBtn").click(function() {
        //一、修改后端的数量
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).prev().html();
        count++;
        updateCount(goodsId, count, () => {
            //二、修改前端的数量
            // 数量            
            $(this).prev().html(count);
            // 单价
            let price = $(this).parent().prev().html();
            // 计算金额
            let money = price * count;
            $(this).parent().next().html(money);

            // 总金额
            totalMoney();
        });
    })

    $(".reduceBtn").click(function() {
        //一、修改后端的数量
        let goodsId = $(this).parent().parent().find(".goodsId").html();
        let count = $(this).prev().html();
        count--;
        if (count < 1) {
            count = 0;
        }
        updateCount(goodsId, count, () => {
            // 二、修改前端的数量
            // 数量 
            $(this).next().html(count);
            // 单价
            let price = $(this).parent().prev().html();
            // 计算金额
            let money = price * count;
            $(this).parent().next().html(money);

            // 同时改变当前行的复选框的状态
            if (count == 0) {
                $(this).parent().parent().find(":checkbox").prop("checked", false);
                // $(this).parent().parent().remove();
            }
            // 总金额
            totalMoney();
        })
    })

    $(".delBtn").click(function() {
        let username = getCookie("username")
        let vipName = username
        let goodsId = $(this).parent().parent().find(".goodsId").html()
        removegoods(vipName, goodsId, () => {
            if (confirm("亲，您真的要删除吗？")) {
                $(this).parent().parent().remove();
                totalMoney();
            }
        })

    })

}

// 计算总金额
function totalMoney() {
    let money = 0;
    let $tr = $("table tr:gt(0)").not("table tr:last");
    $tr.each(function() {
        // 复选框是不是选中了
        if ($(this).find(":checkbox").prop("checked")) {
            money += parseFloat($(this).find("td").eq(5).html());
        }
    });
    $("table tr:last").find("span").html(money)
}

$(function() {
    getShoppingCar(addEvent);
})