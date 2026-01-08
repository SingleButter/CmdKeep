# CmdKeep - 命令速记工具

<p align="center">
  <strong>轻量级桌面应用，让你的常用命令触手可及</strong>
</p>

<p align="center">
  一个专为开发者设计的命令管理工具，帮助你存储、检索和管理那些常用但容易忘记的命令。
</p>

---

## ✨ 功能特性

### 核心功能

- 🔍 **实时搜索** - 支持命令、标题、说明的全文搜索，输入即搜
- 📁 **分类管理** - 按 Git、Linux、Docker、Azure、SQL 等自定义分类组织命令
- 📋 **一键复制** - 快速复制命令到剪贴板，复制后有视觉反馈
- ✏️ **完整 CRUD** - 添加、编辑、删除命令，操作简单直观
- 💾 **本地存储** - 使用 SQLite 数据库，数据完全保存在本地，离线可用
- 🎨 **现代 UI** - 采用暗色主题的现代化界面设计，赏心悦目

### 设计亮点

- ⚡ **轻量快速** - 基于 Tauri，安装包仅 3.1 MB，运行时占用约 12 MB
- 🔒 **隐私安全** - 所有数据存储在本地，不联网，不收集任何信息
- 🌐 **跨平台** - 支持 Windows、macOS、Linux（需在对应平台构建）
- 🎯 **零学习成本** - 简洁直观的界面，上手即用

---

## 🎬 快速开始

### 普通用户（仅使用应用）

1. 下载适合你系统的安装程序：
   - Windows: `CmdKeep_0.1.0_x64-setup.exe` (推荐) 或 `CmdKeep_0.1.0_x64_en-US.msi`
2. 双击安装文件，按提示完成安装
3. 启动 CmdKeep，开始添加你的命令

### 开发者（开发或构建应用）

#### 前置要求

1. **Node.js** (推荐 LTS 版本)
   - 下载地址: https://nodejs.org/

2. **Rust** (必须)
   - 安装命令: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
   - 或访问: https://www.rust-lang.org/tools/install

3. **Microsoft C++ Build Tools** (仅 Windows)
   - 下载地址: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - 安装时选择 "Desktop development with C++"

#### 开发运行

```bash
# 1. 克隆或下载项目
cd cmdkeep

# 2. 安装依赖
npm install

# 3. 运行开发模式
npm run tauri dev
```

首次运行会编译 Rust 代码，可能需要 3-5 分钟。

#### 构建生产版本

```bash
npm run tauri build
```

构建完成后，安装程序位于：
- **Windows**: `src-tauri/target/release/bundle/nsis/CmdKeep_0.1.0_x64-setup.exe`

---

## 📖 使用指南

### 添加命令

1. 点击右上角 **"添加命令"** 按钮
2. 填写表单：
   - **标题** (必填): 命令的简短描述，如 "重命名 Git 分支"
   - **分类** (必填): 如 Git、Linux、Docker、Azure、SQL
   - **命令** (必填): 实际的命令内容
   - **说明** (可选): 命令的详细说明、参数解释、注意事项等
3. 点击 **"添加"** 保存

**示例：**
```
标题: 查看 Git 提交历史
分类: Git
命令: git log --oneline --graph --all
说明: 以图形化方式显示所有分支的提交历史，每个提交显示为一行
```

### 搜索命令

在顶部搜索框输入关键词，应用会实时搜索：
- 命令标题
- 命令内容
- 说明文字

搜索结果会即时显示，无需按回车。

### 分类筛选

点击左侧边栏的分类名称，只显示该分类下的命令。点击 "全部" 显示所有命令。

### 复制命令

点击命令卡片上的 **"复制"** 按钮，命令会立即复制到剪贴板，按钮会短暂显示 "已复制" 作为反馈。

### 编辑命令

点击命令卡片上的 **编辑图标** (铅笔图标)，在弹出的对话框中修改信息，然后保存。

### 删除命令

