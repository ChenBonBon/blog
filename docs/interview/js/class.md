# Class 类

1. JavaScript 中，生成实例对象的传统方法是通过构造函数。

```javascript
function Person(username, age) {
  this.username = username;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.username;
};
```

在 ES6 提出 Class 后，上述代码可以让对象原型的写法更加清晰、更像面向对象编程的语法。

```javascript
class Person {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }

  getName() {
    return this.username;
  }
}
```

```javascript
class Person {}
// function
typeof Person;
// true
Person === Person.prototype.Constructor;
```

但是 Class 必须使用 new 关键字进行调用，而 function 不需要 new 也可以执行。

2. Class 中定义的方法，实际上是定义在构造函数的原型上

```javascript
class Person {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }

  getName() {
    return this.username;
  }
}

const person = new Person('bonbon', 30);

// true
person.hasOwnProperty('username');
// true
person.hasOwnProperty('age');
// false
person.hasOwnProperty('getName');
// true
person.__proto__.hasOwnProperty('getName');
```

定义在 this 上的属性和方法，是定义在类的实例上的，否则都是定义在原型上。

3. 通过 static 关键字定义静态方法，静态方法只能通过类调用，不能通过实例进行调用

```javascript
class Person {
  constructor() {}
  static staticFunc() {
    return 'static';
  }
}

// static
Person.staticFunc();
const person = new Person();
// TypeError: person.staticFunc is not a function
person.staticFunc();
```

注意，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。

```javascript
class Person {
  constructor() {}

  static foo() {
    this.bar();
  }

  static bar() {
    console.log('static bar');
  }

  bar() {
    console.log('bar');
  }
}

// static bar
Person.foo();
```

父类的静态方法，可以被子类继承。

```javascript
class Child extends Person {}

// static bar
Child.foo();
```

4. 实例属性的简写写法

```javascript
class Foo {
  bar = "hello";
  baz = "world";
}

// 等同于
class Foo {
  constructor() {
    this.bar = "hello";
    this.baz = "world";
  }
}
```

5. `extends` 关键字，底层是利用的寄生组合式继承

```javascript
class Parent {
  constructor(age) {
    this.age = age;
  }

  getName() {
    console.log(this.username);
  }
}

class Child extends Parent {
  constructor(username, age) {
    super(age);
    this.username = username;
  }
}

let child = new Child('li', 16);
// li
child.getName();
```

## 手写 Class 类

```javascript
function selfClass(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype, {
    enumerable: false,
    configurable: false,
    writable: true,
    value: Child,
  });

  Object.setPropertyOf(Child, Parent);
}
```

## constructor

一个 Class 类必须有一个 constructor 方法，如果没有显式定义 constructor，那么会默认添加一个空的 constructor。

```javascript
class Person {}

// 等价于
class Person {
    constructor() {}
}
```

constructor 方法默认返回实例对象（即 this），也可以手动指定返回另一个内容。

```javascript
class Person {}

class Person1 {
  constructor() {
    return Object.create(null);
  }
}

// true
console.log(new Person() instanceof Person);
// false
console.log(new Person1() instanceof Person1);
```

可以看到，默认情况下 Person 的实例对象是 Person 的实例，而 Person1 由于 constructor 返回了一个新的对象，导致 Person1 点实例对象不是 Person1 的实例。

## 实例

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
const person1 = new Person('bonbon', 30);
const person2 = new Person('karen', 29);

// true
person1.__proto__ === person2.__proto__;

person1.__proto__.sayName = function () {
  alert(this.username);
};

const person3 = new Person('jiojio', 3);

// jiojio
person3.sayName();
```

所以，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变类的原始定义，影响到所有实例。

## ES2022

ES2022 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在 constructor()方法里面的 this 上面，也可以定义在类内部的最顶层。

```javascript
class Person {
  constructor(username, age) {
    this.username = username;
    this.age = age;
    this.work = '';
  }
}

// 等价于
class Person {
    work = ''
    constructor(username, age) {
        this.username = username;
        this.age = age;
    }
}
```

这里的 work 实际上是实例属性，而不是类的原型上的属性，这种写法一目了然，写起来也比较简洁。

## getter 和 setter

在类的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class Person {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }

  get username() {
    console.log('getter');
  }

  set username(username) {
    console.log(`setter: ${username}`);
  }
}

const person = new Person('bonbon', 30);

// setter: karen
person.username = 'karen';
// getter
person.username;
```

## 私有属性和私有方法

在 ES2022 中，使用#开头的属性和方法为私有属性和私有方法，私有属性和私有方法只能在类中使用，无法在类外部使用。

```javascript
class Person {
  #username = '';
  age = 0;

  constructor(username, age) {
    this.#username = username;
    this.age = age;
  }

  getName() {
    return this.#username;
  }
}

const person = new Person('bonbon', 30);
// bonbon
person.getName();
// 报错
person.#username
```

## in 运算符

直接访问某个类不存在的私有属性会报错，但是访问不存在的公开属性不会报错。这个特性可以用来判断，某个对象是否为类的实例。

```javascript
class Person {
  #username = '';
  age = 0;

  constructor(username, age) {
    this.#username = username;
    this.age = age;
  }

  getName() {
    return this.#username;
  }

  static isPerson(obj) {
    try {
      obj.#username;
      return true;
    } catch (err) {
      return false;
    }
  }
}
```

但是使用 try...catch 的写法很麻烦，代码可读性很差，所以 ES2022 改进了 in 运算符，使它也可以用来判断私有属性。

```javascript
class Person {
  #username = '';
  age = 0;

  constructor(username, age) {
    this.#username = username;
    this.age = age;
  }

  getName() {
    return this.#username;
  }

  static isPerson(obj) {
    if (#username in obj) {
      return true;
    }

    return false;
  }
}
```

子类从父类继承的私有属性，也可以使用 in 运算符来判断。

```javascript
class Child extends Person {}

// true
console.log(Child.isPerson(new Child()));
```

但是对于使用 Object.create、Object.setPropertyOf 形成的继承，是无效的，因为这种继承不会传递私有属性。

```javascript
const child = new Child();

const child1 = Object.create(child);
const child2 = Object.setPropertyOf({}, child);

// true
console.log(Child.isPerson(new Child()));
// false
console.log(Child.isPerson(child1));
// true
console.log(Child.isPerson(child1.__proto__);
// false
console.log(Child.isPerson(child2));
// true
console.log(Child.isPerson(child2.__proto__));
```
