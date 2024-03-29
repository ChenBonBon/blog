# Emotion

前段时间遇到一个问题，因为打包工具从 webpack 迁移到 vite，导致 antd 的样式经常会覆盖自己写的样式，即使在更改 import 的顺序、使用按需引入等各种方案之后，还是会出现开发环境一切正常，build 之后到生产环境样式优先级错乱的情况，即使是 css modules 的代码都可能被 antd 组件自身 css 覆盖。

基于这个大背景之下，一个奇思妙想进入了我的脑海：`css-in-js`，如果最终的产出没有 css，是不是就没有样式优先级的问题了呢。

但是之前的所有项目都没有用过`css-in-js`的方案，于是本着了解和学习的态度，去阅读了一下两个热门的`css-in-js`样式库`styled-components`和`Emotion`。

## css-in-js

### styled-components

`styled-components`的主要 api 是`styled`，有以下两种基本使用方式：

```typescript
import styled from 'styled-components';

const Button1 = styled.button``;

const Button2 = styled(Button1)``;
```

其中第二种方式主要是用于样式的继承。

### Emotion

而对于`Emotion`而言，主要的 api 是`css`，有以下两种基本使用方式：

```typescript
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Button1 = () => <button css={css``} />;

const Button2 = styled.button``;
```

其中第二种用法和`styled-components`的第一种用法是一样的语法。

### styled-components vs Emotion

根据官网的对比，`styled-components`和`Emotion`有着类似的语法，但是`Emotion`提供了 source map、测试工具等特性，所以这边我们就从`Emotion`开始学起吧！

## Emotion

### 安装

由于我们是在 React 项目中使用 Emotion，所以我们直接安装`@emotion/react`进行使用。

```bash
# npm
npm install --save @emotion/react
# yarn
yarn add @emotion/react
# pnpm
pnpm add @emotion/react
```

这里会提示我们缺少 peer dependencies，所以我们还需要安装`@babel/core`

```bash
# npm
npm install --save @babel/core@">=7.0.0 <8.0.0"
# yarn
yarn add @babel/core@">=7.0.0 <8.0.0"
# pnpm
pnpm add @babel/core@">=7.0.0 <8.0.0"
```

安装完成后，我们写一个例子来测试一下：

```typescript
import { css } from '@emotion/react';

const style = css`
  color: hotpink;
`;

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

const anotherStyle = css({
  textDecoration: 'underline',
});

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
);
render(
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
);
```

### css 属性

Emotion 最基本的使用方式就是使用 css 属性，使用 css 属性可以简单灵活地为组件添加样式。

如上面的例子所示，用到了 css 属性，但是我们会发现，页面并没有正确的进行渲染，而且 vs code 编辑器还会有红色的波浪线。这是因为我们如果要使用 Emotion 的 css 属性，必须要使用 babel 进行转译或者使用 jsx 注解。这里我们选择使用 babel 进行转译。

```bash
# npm
npm install --save-dev @emotion/babel-plugin
# yarn
yarn add -D @emotion/babel-plugin
# pnpm
pnpm add -D @emotion/babel-plugin
```

安装完成后，我们打开`vite.config.ts`文件修改 vite 的配置。

```diff
// ...
plugins: [
  react({
+   jsxImportSource: "@emotion/react",
+     babel: {
+       plugins: ["@emotion/babel-plugin"],
+     },
  }),
],
```

同时修改一下`tsconfig.json`文件。

```diff
"compilerOptions": {
  // ...
+  "jsxImportSource": "@emotion/react"
}
```

现在页面上应该可以正确出现粉红色的文字了。

![alt 图1](../images/emotion-1.jpg)

css属性有多种不同的用法，可以同时支持object、string