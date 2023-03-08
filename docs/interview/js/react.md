# React

## React 为什么使用 JSX

1. JSX 是一种类似于 HTML 结构的结构化标签树结构，是 React 的推荐写法，但是 React 不强制依赖 JSX，因为在编译过程中 Babel 会讲 JSX 转换为 React.createElement。
2. JSX 由于采用了结构化标签树结构，所以可读性较好
3. 相比于模板，JSX 更为简洁，不需要过度关注模板指令和语法；而模版字符串和 JXON 的可读性和语法提示相比于 JSX 较差，不利于开发效率

## Babel 是如何处理 JSX 的

1. parse，通过 parser 将 JSX 转为 AST
2. transform，遍历 AST，通过词法分析、语法分析、调用插件等，生成新的 AST
3. generate，将新生成的 AST 转换为 JavaScript 代码，并生成 sourcemap

### parse 阶段

将 JSX 代码转为 AST，该过程包括词法分析、语法分析。

```javascript
let name = 'bonbon';
```

上述代码通过词法分析，会包括`关键字 let`、`标识符 name`、`符号 =`， `字符串 bonbon`、`符号 ;`，生成 token 流，即词法分析的数组。

```javascript
[
  {
    type: 'Keywrod',
    value: 'let',
  },
  {
    type: 'Identifier',
    value: 'name',
  },
  {
    type: 'Punctuator',
    value: '=',
  },
  {
    type: 'String',
    value: 'bonbon',
  },
  {
    type: 'Punctuator',
    value: ';',
  },
];
```

