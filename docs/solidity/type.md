# 类型

## 数值类型

1. 布尔型 bool

```solidity
bool public _bool_true = true;
bool public _bool_false = false;
```

bool 类型为二值变量，可以为 true 或 false，支持以下运算符

- ! 取反
- && 与
- || 或
- == 等于
- != 不等于

```solidity
bool public _bool_1 = !_bool_true;
bool public _bool_2 = _bool_true && _bool_false;
bool public _bool_3 = _bool_true || _bool_false;
bool public _bool_4 = _bool_true == _bool_false;
bool public _bool_5 = _bool_true != _bool_false;
```

2. 整型

整型是 Solidity 中的整数，常用的包括`int`、`uint`和`uint256`。

- int 0 和整数，包括负数
- uint，正整数
- uint256，256 位的正整数

```solidity
int public _int = -1;
uint public _uint = 1;
uint256 public _number = 20230307;
```

整型支持以下运算符

- 比较运算符

  - <
  - <=
  - ==
  - !=
  - \>=
  - \>

- 算术运算符
  - \+(正)
  - \-(负)
  - \+
  - \-
  - \*
  - /
  - %
  - \*\*

```solidity
uint256 public _number1 = _number + 1;
uint256 public _number2 = 2 ** 2;
uint256 public _number3 = 7 % 2;
bool public _numberbool = _number2 > _number3;
```

3. 地址类型 address

地址类型 address 可以存储 20 个字节（以太坊地址大小），地址类型包括两种，一种是普通的地址，还有一种是可以转账的地址(payable)。payable 的地址包含两个成员 balance 和 transfer，分别用来查询余额和转账。

```solidity
address public _address = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
address payable public _address1 = payable(_address); // payable address，可以转账、查余额
uint256 public balance = _address1.balance;
```

4. 定长字节数组

字节数组分为两种，一种是定长的，如`bytes1`、`bytes8`、`bytes32`，另一种是非定长的。定长的字节数组属于数值类型，而非定长的属于引用类型。定长字节数组消耗的 gas 较少。

```solidity
bytes32 public _bytes32 = "MiniSolidity";
bytes1 public _bytes1 = _bytes32[0];
```

如上所示，`_bytes1`存储的是`_bytes32`的第一个字节，即`M`，转换为 16 进制，\_bytes32 为`0x4d696e69536f6c69646974790000000000000000000000000000000000000000`，\_byte1 为`0x4d`。

5. 枚举类型 enum

枚举类型 enum 主要用来为 uint 分配名称，使程序易于阅读和维护。

```solidity
enum ActionSet { Buy, Hold, Sell }
ActionSet action = ActionSet.Buy;
```

如上所示，将 0、1、2 替换为 Buy、Hold 和 Sell。

enum 可以和 uint 进行转换。

```solidity
function enumToUint() external view returns(uint) {
    return uint(action);
}
```

## 函数类型

Solidity 中函数类型 function 属于数值类型，其基本格式如下。

`function <function name>(<parameter types>) {internal|external|private|public} [pure|view|payable] [returns(<return types>)]`

其中，方括号中为可选项。

- `function`为函数关键字
- `<function name>`为函数名
- `(<parameter types>)`圆括号中为参数
- `internal|external|private|public`这里为函数的可见性
  - internal 只能合约内部调用，可以继承
  - external 只能在合约外部调用，但是可以通过`this.func()`的方式在内部调用
  - private 只能本合约内部调用，不可继承
  - public 可以在合约内部和外部调用
- `[pure|view|payable]`这里为函数的权限/功能
  - pure 不可读不可写
  - view 可读不可写
  - payable 可读可写
- `[returns ()]`函数的返回值

```solidity
function get_number_plus_one(int number) public pure returns(int new_number) {
    new_number = number + 1;
}

function get_number() public view returns(int number) {
    number = _number + 1;
}
```

如上所示，`pure`对合约内部变量不可读不可写，所以只能对入参进行操作，`view`对合约内部变量可读不可写，所以可以新生成一个变量进行操作。

### 函数返回值

Solidity 的函数返回值包括`returns`和`return`两个关键字，其中`returns`是用在`function`声明语句中，而`return`是用在函数体内部。

```solidity
function returnMultiple() public pure returns(uint256, bool, uint256[3] memory) {
    return(1, true, [1,2,5]);
}
```

如上所示，函数`returnMultiple`定义了三个返回值的类型，分别是`uint256`、`bool`和`uint256[3] memory`。

