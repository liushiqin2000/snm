
;(function () {


  var nav = document.querySelector(".jd_content .nav");
  var ul = document.querySelector(".jd_content .nav ul");
  //思路：
  //1. 给ul注册touch相关的三个事件

  //记录开始的位置
  var startY;
  var currentY = 0;//记录每次滑动结束后的距离

  var maxY = nav.offsetHeight - ul.offsetHeight;

  ul.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  });

  //要获取到触摸的距离，让ul跟着移动
  ul.addEventListener("touchmove", function (e) {
    var distance = e.touches[0].clientY - startY;

    //清除过渡
    removeTransition();


    //设置ul的translateY
    setTranslateY(currentY + distance);

  });


  //记录下来每次滑动距离。
  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientY - startY;

    //每次都把滑动的距离加到currentY中
    currentY += distance;


    //松手的时候，currentY不能大于0，如果大于0，添加过渡，设置translateY
    if(currentY > 0) {
      currentY = 0;
    }
    if(currentY < maxY) {
      currentY = maxY;
    }

    addTransiton();
    setTranslateY(currentY);
  })



  //给ul添加过渡
  function addTransiton() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  //移除ul的过渡
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  //设置ul的translateX值
  function setTranslateY(value) {
    ul.style.transform = "translateY(" + value + "px)";
    ul.style.webkitTransform = "translateY(" + value + "px)";
  }

})();