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

### 默认绑定

案例一

```javascript
var a = 10;

function foo() {
  console.log(this.a);
}

foo();
```

非严格模式，`foo`在全局作用域下进行调用，等价于`window.foo`，this 指向 window。

```bash
10
```

案例二

```javascript
'use strict';

var a = 10;

function foo() {
  console.log('this1', this);
  console.log(window.a);
  console.log(this.a);
}

console.log(window.foo);
console.log('this2', this);

foo();
```

严格模式，函数体内部的 this 指向 undefined，全局作用域下的 this 不受影响，指向 window。

```bash
f foo() {...}
this2 Window{...}
this1 undefined
10
Uncaught TypeError: Cannot read property 'a' of undefined
```

案例三

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

案例四

```javascript
var a = 1;

function foo() {
  var a = 2;
  console.log(this);
  console.log(this.a);
}

foo();
```

`foo`函数在全局作用域下执行，等价于`window.foo`，所以 this 指向 window。

```bash
Window{...}
1
```

案例五

```javascript
var a = 1;

function foo() {
  var a = 2;
  function inner() {
    console.log(this.a);
  }
  inner();
}

foo();
```

`foo`函数在全局作用域下执行，等价于`window.foo`，`inner`函数的调用者还是 window。

```bash
1
```

### 隐式绑定

案例一

```javascript
function foo() {
  console.log(this.a);
}

var obj = { a: 1, foo };
var a = 2;
obj.foo();
```

`foo`函数由 obj 调用，this 指向 obj。

```bash
1
```

### 隐式绑定的隐式丢失

```javascript
function foo() {
  console.log(this.a);
}

var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;

obj.foo();
foo2();
```

`var foo2 = obj.foo`赋值会导致 this 绑定丢失，`foo2`函数在全局作用域下执行，等价于`window.foo2`。

```bash
1
2
```

案例二

```javascript
function foo() {
  console.log(this.a);
}

var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;
var obj2 = { a: 3, foo2: obj.foo };

obj.foo();
foo2();
obj2.foo2();
```

`obj2.foo2`函数在由 obj2 调用，指向 obj2。

```bash
1
2
3
```

案例三

```javascript
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  console.log(this);
  fn();
}

var obj = { a: 1, foo };
var a = 2;

doFoo(obj.foo);
```

`obj.foo`作为`doFoo`的参数进行传递时 this 指向丢失，`obj.foo`等价于`window.foo`。

```bash
Window{...}
2
```

案例四

```javascript
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  console.log(this);
  fn();
}

var obj = { a: 1, foo };
var a = 2;
var obj2 = { a: 3, doFoo };

obj2.doFoo(obj.foo);
```

`obj.foo`作为`doFoo`的参数进行传递时 this 指向丢失。

```bash
{ a:3, doFoo: f }
2
```

案例五

```javascript
'use strict';
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  console.log(this);
  fn();
}

var obj = { a: 1, foo };
var a = 2;
var obj2 = { a: 3, doFoo };

obj2.doFoo(obj.foo);
```

严格模式，`obj.foo`作为`doFoo`的参数进行传递时 this 指向丢失，指向 undefined。

```bash
{ a:3, doFoo: f }
Uncaught TypeError: Cannot read property 'a' of undefined
```

### 显式绑定

案例一

```javascript
function foo() {
  console.log(this.a);
}

var obj = { a: 1 };
var a = 2;

foo();
foo.call(obj);
foo.apply(obj);
foo.bind(obj);
```

`foo`函数在全局作用域下执行，等价于`window.foo`，`call`和`apply`立即执行，`bind`只改变 this 指向。

```bash
2
1
1
```

案例二

```javascript
function foo() {
  console.log(this.a);
}

var a = 2;

foo.call();
foo.call(null);
foo.call(undefined);
```

call、bind 的第一个参数为空、null 和 undefined，该参数会被忽略。

```bash
2
2
2
```

案例三

