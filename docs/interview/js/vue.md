# Vue

## Vue 是什么

一款基于 MVVM 的前端框架

### Vue 核心特性

1. MVVM

MVVM 是 Model、View 和 ViewModel 的缩写

    - Model即模型层，包括业务逻辑和与服务器端的交互

    - View及视图层，一般指UI页面

    - ViewModel视图模型层，负责连接Model和View

2. 组件化

组件就是一系列 UI 和逻辑的集合，每个 vue 文件可以认为是一个组件。

组件化的优势：

    - 降低系统耦合度

    - 利于调试

    - 提升开发效率

3. 指令

常见的指令包括：

    - v-model，用于数据双向绑定

    - v-on，用于事件绑定

    - v-bind，用于属性绑定

    - v-if，用于控制是否显示

    - v-for，用于列表循环

### Vue 与传统开发的区别

传统 JQuery 是通过获取 DOM、操作 DOM、更新 DOM 完成交互，Vue 是通过修改数据，触发 V-DOM 更新，由 Vue 帮助我们更新 DOM，并不直接获取和操作 DOM。

## 什么是数据双向绑定

区别于数据单向绑定我们用 JavaScript 代码修改 Model 层的数据，View 层自动更新；双向绑定在用户操作 View 层时，也会动态更新 Model 层中的数据。

### 双向绑定的原理

MVVM 的 ViewModel 层，在数据变化后更新 View 层，在视图变化后更新 Model 层

### 双向绑定的实现

1. `new Vue()`首先执行初始化，对`data`执行响应化处理，这个过程发生`Observer`中

2. 同时对模板执行编译，找到其中动态绑定的数据，从`data`中获取并初始化视图，这个过程发生在`Compiler`中

3. 同时定义⼀个更新函数和`Watcher`，将来对应数据变化时`Watcher`会调用更新函数

4. 由于`data`的某个`key`在⼀个视图中可能出现多次，所以每个`key`都需要⼀个管家`Dep`来管理多个`Watcher`

5. 将来 data 中数据⼀旦发生变化，会首先找到对应的`Dep`，通知所有`Watcher`执行更新函数

```javascript
class Vue {
  constructor(options) {
    this.$vm = options;
    this.$data = options.data;

    observe(this.$data);
    proxy(this);
    new Compiler(options.el, this);
  }
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  new Observer(obj);
}

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(this.value);
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function defineReactive(obj, key, val) {
  this.observe(val);
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }

      dep.notify();
    },
  });
}

class Compiler {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (isNoneTemplateElement(node)) {
        // ...
      } else if (isTempleteElement(node)) {
        // ...
      }
    });

    if (node.childNodes && node.childNodes.length > 0) {
      this.compile(node);
    }
  }

  isNoneTemplateElement(el) {
    return el.nodeType === 1;
  }

  isTemplateElement(el) {
    return el.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}

class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updater;

    Dep.target = this;
    vm[key];
    Dep.target = null;
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((dep) => {
      dep.update();
    });
  }
}
```
