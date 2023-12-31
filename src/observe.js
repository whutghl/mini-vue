import Dep from './dep'

function Observer(value) {
  this.vms = []; // 直接预先定义上，方便了解

  this.value = value;
  this.dep = new Dep();
  this.walk(value);
}

// 浏览每个key并将其转换为 getter/setters。只有当 值类型为Object 才有效

Observer.prototype.walk = function(obj) {
  const keys = Object.keys(obj);
  for (let i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]]);
  }
};

// 将属性转换为getter/setter，这样我们就可以发出访问/更改属性时的事件。
Observer.prototype.convert = function(key, val) {
  defineReactive(this.value, key, val);
};

// 添加所有者vm，以便在$set/$delete 发生时 我们可以通知所有者vm 代理对应key。只有当对象被观察为实例的root $data 时才有用

Observer.prototype.addVm = function(vm) {
  // (this.vms || (this.vms = [])).push(vm);
  this.vms.push(vm);
};

// observe options 里面的 data
export function observe(value, vm) {
  const ob = new Observer(value);
  ob.addVm(vm);
  return ob;
}

// 定义一个响应式的对象

export function defineReactive(obj, key, val) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable == false) {
    return;
  }

  const getter = property && property.get;
  // eslint-disable-next-line
  const setter = property && property.set;

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log(`observer.get`);
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      console.log(`observer.set:${newVal}`);
      const value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}
