# 深拷贝

## 深拷贝的方式

1. JSON.parse(JSON.stringify())

   - 缺点

   无法拷贝 函数、正则、时间格式、原型上的属性和方法等

2. 递归实现深拷贝

## 递归实现深拷贝

我们可以将深拷贝拆分成浅拷贝+递归，如果是对象就进行递归，否则直接浅拷贝。

### 浅拷贝

```javascript
function shallowClone(source) {
  const target = {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}
```

### 递归

```javascript
function deepClone(source) {
  const target = {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
```

这样，一个简单的深拷贝就完成了。但是这个深拷贝还存在一些问题：

1. 没有对传入参数进行校验
2. 对于对象的判断逻辑不严谨
3. 没有考虑数组的兼容

所以我们继续对上述深拷贝的代码进行优化。

```javascript
function isObjectNotNull(obj) {
  return typeof obj === 'object' && obj !== null;
}

function deepClone(source) {
  if (!isObjectNotNull(source)) {
    return source;
  }

  const target = Array.isArray(source) ? [] : {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObjectNotNull(source[key])) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;

  return source;
}
```

现在，我们通过一个`isObjectNotNull`函数，对参数的类型进行了判断，并且通过`Array.isArray`函数对数组进行了兼容。

但是我们知道，JSON.parse(JSON.stringify())的方式在遇到循环引用时会抛出异常，所以我们需要支持循环引用。我们有以下两种方式可以实现

1. 哈希表

当执行`deepClone`方法时进行循环检测，一旦发现循环引用，则去哈希表中取对应的值并返回。

```javascript
function deepClone(source, hash = new WeakMap()) {
  if (isObjectNotNull(source)) {
    return source;
  }

  if (hash.has(source)) {
    return hash.get(source);
  }

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  if (Object.prototype.hasOwnProperty.call(srouce, key)) {
    if (isObjectNotNull(source[key])) {
      target[key] = deepClone(source[key], hash);
    } else {
      target[key] = source[key];
    }
  }

  return target;
}
```

2. 数组

对于 ES6 我们使用了 WeakMap 进行循环检测，对于 ES5，我们可以使用数组来实现。

```javascript
function deepClone(source, uniqueList) {
  if (!isObjectNotNull) {
    return source;
  }

  if (!uniqueList) {
    uniqueList = [];
  }

  const uniqueData = find(uniqueList, source);

  if (uniqueData) {
    return uniqueData;
  }

  const target = Array.isArray(source) ? [] : {};
  uniqueList.push({
    source,
    target,
  });

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObjectNotNull(source)) {
        target[key] = deepClone(source[key], uniqueList);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}

function find(array, item) {
  for (let index = 0; index < array.length; index++) {
    if (array[index].source === item) {
      return array[index];
    }
  }

  return null;
}
```

那如果涉及到 Symbol 对象我们要如何处理呢？我们可以使用`Object.getOwnPropertySymbols`方法来获取对象上所有的 symbol 对象，如果有则遍历拷贝。

```javascript
function deepClone(source, hash = new WeakMap()) {
  if (!isObjectNotNull(source)) {
    return source;
  }

  if (hash.has(source)) {
    return hash.get(source);
  }

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  const symbolKeys = Object.getOwnPropertySymbols(source);
  if (symbolKeys.length > 0) {
    symbolKeys.forEach((symbolKey) => {
      if (isObjectNotNull(source[symbolKey])) {
        target[symbolKey] = deepClone(source[symbolKey], hash);
      } else {
        target[symbolKey] = source[symbolKey];
      }
    });
  }

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObjectNotNull(source[key])) {
        target[key] = deepClone(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
```
