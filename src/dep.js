let uid = 0;

/**
 *
 */
//  一个dep 是 一个可观察对象，可以有多个指令订阅它。
export default function Dep() {
  this.id = uid++;
  this.subs = [];
}

// 当前正在评估的目标观察者。
// 这是全局唯一的，因为在任何时候只能有一个正在评估的观察者。

Dep.target = null;

// 添加一个指令订阅者

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};

// 删除一个订阅者

Dep.prototype.removeSub = function(sub) {
  this.subs.$remove(sub);
};

// 把自己当做观察者的依赖项
Dep.prototype.depend = function() {
  Dep.target.addDep(this); // Dep.targe 在哪有值的？
};

// 通知所有订阅者数据值有更新

Dep.prototype.notify = function() {
  const subs = this.subs;

  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update(); // update 在哪定义的？
  }
};
