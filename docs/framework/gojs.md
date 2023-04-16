## GoJS 图表组件的介绍

**GoJS** 是一个可以让你在现代网络浏览器中轻松创建互动图表的 JavaScript 库。**GoJS** 支持图形模板和图形对象属性到模型数据的数据绑定。您只需要保存和恢复 model，该 model 由简单的 JavaScript 对象组成，且包含您的应用所需的任何属性。许多预定义的工具和命令实现了大多数图表所需的标准行为，外观和行为的定制在绝大多数情况下可以通过设置属性的方式实现。

## 一个简单的 GoJS 图

下面的代码定义了一个节点模板和模型数据，它生成了一个含有少量节点和链接的小图表。

```javascript
const diagram = new go.Diagram('diagram');

// 节点模板描述了每个节点应该如何被构建
diagram.nodeTemplate = new go.Node('Auto') // 该 Shape 会环绕在 TextBlock 四周
  .add(
    new go.Shape('RoundedRectangle')
      // Node.data.color 会绑定至 Shape.fill
      .bind('fill', 'color')
  )
  .add(
    new go.TextBlock({ margin: 8 }) // 指定 margin 以在文本周围增加一些空间
      // Node.data.key 会绑定至 TextBlock.text
      .bind('text', 'key')
  );

// 模型仅包含描述图表的基本信息
diagram.model = new go.GraphLinksModel(
  [
    // JavaScript 对象的 JavaScript 数组，每个节点一个
    // ”颜色”属性是专门为此应用程序添加的
    { key: 'Alpha', color: 'lightblue' },
    { key: 'Beta', color: 'orange' },
    { key: 'Gamma', color: 'lightgreen' },
    { key: 'Delta', color: 'pink' },
  ],
  [
    // JavaScript 对象的 JavaScript 数组，每个链接一个
    { from: 'Alpha', to: 'Beta' },
    { from: 'Alpha', to: 'Gamma' },
    { from: 'Beta', to: 'Beta' },
    { from: 'Gamma', to: 'Delta' },
    { from: 'Delta', to: 'Alpha' },
  ]
);

// 启用 Ctrl-Z 撤消和 Ctrl-Y 重做
diagram.undoManager.isEnabled = true;
```

上述代码将会创建以下图表：

![image-20230416095742751](/Users/bonbon/Library/Application Support/typora-user-images/image-20230416095742751.png)

你可以通过多种方式与图表进行交互：

- 你可以通过单击一个 part 来选定它，被选定的 node 的周围会出现高亮的蓝色矩形线条的 Adornment。 被选定的 link 以及该 link 的路径会用高亮的蓝色线条突出显示。

- 你可以一次选中多个 parts，在单击时按住 Shift 键进行将该 part 加入选择，按住 Control 键来切换该 part 是否需要被选择。
- 另一种多选的方法是在背景上（而不是在某个 part 上）按下鼠标，稍等片刻，然后拖动一个框。 当鼠标松开时框中的 parts 将会被选中。 然后也可以使用 Shift 和 Control 键来继续选择或者切换该 part 是否需要被选择。
- 使用 Control + A 选择图表中的所有 parts。
- 通过选择并拖动来移动一个或多个节点。
- 使用复制/粘贴 (Control + C/Control + V) 或使用 Control + 鼠标拖动来复制选定的部分。
- 使用 Delete 键删除选定的 parts。
- 如果滚动条可见，或者所有的 parts 的集合小于图表的可视区域（"viewport"），你可以通过在背景上（而不是在某个 part 上）按下鼠标并立即拖动来平移图表。
- 使用鼠标滚轮来实现上下滚动，使用 Shift + 鼠标滚轮来实现左右滚动。，使用 Control + 鼠标滚轮来进行放大和缩小。

您还可以在触摸设备上用手指平移、缩放、选择、复制、移动、删除、撤消和重做。 大多数可以从键盘调用的命令都可以从默认的 context menu 中调用，您可以通过长按屏幕来获得该菜单。

文档中所有示例的独特之处在于它们都是“实时”的而不是屏幕截图！它们是由文档中显示的源代码实现的实际的图表。 您可以与这些图表进行交互——有些甚至可以显示动画。

