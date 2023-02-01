# Event Loop

JavaScript 是一种单线程语言，也就是说同一时间只能做一件事。

## 宏任务与微任务

JavaScript 中的任务分为宏任务与微任务两类，宏任务指的是在主线程上排队执行的任务，微任务指的是在微任务队列中的任务。

### 宏任务

Script 标签、setTimeout、setInterval、setImmediate 等

### 微任务

Promise、MutationObserver、process.nextTick

## Event Loop 执行机制

1. 代码执行过程中，宏任务和微任务放在不同的任务队列中，其中同步任务进入主线程，异步任务进入`event table`

2. 当指定的事情完成时，将`event table`中的回调函数移入`event queue`

3. 主线程的任务执行完毕后，会从`event queue`中取出回调函数并执行

```javascript
const data = [];

$.ajax({
  url: 'www.javascript.com',
  data,
  success: () => {
    console.log('发送成功!');
  },
});

console.log('代码执行结束');
```

`$.ajax` 进入`event table`并注册回调函数 success，输出`代码执行结束`，等待 ajax 的返回结果回来后，从`event table`中取出回调函数 success，并放入`event queue`中，主线程读取 success 并执行。

## setTimeout

setTimeout 可以延时执行一段代码，但是常常会发现 setTimeout 的回调函数执行的时间和我们设置的时间并不一致。

```javascript
setTimeout(() => {
  task();
}, 3000);

sleep(10000000);
```

setTimeout 进入`event table`并注册回调函数 task，之后等待 3 秒，从`event table`中取出回调函数 task，并放入`event queue`中等待执行，但是此时 sleep 函数还没有执行完毕，所以继续等待，在 sleep 函数执行完毕后，执行 task。

由上面的代码可以明白，setTimeout 的第二个参数，实际上是将回调函数从`event table`中取出放入`event queue`的时间，而不是实际执行的时间，所以一般来说 setTimeout 的回调函数执行的时间和我们设置的时间并不一致。

```javascript
console.log('先执行这里');

setTimeout(() => {
  console.log('执行啦');
}, 0);
```

但是即使是像这样将 setTimeout 的第二个参数设置为 0，也不能保证主线程执行栈为空就马上执行，根据 HTML 的标准，最低是 4 毫秒。

## setInterval

与 setTimeout 类似，setInterval 的第二个参数，也是将回调函数从`event table`中取出放入`event queue`的间隔时间。但是需要注意的是**一旦 setInterval 的回调函数 fn 执行时间超过了延迟时间 ms，那么就完全看不出来有时间间隔了。**

## Promise 和 process.nextTick

```javascript
setTimeout(function () {
  console.log('setTimeout');
});

new Promise(function (resolve) {
  console.log('promise');
}).then(function () {
  console.log('then');
});

console.log('console');
```

顺序执行，遇到 setTimeout，将 setTimeout 放入`event table`并注册回调函数`console.log('setTimeout');`，之后遇到 Promise，Promise 立即执行，then 后的函数放入`event table`。遇到`console.log('console')`，直接执行。这时第一轮宏任务执行完毕，检查`event table`，发现 then 后的函数，取出执行。之后进入第二轮宏任务，执行 setTimeout 的回调函数。

```bash
promise
console
then
setTimeout
```

```javascript
console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});

process.nextTick(function () {
  console.log('6');
});

new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});
```

- 第一轮

  - 遇到 console.log('1')，直接输出 1
  - 遇到 setTimeout，将回调函数放入宏任务`event table`
  - 遇到 process.nextTick，将回调函数放入微任务`event table`
  - 遇到 Promise，直接输出 7，并将 then 放入微任务`event table`
  - 遇到 setTimeout，将回调函数放入宏任务`event table`
  - 执行微任务 process.nextTick 输出 6 和 then 输出 8

- 第二轮

  - 执行 setTimeout 的回调，遇到 console.log('2')，直接输出 2
  - 遇到 process.nextTick，将回调函数放入微任务`event table`
  - 遇到 Promise，直接输出 4，并将 then 放入微任务`event table`
  - 执行微任务 process.nextTick 输出 3 和 then 输出 5

- 第三轮

  - 执行 setTimeout 的回调，遇到 console.log('9')，直接输出 9
  - 遇到 process.nextTick，将回调函数放入微任务`event table`
  - 遇到 Promise，直接输出 11，并将 then 放入微任务`event table`
  - 执行微任务 process.nextTick 输出 10 和 then 输出 12

```bash
1
7
6
8
2
4
3
5
9
11
10
12
```
