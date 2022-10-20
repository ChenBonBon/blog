# 执行上下文和执行栈

## 执行上下文

### 什么是执行上下文

简而言之，执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 Javascript 代码在运行的时候，它都是在执行上下文中运行。

### 执行上下文的类型

**1. 全局执行上下文**

这是默认或者说基础的上下文，**任何不在函数内部的代码**都在全局上下文中。它会执行两件事：

1. 创建一个全局的 window 对象（浏览器的情况下）
2. 设置 this 的值等于这个全局对象。

一个程序中只会有一个全局执行上下文。

**2. 函数执行上下文**

每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是**在函数被调用时创建**的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序（将在后文讨论）执行一系列步骤。

**3. Eval 函数执行上下文**

执行在 eval 函数内部的代码也会有它属于自己的执行上下文，但由于 JavaScript 开发者并不经常使用 eval，所以在这里我不会讨论它。

### 执行上下文的特点

1. 单线程，只在主线程上运行
2. 同步执行，从上向下按顺序执行
3. 全局上下文只有一个，也就是 window 对象
4. 函数每调用一次就会产生一个新的执行上下文环境

### 执行上下文生命周期

- 创建阶段
  1. this 绑定
  2. 创建词法环境组件
  3. 创建变量环境组件
- 执行阶段
  1. 变量赋值
  2. 函数的引用
  3. 执行其他代码

#### this 绑定

在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this 引用 Window 对象)。

在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）。

```javascript
let foo = {
  baz: function () {
    console.log(this);
  },
};

foo.baz();

let bar = foo.baz;

bar();
```

如上图所示，`foo.baz`函数是由 foo 对象调用的，所以 this 指向 foo，`bar`函数是直接在 window 下调用的，等价于`window.bar`，所以 this 指向 window。

#### 词法环境

简单来说词法环境是一种持有标识符—变量映射的结构。（这里的标识符指的是变量/函数的名字，而变量是对实际对象[包含函数类型对象]或原始数据的引用）。

在词法环境的内部有两个组件

1. 环境记录器是存储变量和函数声明的实际位置。
2. 外部环境的引用意味着它可以访问其父级词法环境（作用域）。

词法环境有两种类型：

1.  全局环境（在全局执行上下文中）是没有外部环境引用的词法环境。全局环境的外部环境引用是 null。它拥有内建的 Object/Array/等、在环境记录器内的原型函数（关联全局对象，比如 window 对象）还有任何用户定义的全局变量，并且 this 的值指向全局对象。
2.  在函数环境中，函数内部用户定义的变量存储在环境记录器中。并且引用的外部环境可能是全局环境，或者任何包含此内部函数的外部函数。

环境记录器也有两种类型

3.  声明式环境记录器存储变量、函数和参数。
4.  对象环境记录器用来定义出现在全局上下文中的变量和函数的关系。

```
GlobalExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Object",
        // 在这里绑定标识符
        }
        outer: <null>
    }
}

FunctionExectionContext = {
    LexicalEnvironment: {
        EnvironmentRecord: {
        Type: "Declarative",
        // 在这里绑定标识符
        }
        outer: <Global or outer function environment reference>
    }
}
```

#### 变量环境

它同样是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。

如上所述，变量环境也是一个词法环境，所以它有着上面定义的词法环境的所有属性。

在 ES6 中，词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。

```
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);

GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}
```

如上图所示，let 和 const 声明的变量，声明时值为`uninitialized`，而 var 声明的变量在声明时值为`undefined`，这也就是 var 会发生变量提升，而 let 和 const 不会发生变量提升的原因。

## 执行栈

是一种先进后出的数据结构，用来存储代码运行的所有执行上下文。

当 JavaScript 引擎第一次遇到 js 脚本时，会创建一个全局的执行上下文并且压入当前执行栈，每当 JavaScript 引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部，当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文，一旦所有代码执行完毕，JS 引擎从当前栈中移除全局执行上下文。

```javascript
let a = 'Hello World!';

function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}

function second() {
  console.log('Inside second function');
}

first();
console.log('Inside Global Execution Context');
```

如上图所示，首先创建全局执行上下文并入栈，接着执行 first 函数，创建一个 first 的函数执行上下文并入栈，继续向下执行 second 函数，创建一个 second 函数执行上下文并入栈，second 函数执行完毕，second 函数执行上下文出栈，first 函数执行完毕，first 函数执行上下文出栈，最后全局执行上下文出栈。
