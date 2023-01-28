# Promise

## Promise 的声明

首先 Promise 是一个类，constructor 可以传入一个 executor，executor 是一个函数，包含两个参数，第一个是一个 resolve 函数，第二个是一个 reject 函数。

```javascript
class Promise {
  constructor(excutor) {
    let resolve = () => {};
    let reject = () => {};

    excutor(resolve, reject);
  }
}
```

## Promise 的基本状态

1. Promise 包括三种状态，pending、fulfilled 和 rejected。

2. pending 为初始状态，pending 可以转化为 fulfilled 和 rejected。

3. fulfilled 后不可转化为其他状态，且必须有一个不可改变的值。

4. rejected 后不可转化为其他状态，且必须有一个不可改变的原因。

5. resolve 为成功，接收参数 value，状态改变为 fulfilled，不可再次改变。

6. reject 为失败，接收参数 reason，状态改变为 rejected，不可再次改变。

7. 若是 executor 函数报错，直接执行 reject;

```javascript
class Promise {
  constructor(excutor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    };

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    };

    try {
      excutor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}
```

## then 方法

Promise 有一个 then 方法，第一个参数是 onFulfilled 函数，第二个参数是 onRejected 函数，当状态为 fulfilled，则执行 onFulfilled，传入 this.value。当状态为 rejected，则执行 onRejected，传入 this.reason。

```javascript
class Promise {
  constructor(excutor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    };

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    };

    try {
      excutor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    }
    if (this.state === 'rejected') {
      onRejected(this.reason);
    }
  }
}
```

## 解决异步情况

在 then 调用时，将 onFulfilled 和 onRejected 函数保存到数组中，一旦 resolve 或 reject，对数组中的函数进行遍历执行。

```javascript
class Promise {
  constructor(excutor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.fulfilledCallbacks.forEach((callback) => callback());
      }
    };

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.rejectedCallbacks.forEach((callback) => callback());
      }
    };

    try {
      excutor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'resolved') {
      onFulfilled(this.value);
    }

    if (this.state === 'rejected') {
      onRejected(this.reason);
    }

    if (this.state === 'pending') {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

## 链式调用

1. 为了实现链式调用，我们默认在第一个 then 里面返回一个新的 Promise。

2. 当我们在第一个 then 中 return 了一个参数，return 的新的 Promise 就是 onFulfilled 或 onRejected 的值。这个值被称为 x，需要通过 resolvePromise 函数进行判断。

### resolvePromise

1. 判断 x 是否为 Promise

2. 如果是 Promise，则将它的结果作为 promise2 成功的结果

3. 如果是普通值，则直接作为 promise2 成功的结果

4. resolvePromise 的参数包括 promise2、x、resolve 和 reject

5. resolve 和 reject 是 promise2 的

```javascript
class Promise {
  constructor(excutor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback);
      }
    };

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback);
      }
    };

    try {
      excutor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    onFulfilled =
      typeof onFulFilled === 'function' ? onFulFilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resoslvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === 'pending') {
        this.onFulFilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}
```

基于上述的框架，完善 resolvePromise 函数。

1. 如果 promise2 === x，则会造成循环引用，应报“循环引用”错误。

2. 判断 x
   - x 不能为 null
   - x 如果是普通值，直接 resolve
   - x 为函数或对象，则 let then = x.then
   - 如果获取 x.then 报错，则 reject
   - 如果 then 是一个函数，则通过 call 执行
   - 如果成功的回调是 Promise，则递归执行 resolvePromise
   - 无论是成功还是失败，都只能执行一次

```javascript
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  let called;

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, x, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

## Promise.race 和 Promise.all

### race

```javascript
class Promise {
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        Promise.resolve(promises[index])
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }
    });
  }
}
```

### all

```javascript
class Promise {
  static all(promises) {
    let results = [];
    let index = 0;

    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i])
          .then((res) => {
            results[i] = res;
            index++;
            if (index === promises.length) {
              resolve(results);
            }
          })
          .catch((err) => reject(err));
      }
    });
  }
}
```

## retry

```javascript
function retry(fn, delay, times) {
  return new Promise((resolve, reject) => {
    function func() {
      Promise.resolve(fn())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (times !== 0) {
            setTimeout(func, delay);
            times--;
          } else {
            reject(err);
          }
        });
    }

    func();
  });
}
```
