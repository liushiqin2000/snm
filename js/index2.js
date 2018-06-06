/**
 * Created by MAIBENBEN on 2018/6/1.
 */
/**
 * Created by HUCC on 2018/5/28.
 */
//功能一：头部滚动的时候改变头部的opacity值
;(function () {
  var header = document.querySelector(".jd_header");
  window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset;
    var opacity = 0;
    if (scrollTop >= 500) {
      opacity = 0.9;
    } else {
      opacity = scrollTop / 500 * 0.9;
    }

    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";

  })

})();
//功能二：动态计算秒杀商品的ul宽度
;(function () {
  var ul = document.querySelector(".jd_product ul");
  var lis = document.querySelectorAll(".jd_product li");
  var liLength = lis[0].offsetWidth;
  ul.style.width = liLength * (lis.length-1) + "px";

})();
//功能二：倒计时功能：
// 思路：倒计时时间=秒杀时间-当前时间。
;(function () {
  var spans = document.querySelectorAll(".secKill_Time span:nth-child(odd)");

  function setTime() {

    var secTime = new Date(2018, 4, 30, 23, 0);

    var now = new Date();

    var countTime = (secTime - now) / 1000;
    if (countTime <= 0) {
      countTime = 0;
      clearInterval(timeId);
    }
    var hour = parseInt(countTime / 60 / 60);

    var minutes = parseInt(countTime / 60 % 60);

    var secounds = parseInt(countTime % 60);


    spans[0].innerText = addZero(hour);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(secounds);
  }

  setTime();
  var timeId = setInterval(setTime, 1000);

  function addZero(n) {
    return n > 10 ? n : "0" + n;
  }
})();
//功能三：文字轮播：
//思路：1.让ul动。每次动的是li的高度。
//开启定时器
//用count记录轮播的次数
//在过渡结束时，返回第一个
;(function () {
  var ul=document.querySelector(".jd_news ul");
  var lis=ul.querySelectorAll("li");
  var count=0;
  var liHeight=lis[0].offsetHeight;

  setInterval(function () {
    count++;
    ul.style.transition="all 0.5s";
    ul.style.transform="translateY(-"+(count*liHeight)+"px)";

  },2000)
  ul.addEventListener("transitionend",function () {
    if(count>=lis.length-1){
      count=0;
      ul.style.transition="none";
      ul.style.transform="translateY(-"+(count*liHeight)+"px)";
    }


  })
})();
////功能四：让图片轮播，定位版本不需要设置假图片。
//// 思路一：动态获取li的高度再设置给ul高度。  /*在css中先把所有的li放到其他的地方translateX-200%的位置*/
//window.addEventListener("load",function () {
//  var banner=document.querySelector(".jd_banner");
//  var ul=document.querySelector(".banner");
//  var points=document.querySelectorAll(".circle li");
//  var imgs=document.querySelectorAll(".jd_banner .banner li");
//  ul.style.height=imgs[0].offsetHeight+"px";
//  var liWidth=banner.offsetWidth;//每次的位置的宽度
//  //初始化三个位置；
//  var prev=imgs.length-1;
//  var now=0;
//  var next=1;
//  imgs[prev].style.transform="translateX("+ -liWidth +"px)";
//  imgs[now].style.transform="translateX(0px)";
//  imgs[next].style.transform="translateX("+ liWidth +"px)";
//  //开启定时器。强定时器中的代码块封装单独写，里面调用
//  function showNext() {
//    //1让prev张牌瞬间回去牌堆。清除过渡。
//    imgs[prev].style.transition="none";
//    imgs[prev].style.transform="translateX("+ 2 * liWidth +"px)";
//    //2换牌。
//    prev=now;
//    now=next;
//    next++;
//
//    if(next>imgs.length-1){
//      next=0;
//    }
//
//    imgs[prev].style.transition="all .2s";
//    imgs[now].style.transition="all .2s";
//    imgs[next].style.transition="none";
//
//    imgs[prev].style.transform="translateX("+ -liWidth +"px)";
//    imgs[now].style.transform="translateX(0px)";
//    imgs[next].style.transform="translateX("+ liWidth +"px)";
//
//
//    //同步小圆点
//    points.forEach(function (e) {
//      e.classList.remove("now");
//    })
//    points[now].classList.add("now");
//  }   //到下一张函数
//  function showPrev() {
//    //1让prev张牌瞬间回去牌堆。清除过渡。
//    imgs[prev].style.transition="none";
//    imgs[prev].style.transform="translateX("+ 2 * liWidth +"px)";
//    //2换牌。
//    next = now;
//    now = prev;
//    prev--;
//    if(prev < 0) {
//      prev = imgs.length - 1;
//    }
//
//    imgs[prev].style.transition="none";
//    imgs[now].style.transition="all .2s";
//    imgs[next].style.transition="all .2s";
//
//    imgs[prev].style.transform="translateX("+ -liWidth +"px)";
//    imgs[now].style.transform="translateX(0px)";
//    imgs[next].style.transform="translateX("+ liWidth +"px)";
//
//
//    //同步小圆点
//    points.forEach(function (e) {
//      e.classList.remove("now");
//    })
//    points[now].classList.add("now");
//  }   //到上一张函数
//
//  var timeId=setInterval(showNext,2000); // 定时器


