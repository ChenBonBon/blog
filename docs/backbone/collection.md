# 集合

集合是有序的模型集。我们可以给`collection`加上`change`事件，当集合中的模型发生变化时，将会触发回调函数。

## `Backbone.Collection.extend(properties, classProperties)`

可以扩展 Backbone 的 Collection 类，创建自己的 Collection。

```javascript
const UserModel = Backbone.Model.extend({
  defaults: {
    name: 'BonBon',
    age: 29,
  },
});

const UserCollection = Backbone.Collection.extend({
  model: UserModel,
});

const user = new UserCollection({});

console.log(JSON.stringify(user));
```

这里声明了一个模型`UserModel`，声明了一个集合`UserCollection`，并指定`UserCollection`的`model`属性为`UserModel`，这样在 new 一个集合实例时，就可以得到一个包含`UserModel`默认值的实例。

## `Backbone.Collection.model`

## `Backbone.Collection.initialize`

```javascript
const DogModel = Backbone.Model.extend({
  defaults: {
    like: 'bone',
  },
});

const CatModel = Backbone.Model.extend({
  defaults: {
    like: 'fish',
  },
});

const AnimalCollection = Backbone.Collection.extend({
  model: function (attrs, options) {
    if (attrs.type === 'cat') {
      return new CatModel();
    } else {
      return new DogModel();
    }
  },
  initialize: function () {
    console.log('animal collection is initialized');
  },
});

const animal = new AnimalCollection({
  type: 'cat',
});

console.log(JSON.stringify(animal));
```

如上所示，model 可以是一个具体的 Model，也可以是一个函数，通过传入的参数来控制具体返回某个 Model 的实例。

## `Backbone.Collection.models`

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection([user1, user2]);

console.log(JSON.stringify(user.models));
```

在新建一个 collection 实例时可以传入一个 model 数组，使用 models 属性可以返回 collection 实例中的所有 model。

## `collection.add(models,options)`

可以向集合中添加一个 model 或者一个 model 数组。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection();

console.log(JSON.stringify(user.models));

user.add([user1, user2]);

console.log(JSON.stringify(user.models));
```

## `collection.remove(models,options)`

与`collection.add`相对应，可以删除一个或一组 model。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection();

console.log(JSON.stringify(user.models));

user.add([user1, user2]);

console.log(JSON.stringify(user.models));

user.remove(user1);

console.log(JSON.stringify(user.models));
```

## `collection.reset(models,options)`

可以清空 collection 中的所有 model。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection();

console.log(JSON.stringify(user.models));

user.add([user1, user2]);

console.log(JSON.stringify(user.models));

user.reset();

console.log(JSON.stringify(user.models));
```

## `collection.set(models,options)`

可以设置 collection 中一个 model 的属性，如果没有该 model，则会新增一个 model 到该 collection 中，如果现在 collection 中的 model 没有出现在提供的 model 数组中，该 model 将会被移除。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection([user1]);

console.log(JSON.stringify(user));

user1.set({
  age: 31,
});

user.set([user1, user2]);

console.log(JSON.stringify(user));
```

如上述代码所示，一开始输出`[{"name":"BonBon","age":29}]`，之后通过`user1.set`修改`user1`的`age`属性为 31，并使用`user.set`方法设置 models，`user1`的属性发生了 merge，没有的`user2`被添加进 collection。

## `collection.get(id)`

通过 id、cid 获取 collection 中的 model。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection([user1, user2]);

console.log(JSON.stringify(user.get('c1')));
```

## `collection.at(index)`

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection([user1]);

user.add(user2, {
  at: 0,
});

console.log(JSON.stringify(user));
```

可以通过`collection.at`获取某个位置的 model，也可以在`add`时指定要插入的位置。

## `collection.push(model, options)`

在 collection 尾部插入一个 model。

## `collection.pop( options)`

在 collection 尾部删除一个 model 并返回该 model。

## `collection.unshift(model, [options])`

在 collection 头部插入一个 model。

## `collection.shift(model, [options])`

在 collection 头部删除一个 model 并返回该 model。

```javascript
const UserModel = Backbone.Model.extend({});

const user1 = new UserModel({
  name: 'BonBon',
  age: 29,
});

const user2 = new UserModel({
  name: 'Karen',
  age: 28,
});

const UserCollection = Backbone.Collection.extend({
  initialize: function () {
    console.log('User collection is initialized');
  },
});

const user = new UserCollection();

user.push(user1);
user.push(user2);

console.log(JSON.stringify(user));

user.pop();

console.log(JSON.stringify(user));

user.unshift(user2);

console.log(JSON.stringify(user));

user.shift();

console.log(JSON.stringify(user));
```
