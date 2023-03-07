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
