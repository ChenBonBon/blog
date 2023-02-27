# SPA

## 什么是 SPA

单页面应用，应用只有一个入口，在首次加载时一次性加载全部的 HTML、JS 和 CSS，或者在路由进行切换时，动态加载对应页面的 HTML、JS 和 CSS。

## SPA 和 MPA 的区别

单页面应用只有一个入口，在路由切换时进行局部刷新；多页面应用有多个入口，在路由切换时需要全部刷新重新加载；SPA 响应速度快，MPA 响应速度慢；SPA 可以通过组件进行传值，而 MPA 必须借助 URL、LocalStorage 等方式进行传递；SPA 的 SEO 必须借助 SSR、同构或判断爬虫的方式进行，而 MPA 的 SEO 相对比较简单。

## SPA 的优缺点

优点：响应速度快，与组件化相对较为契合。

缺点：不利于 SEO，首次渲染耗时较长。

## 实现一个 SPA

1. hash 模式

```javascript
class Router {
  constructor() {
    this.routers = {};
    this.current = '/';

    window.addEventListener('load', this.push, false);
    window.addEventListener('hashchange', this.push, false);
  }

  route(path, callback) {
    this.routers[path] = callback;
  }

  push(path) {
    this.routers[path] && this.routers[path]();
  }
}
```

2. history 模式

```javascript
class Router {
  constructor() {
    this.routers = {};
    this.pop();
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routers[path]();
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  pop() {
    window.addEventListener(
      'popstate',
      (e) => {
        const path = e.state && e.state.path;
        this.routes[path] && this.routes[path]();
      },
      false
    );
  }
}
```

## 如何给 SPA 做 SEO

1. SSR

2. 通过 URL rewrite 做静态化，将外部请求的 URL 重定向到动态页面地址

3. 通过 Nginx 判断请求来源是否为爬虫，如果是爬虫则转发到 node server，将完整的 HTML 解析后返回

## SPA 首屏加载速度慢怎么优化

### 首屏加载时间如何计算

1. 使用 DOMContentLoaded

```javascript
document.addEventListener(
  'DOMContentLoaded',
  (e) => {
    console.log('loaded');
  },
  false
);
```

2. 使用 performance

```javascript
console.log(performance.getEntriesByName('first-contentful-paint')[0]);
```

### 首屏加载速度慢的原因

1. 网络延时
2. 资源体积过大
3. 资源重复请求
4. 渲染被阻塞

### 首屏加载速度慢的优化方案

1. 使用路由懒加载，比如 React.lazy，对未请求的路由进行动态 import
2. 对静态资源本地缓存，比如 Service Worker、HTTP 缓存等
3. 使用 webpack 的 minChunks，避免对多个页面都用到的代码重复打包
4. UI 框架按需加载
5. 减少 HTTP 请求的数量，比如使用雪碧图或 iconfont
6. 开启 gzip 压缩
7. 使用 SSR
