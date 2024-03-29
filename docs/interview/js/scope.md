# 作用域

作用域是可访问变量的集合。

## 作用域类型

1. 全局作用域
2. 函数作用域
3. 块级作用域（ES6 新增）

**函数作用域**

是指声明在函数内部的变量，函数的作用域在函数定义的时候就决定了。

**块作用域**

块作用域包裹在{ }中，if 和 for 语句里面的{ }也属于块作用域，可通过 let 和 const 声明带有块级作用域的变量，该变量在指定块的作用域外无法被访问。

## var、let 和 const

1. var 定义的变量，没有块的概念，可以跨块访问, 可以变量提升
2. let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明
3. const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改，无变量提升，不可以重复声明

```javascript
function func() {
  if (true) {
    let i = 3;
  }

  console.log(i);
}

func();
```

let 声明的变量带有块级作用域，所以访问不到。

## var 与 let 案例

```javascript
var a = [];

for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}

a[0]();

var b = [];

for (let j = 0; j < 10; j++) {
  b[j] = function () {
    console.log(j);
  };
}

b[0]();
```

如上图所示，var 声明的变量发生变量提升，所以执行`a[0]`时，访问的 i 实际是全局作用域下的 i，也就是 10；而 let 声明的变量由于不会发生变量提升，所以执行`b[0]`时，访问的 j 实际是块级作用域下的 j，也就是 0。

## let 实现原理

借助闭包和函数作用域来实现块级作用域的效果。

```javascript
var a = [];

for (var i = 0; i < 10; i++) {
  (function (i) {
    a[i] = function () {
      console.log(i);
    };
  })(i);
}

a[0]();
```

如上图所示，通过立即执行函数形成闭包产生的函数作用域，让每次`console.log(i)`的值都是函数体内部的 i 值。

## 作用域链

当查找变量的时候，首先会先从当前上下文的变量对象（作用域）中查找，如果没有找到，就会从父级的执行上下文的变量对象中查找，如果还没有找到，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。