点击命令卡片上的 **删除图标** (垃圾桶图标)，确认后即可删除。

---

## 🛠 技术栈

### 前端
- **React 18** - UI 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 极速的前端构建工具
- **Lucide React** - 现代化的图标库
- **原生 CSS** - 使用 CSS 变量的暗色主题

### 后端
- **Tauri 2.1** - 基于 Rust 的桌面应用框架
- **Rust** - 高性能、内存安全的系统编程语言
- **SQLite (rusqlite)** - 轻量级嵌入式数据库
- **Serde** - Rust 序列化/反序列化框架
- **Chrono** - Rust 日期时间处理库

### 架构特点
- **前后端分离** - React 前端 + Rust 后端，通过 Tauri IPC 通信
- **类型安全** - TypeScript (前端) + Rust (后端) 双重类型保障
- **事件驱动** - 使用 Tauri 的 invoke/command 模式进行通信

---

## 📂 项目结构

```
cmdkeep/
├── src/                        # React 前端源码
│   ├── components/             # React 组件
│   │   ├── AddCommandModal.tsx    # 添加/编辑命令弹窗
│   │   ├── CategoryFilter.tsx     # 分类筛选侧边栏
│   │   ├── CommandItem.tsx        # 单个命令卡片
│   │   ├── CommandList.tsx        # 命令列表容器
│   │   └── SearchBar.tsx          # 搜索框
│   ├── App.tsx                 # 主应用组件
│   ├── main.tsx                # React 入口文件
│   ├── types.ts                # TypeScript 类型定义
│   └── styles.css              # 全局样式
│
├── src-tauri/                  # Tauri 后端源码
│   ├── src/
│   │   ├── main.rs             # Rust 主入口，初始化应用
│   │   ├── db.rs               # SQLite 数据库操作
│   │   └── commands.rs         # Tauri 命令 API 处理
│   ├── icons/                  # 应用图标资源
│   ├── Cargo.toml              # Rust 依赖配置
│   ├── tauri.conf.json         # Tauri 应用配置
│   └── build.rs                # Rust 构建脚本
│
├── index.html                  # HTML 入口文件
├── package.json                # npm 依赖和脚本
├── tsconfig.json               # TypeScript 配置
├── vite.config.ts              # Vite 构建配置
└── README.md                   # 项目文档
```

---


---

## 📊 应用大小

- **安装程序**:
  - NSIS (推荐): 3.1 MB
  - MSI: 4.5 MB
- **安装后占用**: 约 12 MB
- **数据库文件**: 取决于存储的命令数量 (通常 < 1 MB)

---

## 🔧 常见问题

### Q: 如何备份我的命令数据？
A: 复制数据库文件 `commands.db` 到安全位置即可。恢复时替换回原位置。

### Q: 可以导入/导出命令吗？
A: 当前版本暂不支持，但你可以直接操作 SQLite 数据库文件。

### Q: 支持命令模板或变量吗？
A: 当前版本暂不支持，计划在未来版本中添加。

### Q: 如何卸载应用？
A: 在系统设置的"应用"或"程序和功能"中找到 CmdKeep 卸载。数据库文件需手动删除。

### Q: 为什么选择 Tauri 而不是 Electron？
A: Tauri 应用更小、更快、内存占用更低。相同功能的 Electron 应用通常 50-150 MB，而 CmdKeep 仅 3.1 MB。

---

## 🛣 未来计划

- [ ] 导入/导出功能 (JSON/CSV)
- [ ] 命令模板支持 (如 `git branch -m <old> <new>`)
- [ ] 标签系统（一个命令支持多个标签）
- [ ] 全局快捷键唤起应用
- [ ] 命令使用频率统计
- [ ] 代码语法高亮
- [ ] 多语言支持
- [ ] 可选的云同步功能

---

<p align="center">
  Made with ❤️ using Tauri & React
</p>

<p align="center">
  © 2026 CmdKeep
</p>
