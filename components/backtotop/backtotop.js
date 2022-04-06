//原理:定时器驱动更改 scrollTop属性
(function () {
  var backtotop = document.getElementById("backtotop");

  // 定时器
  var timer;
  // 页面加载完毕,再触发事件
  window.οnlοad = function () {
    backtotop.onclick = function () {
      // 设表先关:防止定时器叠加
      clearInterval(timer);

      timer = setInterval(function () {
        document.documentElement.scrollTop -= 100;

        // 功能: 阻止不停自动向上拉动;
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(timer);
        }
      }, 20);
    };

    // 功能:页面未卷动隐藏按钮,卷动显示按钮
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop || window.scrollY;
      if (scrollTop == 0) {
        backtotop.style.display = "none";
      } else {
        backtotop.style.display = "block";
      }
    };
  };
})();
