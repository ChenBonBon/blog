# Event

事件能够结合对象，并引发自定义事件即可以使用选择的所需名称绑定自定义事件。

Backbone 包含以下事件方法。

- on
- off
- trigger
- once
- listenTo
- stopListening
- listenToOnce

## `object.on(event, callback function, [context])`

通过`object.on`为 object 绑定事件，当调用`trigger`时会调用对应的`callback`。

```javascript
const user = _.extend({ name: 'BonBon' }, Backbone.Events);

user.on('print', function () {
  console.log(this.name);
});

$('#printBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print');
});
```

上述代码通过`_.extend`生成一个包含 name 和 Backbone 事件的对象，之后通过`on`方法添加一个`print`事件，为按钮`printBtn`绑定一个点击时间，点击时通过`trigger`方法触发`print`事件。

## `object.off(event, callback function, [context])`

```javascript
const user = _.extend({ name: 'BonBon', age: 29 }, Backbone.Events);

function logName() {
  console.log(this.name);
}

function logAge() {
  console.log(this.age);
}

user.on('print', logName);
user.on('print', logAge);

$('#printBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print');
});

$('#removeBtn').click(function (e) {
  e.preventDefault();
  user.off('print', logAge);
});
```

上述代码与`on`的例子类似，但是为`print`事件绑定了两个函数，分别是 logName 和 logAge，当第一次点击`printBtn`时会输出`BonBon`和`29`，点击`removeBtn`后再点击`printBtn`时，只会输出`BonBon`。

## `object.trigger(event,[args])`

```javascript
const user = _.extend({ name: 'BonBon', age: 29 }, Backbone.Events);

function logName() {
  console.log(this.name);
}

function logAge() {
  console.log(this.age);
}

function logAgePlus(toAdd = 0) {
  console.log(this.age + toAdd);
}

user.on('print', logName);
user.on('print', logAge);
user.on('print', logAgePlus);

$('#printBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print');
});

$('#addBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print', 10);
});
```

`trigger`方法的第二个参数可以指定一个传入 callback 的参数，这里`addBtn`点击时传入了一个`toAdd`参数。

## `object.once(event, callback function, [context])`

```javascript
const user = _.extend({ name: 'BonBon', age: 29 }, Backbone.Events);

function logName() {
  console.log(this.name);
}

function logAge() {
  console.log(this.age);
}

function logAgePlus(toAdd = 0) {
  console.log(this.age + toAdd);
}

user.on('print', logName);
user.on('print', logAge);
user.once('print1', logAgePlus);

$('#printBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print');
});

$('#addBtn').click(function (e) {
  e.preventDefault();
  user.trigger('print');
  user.trigger('print1', 10);
});
```

上述代码与`on`的例子类似，但是`once`方法只会执行一次就会删除事件。

## `object.listenTo(other, event, callback)`

```javascript
const user = _.extend({ name: 'BonBon', age: 29 }, Backbone.Events);
const admin = _.extend({}, Backbone.Events);

function printName() {
  console.log(this.name);
}

function printAge() {
  console.log(this.age);
}

user.on('printName', printName);
user.on('printAge', printAge);
admin.listenTo(user, 'printName', () => {
  console.log('user print name');
});

$('#printBtn').click(function (e) {
  e.preventDefault();
  user.trigger('printName');
});

$('#addBtn').click(function (e) {
  e.preventDefault();
  user.trigger('printAge');
});
```

上述代码定义了两个对象`user`和`admin`，`user`绑定了事件`printName`，`admin`监听`user`的`printName`事件是否触发。点击`printBtn`会输出`BonBon`和`user print name`，点击`addBtn`只会输出`29`。
