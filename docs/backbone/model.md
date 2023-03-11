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
