<template><div><h1 id="form" tabindex="-1"><a class="header-anchor" href="#form" aria-hidden="true">#</a> Form</h1>
<ol>
<li>scrollToFirstError</li>
</ol>
<p>通过设置<code v-pre>scrollToFirstError=true</code>可以在表单验证出错时，滚动到第一个出错的 Form.Item 处，但是必须要注意，<strong>只有在 submit 表单时</strong>才能触发该效果，<code v-pre>form.validateFields</code>是不会触发该效果的。</p>
<ol start="2">
<li>preserve</li>
</ol>
<p>当在 Modal 组件中使用 Form 时，Modal 的<code v-pre>destroyOnClose=true</code>并不会清空表单中的数据，必须设置表单的<code v-pre>preserve=false</code>。</p>
</div></template>


