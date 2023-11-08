import {toArray} from "./util";
import state from "./state";
import lifecycle from "./lifecycle";

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

        // 合并options，这样可以使用 this.xxx() 调用 options 的method xxx
        for (let k in options.methods) {
            this[k] = options.methods[k];
        }

        this._initState();  // state 里面定义的

        this._compile(el, options); // lifecycle 里面定义的
    }
}

// mixins lifecycle
state(Vue);
lifecycle(Vue);

//  方便调试
window.Vue = Vue;
