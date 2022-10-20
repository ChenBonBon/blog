# this

## this 的 5 种绑定方式

1. 默认绑定

   非严格模式下 this 指向全局对象，严格模式下函数内的 this 指向 undefined。

2. 隐式绑定

   当函数引用有上下文对象时，如 obj.foo()的调用方式，foo 内的 this 指向 obj。

3. 显示绑定

   通过 call 或者 apply 方法直接指定 this 的绑定对象，如 foo.call(obj)。

4. new 构造函数绑定，this 指向新生成的对象
5. 箭头函数，this 指向的是定义该函数时，外层环境中的 this，箭头函数的 this 在定义时就决定了，不能改变

## this 案例

案例一

```javascript
'use strict';

var a = 10;

function foo() {
  console.log('this1', this);
  console.log(window.a);
  console.log(this.a);
}

console.log('this2', this);
foo();
```

由于是严格模式，所以函数体内部的 this 指向 undefined，全局作用域下的 this 不受影响，指向 window。

```bash
this2 Window {window: Window, self: Window, document: document, name: '', location: Location, …}
this1 undefined
10
Uncaught TypeError: Cannot read properties of undefined (reading 'a')
```

案例二

```javascript
let a = 10;
const b = 20;

function foo() {
  console.log(this.a);
  console.log(this.b);
}

foo();
console.log(window.a);
```

`foo`函数在全局作用域下执行，等价于`window.foo`，所以 this 指向 window。但是由于 let 与 const 声明的变量不会赋值给 window，所以均为 undefined。

```bash
undefined
undefined
undefined
```

案例三

```javascript
var a = 1;

function foo() {
  var a = 2;

  console.log(this);
  console.log(this.a);
}

foo();

var obj = {
  a: 2,
  foo,
};

obj.foo();
```

`foo`函数在全局作用域下执行，等价于`window.foo`，所以 this 指向 window。`obj.foo`函数由 obj 调用，所以 this 指向 obj。

案例四

```javascript
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a);
  },
  foo2: function () {
    setTimeout(function () {
      console.log(this);
      console.log(this.a);
    }, 0);
  },
};

var a = 3;

obj2.foo1();
obj2.foo2();
```

`obj2.foo1`和`obj2.foo2`均由 obj2 调用，`foo1`为 function 函数声明，所以不会影响 this 的指向，指向`obj2`；但是`foo2`的函数是作为 setTimeout 的参数，会发生作用域丢失的情况，所以 this 指向 window（严格模式指向 undefined）。

[其余 this 面试题](https://juejin.cn/post/6844904083707396109)
