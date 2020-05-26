function getDetail(goodsId) {
    $.get("./php2/getGoodsInfo.php", {
        "goodsId": goodsId,
    }, function(data) {
        let htmlStr = `
        <ul class="gaishu_l float_left">
            <li>${data.goodsName}</li>
            <li>${data.goodsPrice}元</li>
            <li>${data.goodsDesc}</li>
        </ul>
        <ul class="gaishu_c float_left">
            <li><a href="">概述</a></li>
            <li>
                <a href="">参数</a>
            </li>
            <li>
                <a href="">F码通道</a>
            </li>
            <li>
                <a href="">咨询客服</a>
            </li>
            <li>
                <a href="">用户评价</a>
            </li>
        </ul>
        <input type="button" value="立即购买">
        `;

        let htmlStr2 = `
        <div class="pic_img">
            <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong2}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong3}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong4}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        <div class="pic_img">
             <img src="${data.beiyong1}" alt="">
        </div>
        `
        $(".gaishu-wrap").html(htmlStr);
        $("#pic").html(htmlStr2)

        $(".gaishu-wrap input").click(function() {
            addShoppingCar(goodsId)
            let count = 0
            count++
            $(".head_r a span").html("(" + count + ")")
        })

        function getUserName() {
            let username = getCookie("username");
            if (username) {
                $(".head_cookie>h1>span").html(username)
                $(".head_cookie").css({
                    "display": "block",
                })
                $(".head_c>li:nth-child(1)").css({
                    "display": "none",
                })
            } else {
                $(".head_c>li:nth-child(1)").css({
                    "display": "block",
                })
            }
        }
        $(function() {
            getUserName()
            $(".head_cookie>input").click(function() {
                removeCookie("username")
                location.reload()
            })
        })
    }, "json");
}

function addShoppingCar(goodsId) {
    let username = getCookie("username")
    $.post("./php2/addShoppingCart.php", {
        "vipName": username,
        "goodsId": goodsId,
        "goodsCount": 1
    }, (data) => {
        if (data === "0") {
            alert("添加失败")
        } else {
            alert("添加成功")
        }
    });

}

$(function() {
    let goodsId = location.search.split("=")[1]
    getDetail(goodsId)
})