### 命名式返回

Solidity 还支持命名式返回，如下所示。

```solidity
function returnMultiple() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array) {
    _number = 1;
    _bool = true;
    _array = [1, 2, 5];
}
```

如上所示，在定义函数返回值时，不仅定义了返回值的类型，还定义了返回值的名字，这样在函数体内部可以不用`return`关键字，直接对变量进行赋值即可。当然，`return`关键字也是可以使用的。

### 解构式赋值

Solidity 的函数返回值支持解构式赋值，如下所示。

```solidity
(_number, _bool, _array) = returnMultiple();
```

也可以只获取部分值。

```solidity
(, _bool ,) = returnMultiple();
```

## 引用类型

Solidity 包含三种引用类型，分别是数组`array`、结构体`struct`和映射`mapping`。引用类型占空间大，赋值的时候不是传值而是传引用。

### 数据位置

Solidity 的数据位置包括`storage`、`memory`和`calldata`三种，`storage`是存储在链上，`memory`和`calldata`是存储在内存中。存储在链上消耗 gas 多，存储在内存中消耗的 gas 较少。

- `storage` 合约里的状态变量默认都是`storage`，存储在链上
- `memory` 函数里的参数和局部变量一般都是`memory`，存储在内存中
- `calldata` 和`memory`类似，区别是`calldata`不可变

```solidity
function calldataArray(uint[] calldata _calldata) public pure returns(uint[] calldata) {
    return _calldata;
}
```

如上所示，如果对`_calldata`进行修改会报错。

### 数据位置和赋值规则

1. 合约里的`storage`变量赋值给函数里的`storage`变量，会创建引用，修改时会同步修改原变量；
2. `storage`类型赋值给`memory`类型，会创建独立副本，修改时不会同步修改原变量；
3. `memory`类型赋值给`memory`类型，会创建引用，修改时会同步修改原变量；
4. 其他情况，赋值给`storage`，会创建独立副本，修改时不会同步修改原变量。

### 变量的作用域

1. 状态变量

合约内函数外定义，所有在合约内的函数均可访问，存储在链上，gas 消耗高。

```solidity
uint c = 1;

function stateVariables() public pure returns(uint) {
    uint a = 10;
    uint b = 20;
    return a + b + c;
}
```

如上所示，`a`和`b`为局部变量，`c`为状态变量，在函数内部可以访问。

2. 局部变量

函数内部定义，函数执行完毕后销毁，存储在内存中，gas 消耗低。如上面例子中的`a`和`b`。

3. 全局变量

Solidity 预留的关键字，无需声明可以直接访问。

```solidity
function global() external view returns(address, uint, bytes memory){
    address sender = msg.sender;
    uint blockNum = block.number;
    bytes memory data = msg.data;
    return(sender, blockNum, data);
}
```

如上所示，`msg.sender`、`block.number`和`msg.data`均为全局变量。

### 数组

Solidity 中的数组`array`分为固定长度数组和可变长度数组两类，与 JavaScript 中的数组不同，Solidity 中的数组只能存储某一类型的数据，不能混存。

1. 固定长度数组

```solidity
uint[8] array1;
bytes1[3] array2;
address[100] array3;
```

2. 可变长度数组

可变长度数组形如 T[]，其中 T 是具体的某个类型，其中 bytes 是个例外，后面不需要跟[]。

```solidity
uint[] array4;
bytes1[] array5;
address[] array6;
bytes array7;
```

#### 创建数组

对于`memory`修饰的动态数组，可以通过`new`关键字进行创建，但是必须指定数组的长度，并且声明后数组长度不能变化。

```solidity
function f1(uint[3] memory) public pure {
    //...
}

function f2() public pure {
    f1([1, 2, 3]);
}
```

> 如上所示，如果没有声明数组的类型，默认是以第一个元素为准。例如`[1,2,3]`，第一个元素 1 是 uint 类型，但是因为没有指定 type，所以默认会是 uint 的最小单位，即 uint8，所以`[1,2,3]`等价于`uint8[3]`，需要进行动态转换`[uint(1), 2, 3]`。

如果创建的是动态数组，需要一个个进行赋值。

#### 数组成员

- length 获取数组长度
- push() 向数组的最后插入 0
- push(x) 向数组的最后插入 x
- pop() 移除数组的最后一个元素

### 结构体

Solidity 中的结构体 struct 可以用来创建自定义数据结构。

```solidity
struct Persion {
    bytes name;
    uint age;
}
```
