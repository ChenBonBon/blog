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

## v-show 和 v-if

### v-show 和 v-if 的共同点

都可以控制元素的显示和隐藏，使用方法也是一样。

### v-show 和 v-if 的区别

v-show 是通过切换 css display 的方式来控制显示和隐藏，v-if 是通过挂载、卸载 DOM 节点的方式来控制显示和隐藏。v-show 有更高的初始渲染消耗，v-if 有更高的切换消耗。

### v-show 和 v-if 的原理

v-show 是判断是否有 transition，如果有 transtion 则优先执行 transition，之后根据 v-show 的值来控制 display 为 none 还是空；
v-if 是返回一个 render 函数，根据 v-if 的值来控制 render 函数渲染的内容。

### v-show 和 v-if 的使用场景

需要频繁切换的使用 v-show，不需要频繁切换的使用 v-if。

## Vue 实例挂载的过程

1. 调用\_init 方法
   - 定义$set、$get、$delete、$watch 等方法
   - 定义$on、$off、$emit 等事件
   - 定义\_update、$beforeDestory 等生命周期
2. 调用$mount 方法进行页面的挂载
3. 定义 updateComponent 函数
4. 执行 render 方法生成虚拟 DOM
5. \_update 方法将虚拟 DOM 生成真实 DOM 并渲染到页面

## Vue 的生命周期

### 什么是生命周期

Vue 实例从创建到销毁的整个过程。

### Vue 有哪些生命周期

beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestory、destoryed、actived、deactived、errorCaptured

### Vue 生命周期的具体流程

1. beforeCreate

初始化实例，进行 initData 和 initMethod。

2. created

data 和 method 初始化完成，可以访问，vm.$el 不可访问。

3. beforeMount

将 template 编译为虚拟 DOM，此时 vm.$el 依然为旧的 DOM 节点。

4. mounted

将编译好的虚拟 DOM 生成为真实 DOM 并渲染到页面，此时 vm.$el 已经变为新的 DOM 节点。

5. beforeUpdate

与 beforeMount 类似，要更新到内容编译为虚拟 DOM，在 beforeUpdate 阶段修改数据，不会再次触发 beforeUpdate。

6. updated

与 mounted 类似，vm.$el 变为更新后的 DOM 节点，在 updated 阶段修改数据，会再次触发 beforeUpdate。

7. beforeDestory

销毁实例之前，此时所有实例的属性和方法均可访问。

8. destoryed

完全销毁实例之后，此时实例的属性和方法不可访问，绑定的事件监听器全部清除，但是仅仅销毁了实例，并不能清除 DOM。

### 数据请求放在 created 和 mounted 的区别

created 和 mounted 阶段均可访问实例的 data 和 method，但是 mounted 阶段由于 DOM 已经渲染完成，所以接口数据返回后可能会导致页面的重新渲染或闪动，所以建议放在 created 中。

## 为什么 v-if 和 v-for 不建议一起使用

因为 v-if 和 v-for 放在同一个标签中时，v-for 的优先级会高于 v-if，导致每次条件判断之前都会进行循环，造成不必要的性能浪费。如果需要 v-if 的优先级高于 v-for，可以在 v-for 的标签外包一层 template，对 template 使用 v-if，如果条件判断在 v-for 内部，则可以通过 computed 计算是否满足条件。

## 为什么 data 属性是一个函数而不是对象

Vue 实例定义 data 属性时可以是函数也可以是对象，但是组件实例定义 data 属性只能是函数，原因是 Vue 实例为单例模式，不会出现数据污染的情况；而组件实例不能是单例模式，必须每次返回一个全新的 data 对象，所以必须使用函数的形式。

## Vue 中给对象添加一个新属性页面没有同步更新

因为 Vue2 中是通过`Object.defineProperty`的方式实现响应式的，对于一个对象上没有的属性，getter 与 setter 自然无法响应，所以页面不会同步更新。
可以使用 Vue.set、Object.assign 和 forceUpdate 解决。
对于 Vue3 而言，由于使用 Proxy 实现响应式，所以不存在新增属性页面不同步的情况。
