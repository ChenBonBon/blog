# async/await

async/await 是一种语法糖，可以用同步的方式执行异步操作。

1. await 关键字只能用在 async 函数中，否则会报错
2. async 函数返回的是一个 Promise 对象
3. await 后可以接 Promise 也可以接普通值

## async/await 的实现

async/await 的用法如下

```javascript
function count(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index * 2);
    }, 1000);
  });
}

async function asyncCount() {
  await count(1);
  await count(2);
  await count(3);
}
```

这种写法与 generator 类似，因此我们使用 generator 来实现 async/await。

首先，async 函数的返回值是一个 Promise，generator 的返回值是{value, done}的对象，所以我们需要一个 generatorToAsync 将 generator 的返回值转成 Promise。

```javascript
function count(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index * 2);
    }, 1000);
  });
}

function* gen() {
  const num1 = yield count(1);
  const num2 = yield count(num1);
  const num3 = yield count(num2);

  return num3;
}

function generatorToAsync(generatorFunc) {
  return function () {
    return new Promise((resolve, reject) => {
      const g = generatorFunc();
      const next1 = g.next();
      next1.value.then((res1) => {
        const next2 = g.next(res1);
        next2.value.then((res2) => {
          const next3 = g.next(res2);
          next3.value.then((res3) => {
            resolve(g.next(res3).value);
          });
        });
      });
    });
  };
}

generatorToAsync(gen)();
```

现在已经基本实现了 async/await 的基本功能，只是包含一些死代码，我们可以借助 generator 的返回值中的 done 来判断是否执行完毕。

```javascript
function generatorToAsync(generatorFunc) {
  return function () {
    const gen = generatorFunc.call(this, arguments);

    return new Promise((resolve, reject) => {
      function go(key, argument) {
        let res;

        try {
          res = gen[key](argument);
        } catch (error) {
          return reject(error);
        }

        if (res.done) {
          return resolve(res.value);
        } else {
          return Promise.resolve(res.value).then(
            (value) => {
              go('next', value);
            },
            (err) => {
              go('throw', err);
            }
          );
        }
      }

      go('next');
    });
  };
}
```