```javascript
var obj1 = {
  a: 1,
};

var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a);
  },
  foo2: function () {
    setTimeout(
      function () {
        console.log(this);
        console.log(this.a);
      }.call(obj1),
      0
    );
  },
};

var a = 3;

obj2.foo1();
obj2.foo2();
```

`obj2.foo1`不是箭头函数，this 指向 obj2，`obj2.foo2`中作为 setTimeout 参数传递，本应该发生 this 指向丢失，但是 call 显式指定 this 绑定到 obj1 上。

```bash
2
{ a: 1 }
1
```

案例四

```javascript
var obj1 = {
  a: 1,
};

var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a);
  },
  foo2: function () {
    function inner() {
      console.log(this);
      console.log(this.a);
    }
    inner.call(obj1);
  },
};

var a = 3;

obj2.foo1();
obj2.foo2();
```

`inner`本指向 window，但是 call 显式指定 this 绑定到 obj1 上。

```bash
2
{ a: 1 }
1
```

案例五

```javascript
function foo() {
  console.log(this.a);
}

var obj = { a: 1 };
var a = 2;

foo();
foo.call(obj);
foo().call(obj);
```

`foo`执行结果为 undefined。

```bash
2
1
2
Uncaught TypeError: Cannot read property 'call' of undefined
```

案例六

```javascript
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}

var obj = { a: 1 };
var a = 2;

foo();
foo.call(obj);
foo().call(obj);
```

`foo`执行结果为 function。

```bash
2
1
2
1
```

案例七

```javascript
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}

var obj = { a: 1 };
var a = 2;

foo();
foo.bind(obj);
foo().bind(obj);
```

bind 只改变 this 指向不执行。

```bash
2
2
```

案例八

```javascript
function foo() {
  console.log(this.a);
  return function () {
    console.log(this.a);
  };
}

var obj = { a: 1 };
var a = 2;

foo.call(obj)();
```

首先通过 call 显式将 this 绑定到 obj 上，之后再将绑定后的函数在全局执行。

```bash
1
2
```

案例九

```javascript
var obj = {
  a: 'obj',
  foo: function () {
    console.log('foo:', this.a);
    return function () {
      console.log('inner:', this.a);
    };
  },
};

var a = 'window';
var obj2 = { a: 'obj2' };

obj.foo()();
obj.foo.call(obj2)();
obj.foo().call(obj2);
```

```bash
foo: obj
inner: window
foo: obj2
inner: window
foo: obj
inner: obj2
```

案例十

```javascript
var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a;
    return function (c) {
      console.log(this.a + b + c);
    };
  },
};

var a = 2;
var obj2 = { a: 3 };

obj.foo(a).call(obj2, 1);
obj.foo.call(obj2)(1);
```

`obj.foo(a)`，参数值为 2，所以 b 为 2，使用 call 改变 this 指向，this 指向 obj2，this.a 为 3，c 为 1。`obj.foo`使用 call 改变 this 指向，this 指向 obj2，b 为 undefined，this.a 为 3，所以 b 为 3，之后在全局作用域下调用，所以 this.a 等价于 window.a，所以 this.a 为 2。

```bash
6
6
```

案例十一

```javascript
function foo1() {
  console.log(this.a);
}

var a = 1;
var obj = {
  a: 2,
};

var foo2 = function () {
  foo1.call(obj);
};

foo2();
foo2.call(window);
```

虽然`foo2`是在全局作用域下调用，但是因为`foo1.call(obj)`使用 call 将 foo1 指向 obj，所以与 window 无关。即使通过 call 将`foo2`指向 window，也不能改变 foo1 的指向。

```bash
2
2
```

案例十二

```javascript
function foo1(b) {
  console.log(`${this.a} + ${b}`);
  return this.a + b;
}

var a = 1;
var obj = {
  a: 2,
};

var foo2 = function () {
  return foo1.call(obj, ...arguments);
};

var num = foo2(3);
console.log(num);
```

```bash
2 + 3
5
```

案例十三

```javascript
function foo(item) {
  console.log(item, this.a);
}

var obj = {
  a: 'obj',
};

var a = 'window';
var arr = [1, 2, 3];

arr.filter(function (i) {
  console.log(i, this.a);
  return i > 2;
}, obj);
```

