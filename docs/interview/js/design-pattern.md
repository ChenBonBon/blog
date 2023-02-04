# 设计模式

设计模式是从许多优秀的软件系统中总结出的成功的、能够实现可维护性、复用的设计方案，使用这些方案将可以让我们避免做一些重复性的工作。

## 常见的 JavaScript 设计模式

- 外观模式
- 代理模式
- 工厂模式
- 单例模式
- 策略模式
- 迭代器模式
- 观察者模式
- 中介者模式
- 访问者模式

### 外观模式

通过将多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的 API。如 jQuery 的 DOM 操作。

```javascript
function addEvent(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, handler);
  } else {
    element['on' + event] = handler;
  }
}

function removeEvent(element, event, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(event, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, handler);
  } else {
    element['on' + event] = null;
  }
}
```

### 代理模式

当访问一个对象本身的代价太高或者需要增加额外的逻辑又不修改对象本身时便可以使用代理。

```javascript
class Stock {
  constructor() {}

  getValue(stock, callback) {
    setTimeout(() => {
      switch (stock) {
        case 'GOOGL':
          callback('$1265.23');
          break;
        case 'AAPL':
          callback('$287.05');
          break;
        case 'MSFT':
          callback('$173.70');
          break;
        default:
          callback('');
      }
    }, 2000);
  }
}

class StockProxy {
  constructor() {
    this.cache = new Map();
  }

  getValue(stock, callback) {
    if (this.cache.has(stock)) {
      callback(this.cache.get(stock));
    } else {
      new Stock().getValue(stock, (value) => {
        this.cache.set(stock, value);
        callback(value);
      });
    }
  }
}

const stock = new StockProxy();

stock.getValue('GOOGL', (value) => {
  console.log(value);
});

setTimeout(() => {
  stock.getValue('GOOGL', (value) => {
    console.log(value);
  });
}, 3000);
```

### 工厂模式

当构造函数过多，同时每个构造函数之间有一些共通点，可以使用工厂模式来管理。

```javascript
class Dog {
  constructor(name) {
    this.name = name;
    this.type = 'dog';
  }
}

class Cat {
  constructor(name) {
    this.name = name;
    this.type = 'cat';
  }
}

class Tiger {
  constructor(name) {
    this.name = name;
    this.type = 'tiger';
  }
}

class Animal {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  create() {
    switch (this.type) {
      case 'dog':
        return new Dog(this.name);
      case 'cat':
        return new Cat(this.name);
      case 'tiger':
        return new Tiger(this.name);
    }
  }
}
```

### 单例模式

一个类只有一个实例，一般情况下先判断实例是否存在，如果存在直接返回，否则先创建再返回。如 jQuery、Message 等。

```javascript
class Singleton {
  this.instance = null;

  constructor(name) {
    this.name = name;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton('ins');
    }

    return this.instance;
  }
}
```

### 策略模式

对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。如鉴权、表单校验等。

```javascript
class Login {
  constructor(strategy) {
    this.strategy = strategy;
    this.login = strategy.login;
  }
}

class LoginWithUsernameStrategy {
  constructor(username, password) {
    this.login = () => {
      console.log(username, password);
    };
  }
}

class LoginWithPhoneStrategy {
  constructor(phone, code) {
    this.login = () => {
      console.log(phone, code);
    };
  }
}

class LoginWithSSOStrategy {
  constructor(id, secret) {
    this.login = () => {
      console.log(id, secret);
    };
  }
}

app.use('/login', (req, res) => {
  const loginController = new Login(new LoginWithUsernameStrategy(req.body));
  loginController.login();
});
```

### 迭代器模式

迭代器模式提供一致的遍历各种数据结构的方式，而不用关心内部的具体构造。一般需要包括`hasNext`方法和`next`方法。

```javascript
class Iterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.items.length;
  }

  next() {
    this.index++;
    return this.items[this.index];
  }
}
```

### 观察者模式

观察者模式又被称为发布/订阅模式，被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者。

```javascript
class Subject {
  constructor(observers) {
    this.observers = observers;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  fire() {
    this.observers.forEach((observer) => {
      observer.call();
    });
  }
}
```

### 中介者模式

中介者（Mediator）包装了一系列对象相互作用的方式，使得这些对象不必直接相互作用，而是由中介者协调它们之间的交互，从而使它们可以松散偶合。如聊天室等。

```javascript
class Chatroom {
  constructor(members) {
    this.members = members;
  }

  addMember(member) {
    this.members.push(member);
  }

  send(from, to, message) {
    to.receive(from, message);
  }
}

class ChatMember {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  send(to, message) {
    this.chatroom.send(this.name, to, message);
  }

  receive(from, message) {
    console.log(`${from}: ${message}`);
  }
}
```

### 访问者模式

访问者模式让我们能够在不改变一个对象结构的前提下能够给该对象增加新的逻辑，新增的逻辑保存在一个独立的访问者对象中。包括 Visitor、Reciever、visit 方法和 accept 方法。

```javascript
class Visitor {
  constructor() {}

  visit(reciever, name) {
    reciever.setName(name);
  }
}

class Reciever {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}
```
