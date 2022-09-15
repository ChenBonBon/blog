# Form

1. scrollToFirstError

通过设置`scrollToFirstError=true`可以在表单验证出错时，滚动到第一个出错的 Form.Item 处，但是必须要注意，**只有在 submit 表单时**才能触发该效果，`form.validateFields`是不会触发该效果的。

2. preserve

当在 Modal 组件中使用 Form 时，Modal 的`destroyOnClose=true`并不会清空表单中的数据，必须设置表单的`preserve=false`。