如果您想查看更多有关 GoJS 功能的示例，请参阅 GoJS 示例目录。 为了更方便地搜索 JavaScript 代码和文档或通过修改示例进行实验，您可以通过多种方式安装 GoJS 工具包：

- 从 [Download](https://gojs.net/latest/download.html) 处下载 ZIP 包。
- 从 [GoJS on GitHub](https://github.com/NorthwoodsSoftware/GoJS) 进行下载。
- 使用 `npm install gojs` 安装 GoJS。

## GoJS 的理念

图表由 Parts 组成，Nodes 可以通过 Links 进行连接，并且可以被对它们进行分组。所有这些 parts 都聚集在 Layers 中，并按 Layouts 排列。

每一个图表都包含一个保存和阐释您的应用数据的 Model，这个 Model 可以用来确定节点到节点的连接关系和分组成员的关系。绝大多数的 parts 都是和您的应用的数据进行绑定的。图表会自动为 Model.nodeDataArray 中的每一项创建一个 Node 或一个 Group，并为 GraphLinksModel.linkDataArray 中的每一项创建一个 Link。您可以向每个数据对象添加您需要的任何属性，但每种 model 实际上只需要指定很少几个属性。

每个 Node 或 Link 的外观和行为通常由一个 template 来定义。每一个 template 由一些 Panels 组成，而每个 Panel 包含诸如 TextBlocks 或 Shapes 的 GraphObjects。所有的 parts 都有默认模板，但几乎所有应用都会指定自定义 template 以实现所需的外观和行为。GraphObject 属性到模型数据属性的数据绑定使得每个由数据生成的 Node 或 Link 都是唯一的。

Nodes 的位置可以（通过交互或编程的方式）手动指定，或者通过 Diagram.Layout 或者每一个 Group.Layout 自动排列。Nodes 通过其左上角点（GraphObject.position）或 node 中程序员定义的 spot（Part.location 和 Part.locationSpot）定位。

Tools 可以处理鼠标和键盘事件。每一个图表都有一系列的可以处理诸如选择 part 上或拖动它们或在两个 nodes 之间绘制新链接的 tools。ToolManager 会根据鼠标事件和当前情况确定应该运行哪个 tool。

每个图表还有一个 CommandHandler，用于执行各种命令，例如删除或复制。 CommandHandler 在 ToolManager 运行时用于阐释键盘事件，例如 control + Z。

图表提供了滚动图表各个 parts 以及放大缩小的能力，图表也同样包含所有的 layers，这些 layers 又包含所有的 parts（nodes 和 links），这些 parts 依次由可能嵌套的包含 text、shapes 和 images 的 panels 组成。内存中 JavaScript 对象的这种层次结构形成了图表可能绘制的所有内容的“可视化树”。

图表提供了滚动图表的各个部分以及放大或缩小的能力。 该图还包含所有层，层又包含所有部分（节点和链接）。 这些部分依次由可能嵌套的文本、形状和图像面板组成。 内存中 JavaScript 对象的这种层次结构形成了图表可能绘制的所有内容的“可视化树”。

Overview 类允许用户查看整个模型并控制图表需要显示的部分，Palette 类包含用户可以拖放到图表中的 parts。

您可以选择图表中的一个或多个 parts，node 或 link 被选中时会根据 template 的实现不同，可能会更改其外观。图表还可以添加某些 Adornment 来表明所选区域以及所支持的 tools，例如调整 node 大小或重新连接 link 。Adornment 也是 tooltips 和 context menu 的实现方式。

对图表、GraphObject、Model 或 model data 的所有编程的更改都应在每个用户操作的单个事务中执行，以确保更新是正确发生的以及支持撤消/重做操作。所有预定义的 tools 和命令都会执行事务，因此如果启用了 UndoManager，则每个用户操作都是可以自动撤消的。图表上的 DiagramEvents 以及图表和 GraghObjects 上的 event handlers 都将被记录在案，无论这些事件是在事务中被触发的还是你是否需要执行事务以更改 model 或图表。

## 创建一个图表

GoJS 不依赖于任何 JavaScript 库或框架，因此您应该能够在任何环境中使用它。 但是它确实需要支持现代 HTML 和 JavaScript 的环境。
