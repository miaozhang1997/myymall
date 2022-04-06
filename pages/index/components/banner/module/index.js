import BaseSlider from "./base.js";
// import keyboard from "./keyboard.js";

// 子类继承基类/父类
class Slider extends BaseSlider {
  constructor(el, options) {
    super(el, options);
    // this.bindEvent();
  }

  // bindEvent() {
  //   keyboard.bindEvent(this);
  // }
}

export default Slider;
