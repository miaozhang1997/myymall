(function () {
  var bannerNavUl = document.getElementById("banner-nav-ul");
  var menusBox = document.getElementById("menus-box");
  var bannerLis = bannerNavUl.querySelectorAll("li");
  var menus = menusBox.querySelectorAll(".menu");

  // 页面加载完毕,再触发事件
  // window.οnlοad = function () {
  // onmouseenter不冒泡,不可用
  bannerNavUl.onmouseover = function (e) {
    if (e.target.tagName.toLowerCase() == "li") {
      // 功能1:触碰的li变色
      // 1.排他-所有li都去current类名
      for (var i = 0; i < bannerLis.length; i++) {
        bannerLis[i].className = bannerLis[i].getAttribute("data-t");
      }
      // 2.触碰到的li加current类名
      // 空格 current
      e.target.className += " current";

      // 功能2:触碰的menus显示
      // 1.排他-所有menu去current类名
      for (var i = 0; i < menus.length; i++) {
        menus[i].className = "menu";
      }
      // 2.获取触碰li的data-t属性值
      var t = e.target.getAttribute("data-t");

      // 3.获取data-t属性值为t的menu;
      var themenu = document.querySelector(
        ".menus-box .menu[data-t=" + t + "]"
      );
      // 4.该menu加current类名
      themenu.className = "menu current";
    }
  };

  // 功能3:鼠标离开横幅导航区,关闭菜单栏
  // 原理:改回类名, 即去掉current类
  bannerNavUl.onmouseleave = function () {
    for (var i = 0; i < bannerLis.length; i++) {
      // 去掉li的current类
      // 利用data - t的属性值与类名一致
      bannerLis[i].className = bannerLis[i].getAttribute("data-t");
      // 去掉menu的current类;
      menus[i].className = "menu";
    }
  };
  // };
})();
// 方括号语法 -里面写表达式,获取属性值;
// getAttribute(属性名 )获取属性值
