import "./banner.css";
import "./menu.js";
import Slider from "./module";

// 渲染函数render:生成实际节点Node,无需编译,直接渲染
// template:生成虚拟节点VNode,需要先编译
// 导入模板
// import render from "./banner.art";
// // components-index-pages-src
// import { getData } from "../../../../api/getData";
// import { URL } from "./config";

// 获取元素
const sliderEl = document.getElementById("slider");
const leftbtnEl = document.getElementById("left_btn");
const rightbtnEl = document.getElementById("right_btn");

// 通过URL发送数据,服务器响应
// 获取到data
// getData(URL).then((data) => {
//   //获取到数组
//   //不同图片的地址 { url: "http://alimc" }
//   // render()参数以对象形式传入
//   sliderEl.innerHTML = render({ items: data });
// });

// 实例化
const slider = new Slider(document.querySelector(".slider"), {
  initialIndex: 0,
  animation: true,
  speed: 1000,
  autoplay: 0,
});

// 绑定事件
// 点左按钮切换到上一张
leftbtnEl.addEventListener(
  "click",
  () => {
    slider.prev();
  },
  false
);
// 点右按钮切换到下一张
rightbtnEl.addEventListener(
  "click",
  () => {
    slider.next();
  },
  false
);

// 鼠标移入幻灯片暂停自动播放
sliderEl.addEventListener(
  "mouseenter",
  () => {
    slider.pauseAutoplay();
  },
  false
);
// 鼠标移出幻灯片继续自动播放;
sliderEl.addEventListener(
  "mouseleave",
  () => {
    slider.openAutoplay();
  },
  false
);
