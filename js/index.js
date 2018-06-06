/**
 * Created by HUCC on 2018/5/28.
 */
//功能一：头部滚动的时候改变头部的opacity值
;(function () {
  var header=document.querySelector(".jd_header");
  window.addEventListener("scroll",function () {
    console.log(11);
    var scrollTop=window.pageYOffset;
    var opacity=0;
    if(scrollTop>=500){
      opacity=0.9;
    }else{
      opacity=scrollTop/500*0.9;
    }

   header.style.backgroundColor="rgba(222, 24, 27, "+opacity+")";

  })

})();
//功能二：动态计算秒杀商品的ul宽度
;(function () {
  var ul=document.querySelector(".jd_product ul");
  var lis=document.querySelectorAll(".jd_product li");
  var liLength=lis[0].offsetWidth;
  ul.style.width=liLength*lis.length+"px";

})();
//功能二：倒计时功能：
// 思路：倒计时时间=秒杀时间-当前时间。
;(function () {
  var spans=document.querySelectorAll(".secKill_Time span:nth-child(odd)");
  function setTime() {

    var secTime=new Date(2018,4,30,23,0);

    var now=new Date();

    var countTime=(secTime-now)/1000;
    if(countTime<=0){
      countTime=0;
      clearInterval(timeId);
    }
    var hour=parseInt(countTime/60/60);

    var minutes=parseInt(countTime/60%60);

    var secounds=parseInt(countTime%60);


    spans[0].innerText=addZero(hour);
    spans[1].innerText=addZero(minutes);
    spans[2].innerText=addZero(secounds);
  }
  setTime();
  var timeId=setInterval(setTime,1000);
  function addZero(n) {
    return n>10?n:"0"+n;
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
  console.log(liHeight);
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
//功能四：让图片轮播，和文字轮播一样，开启定时器。
//在过渡结束时候判断时候是最后一张，最后一张跳回第一张，注册过渡结束时间
;(function () {
  var jd_banner=document.querySelector(".jd_banner");
  var ul=document.querySelector(".jd_banner .banner");
  var imgs=document.querySelectorAll(".jd_banner .banner li");
  var points=document.querySelectorAll(".jd_banner .circle li");
  var liLength=jd_banner.offsetWidth;
  var count=1;
  //开启定时器。
  var timeId=setInterval(function () {
    count++;
    ul.style.transition="all 1s";
    ul.style.transform="translate(-"+count*liLength+"px)";


  },2000);
  ul.addEventListener("transitionend",function () {
    if(count >= imgs.length - 1) {
      count = 1;
    }
    if(count <= 0) {
      count = imgs.length - 2;
    }

    ul.style.transition="none";
    ul.style.transform="translate(-"+count*liLength+"px)";

    points.forEach(function (e) {
      e.classList.remove("now");
    });
    points[count-1].classList.add("now");
  })


  //功能五：给ul注册触摸事件.
  // 触摸时候清除定时器，并记录手指落下的位置。
  //startX记录相应的手机触摸位置信息
  var startX=0;
  var startTime=0;
  ul.addEventListener("touchstart",function (e) {
    startX= e.touches[0].clientX;
    startTime=new Date();
    clearInterval(timeId);


  })
  //ul如果没有高度触发不了move事件。
  ul.addEventListener("touchmove",function (e) {
    var distance= e.touches[0].clientX-startX;


    ul.style.transition="none";
    ul.style.transform="translateX("+(-count*liLength+distance)+"px)";



  })
  ul.addEventListener("touchend",function (e) {
    //开启onresize事件
    window.addEventListener("resize",function () {
      //动态获取当前的宽度
      liLength=jd_banner.offsetWidth;
      //重新赋值给ul的translateX
      setTranslate(-count*liLength);

    });
    //计算出滑动的时间。快速滑动的效果，当时间小于200ms并且，距离大于50px，就滑动到下一张
    var endTime=new Date()-startTime;
    var distance= e.changedTouches[0].clientX-startX;
    if(distance>=jd_banner.offsetWidth/3 || endTime<=200 && distance>=50){
      count--;
    }
    if(distance<-jd_banner.offsetWidth/3 || endTime<=200 && distance<=-50){
      count++;
    }
    ul.style.transition="all 0.5s";
    ul.style.transform="translateX("+(-count*liLength)+"px)";

    //重启动定时器
    timeId=setInterval(function () {
      count++;
      ul.style.transition="all 1s";
      ul.style.transform="translate(-"+count*liLength+"px)";


    },2000);

  })
  //过渡事件的函数封装。
  function addTransition() {
    ul.style.transition="all 0.5s";
    ul.style.webkitTransition="all 0.5s";
  }
  function removeTransition() {
    ul.style.transition="none";
    ul.style.webkitTransition="none";
  }
  function setTranslate(value) {
    ul.style.transform="translate("+value+"px)";
    ul.style.webkitTransform="translate("+value+"px)";
  }

})();