////功能五：触摸滑动功能，给ul注册touch事件
//// 初始化位置和时间,并清除定时器；
//  var startX=0;
//  var startTime=0;
//  ul.addEventListener("touchstart",function (e) {
//   startX= e.touches[0].clientX;
//    startTime=new Date();
//    clearInterval(timeId);
//  })
//
//
//  ul.addEventListener("touchmove",function (e) {
//   var distance= e.touches[0].clientX-startX;
//    imgs[prev].style.transition="none";
//    imgs[now].style.transition="none";
//    imgs[next].style.transition="none";
//    imgs[prev].style.transform="translateX("+ (-liWidth+distance) +"px)";
//    imgs[now].style.transform="translateX("+(distance)+"px)";
//    imgs[next].style.transform="translateX("+ (liWidth+distance) +"px)";
//  })
//
//  //结束时判断移动距离时间，并且开启定时器
//  ul.addEventListener("touchend",function (e) {
//    //移动的时间。
//    var duration=new Date()-startTime;
//    var distance= e.changedTouches[0].clientX-startX;
//    if(distance<=-liWidth/3 || duration<200 && distance<-50){
//      showNext();
//    }
//
//    else if(distance>=liWidth/3 || duration<200 && distance<50){
//      showPrev();
//    }
//    timeId=setInterval(showNext,2000);
//
//  });
//
//
//  //功能6:窗口大小发生改变时重新获取高度。
//   window.addEventListener("resize",function () {
//     ul.style.height = imgs[0].offsetHeight + "px";
//     liWidth = banner.offsetWidth;
//     //重新把三个人的位置重新设置一下
//     //不需要过度效果
//     imgs[prev].style.transition = "none";
//     imgs[now].style.transition = "none";
//     //注意next不需要动画
//     imgs[next].style.transition = "none";
//
//     //改三个人的位置
//     imgs[prev].style.transform = "translateX(" + (-liWidth) + "px)";  //
//     imgs[now].style.transform = "translateX(0px)";  //
//     imgs[next].style.transform = "translateX(" + (liWidth) + "px)";//
//
//
//
//   })
//
//
//
//})