`forEach`、`map`、`filter`函数的第二个参数可以改变 this 指向，所以这里将 this 指向 obj。

```bash
1 obj
2 obj
3 obj
```

### new 绑定

案例一

```javascript
function Person(name) {
  this.name = name;
}

var name = 'window';
var person1 = new Person('LinDaiDai');

console.log(person1.name);
```

通过 new 创建对象，this 指向对象`Person`上。

```bash
LinDaiDai
```

案例二

```javascript
function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
  };
  this.foo2 = function () {
    return function () {
      console.log(this.name);
    };
  };
}

var person1 = new Person('person1');

person1.foo1();
person1.foo2()();
```

`foo1`由 person1 调用，this 指向 person1，person1 通过 new 创建对象，指向对象 Person。`foo2()`由 window 调用，this 指向 window。

```bash
person1
undefined
```

案例三

```javascript
var name = 'window';

function Person(name) {
  this.name = name;
  this.foo = function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  };
}

var person2 = {
  name: 'person2',
  foo: function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};

var person1 = new Person('person1');
person1.foo()();
person2.foo()();
```

`person1.foo`由 person1 调用，this 指向 person1，person1 通过 new 创建对象，指向对象 Person。

```bash
person1
window
person2
window
```

案例四

```javascript
var name = 'window';

function Person(name) {
  this.name = name;
  this.foo = function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  };
}

var person1 = new Person('person1');
var person2 = new Person('person2');

person1.foo.call(person2)();
person1.foo().call(person2);
```

```bash
person2
window
person1
person2
```

### 箭头函数绑定

案例一

```javascript
var obj = {
  name: 'obj',
  foo1: () => {
    console.log(this.name);
  },
  foo2: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};

var name = 'window';

obj.foo1();
obj.foo2()();
```

`foo1`为箭头函数，指向父级作用域，obj 为对象，作用域为 window，所以`foo1`的 this 指向 window。

```bash
window
obj
obj
```

案例二

```javascript
var name = 'window';

var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log(this.name);
  },
};

var obj2 = {
  name: 'obj2',
  foo: () => {
    console.log(this.name);
  },
};

obj1.foo();
obj2.foo();
```

`obj1.foo`为普通函数，指向 obj1。`obj2.foo`为箭头函数，指向父级作用域，obj2 为对象，作用域为 window，所以`obj2.foo`的 this 指向 window。

```bash
obj1
window
```

案例三

```javascript
var name = 'window';

var obj1 = {
  name: 'obj1',
  foo: function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};

var obj2 = {
  name: 'obj2',
  foo: function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};

var obj3 = {
  name: 'obj3',
  foo: () => {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  },
};

var obj4 = {
  name: 'obj4',
  foo: () => {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  },
};

obj1.foo()();
obj2.foo()();
obj3.foo()();
obj4.foo()();
```

```bash
obj1
window
obj2
obj2
window
window
window
window
```

案例四

```javascript
var name = 'window';

function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
  };
  this.foo2 = () => {
    console.log(this.name);
  };
}

var person2 = {
  name: 'person2',
  foo2: () => {
    console.log(this.name);
  },
};
var person1 = new Person('person1');
person1.foo1();
person1.foo2();
person2.foo2();
```

`person1`为函数作用域，`person2`为普通对象，作用域为 window。

```bash
person1
person1
window
```

案例五

```javascript
var name = 'window';

function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  };
  this.foo2 = function () {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  };
  this.foo3 = () => {
    console.log(this.name);
    return function () {
      console.log(this.name);
    };
  };
  this.foo4 = () => {
    console.log(this.name);
    return () => {
      console.log(this.name);
    };
  };
}

var person1 = new Person('person1');

person1.foo1()();
person1.foo2()();
person1.foo3()();
person1.foo4()();
```

`person1`通过 new 创建对象，指向 Person。

```bash
person1
window
person1
person1
person1
window
person1
person1
```
