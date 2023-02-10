# Web Workers

JavaScript 本身是单线程语言，但是当遇到一些需要大量计算的工作时，会造成主线程阻塞，导致页面卡顿等情况，所以 HTML5 提出了 Web Workers，让用户可以新开进程处理复杂的逻辑计算。

## 在 react 中使用 Web Workers

利用 Blob 新建本地临时文件，通过`URL.createObjectURL`创建对 blob 对象的 URL 引用，这些 URL 只能在浏览器的单个实例中和同一个会话中使用。

1. 封装 createWorker 函数

```javascript
function createWorker(workerCode) {
  const blob = new Blob([`(${workerCode})()`]);

  return new Worker(URL.createObjectURL(blob));
}
```

2. 编写 worker.js

```javascript
export default function () {
  function fib(n) {
    function fib(n) {
      if (n < 2) {
        return n;
      }
      return fib(n - 1) + fib(n - 2);
    }

    return fib(n);
  }

  self.onmessage = function (e) {
    const result = fib(e.data);

    self.postMessage(result);
  };
}
```

3. 在页面中调用

```javascript
import React from 'react';
import workercode from './worker.js';

export default function WebWorkerDemo() {
  const workerRef = React.useRef();

  const calculate = (num) => {
    workerRef.current.postMessage(num);
  };

  React.useEffect(() => {
    workerRef.current = createWorker(workercode.toString());
    workerRef.current.onmessage = function (e) {
      console.log(e.data);
    };

    return () => {
      workerRef.current.terminate();
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          calculate(10);
        }}
      ></button>
    </div>
  );
}
```
