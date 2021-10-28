---
title: 使用GitHub Pages搭建个人博客
date: 2021-10-14 16:07:02
tags: GitHub Pages 博客 blog
categories: GitHub Pages
---

## 1. 注册 GitHub 账号

如果没有 GitHub 账号，进入 https://github.com ，点击右上角Sign up，根据步骤完成注册。

## 2. 创建一个仓库

点击 New 按钮进入创建仓库页面，Repository name 即为 GitHub Pages 的生成的博客网站 Url 中的 pathname。

eg: Repository name 为 blog，Url 为https://chenbonbon.github.io/blog/

## 3. 安装 Hexo

此时已经可以开始写 blog 的页面代码，这里可以用 React、Vue 或者任何你喜欢的方式进行开发，并将打包之后的代码提交到代码仓库中。这里为了方便，我们使用 [Hexo](https://hexo.io/zh-cn/)进行博客框架的搭建。

### 什么是 Hexo？

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

### 安装

#### 安装前提

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- [Node.js](https://nodejs.org/zh-cn/) (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本)
- [Git](http://git-scm.com/)

#### 安装 Hexo

在安装完 Node.js 和 Git 后，即可使用 npm 安装 Hexo。

`npm install -g hexo-cli`

### 使用

安装完 hexo-cli 后，可以使用 hexo version 查看 hexo 的版本。

Hexo 常用命令
`hexo init <folder>` 创建 hexo 项目
`hexo new [layout] <title>` 创建 hexo 文章，layout 为空会默认在 source/\_posts 目录下新建 title.md 文件。
`hexo clean` 删除本地已打包生成的代码
`hexo server` 启动本地服务器，查看网站效果
`hexo generate` 打包代码

hexo 的配置可以参考[Hexo 配置](https://hexo.io/zh-cn/docs/configuration)

### 书写文章

在 source/\_posts 目录下修改对应的 md 文件。

### 部署

1. 将 [Travis CI](https://github.com/marketplace/travis-ci) 添加到你的 GitHub 账户中。
2. 前往 GitHub 的 [Applications settings](https://github.com/settings/installations)，配置 Travis CI 权限，使其能够访问你的 repository。
3. 在浏览器内新建一个标签页，前往 GitHub [新建 Personal Access Token](https://github.com/settings/tokens)，只勾选 repo 的权限并生成一个新的 Token。Token 生成后请复制并保存好。
4. 回到 Travis CI，前往你的 repository 的设置页面，在 Environment Variables 下新建一个环境变量，Name 为 GH_TOKEN，Value 为刚才你在 GitHub 生成的 Token。确保 DISPLAY VALUE IN BUILD LOG 保持 不被勾选 避免你的 Token 泄漏。点击 Add 保存。
5. 在你的 Hexo 站点文件夹中新建一个 .travis.yml 文件：

```yaml
sudo: false
language: node_js
node_js:
  - 12 # use nodejs v10 LTS
cache: npm
branches:
  only:
    - master # build master branch only
script:
  - hexo generate # generate static files
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GH_TOKEN
  keep-history: true
  on:
    branch: master
  local-dir: public
```

6. 将 .travis.yml 推送到 repository 中。Travis CI 应该会自动开始运行，并将生成的文件推送到同一 repository 下的 gh-pages 分支下
7. 在 GitHub 中前往你的 repository 的设置页面，修改 GitHub Pages 的部署分支为 gh-pages。
8. 前往 https://<你的 GitHub 用户名>.github.io 查看你的站点是否可以访问。这可能需要一些时间。

### Hexo 主题

访问https://hexo.io/themes/ 可以获取多达 346 款皮肤。