将 token 流进行递归组装成 AST，即语法分析。

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclaration",
          "id": {
            "type": "Identifier",
            "name": "name"
          },
          "init": {
            "type": "Literal",
            "value": "bonbon",
            "raw": "\"bonbon\""
          }
        }
      ],
      "kind": "let"
    }
  ],
  "sourceType": "module"
}
```

之后将进入 transform 阶段。

### transform 阶段

transform 阶段主要是遍历 AST 和调用插件。

一个 babel 插件一般如下面的格式，其中 pre 和 post 方法分别在遍历前后调用。

```javascript
module.export = (babel) => {
  return {
    pre(path) {},
    visitor() {},
    post(path) {},
  };
};
```

在 visitor 函数里，可以对 AST 进行增删改查，最终生成新的 AST 和 sourcemap。对 AST 的操作方法位于`@babel/traverse`包中。

之后将进入 generate 阶段。

### generate 阶段

进入 generate 阶段后，会将 transform 阶段得到的新的 AST 从根节点开始递归遍历，转换成 JavaScript 代码。

```javascript
export default function () {
  return (
    <div id="app">
      <span>App</span>
    </div>
  );
}
```

对于上述的 JSX 代码，会转成如下的 AST 结构

```json
{
  "body": [
    {
      "type": "ReturnStatement",
      "start": "...",
      "end": "...",
      "argument": {
        "type": "JSXElement",
        "start": "...",
        "end": "...",
        "openingElement": {
          "type": "JSXOpeningElement",
          "start": "...",
          "end": "...",
          "attributes": [],
          "name": {
            "type": "JSXIdentifier",
            "start": "...",
            "end": "...",
            "name": "div",
            "selfClosing": false
          }
        },
        "closingElement": {
          "type": "JSXClosingElement",
          "start": "...",
          "end": "...",
          "name": "div"
        },
        "children": [
          {
            "type": "JSXText",
            "start": "...",
            "end": "...",
            "value": "\n  \t",
            "raw": "\"\n  \t\""
          },
          {
            "type": "JSXElement",
            "start": "...",
            "end": "...",
            "openingElement": {},
            "closingElement": {},
            "children": []
          },
          {
            "type": "JSXText",
            "start": "...",
            "end": "..."
          }
        ]
      }
    }
  ]
}
```

如上所示，转换为 AST 后最主要的几个 type，包括 JSXElement 和 JSXText，JSXElement 又包括 opeingElement 和 closingElement 两个属性，分别是 JSXOpeningElement 和 JSXClosingElement 属性。当 babel 遍历 AST 时，遇到 JSXElement 类型时，会去执行 visitor 中的 JSXElement 对应方法。

```javascript
function transform() {
  return {
    pre(path) {},
    visitor: {
      JSXElement: {
        exit(path, file) {
          let callExpr;
          if (
            get(file, 'runtime') === 'classic' ||
            shouldUseCreateElement(path)
          ) {
            callExpr = buildCreateElementCall(path, file);
          } else {
            callExpr = buildJSXElementCall(path, file);
          }
          // 用处理完的 AST 节点替换原来的 JSXElement 节点
          path.replaceWith(t.inherits(callExpr, path.node));
        },
      },
    },
    post(path) {},
  };
}
```

如上所示，通过`shouldUseCreateElement`方法判断是调用`buildCreateElementCall`还是`buildJSXElementCall`，至于为什么需要判断，是因为 React 官方认为 key 与 props 的顺序需要区分处理，key 的优先级是最高的，是不应该被 props 中的 key 覆盖。

```typescript
function buildCreateElementCall(path: NodePath<JSXElement>, file: PluginPass) {
  const openingPath = path.get('openingElement');

  return call(file, 'createElement', [
    getTag(openingPath),
    buildCreateElementOpeningElementAttributes(
      file,
      path,
      openingPath.get('attributes')
    ),
    // @ts-expect-error JSXSpreadChild has been transformed in convertAttributeValue
    ...t.react.buildChildren(path.node),
  ]);
}
```

`getTag`方法用来获取 JSXElement 的标签名，`call`方法用来调用指定的方法，比如上面就是调用 createElement 方法。

```typescript
if (runtime === "classic") {
    ...
    const createElement = toMemberExpression(pragma)
    const fragment = toMemberExpression(pragmaFrag)

    set(state, "id/createElement", () => t.cloneNode(createElement))
    set(state, "id/fragment", () => t.cloneNode(fragment))

    set(state, "defaultPure", pragma === DEFAULT.pragma)
} else if (runtime === "automatic") {
    ...
    const define = (name: string, id: string) =>
        set(state, name, createImportLazily(state, path, id, source))

    define("id/jsx", development ? "jsxDEV" : "jsx")
    define("id/jsxs", development ? "jsxDEV" : "jsxs")
    define("id/createElement", "createElement")
    define("id/fragment", "Fragment")

    set(state, "defaultPure", source === DEFAULT.importSource)
}
```

`toMemberExpression`是用来将 createElement 转换为 createElement 的 AST 节点的，如果是 classic 模式，则只需要生成 createElement 和 fragment 的 id，如果是 automatic 模式，还需要生成 jsx 和 jsxs 的 id。

```javascript
path.replaceWith(t.inherits(callExpr, path.node));
```

在处理完后，会调用 replaceWith 方法，将旧的 AST 替换为使用 React.createElement 的 AST 结构。之后在 generate 阶段将 AST 转换为 JavaScript，整个过程就结束了。

## React 的生命周期

> `functional component`是没有生命周期的概念的，只能模拟生命周期。

React 的生命周期包括三个部分，包括

- 挂载，组件从初始化到完成加载的过程
- 更新
- 卸载

其中挂载阶段包括以下调用函数

- `getDerivedStateFromProps`，当组件的 props 发生变化时更新 state，当父组件传入的 props、组件的 state 和调用 forceUpdate 时触发
- `UNSAFE_componentWillMount`，由于 React 异步渲染机制可能会导致多次调用已废弃
- `render`，返回 JSX
- `componentDidMount`，当组件加载完成时触发

更新阶段包括以下调用函数

- `UNSAFE_componentWillReceiveProps`，被 `getDerivedStateFromProps` 替代
- `getDerivedStateFromProps`
- `shouldComponentUpdate`，用来比较 props 和 state 是否发生变化来进行性能优化
- `UNSAFE_componentWillUpdate`
- `render`
- `componentDidUpdate`，第三个参数为一个 snapshot，可以由 `getSnapshotBeforeUpdate` 获得

卸载阶段包括以下调用函数

- `componentWillUnmount`，组件卸载前触发

### React 生命周期中常见的坑

1. 使用 `UNSAFE_componentWillMount`，在该函数中调用接口请求，可能会多次调用
2. 不恰当地使用 `shouldComponentUpdate` 进行性能优化
3. 使用 `UNSAFE_componentWillUpdate`，在该函数中的代码由于渲染机制会中断执行
4. 没有在 `componentWillUnmount` 中销毁定时器，导致定时器一直在运行
5. `render` 函数不是一个纯函数，如果在 `render` 函数中操作 state，会导致死循环，如果在 `render` 函数中绑定事件，会导致事件多次注册
6. 未使用 `ErrorBoundary` 和 `ComponentDidCatch` 进行错误捕获

### 接口调用应该放在哪个生命周期中进行

- 应该放在`componentDidMount`中进行
- 不应该放在`constructor`中，因为`constructor`准确来说是用来初始化属性的，并不是一个生命周期
- 不应该放在`componentWillMount`中进行，因为`componentWillMount`已经废弃，由于在渲染过程中可能会多次触发，会导致接口多次调用

## 类组件与函数组件的异同

### 相同点

1. 用法类似，无论是类组件还是函数组件，在引入、调用时的方式是类似的
2. 呈现效果和性能类似

### 不同点

1. 设计思想不同，类组件是 OOP 思想，函数组件是 FP 思想
2. 使用场景不同，如果是需要用到生命周期，那么 class 组件更优
3. 设计模式不同，类组件是继承的思想，而函数组件是组合的思想
4. 未来趋势，由于类组件的生命周期的复杂性，导致在性能优化上存在劣势，函数组件由于 hooks 加持更利于逻辑复用，逐渐成为未来的趋势。

## React 怎么设计组件

1. 展示组件

- 代理组件，如封装 antd 的 Button
- 样式组件，通过 props 中的属性来修改 class
- 布局组件，如 Layout

2. 业务组件

- 容器组件，如接口调用和 set 数据，之后将 state 作为 props 传入展示组件
- 高阶组件，参数是组件，返回值是组件的组件，比如埋点，可以在高阶组件的`componentDidMount`中执行，而与传入的子组件无关

## setState 是同步还是异步更新

- 合成事件，React 中事件绑定是放在每个 JSX 标签上，React 会将所有的事件收集，React17 之前会绑定到 html 节点，React17 之后会绑定到`ReactDOM.render`函数指定的节点。当触发事件时，React 会模拟事件触发和冒泡。

- 当在 React 的生命周期和合成事件中，setState 是异步的。

- 当在 JavaScript 的原生事件中，如 addEventListener、setTimeout、setInterval 中，setState 是同步的。

```javascript
class TestSetState extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    setTimeout(() => {
      setState({ count: this.state.count + 1 });
      console.log(this.state.count);
      setState({ count: this.state.count + 1 });
      console.log(this.state.count);
    }, 0);
  }

  render() {
    return null;
  }
}
```

以上的代码，首先前两个`setState`，由于是在生命周期中，所以是异步执行的，`console.log`执行时`count`的值没有发生变化，所以是 0 和 0。之后的两个`setState`，由于是在 setTimeout 中，所以是同步执行的。由于 setTimeout 是一个宏任务，是在`setState`执行成功之后执行的，所以此时`count`的值为 1，由于同步，所以输出为 2 和 3。

## React 组件通信

1. 父与子组件通信

- 父组件向子组件传递 props

2. 子与父组件通信

- 父组件向子组件传递 callback
- 父组件向子组件传递 ref，通过 ref 调用子组件的函数

3. 兄弟组件通信

- 将 state 放在父组件中，由父组件向子组件传递 props

4. 无关系组件通信

- context
- window 变量或者全局事件
- redux、flux 等状态管理框架

## React 的状态管理框架

1. Flux

提出了单项数据流的概念，包括`Store`、`View`、`Dispatcher`和`Action`四部分，所有数据都位于`Store`中，当`View`发生变化时，会触发对应的`Action`，`Dispatcher`收集到触发的`Action`后，对`Store`中的数据进行更新，最终完成了`View`的更新。

2. Redux

与 Flux 不同的是提出了单一数据源、纯函数`Reducer`和数据只能通过`Action`修改的概念。如果要处理副作用，可以使用`react-thunk`或`react-saga`等中间件。

```javascript
function createThunkMiddleware(extraArugment) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }

      return next(action);
    };
}
```

`react-thunk`判断 action 的类型是否为函数，如果是函数的话，将 dispatch 和 getState 作为参数传入并执行该函数，然后将返回的值交由 reducer 进行处理。这样就保证 reducer 依然是一个纯函数。

3. Mobx

提供了与 Vuex 类似的语法，包括`observer`、`obserable`等注解，实现思想也与 Vue 类似，Mobx5 之前使用`Object.defineProperty`实现响应式，Mobx5 之后版本使用`Proxy`实现响应式。但是由于 React 强调单一数据流的概念，所以一般还需要搭配`immutable.js`来保证只能通过 action 修改 state 的值。

## 什么是虚拟 DOM

虚拟 DOM 最早由 Facebook 的 XHP 语言提出，主要是为了简化前端开发和避免 XSS 攻击。之后 React 沿用了虚拟 DOM 的技术方案。我们在写 React 代码的时候，一般组件里`render`函数会返回一个 JSX，通过 babel 进行转义后会得到一个`React.createElement`函数的执行结果，这个执行结果其实就是一个 object，里面有`tagName`、`props`、`type`、`children`等属性，这个 object 就是所谓的虚拟 DOM。

### 优点

- 避免大规模操作真实 DOM 带来的性能开销
- 规避 XSS
- 可以跨平台

### 缺点

- 虚拟 DOM 需要存储所有的真实 DOM 的信息，所以内存占用较高
- 无法进行极致优化

> 虽然可以规避 XSS，但是 React 提供了 dangerousInnerHTML 的 API 可以在不转义的情况下设置文本
> 虽然虚拟 DOM 在绝大多数情况下可以实现性能优化，但是虚拟 DOM 本身是有成本的，只能无限接近于真实 DOM 操作的性能

## React 的 Diff 算法

由于 React 采用了虚拟 DOM 来提高性能，那 Diff 算法就是提高性能的关键。React 在执行`setState`后，会将真实 DOM 转换为虚拟 DOM，与老的虚拟 DOM 进行比对。因为虚拟 DOM 是一种树形结构，所以可以采用深度优先遍历和广度优先遍历两种算法进行遍历。React 采取的是深度优先遍历，因为广度优先遍历可能会导致生命周期出现问题。但是由于深度优先遍历的时间复杂度为 O(n^3)，所以 React 采用了分治策略，即对树、组件和元素进行分别对比。对于树而言，只会进行同层比较，如果发现节点已经不在了，则会直接将该节点和子节点都删除；对于组件而言，如果组件的 class 一致，默认为相同的树结构，否则为不同的树结构。如果相同，则进行树比对，否则直接进行更新；对于元素而言，React 会根据元素的 key 进行比较。

### Fiber

在 React16 中，React 使用 Fiber 重写了 Diff 逻辑，主要包含 FiberNode 和 FiberTree。FiberNode 是一个双链表的结构，所以可以很方便的找到当前节点的兄弟节点和子节点，因此可以实现 Diff 过程的暂停和回溯。FiberTree 是由 FiberNode 组成的。整个更新过程由`current`和`workInProgress`两株树双缓冲构成，在`workInProgress`树完成更新后，`current`的指针直接指向新树，即可完成更新。

### Preact

将 Diff 算法分为 Fragment、Component 和 DOM 节点三种类型，分别对应 React 的树、组件和元素。但是区别在于 DOM 节点是直接进行真实节点的对比操作。

### Vue

与 React 整体相同。

### 实际开发的注意点

1. 为组件提供 key 以提高元素 diff 的性能和效率
2. 尽量避免跨层级操作
3. 使用 shouldComponentUpdate 和 PureComponent 减少 diff

## React 的渲染流程

在 React16 之前，React 的渲染流程依靠 Stack Reconciler，在 React16 之后，React 的渲染流程依靠 Fiber Reconciler。

1. Stack Reconciler

Stack Reconciler 的逻辑是递归与事务，保证了原子性、隔离性和一致性。

2. Fiber Reconciler

Fiber Reconciler 的逻辑是协作式多任务，分为 render 阶段和 commit 阶段，通过 requestIdleCallback api 判断当前 work 完成后是否有优先级更高的 work，如果有则插入 render 阶段。render 阶段是可暂停的，而 commit 阶段是不可暂停和同步执行的。与 Stack Reconciler 不同的是，Fiber Reconciler 是循环遍历进行 diff 的。

对于常规场景而言，Stack Reconciler 和 Fiber Reconciler 的性能相差不大，只有比如动画、画布等对性能要求较高的场景时，Fiber 的性能优势会更大。

### React16 之前为什么 return 不支持数组

因为 React16 之前渲染是通过递归实现的，需要对节点一步步向下递归，所以不支持数组。

## React 渲染异常

1. 预防

- 引入外部库，如 idx
- 使用 babel 插件支持可选链式调用
- 使用 TypeScript 支持可选链式调用

2. 兜底

- 使用 ErrorBoundary 高阶组件包裹 UI 组件
- 通过埋点统计和上报

## 性能优化

1. 衡量指标

- FCP 首次渲染时间
- TTI 首次可交互时间
- Page Load 页面加载时间
- FPS 页面帧率
- 静态资源及 API 请求成功率

2. 衡量标准

可以通过 chrome 提供的 lighthouse 工具来分析和优化，但是要结合具体应用场景。比如 B 端项目更看重稳定性，所以静态资源及 API 请求成功率的优先级要高于 FCP 的优先级；C 端项目用户对于白屏的忍受度较低，所以 FPC、TTI 的优先级相对会更高。

3. 优化方案

- FCP 可以采用 Loading 提示的方式，也可以采用骨架屏，或者使用 SSR 技术
- TTI 可以使用异步加载和懒加载的方式，将核心内容同步渲染，非核心内容异步加载，比如图片
- Page Load 可以使用异步加载和懒加载的方式
- FPS 主要是对长列表和重复渲染的优化，长列表可以用虚拟滚动的方式优化
- 静态资源和 API 请求成功率 主要是靠 CDN 提高请求成功率，如果是遇到服务器劫持可以使用 HTTPS

### 重复渲染

首先应该判断是否有必要对重复渲染进行优化，如果项目的体量不大，重复渲染不一定会造成页面卡顿。可以通过 performance 和 React Profiler 来定位问题。

- 使用 React.memo 或者 pureComponent 来减少重复渲染
- 使用缓存，如 reselect，可以将对象缓存住，而不至于每次生成一个新的对象
- 使用 immutable.js 或者 immer.js，让对象变为不可变对象
- 自己在 shouldComponentUpdate 中进行优化

## React hooks

### 使用限制

1. 不能在条件语句、循环语句或嵌套函数中使用 hooks
2. 只能在函数组件中使用 hooks

因为所有的 hooks 都是存在一个链表上，访问时是通过数组下标进行访问，执行时是顺序执行的，如果在条件语句、循环语句中使用 hooks，会导致数组的下标错位。

### useEffect 和 useLayoutEffect

- useEffect 和 useLayoutEffect 的使用方式和函数签名都是一样的，都可以处理副作用。
- useEffect 是异步处理副作用，useLayoutEffect 是同步处理副作用，如果有涉及 DOM 样式修改、页面闪烁这些问题，可以使用 useLayoutEffect 替换 useEffect。
- 由于 useLayoutEffect 是同步处理副作用，应当避免大量计算。
