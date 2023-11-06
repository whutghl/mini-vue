class Vue {
  constructor(options) {
    this.init(options);
  }

  /**
   * 初始化入口
   */

  init(options) {
    this._directives = [];
    this._watchers = [];

    const el = document.querySelector(options.el);

    options._containerAttrs = toArray(el.attributes);

    this.$options = options;

    // 合并options
    for (let k in options.methods) {
      this[k] = options.methods[k];
    }

    this._initState();

    this._compile(el, options);
  }
}

// mixins lifecycle
state(Vue);
lifecycle(Vue);

//  方便调试
window.Vue = Vue;
