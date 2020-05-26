function getWenJu() {
    $.get("./php/getGoodsListNew.php", {
        "typeId": "001",
        "count": "2"
    }, function(datas) {
        let htmlStr = "";
        datas.forEach(goods => {
            htmlStr += `
        <div class="mi_ten">
                <div class="mi_img">
                <a href="shangpingxiangqing.html?goodsId=${goods.goodsId}"> <img src="${goods.goodsImg}" alt=""></a>
                </div>
                <div class="mi_btm">
                    <span>${goods.goodsName}</span>
                    <div>
                        <h2>${goods.goodsDesc}</h2>
                        <h3>${goods.goodsPrice}元起</h3>
                    </div>
        </div>
            `
        });
        $(".mi_a").html(htmlStr);
    }, "json");
}

$(function() {
    getWenJu();
})