//给ul注册touch事件。让ul随着滑动的距离动。
;(function () {
  var nav=document.querySelector(".small_nav");
  var ul=document.querySelector(".small_nav ul");
  //定义两个变量，一个记录每次移动的距离，一个记录每次的位置。
  var startY=0;
  var current=0;
  ul.addEventListener("touchstart",function (e) {
    startY= e.touches[0].clientY; //获取一开始的位置

    removeTransition()//一开始清除过渡。为了避免延时。
  })
  ul.addEventListener("touchmove",function (e) {
   var distance= e.touches[0].clientY-startY;//distance是在移动过程中移动到的位置减去一开始的移动
    removeTransition();
    setTranslate(current+distance);

  })
  ul.addEventListener("touchend",function (e) {
    var distance= e.changedTouches[0].clientY-startY;
    current+=distance;
    if(current>0){
      current=0;
    }
    if(current<nav.offsetHeight-ul.offsetHeight){
      current=nav.offsetHeight-ul.offsetHeight;
    }
    addTransition();
    setTranslate(current);
  })


//过渡效果的封装
  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  function setTranslate(value) {
    ul.style.transform = "translateY("+ value +"px)";
    ul.style.webkitTransform = "translateY("+ value +"px)";
  }

})();



//功能二：给商品页注册touch事件,和菜单做的是一样的
;(function () {
  var product=document.querySelector(".product");
  var ul=document.querySelector(".product_product");
  var current=0;
  var startY=0;
  ul.addEventListener("touchstart",function (e) {
    startY= e.touches[0].clientY;
    removeTransition()

  })
  ul.addEventListener("touchmove",function (e) {
    var distance= e.touches[0].clientY-startY;
    removeTransition();
    setTranslate(current+distance);
  })
  ul.addEventListener("touchend",function (e) {
    var distance= e.changedTouches[0].clientY-startY;
    current+=distance;
    if(current>0){
      current=0;
    }
    if(current<product.offsetHeight-ul.offsetHeight){
      current=product.offsetHeight-ul.offsetHeight
    }
    addTransition();
    setTranslate(current);
  })
  //过渡效果的封装
  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  function setTranslate(value) {
    ul.style.transform = "translateY("+ value +"px)";
    ul.style.webkitTransform = "translateY("+ value +"px)";
  }

})();

//注意点。在注册事件的时候。父盒子必须嵌套子盒子，并且子盒子大于父盒子。