# call、apply 和 bind

## 相同点

1. 都可以显式改变 this 指向
2. 第一个参数为 this 要指向的对象，如果为 undefined 或 null，则 this 默认指向 window。

## 区别

1. 第二个参数不同，call 和 bind 为一系列参数，apply 为参数数组。
2. call、apply 是立即执行，bind 是返回绑定 this 之后的函数，如果这个新的函数作为构造函数被调用，那么 this 不再指向传入给 bind 的第一个参数，而是指向新生成的对象。

## 判断是否为严格模式

```javascript
const isStrict = (function () {
  return !this;
})();
```

## 手写 call

```javascript
Function.prototype.call = function (context, ...args) {
  // 判断context是否为undefined或null
  if (!context || context === null) {
    context = window;
  }

  // 生成一个unique key，并将this赋值给该属性
  const key = Symbol();
  context[key] = this;

  // 通过函数调用的方式将this指向context[key]
  const result = context[key](...args);
  delete context[key];

  return result;
};
```

## 手写 apply

```javascript
Function.prototype.apply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }

  const key = Symbol();
  context[key] = this;

  const result = context[key](...args);
  delete context[key];

  return result;
};
```

## 手写 bind

```javascript
Function.prototype.bind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }

  const fn = this;
  const key = Symbol();

  const result = function (...args1) {
    if (this instanceof fn) {
      this[key] = fn;
      const res = this[key](...args1, ...args);

      delete this[key];

      return res;
    } else {
      context[key] = fn;
      const res = context[key](...args1, ...args);

      delete context[key];

      return res;
    }
  };

  result.prototype = Object.create(fn.prototype);

  return result;
};
```
