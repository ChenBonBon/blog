# 介绍

BackboneJS 是一种轻量级的 JavaScript 库，它允许开发并在 Web 浏览器中运行客户端应用程序。它提供了 MVC 框架，它抽象成数据模型，DOM 到视图，并构建这两种事件。BackboneJS 依赖 jQuery 和 Underscore，其中对 jQuery 是软依赖，对 Underscore 是硬依赖。

- Underscore.js :  这是唯一的硬依赖需要被包括在内。
- jQuery.js : 包括通过 Backbone.Router 和 DOM 操作与 Backbone.View 此文件的 REST 风格的持久性，历史的支持。
- json2.js : 包括这个文件对旧的 Internet Explorer 支持。

## 环境设置

1. 从[http://backbonejs.org/](http://backbonejs.org/)官网下载 backbone 源码，包括开发版、生产版和边缘版

2. 使用 CDN

这里我们使用 CDN 的方式。

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/underscore.js/1.13.6/underscore.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/backbone.js/1.4.1/backbone.js"></script>
```

## HelloWorld

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Backbone Demo</title>
  </head>
  <body>
    <div id="app">Loading</div>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/underscore.js/1.13.6/underscore.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/backbone.js/1.4.1/backbone.js"></script>

    <script>
      var App = Backbone.View.extend({
        el: '#app',
        initialize: function () {
          this.render();
        },
        render: function () {
          this.$el.html('Loaded');
        },
      });

      var app = new App();
    </script>
  </body>
</html>
```
