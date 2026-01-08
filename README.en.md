# CmdKeep - Command Quick-Reference Tool

<p align="center">
  <strong>A lightweight desktop app that keeps your frequently used commands at your fingertips</strong>
</p>

<p align="center">
  A command management tool built for developers, helping you store, search, and manage those frequently used—but easy to forget—commands.
</p>

---

[English](README.en.md) | [简体中文](README.md)



## ✨ Features

### Core Features

- 🔍 **Real-time search** - Full-text search across commands, titles, and descriptions; results update as you type
- 📁 **Category management** - Organize commands with custom categories like Git, Linux, Docker, Azure, SQL, and more
- 📋 **One-click copy** - Copy commands to the clipboard instantly, with visual feedback after copying
- ✏️ **Full CRUD** - Add, edit, and delete commands with a simple, intuitive workflow
- 💾 **Local storage** - Uses a SQLite database; all data stays local and works offline
- 🎨 **Modern UI** - A modern dark-themed interface that’s pleasant to use

### Design Highlights

- ⚡ **Lightweight & fast** - Built with Tauri; installer is only 3.1 MB, and runtime memory usage is about 12 MB
- 🔒 **Privacy & security** - All data is stored locally; no network connection and no data collection
- 🌐 **Cross-platform** - Supports Windows, macOS, and Linux (build on the target platform)
- 🎯 **Zero learning curve** - Clean and intuitive UI; start using it right away

---

## 🎬 Quick Start

### For Regular Users (Use the App Only)

1. Download the installer that matches your system:
   - Windows: `CmdKeep_0.1.0_x64-setup.exe` (recommended) or `CmdKeep_0.1.0_x64_en-US.msi`
2. Double-click the installer and follow the prompts
3. Launch CmdKeep and start adding your commands

### For Developers (Develop or Build the App)

#### Prerequisites

1. **Node.js** (LTS recommended)
   - Download: https://nodejs.org/

2. **Rust** (required)
   - Install command: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
   - Or visit: https://www.rust-lang.org/tools/install

3. **Microsoft C++ Build Tools** (Windows only)
   - Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Select **"Desktop development with C++"** during installation

#### Run in Development Mode

```bash
# 1. Clone or download the project
cd cmdkeep

# 2. Install dependencies
npm install

# 3. Start dev mode
npm run tauri dev
```

The first run will compile the Rust code, which may take 3–5 minutes.

#### Build a Production Version

```bash
npm run tauri build
```

After the build completes, the installer is located at:
- **Windows**: `src-tauri/target/release/bundle/nsis/CmdKeep_0.1.0_x64-setup.exe`

---

## 📖 User Guide

### Add a Command

1. Click the **"Add Command"** button in the top-right corner
2. Fill out the form:
   - **Title** (required): A short description, e.g., "Rename a Git branch"
   - **Category** (required): e.g., Git, Linux, Docker, Azure, SQL
   - **Command** (required): The actual command text
   - **Description** (optional): Detailed notes, parameter explanations, caveats, etc.
3. Click **"Add"** to save

**Example:**
```
Title: View Git commit history
Category: Git
Command: git log --oneline --graph --all
Description: Show commit history for all branches in a graph view, one commit per line
```

### Search Commands

Type keywords in the search box at the top, and the app will search in real time:
- Command titles
- Command text
- Description text

Results update instantly—no need to press Enter.

### Filter by Category

Click a category name in the left sidebar to show only commands in that category. Click **"All"** to show all commands.

### Copy a Command

Click the **"Copy"** button on a command card. The command is copied to the clipboard immediately, and the button briefly shows **"Copied"** as feedback.

### Edit a Command

Click the **Edit icon** (pencil icon) on a command card, update the info in the dialog, then save.

### Delete a Command

Click the **Delete icon** (trash icon) on a command card. Confirm to delete.

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast frontend build tool
- **Lucide React** - Modern icon library
- **Vanilla CSS** - Dark theme using CSS variables

### Backend
- **Tauri 2.1** - Rust-based desktop app framework
- **Rust** - High-performance, memory-safe systems programming language
- **SQLite (rusqlite)** - Lightweight embedded database
- **Serde** - Rust serialization/deserialization framework
- **Chrono** - Rust date/time library

### Architecture Highlights
- **Frontend/Backend separation** - React frontend + Rust backend, communicating via Tauri IPC
- **Type safety** - TypeScript (frontend) + Rust (backend) for dual type guarantees
- **Event-driven** - Communication via Tauri’s invoke/command pattern

---

## 📂 Project Structure

```
cmdkeep/
├── src/                        # React frontend source
│   ├── components/             # React components
│   │   ├── AddCommandModal.tsx    # Add/Edit command modal
│   │   ├── CategoryFilter.tsx     # Category filter sidebar
│   │   ├── CommandItem.tsx        # Single command card
│   │   ├── CommandList.tsx        # Command list container
│   │   └── SearchBar.tsx          # Search input
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # React entry file
│   ├── types.ts                # TypeScript type definitions
│   └── styles.css              # Global styles
│
├── src-tauri/                  # Tauri backend source
│   ├── src/
│   │   ├── main.rs             # Rust entry point, app initialization
│   │   ├── db.rs               # SQLite database operations
│   │   └── commands.rs         # Tauri command API handlers
│   ├── icons/                  # App icon assets
│   ├── Cargo.toml              # Rust dependencies config
│   ├── tauri.conf.json         # Tauri app configuration
│   └── build.rs                # Rust build script
│
├── index.html                  # HTML entry file
├── package.json                # npm dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── README.md                   # Project documentation
```

---

## 📊 App Size

- **Installer**:
  - NSIS (recommended): 3.1 MB
  - MSI: 4.5 MB
- **Installed size**: ~12 MB
- **Database file**: Depends on the number of stored commands (usually < 1 MB)

---

## 🔧 FAQ

### Q: How do I back up my command data?
A: Copy the database file `commands.db` to a safe place. To restore, replace it back to the original location.

### Q: Can I import/export commands?
A: Not supported in the current version, but you can directly operate on the SQLite database file.

### Q: Are command templates or variables supported?
A: Not supported in the current version; planned for a future release.

### Q: How do I uninstall the app?
A: Uninstall CmdKeep from your system settings under "Apps" or "Programs and Features". The database file must be deleted manually.

### Q: Why choose Tauri instead of Electron?
A: Tauri apps are smaller, faster, and use less memory. An Electron app with similar functionality is typically 50–150 MB, while CmdKeep is only 3.1 MB.

---

## 🛣 Roadmap

- [ ] Import/export (JSON/CSV)
- [ ] Command template support (e.g., `git branch -m <old> <new>`)
- [ ] Tag system (one command can have multiple tags)
- [ ] Global hotkey to open the app
- [ ] Command usage statistics
- [ ] Code syntax highlighting
- [ ] Multi-language support
- [ ] Optional cloud sync

---

<p align="center">
  Made with ❤️ using Tauri & React
</p>

<p align="center">
  © 2026 CmdKeep
</p>
