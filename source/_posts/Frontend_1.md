---
title: HKAir项目开发心得
date: 2021-12-01 23:14:07
tags: HKAir Frontend
---

在HKAir项目开发过程中，我学会了很多，也成长了很多，但是也经历了很多痛苦的过程。最近在研究前端组件库，结合最近的Modal优化，来谈一谈在项目开发过程中的心得体会和遇到的问题。

1. 类似于Join Project、Swap App这样的功能，请**千万不要**再将`Button`和`Modal`放在一个组件中了！

> 这样存在的问题是，`Button`的onClick事件一般为打开`Modal`，`Modal`的onOk一般为父组件传入的onOk，这样将会传递多层ref，并且数据管理混乱。

2. 尽量避免在`Modal`中使用`Form`的`onFinish`属性，因为`okButton`即使设置`htmlType: 'submit'`，也不会触发表单的提交，因为`okButton`是在`Modal`的`Footer`中。