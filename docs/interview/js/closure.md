# 闭包

## 什么是闭包

函数引用了外部作用域的变量即形成闭包。

## 闭包常见情况

1. 函数作为返回值

2. 函数作为参数传递

## 闭包的应用场景

1. 可以让局部变量的值始终保存在内存中

2. 对内部变量进行保护，使外部访问不到

## 滥用闭包的副作用

闭包中引用的变量直到闭包被销毁时才会被垃圾回收，不合理的使用闭包，会造成内存泄露(就是该内存空间使用完毕之后未被回收)

```javascript
// 原始题目
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// 需求：将上述题目改成1s后，打印0,1,2,3,4

// 方法一，使用闭包
for (let i = 0; i < 5; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index);
    }, 1000);
  })(i);
}

// 方法二，利用setTimeout的第三个参数
for (let i = 0; i < 5; i++) {
  setTimeout(
    function (index) {
      console.log(index);
    },
    1000,
    i
  );
}

// 需求：将上述题目改成每隔1s，打印0,1,2,3,4
for (let i = 0; i < 5; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index);
    }, 1000 * i);
  })(i);
}
```
