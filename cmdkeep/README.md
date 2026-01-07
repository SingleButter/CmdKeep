# CmdKeep - 命令速记工具

一个轻量级的桌面应用，用于存储、检索和管理常用但容易忘记的命令。

## 功能特性

- **快速搜索**: 支持命令、标题、说明的全文搜索
- **分类管理**: 按 Git、Linux、Docker、Azure、SQL 等分类组织命令
- **一键复制**: 快速复制命令到剪贴板
- **CRUD 操作**: 添加、编辑、删除命令
- **本地存储**: 使用 SQLite 数据库，数据完全保存在本地
- **现代 UI**: 采用暗色主题的现代化界面设计

## 技术栈

- **前端**: React + TypeScript + Vite
- **后端**: Tauri (Rust)
- **数据库**: SQLite
- **UI 图标**: Lucide React

## 安装前置条件

### 1. 安装 Node.js

下载并安装 Node.js (推荐 LTS 版本):
https://nodejs.org/

### 2. 安装 Rust

访问 Rust 官网安装 Rust:
https://www.rust-lang.org/tools/install

在 Windows 上，你需要先安装 Microsoft C++ Build Tools:
https://visualstudio.microsoft.com/visual-cpp-build-tools/

### 3. 安装 Tauri 依赖

参考 Tauri 官方文档安装对应平台的依赖:
https://tauri.app/start/prerequisites/

## 开发运行

1. 克隆或下载项目到本地

2. 安装依赖:
```bash
cd command-maid
npm install
```

3. 运行开发模式:
```bash
npm run tauri dev
```

## 构建应用

构建生产版本:
```bash
npm run tauri build
```

构建完成后，可执行文件会在 `src-tauri/target/release` 目录下。

## 使用说明

### 添加命令

1. 点击右上角的"添加命令"按钮
2. 填写以下信息:
   - **标题**: 命令的简短描述
   - **分类**: 如 Git、Linux、Docker 等
   - **命令**: 实际的命令内容
   - **说明**: 命令的详细说明或注意事项
3. 点击"添加"保存

### 搜索命令

在顶部搜索框输入关键词，会实时搜索标题、命令和说明中匹配的内容。

### 分类筛选

在左侧边栏选择分类，可以只显示该分类下的命令。

### 复制命令

点击命令卡片上的"复制"按钮，命令会被复制到剪贴板。

### 编辑/删除命令

点击命令卡片上的编辑或删除图标进行相应操作。

## 数据存储位置

应用数据存储在以下位置:

- **Windows**: `%APPDATA%\com.commandmaid.app\commands.db`
- **macOS**: `~/Library/Application Support/com.commandmaid.app/commands.db`
- **Linux**: `~/.config/com.commandmaid.app/commands.db`

## 项目结构

```
command-maid/
├── src/                    # React 前端源码
│   ├── components/         # React 组件
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 入口文件
│   ├── styles.css         # 样式文件
│   └── types.ts           # TypeScript 类型定义
├── src-tauri/             # Tauri 后端源码
│   ├── src/
│   │   ├── main.rs        # Rust 主文件
│   │   ├── db.rs          # 数据库操作
│   │   └── commands.rs    # 命令 API
│   ├── Cargo.toml         # Rust 依赖配置
│   └── tauri.conf.json    # Tauri 配置
├── package.json           # npm 依赖配置
└── vite.config.ts         # Vite 配置
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!
