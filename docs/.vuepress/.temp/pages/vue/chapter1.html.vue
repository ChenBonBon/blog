<template><div><h1 id="权衡的艺术" tabindex="-1"><a class="header-anchor" href="#权衡的艺术" aria-hidden="true">#</a> 权衡的艺术</h1>
<h2 id="命令式和声明式" tabindex="-1"><a class="header-anchor" href="#命令式和声明式" aria-hidden="true">#</a> 命令式和声明式</h2>
<ul>
<li>命令式</li>
</ul>
<p>比如 jQuery，特点之一是关注过程</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"#app"</span><span class="token punctuation">)</span> <span class="token comment">// 获取div</span>
  <span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"hello world"</span><span class="token punctuation">)</span> <span class="token comment">// 设置文本内容</span>
  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 绑定点击事件</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>声明式</li>
</ul>
<p>比如 Vue，特点之一是关注结果</p>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>() => alert('ok')<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>hello world<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="性能与可维护性的权衡" tabindex="-1"><a class="header-anchor" href="#性能与可维护性的权衡" aria-hidden="true">#</a> 性能与可维护性的权衡</h2>
<p><strong>结论：声明式代码的性能不优于命令式代码的性能</strong></p>
<p>直接修改的性能消耗定义为 A，找出差异的性能消耗定义为 B</p>
<ul>
<li>命令式代码的更新性能消耗为 A</li>
<li>声明式代码的更新性能消耗为 B + A</li>
</ul>
<p>因此最理想的情况是，找出差异的性能消耗为 0 时，声明式代码与命令式代码的性能相同，但是无法做到超越。毕竟<strong>框架本身就是封装了命令式代码才实现了面向用户的声明式</strong>。</p>
<h2 id="虚拟-dom-的性能到底如何" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-的性能到底如何" aria-hidden="true">#</a> 虚拟 DOM 的性能到底如何</h2>
<p>由于<strong>声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗</strong>，所以如果我们能够最小化找出差异的性能消耗，就可以让声明式代码的性能无限接近命令式代码的性能。而所谓的虚拟 DOM，就是为了最小化找出差异这一步的性能消耗而出现的。</p>
<p>所以，采用虚拟 DOM 的更新技术的性能<strong>理论上</strong>不可能比原生 JavaScript 操作 DOM 更高。因为在大部分情况下，<strong>我们很难写出绝对优化的命令式代码</strong>。</p>
<p>虚拟 DOM 的存在就是为了保证让我们不用付出太多的努力（写声明式代码），还能够保证应用程序的性能下限，让应用程序的性能不至于太差，甚至想办法逼近命令式代码的性能。</p>
<h3 id="创建页面时" tabindex="-1"><a class="header-anchor" href="#创建页面时" aria-hidden="true">#</a> 创建页面时</h3>
<table>
<thead>
<tr>
<th></th>
<th>虚拟 DOM</th>
<th>innerHTML</th>
</tr>
</thead>
<tbody>
<tr>
<td>纯 JavaScript 运算</td>
<td>创建 JavaScript 对象（VNode）</td>
<td>渲染 HTML 字符串</td>
</tr>
<tr>
<td>DOM 运算</td>
<td>新建所有 DOM 元素</td>
<td>新建所有 DOM 元素</td>
</tr>
</tbody>
</table>
<p>虚拟 DOM 与使用 innerHTML 相比性能差距并不大。</p>
<h3 id="更新页面时" tabindex="-1"><a class="header-anchor" href="#更新页面时" aria-hidden="true">#</a> 更新页面时</h3>
<table>
<thead>
<tr>
<th></th>
<th>虚拟 DOM</th>
<th>innerHTML</th>
</tr>
</thead>
<tbody>
<tr>
<td>纯 JavaScript 运算</td>
<td>创建新的 JavaScript 对象 + Diff</td>
<td>渲染 HTML 字符串</td>
</tr>
<tr>
<td>DOM 运算</td>
<td>必要的 DOM 更新</td>
<td>销毁所有旧 DOM <br>新建所有 DOM 元素</td>
</tr>
</tbody>
</table>
<p>可以发现，相比于创建页面时，虚拟 DOM 多了一个 Diff 的性能消耗，Diff 是 JavaScript 层面的运算，不会产生数量级的差异，DOM 层面只需要更新必要的元素。所以当更新页面时，对于虚拟 DOM 来说，无论页面多大，都只会更新变化的内容；而对于 innerHTML 来说，页面越大，更新时的性能消耗越大。</p>
<table>
<thead>
<tr>
<th></th>
<th>虚拟 DOM</th>
<th>innerHTML</th>
</tr>
</thead>
<tbody>
<tr>
<td>纯 JavaScript 运算</td>
<td>创建新的 JavaScript 对象 + Diff</td>
<td>渲染 HTML 字符串</td>
</tr>
<tr>
<td>DOM 运算</td>
<td>必要的 DOM 更新</td>
<td>销毁所有旧 DOM <br>新建所有 DOM 元素</td>
</tr>
<tr>
<td>性能因素</td>
<td>与数据变化量相关</td>
<td>与模板大小相关</td>
</tr>
</tbody>
</table>
<p>基于此，我们可以粗略总结一下 innerHTML、虚拟 DOM 以及原生 JavaScript（指 createElement 等方法）在更新页面时的性能，如图 1-1 所示。</p>
<p><img src="@source/images/vue-1.jpg" alt="alt 图1-1"></p>
</div></template>


