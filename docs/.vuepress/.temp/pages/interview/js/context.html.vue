<template><div><h1 id="执行上下文和执行栈" tabindex="-1"><a class="header-anchor" href="#执行上下文和执行栈" aria-hidden="true">#</a> 执行上下文和执行栈</h1>
<h2 id="执行上下文" tabindex="-1"><a class="header-anchor" href="#执行上下文" aria-hidden="true">#</a> 执行上下文</h2>
<h3 id="什么是执行上下文" tabindex="-1"><a class="header-anchor" href="#什么是执行上下文" aria-hidden="true">#</a> 什么是执行上下文</h3>
<p>简而言之，执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。</p>
<h3 id="执行上下文的类型" tabindex="-1"><a class="header-anchor" href="#执行上下文的类型" aria-hidden="true">#</a> 执行上下文的类型</h3>
<p><strong>1. 全局执行上下文</strong></p>
<p>这是默认或者说基础的上下文，<strong>任何不在函数内部的代码</strong>都在全局上下文中。它会执行两件事：</p>
<ol>
<li>创建一个全局的 window 对象（浏览器的情况下）</li>
<li>设置 this 的值等于这个全局对象。</li>
</ol>
<p>一个程序中只会有一个全局执行上下文。</p>
<p><strong>2. 函数执行上下文</strong></p>
<p>每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是<strong>在函数被调用时创建</strong>的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。</p>
<p><strong>3. Eval 函数执行上下文</strong></p>
<p>执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它。</p>
<h3 id="执行上下文的特点" tabindex="-1"><a class="header-anchor" href="#执行上下文的特点" aria-hidden="true">#</a> 执行上下文的特点</h3>
<ol>
<li>单线程，只在主线程上运行</li>
<li>同步执行，从上向下按顺序执行</li>
<li>全局上下文只有一个，也就是 window 对象</li>
<li>函数每调用一次就会产生一个新的执行上下文环境</li>
</ol>
<h3 id="执行上下文生命周期" tabindex="-1"><a class="header-anchor" href="#执行上下文生命周期" aria-hidden="true">#</a> 执行上下文生命周期</h3>
<ul>
<li>创建阶段
<ol>
<li>this 绑定</li>
<li>创建词法环境组件</li>
<li>创建变量环境组件</li>
</ol>
</li>
<li>执行阶段
<ol>
<li>变量赋值</li>
<li>函数的引用</li>
<li>执行其他代码</li>
</ol>
</li>
</ul>
<h4 id="this-绑定" tabindex="-1"><a class="header-anchor" href="#this-绑定" aria-hidden="true">#</a> this 绑定</h4>
<p>在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this 引用 Window 对象)。</p>
<p>在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">baz</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

foo<span class="token punctuation">.</span><span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> bar <span class="token operator">=</span> foo<span class="token punctuation">.</span>baz<span class="token punctuation">;</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上图所示，<code v-pre>foo.baz</code>函数是由 foo 对象调用的，所以 this 指向 foo，<code v-pre>bar</code>函数是直接在 window 下调用的，等价于<code v-pre>window.bar</code>，所以 this 指向 window。</p>
<h4 id="词法环境" tabindex="-1"><a class="header-anchor" href="#词法环境" aria-hidden="true">#</a> 词法环境</h4>
<p>简单来说词法环境是一种持有标识符—变量映射的结构。（这里的标识符指的是变量/函数的名字，而变量是对实际对象[包含函数类型对象]或原始数据的引用）。</p>
<p>在词法环境的内部有两个组件</p>
<ol>
<li>环境记录器是存储变量和函数声明的实际位置。</li>
<li>外部环境的引用意味着它可以访问其父级词法环境（作用域）。</li>
</ol>
<p>词法环境有两种类型：</p>
<ol>
<li>全局环境（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是 null。它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this 的值指向全局对象。</li>
<li>在函数环境中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。</li>
</ol>
<p>环境记录器也有两种类型</p>
<ol start="3">
<li>声明式环境记录器存储变量、函数和参数。</li>
<li>对象环境记录器用来定义出现在全局上下文中的变量和函数的关系。</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GlobalExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Object",
        // 在这里绑定标识符
        }
        outer: &lt;null>
    }
}

FunctionExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Declarative",
        // 在这里绑定标识符
        }
        outer: &lt;Global or outer function environment reference>
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="变量环境" tabindex="-1"><a class="header-anchor" href="#变量环境" aria-hidden="true">#</a> 变量环境</h4>
<p>它同样是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。</p>
<p>如上所述，变量环境也是一个词法环境，所以它有着上面定义的词法环境的所有属性。</p>
<p>在 ES6 中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);

GlobalExectionContext = {

  ThisBinding: &lt;Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: &lt; uninitialized >,
      b: &lt; uninitialized >,
      multiply: &lt; func >
    }
    outer: &lt;null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: &lt;null>
  }
}

FunctionExectionContext = {
  ThisBinding: &lt;Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: &lt;GlobalLexicalEnvironment>
  },

VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: &lt;GlobalLexicalEnvironment>
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上图所示，let 和 const 声明的变量，声明时值为<code v-pre>uninitialized</code>，而 var 声明的变量在声明时值为<code v-pre>undefined</code>，这也就是 var 会发生变量提升，而 let 和 const 不会发生变量提升的原因。</p>
<h2 id="执行栈" tabindex="-1"><a class="header-anchor" href="#执行栈" aria-hidden="true">#</a> 执行栈</h2>
<p>是一种先进后出的数据结构，用来存储代码运行的所有执行上下文。</p>
<p>当 JavaScript 引擎第一次遇到 js 脚本时，会创建一个全局的执行上下文并且压入当前执行栈，每当 JavaScript 引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部，当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文，一旦所有代码执行完毕，JS 引擎从当前栈中移除全局执行上下文。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token string">'Hello World!'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Inside first function'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Again inside first function'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Inside second function'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Inside Global Execution Context'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上图所示，首先创建全局执行上下文并入栈，接着执行 first 函数，创建一个 first 的函数执行上下文并入栈，继续向下执行 second 函数，创建一个 second 函数执行上下文并入栈，second 函数执行完毕，second 函数执行上下文出栈，first 函数执行完毕，first 函数执行上下文出栈，最后全局执行上下文出栈。</p>
</div></template>


