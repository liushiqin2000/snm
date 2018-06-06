/**
 * Created by MAIBENBEN on 2018/6/5.
 */
;(function () {
  //给垃圾桶注册点击事件。
  var rubbishUp=document.querySelector(".rubbish-up")
  var cancle=document.querySelector(".mask-info .cancle");
  var maskBox=document.querySelector(".mask-box");
  var rubbish_box=document.querySelectorAll(".jd_goods .rubbish_box");
  rubbish_box.forEach(function (element) {
    element.addEventListener("click",function () {
      maskBox.style.display="block";
      this.firstElementChild.style.transform="rotate(40deg)";
      this.firstElementChild.style.transformOrigin="right bottom";
    })
  })
  cancle.addEventListener("click",function () {
    console.log(11);
    maskBox.style.display="none";
    rubbishUp.style.transform="rotate(0deg)";

  })
  //全选按钮注册点击事件。
 var allChecked=document.querySelector(".jd_title .jd_sprit");
  var inputs=document.querySelectorAll(".jd_goods .jd_sprit");
  allChecked.addEventListener("click",function () {
    allChecked.classList.toggle("active");
    var isChecked=allChecked.classList.contains("active");

    inputs.forEach(function (e) {
      if(isChecked){
        e.classList.add("active");
      }else{
        e.classList.remove("active");
      }

    })
  })







})();