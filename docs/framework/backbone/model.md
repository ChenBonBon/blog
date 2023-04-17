# 模型

模型包含动态数据和逻辑。 逻辑，例如转换，验证，计算性能和访问控制到模式下。因为它包含的所有应用程序数据，模型也被称为 JavaScript 的应用的心脏。

## `Backbone.Model.extend(properties, [classProperties])`

可以扩展 Backbone 的 Model 类，创建自己的 Model。

## `new Model(attributes, options)`

新建 Model 实例，会调用 Model 的构造函数 initialize。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();
```

## `model.set(attribute)`

设置 Model 实例的属性。

## `model.get(attribute)`

与`model.set`相对应，获取 Model 实例的属性。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();

user.set({
  name: 'BonBon',
});

console.log(user.get('name'));
```

## `model.escape(attribute)`

与`model.get`类似，但是返回的是通过 HTML 转义的版本。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();
user.set({
  script: '<script>alert(123)</script>',
});

console.log(user.get('script'));
console.log(user.escape('script'));
```

以上代码，会分别输出`<script>alert(123)</script>`和`&lt;script&gt;alert(123)&lt;/script&gt;`。

## `model.has(attribute)`

判断 Model 实例是否拥有某个属性。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();
user.set({
  script: '<script>alert(123)</script>',
});

console.log(user.has('script'));
console.log(user.has('name'));
```

以上代码，会分别输出`true`和`false`。

## `model.unset(attribute)`

与`model.set`相反，删除 Model 实例的属性。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();
user.set({
  name: 'BonBon',
  script: '<script>alert(123)</script>',
});

user.unset('script');
console.log(user.has('script'));
console.log(user.has('name'));
```

以上代码，会分别输出`false`和`true`。

## `model.clear(options)`

用来清空 Model 实例的所有属性。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
});

const user = new UserModel();
user.set({
  name: 'BonBon',
  script: '<script>alert(123)</script>',
});

user.clear();
console.log(user.has('script'));
console.log(user.has('name'));
```

以上代码，会分别输出`false`和`false`。

## attributees

- id
- idAttribute
- cid
- attributes
- changed
- defaults

## `model.toJSON(options)`

用于将 Model 实例转为 JSON 对象。

> 当调用`JSON.stringify`方法时，实际调用的是 Model 实例的 toJSON 方法，而不是原始传入的对象。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
  toJSON: function () {
    return 123;
  },
});

const user = new UserModel();
user.set({
  name: 'BonBon',
  script: '<script>alert(123)</script>',
});

console.log(JSON.stringify(user));
```

如上述代码所示，会输出`123`而不是`{"name":"BonBon","script":"<script>alert(123)</script>"}`。

## `model.validate(attributes, options)`

## `model.validationError`

## `model.isValid()`

在调用`save`方法时`validate`方法被触发，来完成验证，如果`validate`返回错误信息，那么`save`方法会停止执行，模型的属性也不会被更改。失败的验证还会触发`invalid`事件。
如果在`set`方法中传入参数`validate：true`，作为最后一个参数，也会触发`validate`方法，完成验证。
可以使用`idValid`方法判断验证是否有报错。

```javascript
const UserModel = Backbone.Model.extend({
  initialize: function () {
    console.log('user model initialized');
  },
  validate: function (attributes) {
    if (attributes.age > 30) {
      return 'The age is too big.';
    }
  },
});

const user = new UserModel();

document.getElementById('btn').addEventListener(
  'click',
  function () {
    user.set({
      name: 'BonBon',
      age: Math.floor(Math.random() * 50),
    });
    console.log(user.get('age'));
    if (!user.isValid()) {
      console.log(user.validationError);
    }
  },
  false
);
```

如上述代码所示，`UserModel`中声明了`validate`，判断`age`属性是否大于 30。

## `model.urlRoot()`

## `model.url()`

使用`urlRoot`来设置 Model 的 url 前缀，每一个 Model 实例的 url 都将自动添加上这个前缀。

```javascript
const UserModel = Backbone.Model.extend({
  urlRoot: '/user',
});

const user = new UserModel({
  id: 'BonBon',
  age: 29,
});

console.log(user.url());
```

上述代码会输出`/user/BonBon`。

## `model.clone()`

```javascript
const UserModel = Backbone.Model.extend({
  urlRoot: '/user',
});

const user = new UserModel({
  id: 'BonBon',
  age: 29,
});

const clonedUser = user.clone();

console.log(clonedUser);
```

上述代码`clone`方法会返回一个与被克隆实例相同属性的新实例。

## `model.hasChanged(attribute)`

可以监听某个属性是否改变。

## `model.changedAttributes(attributes)`

可以获取被改变的属性。

```javascript
const UserModel = Backbone.Model.extend({
  urlRoot: '/user',
});

const user = new UserModel({
  id: 'BonBon',
  age: 29,
});

user.on('change', function () {
  console.log(user.changedAttributes());
  if (user.hasChanged('age')) {
    console.log('age has changed');
  } else {
    console.log('other has changed');
  }
});

user.set('age', 30);
user.set('sex', 'male');
```

上述代码会返回`age has changed`和`other has changed`。

## `model.isNew()`

如果没有与服务器进行交互或者设置 id，返回为 true，否则为 false。

```javascript
const UserModel = Backbone.Model.extend({});

const user = new UserModel({
  name: 'BonBon',
  age: 29,
});

console.log(user.isNew());

user.set({ id: '1' });

console.log(user.isNew());
```

## `model.previous(attribute)`

可以获取修改前的 attribute 值。

## `model.previousAttributes()`

可以获取修改前的 attributes。

```javascript
const UserModel = Backbone.Model.extend({
  urlRoot: '/user',
});

const user = new UserModel({
  id: 'BonBon',
  age: 29,
});

user.on('change:age', function (model, name) {
  console.log('previous: ', model.previous('age'), ' to ', name);
  console.log(model.previousAttributes());
});

user.set('age', 30);
```

如上所示，当 age 发生修改后， 会输出`previous: 29 to 30`和`{id: 'BonBon', age: 29}`。
