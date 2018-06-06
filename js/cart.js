/**
 * Created by HUCC on 2018/3/28.
 */

//功能：checkbox选中功能
;(function () {

  //1. 给所有的jd_checkbox注册点击事件
  var all = document.querySelectorAll(".jd_checkbox");
  all.forEach(function (v, i) {
    v.addEventListener("click", function () {
      this.classList.toggle("checked");
    });
  });


  //2. 当title中的checkbox选中时，下面都跟着选中
  var title = document.querySelector(".goods_title .jd_checkbox");
  var contents = document.querySelectorAll(".goods_content .jd_checkbox");
  title.addEventListener("click", function () {
    //让contents跟着选中或者不选中
    contents.forEach(function (v) {

      if (title.classList.contains("checked")) {
        v.classList.add("checked");
      } else {
        v.classList.remove("checked");
      }

    });
  });


})();


//功能：点击垃圾桶功能
;(function () {

  //1. 给所有delete_box注册点击事件
  //2. 让modal显示出来
  //3. 让盖子翻起来

  //4. 取消
  var cancel = document.querySelector(".cancel");
  var confirm = document.querySelector(".confirm");

  var boxs = document.querySelectorAll(".delete_box");
  var modal = document.querySelector(".jd_modal");

  var title;//title记住永远都是翻上来的那个盖子
  var id;

  boxs.forEach(function (v) {
    v.addEventListener("click", function () {
      modal.style.display = "block";

      //找到盖子，旋转
      title = this.children[0];
      id = this.dataset.id;

      title.style.transition = "all 0.5s";
      title.style.transformOrigin = "right bottom";
      title.style.transform = "rotate(30deg)";

    });
  })


  //取消功能
  cancel.addEventListener("click", function () {
    //让盖子翻回去

    //模态框隐藏
    modal.style.display = "none";

    title.style.transformOrigin = "right bottom";
    title.style.transform = "rotate(0deg)";

  });

  confirm.addEventListener("click", function () {
    //找到对应的div，删除他
    var div = document.getElementById(id);

    //删除div
    div.parentNode.removeChild(div);


    //模态框隐藏
    modal.style.display = "none";
  });


})();