//功能五：注册onload事件，在图片加载完后获取li的高度，再设置给ul；
window.addEventListener("load", function () {
  var banner = document.querySelector(".jd_banner");
  var ul = document.querySelector(".jd_banner .banner");
  var imgs = ul.querySelectorAll("li");
  var points=document.querySelectorAll(".circle li");
  ul.style.height = imgs[0].offsetHeight + "px";
  var liWidth = banner.offsetWidth;
  var prev = imgs.length - 1;
  var now = 0;
  var next = 1;
  //初始化位置
  imgs[prev].style.transform = "translateX(" + -liWidth + "px)";
  imgs[now].style.transform = "translateX(0px)";
  imgs[next].style.transform = "translateX(" + liWidth + "px)";
  //开启定时器。
  function showNext() {
    imgs[prev].style.transition = "none";
    imgs[prev].style.transform = "translateX(" + 2 * liWidth + "px)";
    prev=now;
    now=next;
    next++;
    if(next>imgs.length-1){
      next=0;
    }
    imgs[prev].style.transition = "all 0.2s";
    imgs[now].style.transition = "all 0.2s";
    imgs[next].style.transition = "none";
    imgs[prev].style.transform = "translateX(" + -liWidth + "px)";
    imgs[now].style.transform = "translateX(0px)";
    imgs[next].style.transform = "translateX(" +  liWidth + "px)";
    //同步小圆点。
    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[now].classList.add("now");


  }
  function showPrev() {
    imgs[next].style.transition = "none";
    imgs[next].style.transform = "translateX(" + 2* liWidth + "px)";


    next=now;
    now=prev;
    prev--;


    if(prev<0){
     prev=imgs.length-1;
    }
    imgs[prev].style.transition = "none";
    imgs[now].style.transition = "all 0.2s";
    imgs[next].style.transition = "none";
    imgs[prev].style.transform = "translateX(" + -liWidth + "px)";
    imgs[now].style.transform = "translateX(0px)";
    imgs[next].style.transform = "translateX(" + liWidth + "px)";
    //同步小圆点。
    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[now].classList.add("now");


  }

  var timeId=setInterval(showNext,2000);




  //注册触摸事件。
  var startX=0;
  var startTime=0;
  ul.addEventListener("touchstart",function (e) {
    startX= e.touches[0].clientX;
    startTime=new Date();
    clearInterval(timeId);

  })
  ul.addEventListener("touchmove",function (e) {
    var distance= e.touches[0].clientX-startX;
    imgs[prev].style.transition = "none";
    imgs[now].style.transition = "none";
    imgs[next].style.transition = "none";
    imgs[prev].style.transform = "translateX(" + (-liWidth+distance) + "px)";
    imgs[now].style.transform = "translateX("+distance+"px)";
    imgs[next].style.transform = "translateX(" + ( liWidth+distance) + "px)";

  })
  ul.addEventListener("touchend",function (e) {
    var duration=new Date()-startTime;
    var distance= e.changedTouches[0].clientX-startX;

    if(distance>=liWidth/3 || duration<200 && distance>=50){
      showPrev();
    }else if(distance<=-liWidth/3 || duration<200 && distance<=-50){
      showNext();
    }else {
      imgs[prev].style.transition = "all .2s";
      imgs[now].style.transition = "all .2s";
      //注意next不需要动画
      imgs[next].style.transition = "all .2s";
      imgs[prev].style.transform = "translateX(" + -liWidth + "px)";  //0
      imgs[now].style.transform = "translateX(0px)";  //1
      imgs[next].style.transform = "translateX(" + liWidth + "px)";//2
    }
    timeId=setInterval(showNext,2000);
  })

//注册屏幕窗口变化事件。
  window.addEventListener("resize",function () {
    ul.style.height = imgs[0].offsetHeight + "px";
     liWidth = banner.offsetWidth;;

    var prev = imgs.length - 1;
    var now = 0;
    var next = 1;
    //初始化位置
    imgs[prev].style.transform = "translateX(" + -liWidth + "px)";
    imgs[now].style.transform = "translateX(0px)";
    imgs[next].style.transform = "translateX(" + liWidth + "px)";



  })
})


window.onload = function () {
  new IScroll(".product", {
    scrollY:false,
    scrollX:true
  });


}






