# JavaScript 基础

## 数据类型

- string
- number
- boolean
- undeined
- null
- object
- symbol

其中除了 object 为引用类型，其他为基本类型。

## 数组常用方法

- shift
- unshift
- push
- pop
- find
- findIndex
- forEach
- map
- slice
- concat
- join

## 字符串常用方法

- substr
- substring
- split
- concat
- charAt
- charCodeAt
- indexOf
- lastIndexOf

## 类型转换机制

1. 显式转换

- Number
  - true 为 1， false 为 0
  - 字符串为数字转为对应数字，否则为 NaN
  - undeined 转为 NaN
  - null 转为 null
  - symbol 无法进行转换
  - object 只有数组为空或者数组中只有一个可转为数字的元素时可以转换，其余均为 NaN
- parseInt、parseFloat
  - 只能转字符串，且字符串中必须以数字开头
- Boolean
  - 非空字符串为 1，空字符串为 0
  - 数字 0 位 false，其余为 1
  - null 为 false
  - undefined 为 false
  - object 为 true
  - NaN 为 false
- String
  - 数字为对应数字的字符串
  - true 和 false 为'true'和'false'
  - undefined 为'undefined'
  - null 为'null'
  - object 如果为空数组，为空字符串，如果数组中有值，则为打平之后用逗号分隔的字符串，如果为对象，为'[object Object]'
  - symbol 为'Symbol'

2. 隐式转换

- 加号在遇到字符串时，会将加号两边都隐式转换为字符串，其余运算符均为数字类型
- 在 if、switch 等条件语句中，会自动转为 boolean 值

## ==和===有什么区别

==两侧的算子类型不一致时会发生隐式转换，一致时与===行为一致，===两侧等算子类型不一致时不会发生隐式转换，直接返回 false。

## 事件与事件流

前端页面的与用户的各种交互都依赖于事件机制，其中事件触发时是有顺序的，这种顺序被称为事件流，事件流包括捕获阶段、目标阶段和冒泡阶段。

- 捕获阶段，从最外层最顶端节点依次向下触发，直到绑定事件的节点
- 冒泡阶段与捕获阶段相反，从触发的节点依次向上触发，直到最外层最顶端节点

### 事件模型

1. DOM 0
   - 直接绑定，如`<button onclick="add">Add</button>`
   - 通过 JS 绑定，如`document.getElementById('add').onclick=add`
2. DOM 2
   通过`document.addEventListener()`进行事件绑定，第一个参数为事件名，第二个参数为 handler，第三个参数为是否在捕获阶段触发，一般设置为 false 与 IE 保持一致
3. IE 事件模型
   使用`attachEvent`进行事件绑定

## 事件代理

利用事件冒泡阶段，将原本绑定在节点上的事件绑定到更高一层的节点上。

### 应用场景

```javascript
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>;

document.getElementById('list').addEventListener(
  'click',
  (e) => {
    // ...
  },
  false
);
```

### 优点

1. 减少代码量
2. 提高性能

## Ajax

### 什么是 Ajax

Async JavaScript and XML，即异步的 JavaScript 和 XML，可以在不刷新页面的情况下与服务器进行交互。

### 实现过程

1. 创建 XMLHttpRequest 对象
2. 利用 XMLHttpRequest 对象提供的 open 方法，创建与服务器的连接
3. 利用 XMLHttpRequest 对象提供的 send 方法，向服务器发送数据
4. 使用 XMLHttpRequest 对象提供的 onreadystatechange 方法监听服务器的响应

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = (e) => {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // ...
    } else {
      // ...
    }
  }
};

