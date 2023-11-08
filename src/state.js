import { observe } from './observe';

export default function(Vue) {
  // 将$data 代理到 this._data 上来
  Object.defineProperty(Vue.prototype, '$data', {
    get() {
      return this._data;
    },
    set(newData) {
      if (newData !== this._data) {
        this._setData(newData);
      }
    }
  });

  Vue.prototype._initState = function() {
    this._initData();
  };

  Vue.prototype._initData = function() {
    // this.$options 即 创建实例时的options
    const dataFn = this.$options.data; // Vue建议是function 而不是 对象形式

    // 判断是方法还是对象，都不是则赋空对象{}; 同时给 this._data 定义；
    const data = (this._data = dataFn
      ? typeof dataFn == 'function'
        ? dataFn()
        : dataFn
      : {});

    const keys = Object.keys(data);

    let i = keys.length;
    let key;

    while (i--) {
      key = keys[i];
      this._proxy(key); // 代理 数据中的key
    }

    // observe data; // todo 待实现
    observe(data, this);
  };

  // 代理数据中的可以，代理到 _data 上
  Vue.prototype._proxy = function(key) {
    const self = this;

    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter() {
        return self._data[key];
      },
      set: function proxySetter(val) {
        self._data[key] = val;
      }
    });
  };
}
