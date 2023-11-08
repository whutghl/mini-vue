import { extend } from './util.js';
import Watcher from './watcher';

export default function Directive(descriptor, vm, el) {
  this.descriptor = descriptor;
  this.vm = vm;
  this.el = el;
  this.expression = descriptor.expression;
}

Directive.prototype.bind = function() {
  const def = this.descriptor.def;
  if (typeof def === 'function') {
    this.update = def;
  } else {
    extend(this, def);
  }

  if (this.bind) {
    this.bind();
  }
  if (this.update) {
    this.update();
  }

  if (this.update) {
    const dir = this;

    this._update = function(val, oldVal) {
      dir.update(val, oldVal);
    };
  } else {
    this._update = function() {
    };
  }

  const watcher = this._watch = new Watcher(
    this.vm,
    this.expression,
    this._update
  );

  // 具有初始内联值的 v-model 需要将值同步回模型而不是在初始化时更新到 DOM。它们会设置 afterBind 钩子函数来指示这一点。
  if (this.update) {
    this.update(watcher.value);
  }
};
