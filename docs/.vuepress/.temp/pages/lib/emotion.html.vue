<template><div><h1 id="emotion" tabindex="-1"><a class="header-anchor" href="#emotion" aria-hidden="true">#</a> Emotion</h1>
<p>前段时间遇到一个问题，因为打包工具从 webpack 迁移到 vite，导致 antd 的样式经常会覆盖自己写的样式，即使在更改 import 的顺序、使用按需引入等各种方案之后，还是会出现开发环境一切正常，build 之后到生产环境样式优先级错乱的情况，即使是 css modules 的代码都可能被 antd 组件自身 css 覆盖。</p>
<p>基于这个大背景之下，一个奇思妙想进入了我的脑海：<code v-pre>css-in-js</code>，如果最终的产出没有 css，是不是就没有样式优先级的问题了呢。</p>
<p>但是之前的所有项目都没有用过<code v-pre>css-in-js</code>的方案，于是本着了解和学习的态度，去阅读了一下两个热门的<code v-pre>css-in-js</code>样式库<code v-pre>styled-components</code>和<code v-pre>Emotion</code>。</p>
<h2 id="css-in-js" tabindex="-1"><a class="header-anchor" href="#css-in-js" aria-hidden="true">#</a> css-in-js</h2>
<h3 id="styled-components" tabindex="-1"><a class="header-anchor" href="#styled-components" aria-hidden="true">#</a> styled-components</h3>
<p><code v-pre>styled-components</code>的主要 api 是<code v-pre>styled</code>，有以下两种基本使用方式：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">'styled-components'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Button1 <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Button2 <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Button1<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中第二种方式主要是用于样式的继承。</p>
<h3 id="emotion-1" tabindex="-1"><a class="header-anchor" href="#emotion-1" aria-hidden="true">#</a> Emotion</h3>
<p>而对于<code v-pre>Emotion</code>而言，主要的 api 是<code v-pre>css</code>，有以下两种基本使用方式：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@emotion/react'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">'@emotion/styled'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">Button1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>button css<span class="token operator">=</span><span class="token punctuation">{</span>css<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Button2 <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中第二种用法和<code v-pre>styled-components</code>的第一种用法是一样的语法。</p>
<h3 id="styled-components-vs-emotion" tabindex="-1"><a class="header-anchor" href="#styled-components-vs-emotion" aria-hidden="true">#</a> styled-components vs Emotion</h3>
<p>根据官网的对比，<code v-pre>styled-components</code>和<code v-pre>Emotion</code>有着类似的语法，但是<code v-pre>Emotion</code>提供了 source map、测试工具等特性，所以这边我们就从<code v-pre>Emotion</code>开始学起吧！</p>
<h2 id="emotion-2" tabindex="-1"><a class="header-anchor" href="#emotion-2" aria-hidden="true">#</a> Emotion</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>由于我们是在 React 项目中使用 Emotion，所以我们直接安装<code v-pre>@emotion/react</code>进行使用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># npm</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @emotion/react
<span class="token comment"># yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> @emotion/react
<span class="token comment"># pnpm</span>
<span class="token function">pnpm</span> <span class="token function">add</span> @emotion/react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里会提示我们缺少 peer dependencies，所以我们还需要安装<code v-pre>@babel/core</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># npm</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @babel/core@<span class="token string">">=7.0.0 &lt;8.0.0"</span>
<span class="token comment"># yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> @babel/core@<span class="token string">">=7.0.0 &lt;8.0.0"</span>
<span class="token comment"># pnpm</span>
<span class="token function">pnpm</span> <span class="token function">add</span> @babel/core@<span class="token string">">=7.0.0 &lt;8.0.0"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，我们写一个例子来测试一下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@emotion/react'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> style <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">SomeComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> children <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span>style<span class="token punctuation">}</span><span class="token operator">></span>
    Some hotpink text<span class="token punctuation">.</span>
    <span class="token punctuation">{</span>children<span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> anotherStyle <span class="token operator">=</span> <span class="token function">css</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  textDecoration<span class="token operator">:</span> <span class="token string">'underline'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">AnotherComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span>anotherStyle<span class="token punctuation">}</span><span class="token operator">></span>Some text <span class="token keyword">with</span> an underline<span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>SomeComponent<span class="token operator">></span>
    <span class="token operator">&lt;</span>AnotherComponent <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>SomeComponent<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css-属性" tabindex="-1"><a class="header-anchor" href="#css-属性" aria-hidden="true">#</a> css 属性</h3>
<p>Emotion 最基本的使用方式就是使用 css 属性，使用 css 属性可以简单灵活地为组件添加样式。</p>
<p>如上面的例子所示，用到了 css 属性，但是我们会发现，页面并没有正确的进行渲染，而且 vs code 编辑器还会有红色的波浪线。这是因为我们如果要使用 Emotion 的 css 属性，必须要使用 babel 进行转译或者使用 jsx 注解。这里我们选择使用 babel 进行转译。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># npm</span>
<span class="token function">npm</span> <span class="token function">install</span> --save-dev @emotion/babel-plugin
<span class="token comment"># yarn</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @emotion/babel-plugin
<span class="token comment"># pnpm</span>
<span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @emotion/babel-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，我们打开<code v-pre>vite.config.ts</code>文件修改 vite 的配置。</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>// ...
plugins: [
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> react({
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   jsxImportSource: "@emotion/react",
</span><span class="token prefix inserted">+</span><span class="token line">     babel: {
</span><span class="token prefix inserted">+</span><span class="token line">       plugins: ["@emotion/babel-plugin"],
</span><span class="token prefix inserted">+</span><span class="token line">     },
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> }),
</span></span>],
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时修改一下<code v-pre>tsconfig.json</code>文件。</p>
<div class="language-diff ext-diff line-numbers-mode"><pre v-pre class="language-diff"><code>"compilerOptions": {
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> // ...
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">  "jsxImportSource": "@emotion/react"
</span></span>}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在页面上应该可以正确出现粉红色的文字了。</p>
<p><img src="@source/images/emotion-1.jpg" alt="alt 图1"></p>
<p>css属性有多种不同的用法，可以同时支持object、string</p>
</div></template>