xhr.open('GET', 'url');
xhr.send();
```

### 封装 Ajax

```javascript
function ajax(options) {
  const { method, url, success, fail } = options;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        success(xhr.responseText, xhr.responseXML);
      } else {
        fail(xhr.status);
      }
    }
  };

  if (method === 'GET' || method === 'get') {
    if (options.params) {
      xhr.open('GET', `${url}?${options.params}`);
    } else {
      xhr.open('GET', url);
    }

    xhr.send(null);
  } else {
    xhr.open(method.toUpperCase(), url);
    xhr.send(options.data || {});
  }
}
```

## 正则表达式

是用来匹配字符串的规则，可以用字符串的方式创建，也可以用 new RegExp 的方式创建。

### 匹配规则

1. \ 转义符
2. ^ 匹配的开头
3. $ 匹配的结束
4. \* 匹配 0 次或多次
5. \+ 匹配 1 次或多次
6. ? 匹配 0 次或 1 次
7. . 匹配除换行符外的任意字符
8. x(?=y) 先行断言，当 x 的后面跟着 y 时匹配
9. (?<=y)x 后行断言，当 x 的前面是 y 时匹配
10. x(?!=y) 先行否定查找，当 x 的后面不跟着 y 时匹配
11. (?<!y)x 后行否定查找，当 x 的前面不是 y 时匹配
12. x|y x 或者 y
13. {n} 匹配前面的字符出现 n 次
14. {n, } 匹配前面的字符至少出现了 n 次
15. {n, m} 匹配前面的字符出现了 n 至 m 次
16. \[xyz] 匹配括号中的任意字符
17. \[!xyz] 匹配不在括号中的任意字符
18. \\b 匹配单词边界
19. \\B 匹配非单词边界
20. \\d 匹配数字
21. \\D 匹配非数字
22. \\f 匹配换页符
23. \\n 匹配换行符
24. \\r 匹配回车
25. \\s 匹配空白字符
26. \\S 匹配非空白字符
27. \\w 匹配字符
28. \\W 匹配一个非单字字符

### 正则表达式标记

1. g 全局匹配
2. i 不区分大小写
3. m 多行搜索
4. s 允许.匹配换行符
5. u 使用 unicode 进行匹配
6. y 执行粘性搜索，匹配从字符串的当前位置开始

### 贪婪模式

`const reg = /ab{1,3}c/`，贪婪模式会从多到少进行匹配，先判断是否有 abbbc，然后判断是否有 abbc，最后判断是否有 abc。

### 懒惰模式

`const reg = /ab{1,3}?c/`，懒惰模式会从少往多进行匹配，先判断是否有 abc，然后判断是否有 abbc，最后判断是否有 abbbc。

### 分组

使用()包裹住需要分组的匹配项。

### 匹配方法

1. str.match
2. str.matchAll
3. str.search
4. str.replace
5. str.split
6. reg.exec
7. reg.test

### 常用正则

1. 验证 QQ 合法性（5~15 位、全是数字、不以 0 开头）

```javascript
const reg = /^[1-9]{1}[0-9]{4, 14}$/;
```

2. 校验用户账号合法性（只能输入 5-20 个以字母开头、可带数字、“\_”、“.”的字串）

```javascript
const reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_.]){4, 19}$/;
```

## 常见的 DOM 操作

### 创建节点

1. document.createElement
2. document.createTextNode
3. document.createDocumentFragment
4. document.createAttribute

### 获取节点

1. document.querySelector
2. document.querySelectorAll
3. document.getElementById
4. document.getElementsByClassName

### 新增节点

1. 直接修改 innerHTML
2. appendChild
3. insertBefore

### 更新节点

1. 修改 innerHTML
2. 修改 innerText、contentText
3. 修改 attributes
4. 修改 style

### 删除节点

1. removeChild

## 常见的 BOM 操作

### window

1. window.open
2. window.close
3. window.moveTo
4. window.resizeTo

### location

1. location.href
2. location.host
3. location.hostname
4. location.port
5. locaation.hash
6. location.search
7. location.reload

### navigator

1. navigator.userAgent
2. navigator.geolocation
3. navigator.appName
4. navigator.oscpu

### screen

1. screen.width
2. screen.height
3. screen.top
4. screen.left
5. screen.orientation

### history

1. history.go
2. history.back
3. history.forward

## 内存泄漏

1. 全局变量过多
2. 未使用的定时器没有及时回收
3. 在闭包中申请了大量内存且没有及时回收
4. DOM 元素的属性指向一个对象
5. console

## 本地存储

1. cookie
   - 大小只有 4KB
   - 没有 API，获取、修改比较麻烦
   - 接口请求时会自动发送至服务器端
   - 可以设置 max-age、expires、domain 和 path
2. localStorage
   - 大小约为 5MB，与浏览器有关
   - 有 setItem、getItem、removeItem、clear 等 API
   - 只能存储字符串
   - 不会过期
3. sessionStorage
   - 与 localStorage 相同，除了有效期，当页面关闭时清除
4. indexDB
   - 大小理论上无限大
   - 有 API 可供使用
   - 可以存储 JS 对象
   - 整体使用与 node 调用数据库类似，相对较为繁琐
