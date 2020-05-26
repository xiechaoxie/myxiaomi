 // 类
 class Swiper {
     constructor(selector, obj) {
         // dom相关的书写
         this.$box = $(selector);
         this.$imgBox = this.$box.find(".slide");
         this.$img = this.$imgBox.children();
         this.$li = this.$box.find("li");
         let $span = this.$box.find("span");
         this.$leftArrow = $span.eq(0);
         this.$rightArrow = $span.eq(1);

         // 数据
         let width = this.$box.width();
         let height = this.$box.height();
         let defaultObj = {
             width: width,
             height: height,

             douWidth: 10,
             douHeight: 10,
             douColor: "pink",
             douHighColor: "blue",
             isCircle: true, //豆豆是否是圆的
             ord: 0,
             timeLong: 3000, //时长
             type: "slide", //默认是滑动效果
             hrefs: [],
             myTimer: null
         }

         if (obj) {
             for (let key in obj) {
                 defaultObj[key] = obj[key];
             }
         }

         for (let key in defaultObj) {
             this[key] = defaultObj[key];
         }

         this.render();
         this.addEvent();
         this.autoPlay();
     }

     // 设置样式
     render() {
         //1、图片的样式

         //2、设置豆豆的样式
         this.$li.css({
             "float": "left",
             "margin-top": "5px",
             "margin-left": "10px",
             "width": this.douWidth,
             "height": this.douHeight,
             "background-color": this.douColor,
         });
         if (this.isCircle) {
             this.$li.css({ "border-radius": "50%" });
         }
         this.$li.eq(0).css({ "background-color": this.douHighColor });
         // 3、箭头
     }

     // 跳转到指定图片上
     goImg(transOrd) { //transOrd:想显示的图片的序号 3
         // 健壮性的判断
         if (this.ord == transOrd) {
             return;
         }
         // 一、数据处理
         // 1、数据计算
         // outOrd：出的图片序号
         let outOrd = this.ord;
         // this.ord:进入的图片序号
         this.ord = transOrd;
         // 2、边界（合法性）
         if (this.ord > this.$img.length - 1) {
             this.ord = 0;
         } else if (this.ord < 0) {
             this.ord = this.$img.length - 1;
         }

         // 二、外观呈现
         // 1、图片的滑动
         this.$img.eq(outOrd).animate({ "left": -this.width }, this.timeLong / 3);
         this.$img.eq(this.ord).css({ "left": this.width });
         this.$img.eq(this.ord).animate({ "left": 0 }, this.timeLong / 3);
         // 2、豆豆变颜色
         this.$li.eq(outOrd).css({ "background-color": this.douColor });
         this.$li.eq(this.ord).css({ "background-color": this.douHighColor });

     }

     // 自动播放
     autoPlay() {
         this.myTimer = setInterval(() => {
             this.goImg(this.ord + 1);
         }, this.timeLong);
     }

     // 停止播放
     stopPlay() {
         window.clearInterval(this.myTimer);
         this.myTimer = null;
     }

     addEvent() {
         // 输入移入停止播放
         this.$imgBox.mouseover(() => {
             this.stopPlay();
         });
         // 输入离开继续播放
         this.$imgBox.mouseout(() => {
             this.autoPlay();
         });

         // 点击豆豆跳转图片
         this.$li.click((event) => {
             this.stopPlay();
             this.goImg($(event.target).index());
         });

         // 点击左右箭头
         this.$leftArrow.click(() => {
             this.stopPlay();
             this.goImg(this.ord - 1);
         });

         this.$rightArrow.click(() => {
             this.stopPlay();
             this.goImg(this.ord + 1);
         });

         // 超链
         this.$imgBox.click(() => {
             this.hrefs[this.ord] && window.open(this.hrefs[this.ord]);
         });
     }

 }