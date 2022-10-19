<template><div><h1 id="mutationobserver" tabindex="-1"><a class="header-anchor" href="#mutationobserver" aria-hidden="true">#</a> MutationObserver</h1>
<p>前段时间碰到一个需求，一个可以动态增加一行的列表，如下图 1 所示。
<img src="@source/images/mutation-observer-1.jpg" alt="alt 图1"></p>
<p>这里用到了 ant design 的 Form.List 组件进行开发，但是遇到一个问题：当 Form.List 的高度固定时，点击新增按钮时，新增的一行会在超出高度之外，所以从用户体验的角度考虑，希望可以在新增之后自动滚动到 Form.List 的底部。</p>
<p>首先想到的方案是，给 Form.List 绑定 ref，然后在点击新增按钮时，获取 Form.List 的高度，并调用 <code v-pre>scrollTo</code> 方法将滚动条位置跳转到 Form.List 的高度。</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> listRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.List</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span><span class="token punctuation">(</span>fields<span class="token punctuation">,</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> remove <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> errors <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>listRef<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>fields<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span>
            <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span>
              <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dashed<span class="token punctuation">"</span></span>
              <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>listRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">const</span> height <span class="token operator">=</span> listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span>scrollHeight<span class="token punctuation">;</span>
                  listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
            <span class="token punctuation">></span></span><span class="token plain-text">
              Add field
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>
      <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.List</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是实际执行的过程中，发现<code v-pre>scrollHeight</code>会有延迟，也就是说点击新增按钮时，<code v-pre>scrollHeight</code>的值还是点击前的，所以执行<code v-pre>scrollTo</code>方法后，实际滚动的位置始终会在倒数第二个<code v-pre>Input</code>的位置。</p>
<p>这时，想到使用<code v-pre>setTimeout</code>，不过一方面<code v-pre>setTimeout</code>并不稳定，另一方面这种写法实在不够优雅。</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token operator">&lt;</span>Button
  type<span class="token operator">=</span><span class="token string">"dashed"</span>
  onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>listRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span>scrollHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">></span>
  Add sights
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后来 Google 搜索解决方案看到有人提到一个 API：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver" target="_blank" rel="noopener noreferrer"><code v-pre>MutationObserver</code><ExternalLinkIcon/></a>。</p>
<blockquote>
<p>MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。</p>
</blockquote>
<p>那如果我对 Form.List 添加一个<code v-pre>MutationObserver</code>监听，当 Form.List 的 scrollHeight 发生变化之后再执行 scrollTo 方法，是不是就没有延迟了呢？</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> listRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> observerRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">observerCallback</span><span class="token punctuation">(</span>mutationsList<span class="token punctuation">,</span> observer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> mutationsList<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> mutation <span class="token operator">=</span> mutationsList<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'childList'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">scrollTo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          left<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
          top<span class="token operator">:</span> listRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span>scrollHeight<span class="token punctuation">,</span>
          behavior<span class="token operator">:</span> <span class="token string">'smooth'</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    observer<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">scrollToBottom</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>observerRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      observerRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>listRef<span class="token punctuation">.</span>current<span class="token punctuation">,</span> config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>listRef<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span> attributes<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> childList<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> subtree<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutationObserver</span><span class="token punctuation">(</span>observerCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>
      observerRef<span class="token punctuation">.</span>current <span class="token operator">=</span> observer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>listRef<span class="token punctuation">.</span>current<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.List</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span><span class="token punctuation">(</span>fields<span class="token punctuation">,</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> remove <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> errors <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>listRef<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>fields<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.Item</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Input</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span>
            <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span>
              <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dashed<span class="token punctuation">"</span></span>
              <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">scrollToBottom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
            <span class="token punctuation">></span></span><span class="token plain-text">
              Add field
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token plain-text">
          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">></span></span>
      <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Form.List</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在点击新增按钮后，我们为 Form.List 增加一个<code v-pre>MutationObserver</code>实例，用于监听 Form.List 的 childList 的变化，当 childList 发生变化时，调用 scrollTo 将 Form.List 滚动至最后。</p>
<p>同时我们可以看到，<code v-pre>MutationObserver</code>的配置项除了<code v-pre>childList</code>之外，还可以配置<code v-pre>attributes</code>和<code v-pre>subtree</code>，MDN 的解释是</p>
<ul>
<li><strong>subtree</strong>
<blockquote>
<p>当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target。默认值为 false。</p>
</blockquote>
</li>
<li><strong>childList</strong>
<blockquote>
<p>当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。</p>
</blockquote>
</li>
<li><strong>attributes</strong>
<blockquote>
<p>当为 true 时观察所有监听的节点属性值的变化。默认值为 true，当声明了 attributeFilter 或 attributeOldValue，默认值则为 false。</p>
</blockquote>
</li>
</ul>
<p>所以之后如果有监听 DOM 元素节点变化、属性变化的需求，都可以使用<code v-pre>MutationObserver</code>API 来优雅实现啦。</p>
<p>PC 端浏览器兼容性如下</p>
<table>
<thead>
<tr>
<th>Chrome</th>
<th>Edge</th>
<th>Safari</th>
<th>Firefox</th>
<th>Opera</th>
<th>IE</th>
</tr>
</thead>
<tbody>
<tr>
<td><s>4 - 17</s></td>
<td></td>
<td><s>3.1 - 5.1</s></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>18 - 26</td>
<td></td>
<td>6</td>
<td><s>2 - 13</s></td>
<td><s>10 - 12.1</s></td>
<td></td>
</tr>
<tr>
<td>27 - 104</td>
<td>12 - 104</td>
<td>6.1 - 15.5</td>
<td>14 - 103</td>
<td>15 - 89</td>
<td><s>6 - 10</s></td>
</tr>
<tr>
<td>105</td>
<td>105</td>
<td>15.6</td>
<td>104</td>
<td>90</td>
<td>11</td>
</tr>
<tr>
<td>106 - 108</td>
<td></td>
<td>16.0 - TP</td>
<td>105 - 106</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
</div></template>


