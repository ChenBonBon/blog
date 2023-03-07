# ES6

## 数组新增了哪些扩展

1. 扩展运算符
2. Array.from、Array.find、Array.findIndex、Array.fill 等方法

## 对象新增了哪些扩展

1. 解构赋值和扩展运算符
2. Object.assign、Object.keys、Object.values 等方法

## 函数新增了哪些扩展

1. 函数的参数可以设置默认值
2. 箭头函数
3. 新增 length、name 等属性

## ES6 中的 Set 和 Map

Set 是没有重复元素的集合，有 add、delete、has 等方法，Map 是键值对的集合，有 set、get、has、delete 等方法
与此同时，还有 WeakSet 和 WeakMap，与 Set 和 Map 的区别是，当 WeakSet 和 WeakMap 内部的值没有被引用时会被垃圾回收机制捕捉并回收，而 Set 和 Map 内部的值即使没有被引用也会保留在内存中。
