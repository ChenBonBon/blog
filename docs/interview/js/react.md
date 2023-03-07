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