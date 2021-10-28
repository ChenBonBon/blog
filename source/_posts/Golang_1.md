---
title: Go开发环境搭建
date: 2021-10-26 10:39:14
tags: Go
categories: Golang
---

## 1. 下载安装 Golang

下载地址 https://golang.google.cn/dl/ ，选择合适的版本下载安装。安装完毕后打开 iTerm/bash，输入 `go version`，安装成功的情况下会显示类似`go version go1.17.2 darwin/amd64`的版本号。

## 2. 配置 Golang 环境变量

Golang 包含两个重要的环境变量，`GOROOT`和`GOPATH`，`GOROOT`存储了 Go 官方的源码和可执行文件，`GOPATH`存储了第三方的源码和可执行文件（自己的项目代码建议放在该目录下）。`GOROOT`在安装时已自动配置好，我们只需要配置`GOPATH`即可。

- GOPATH

打开 iTerm/bash，输入`go env GOPATH`，macOS 默认 `GOPATH` 地址为`/Users/{user}/go`，若要修改，我们使用如下命令可以新建文件夹

```shell
mkdir -p ~/gopath/{bin,pkg,src}
```

macOS 目前采用 zsh 作为默认的 shell，故编辑 zsh 的配置文件：

```shell
vi ~/.zshenv
```

新增如下代码：

```shell
export GOPATH=$HOME/gopath
export PATH=$PATH:$GOPATH/bin
```

保存之后，重启终端，运行 `go env GOPATH` 指令即可验证 `GOPATH` 是否设置成功。我们会将 `GOPATH/bin` 文件夹加入系统环境变量，这样才能保证第三方库的可执行文件可以正常运行。

- Go Modules

从 1.11 版本开始，Golang 引入了新的依赖管理机制 Go Modules 解决长期以来 Go 语言依赖包没有版本控制的缺陷，Go Modules 依赖的环境变量为 `GOPROXY` 和 `GOSUMDB`，`GOPROXY` 用于检索依赖包的信息，`GOSUMDB` 用于校验，默认的配置为：

```shell
GOPROXY="https://proxy.golang.org,direct"
GOSUMDB="sum.golang.org"
```

由于国内屏蔽 google，故导致这两个域名都无法访问。对于`GOPROXY`，七牛云做了一个镜像，方便国内开发者使用，项目地址：https://github.com/goproxy/goproxy.cn/blob/master/README.zh-CN.md ，打开 zsh 的配置文件：

```shell
vi ~/.zshenv
```

新增如下代码：

```shell
export GO111MODULE=on
export GOPROXY=https://goproxy.cn
```

对于`GOSUMDB`，google 官方提供了国内可访问的域名：http://sum.golang.google.cn

加入如下代码：

```shell
export GOSUMDB=sum.golang.google.cn
```

保存之后，重启终端，运行 `go env GO111MODULE GOPROXY GOSUMDB` 指令即可验证 `GO111MODULE GOPROXY GOSUMDB` 是否设置成功。

## 3. 配置 VS Code

打开[VS Code](https://code.visualstudio.com/) 官网 ，选择合适的版本下载安装。

安装后可以安装以下几个插件：

- Go (Go Team at Google)
  对 Golang 的各种支持，包括语法检查、自动格式化、引用跳转等等
- TODO Highlight (Wayou Liu)
  列出代码中包含 TODO 和 FIXME 注释的地方
- GitLens (GitKraken)
  可以查看版本库的历史，并且直接在代码编辑器里面可以看到某一段代码的修改历史
- Visual Studio IntelliCod (Microsoft)
  智能代码提示
