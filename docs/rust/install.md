# 安装 Rust

官方推荐使用 rustup 来完成 Rust 的安装，rustup 同时也是 Rust 的版本管理工具。

## macOS 或 Linux

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

对于国内的用户，可以使用以下命令进行安装：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh
```

等待程序运行完成，如果安装成功，输出中会包含 `Rust is installed now. Great!`。

## Windows

Windows 环境下的安装请参考 [在 Windows 上安装 rustup](https://course.rs/first-try/installation.html#%E5%9C%A8-windows-%E4%B8%8A%E5%AE%89%E8%A3%85-rustup)。

## 检查安装是否成功

可以通过在命令行中输入下列命令来检查安装是否成功：

```bash
rustc -V
cargo -V
```

如果安装成功，此时能看到最新发布的稳定版本的版本号、提交哈希值和提交日期。

## 本地文档

安装 Rust 时也会在本地安装一个文档服务，当您想要查阅某些标准库的函数的用法时，可以通过执行 `rustup doc` 来启动本地文档进行查阅。

## VSCode

安装完 Rust 后我们打开 VSCode，在左侧扩展面板中搜索 `rust-analyzer`，这是目前 Rust 最好的插件。另外，推荐安装 `Error Lens` 插件，该插件可以获得更好的错误展示。

## Cargo

作为一个前端开发，我们对 `nodejs` 提供的包管理工具 `npm` 一定非常熟悉。对于 Rust 来说，Rust 为我们提供了类似于 `npm` 的包管理工具，即 `Cargo`。

### Cargo 的常见命令

1. 创建项目 cargo new [project_name] [type]

   `type` 有两种，分别为 `--bin` 和 `--lib`，前者会生成一个可运行的项目，后者会生成一个依赖库项目。依赖库项目需要作为依赖安装在其他可运行项目中才可运行。`type` 默认为空时为 `--bin`。

2. 运行项目 cargo run

3. 构建项目 cargo build

4. 验证代码 cargo check

   当项目变得庞大之后，`cargo run` 和 `cargo build` 不可避免的会变慢，因此 Cargo 提供了一种更快的验证代码正确性的方式，即 `cargo check`。

5. 添加依赖 cargo add [package_name]

6. 移除依赖 cargo remove [package_name]

### Cargo.toml 和 Cargo.lock

类似于 `nodejs` 项目中的 `package.json` 和 `package-lock.json`，Rust 项目提供了在 `Cargo.toml` 文件中定义项目名、版本号、依赖等信息。依赖安装完成后，会生成 `Cargo.lock` 文件。

> 对于可运行的项目，建议将 Cargo.lock 文件上传至 git 仓库，对于依赖库项目，则建议将 Cargo.lock 文件添加至 .gitignore 中。

```toml
[package]
name = "world_hello"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.3"
hammer = { version = "0.5.0"}
color = { git = "https://github.com/bjz/color-rs" }
geometry = { path = "crates/geometry" }
serde = { version = "1.0", features = ["derive"] }
```

对于这样的一个 `Cargo.toml` 文件，`package` 下定义了项目的元信息，`name` 表示项目名，`version` 表示项目版本，`edition` 表示项目所用的 Rust 的大版本。`dependencies` 下定义了项目的依赖信息，`name` 后可以直接添加依赖的版本，也可以使用一个对象。对象中一般有 `version`、`path`、`features` 等字段。分别代表依赖的版本、所在位置以及需要启用的特性。如果不指定 `path`，默认是从 Rust 官方仓库 `crates.io` 中安装依赖，如果需要使用本地依赖库，则将 `path` 设置为本地依赖库项目即可。

## Stable 和 Nightly

Rust 官方提供了 `stable`、`beta` 和 `nightly` 三种版本，对于大部分开发者而言，`stable` 可能是更好的选择，但是对于部分热衷于尝鲜的用户而言，可以使用 `nightly` 版本提前尝试一些新的特性和功能。

您可以通过以下命令安装 `nightly` 版本的 Rust：

```bash
rustup toolchain install nightly
```

可以看到，安装时不仅安装了 `nightly` 版本的 Rust，同时还安装了所有 `nightly` 版本的工具链。

安装完成后，可以通过以下命令查看已经安装的所有版本的 Rust：

```bash
rustup toolchain list
```

通过以下命令，可以设置当前项目的 Rust 版本为 `nightly`：

```bash
rustup override set nightly
```

## 疑难问题

1. 依赖安装慢

   对于国内的用户，可以使用以下两种方法其中之一加快依赖的安装。

   1. 命令行代理

   开启全局代理默认只会对浏览器生效，对于命令行而言，需要在 bash 中执行下面的命令。

   ```bash
   export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7891
   ```

   2. 使用国内镜像源替代官方源

   打开 `$HOME/.cargo/config.toml` 文件，添加以下代码：

   ```toml
   [source.crates-io]
   # To use sparse index, change 'rsproxy' to 'rsproxy-sparse'
   replace-with = 'rsproxy'

   [source.rsproxy]
   registry = "https://rsproxy.cn/crates.io-index"
   [source.rsproxy-sparse]
   registry = "sparse+https://rsproxy.cn/index/"

   [registries.rsproxy]
   index = "https://rsproxy.cn/crates.io-index"

   [net]
   git-fetch-with-cli = true
   ```

   与此同时，在 `~/.zshrc` 或 `~/.bashrc` 中添加以下代码：

   ```bash
   export RUSTUP_DIST_SERVER="https://rsproxy.cn"
   export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
   ```

   这里使用的是字节跳动的国内镜像源，也可以使用 ustc 等其他源。

2. rust-analyzer 卡死

   有时候 VSCode 插件 `rust-analyzer` 会卡死，一般来说会卡在 `fetch metadata` 阶段。可以通过以下命令解决：

   ```bash
   rm -rf ~/.cargo/.package-cache
   cargo metadata
   ```

   上述命令会删除 `Cargo` 的缓存，这时运行 `cargo metadata` 可以很快获取 `metadata`，这时重启 VSCode 即可跳过 `rust-analyzer` 插件 `fetch metadata` 阶段。
