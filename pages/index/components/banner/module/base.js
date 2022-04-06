//原理：
//1)图片设置浮动成一行;容器设置BFC隐藏溢出内容
//2)获取图片宽度;设置每张图宽度、容器宽度
//3)根据图片索引,计算位移;使用translate3D()移动

//功能:
//1)固定时间间隔自动切换
//2)页面左右按钮前后切换

import DEFAULTS from "./defaults.js";
import ELEMENT_NODE_TYPE from "./constants.js";

// 定义基类/父类
class BaseSlider {
  // el：父元素;options：参数
  constructor(el, options) {
    // 限定传入DOM元素
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error("实例化时请传入DOM元素！");
    }
    // 实际参数：合并默认参数和用户参数
    this.options = {
      ...DEFAULTS,
      ...options,
    };

    // 获取元素
    const sliderEl = el;
    const sliderContentEl = sliderEl.querySelector(".slider-content");
    const sliderItemEls = sliderEl.querySelectorAll(".slider-item");

    //绑定this.便于在方法中使用
    // 1)元素相关
    this.sliderEl = sliderEl;
    this.sliderContentEl = sliderContentEl;
    this.sliderItemEls = sliderItemEls;

    // 2）索引相关
    this.minIndex = 0;
    this.maxIndex = sliderItemEls.length - 1;
    this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

    // 3）宽度相关
    // offsetWidth：元素的宽度，包括padding、border不包括margin
    this.itemWidth = sliderItemEls[0].offsetWidth;
    // 4)初始化
    this.init();
  }

  // 一.初始化
  init() {
    // 1.设置宽度;
    //1）设父盒子slider-content宽度
    this.setContentWidth();
    //2）设每张图slider-item宽度
    this.setItemsWidth();

    //2.切换至设定的初始索引
    this.move(this.getDistance());

    //3.开启动画
    if (this.options.animation) {
      this.openAnimation();
    }

    //4.自动切换
    if (this.options.autoplay) {
      this.openAutoplay();
    }
  }

  // 设置宽度
  //1）设父盒子slider-content宽度
  setContentWidth() {
    this.sliderContentEl.style.width = `${
      this.itemWidth * this.sliderItemEls.length
    }px`;
  }

  //2）设每张图slider-item宽度
  setItemsWidth() {
    for (const item of this.sliderItemEls) {
      item.style.width = `${this.itemWidth}px`;
    }
  }

  // 二.前后切换
  //1).切换至上一张
  prev() {
    this.to(this.currIndex - 1);
  }
  //2).切换至下一张
  next() {
    this.to(this.currIndex + 1);
  }
  //0).切换至索引对应幻灯片
  to(index) {
    index = this.getCorrectedIndex(index);

    // 若目标索引等于当前索引，则不用切换
    if (this.currIndex === index) return;
    // 否则
    this.currIndex = index;

    // 无需传参:getDistance()参数默认值是 this.currIndex
    const distance = this.getDistance();

    // 判断切换是否带动画
    if (this.options.animation) {
      this.moveWithAnimation(distance);
    } else {
      this.move(distance);
    }
  }

  // 三.自动切换(鼠标移入暂停,移出开启)

  // 1）开启自动切换
  openAutoplay() {
    const { autoplay, speed } = this.options;
    if (autoplay <= 0) return;
    // 清除已存在的定时器
    this.pauseAutoplay();

    // 开启定时器
    this.autoplayTimer = setInterval(() => {
      this.next();
    }, speed);
  }
  // 2）暂停自动切换
  pauseAutoplay() {
    clearInterval(this.autoplayTimer);
  }

  // 动画
  // 1）开启动画
  openAnimation() {
    this.sliderContentEl.classList.add("slider-animation");
  }
  // 2）关闭动画
  closeAnimation() {
    this.setAnimationSpeed(0);
  }
  // 0）设置动画切换速度
  setAnimationSpeed(speed) {
    this.sliderContentEl.style.transitionDuration = `${speed}ms`;
  }

  // 是否带动画移动
  // 1）不带动画移动
  move(distance) {
    this.sliderContentEl.style.transform = `translate3d(${distance}px,0px,0px)`;
  }
  // 2）带动画移动
  moveWithAnimation(distance) {
    this.setAnimationSpeed();
    this.move(distance);
    this.sliderContentEl.addEventListener(
      "transitionend",
      () => {
        this.closeAnimation();
      },
      false
    );
  }

  // 根据索引index，计算要移动的距离
  // 默认值：当前索引this.currIndex
  getDistance(index = this.currIndex) {
    return -this.itemWidth * index;
  }

  //矫正索引值
  // 原因：用户设置的索引可能不在最大最小之间
  getCorrectedIndex(index) {
    if (index < this.minIndex) return this.maxIndex;
    if (index > this.maxIndex) return this.minIndex;
    return index;
  }
}

export default BaseSlider;
