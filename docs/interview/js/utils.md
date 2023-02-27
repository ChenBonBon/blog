# 常用函数

1. reduce

```javascript
/**
 * 迭代相加
 *
 * @param fn (pre, curr, index, array) => void
 * @param initialValue any
 * @return
 */
Array.prototype.myReduce = function (fn, initialValue) {
  let pre, index;
  let arr = this.slice();

  if (initialValue === undefined) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(arr[i])) {
        continue;
      }
      pre = arr[i];
      index = i + 1;
      break;
    }
  } else {
    pre = initialValue;
    index = 0;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(arr[i])) {
      continue;
    }

    pre = fn.call(null, pre, arr[i], i, this);
  }

  return pre;
};
```

2. compose

```javascript
/**
 * 组合函数
 *
 * @param list function list
 * @return
 */
function compose(list) {
  const initialValue = list.shift();

  return function (...args) {
    return list.reduce((pre, curr) => {
      return pre.then((result) => {
        return curr.call(null, result);
      });
    }, Promise.resolve(initialValue.apply(null, args)));
  };
}
```

3. flat

```javascript
Array.prototype.myFlat = function (deep = 1) {
  let arr = this;
  if (deep === 0) {
    return arr;
  }

  return arr.reduce((pre, curr) => {
    if (Array.isArray(curr)) {
      return [...pre, ...curr.myFlat(deep - 1)];
    } else {
      return [...pre, curr];
    }
  }, []);
};
```

4. map

```javascript
Array.prototype.myMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined) {
      result[i] = fn.call(context, arr[i]);
    }
  }

  return result;
};
```

5. some

```javascript
Array.prototype.mySome = function (fn) {
  let arr = Array.prototype.slice.call(this);
  let result = false;

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result = true;
      break;
    }
  }

  return result;
};
```

6. 获取对象类型

```javascript
function getDataType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
```

7. es6 模板字符串

8. 函数柯里化

9. debounce

```javascript
function debounce(fn, delay, flag) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    } else {
      if (flag) {
        fn.apply(this, args);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
```

10. throttle

```javascript
function throttle(fn, delay, flag) {
  let timer;

  return function (...args) {
    if (flag) {
      fn.apply(this, args);
      flag = false;
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
```

11. 虚拟 DOM 转真实 DOM

12. 真实 DOM 转虚拟 DOM

13. 图片懒加载

14. 请求最大并发数

15. sleep
