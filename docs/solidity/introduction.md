# Solidity

## 简述

Solidity 是以太坊虚拟机(EVM)智能合约的语言。

## Hello World

```solidity
// SPDX-License-Identifier: MIT;
pragma solidity ^0.8.18;
contract HelloWorld {
    string public _string = "Hello World";
}
```

第一行是注释，与 JavaScript 类似，使用`//`的方式进行注释，编译时注释的内容会被忽略。这里声明了代码的使用许可为 MIT，如果不写 License 编译时会提示 warning。
第二行声明了源文件执行的 solidity 版本，要不低于 0.8.18 且不高于 0.9.0。
第三行和第四行是合约部分，`contract`关键字声明了一个名为 HelloWorld 的智能合约，`string`关键字声明了一个名为`_string`的字符串，并给它赋值为`Hello World`。
