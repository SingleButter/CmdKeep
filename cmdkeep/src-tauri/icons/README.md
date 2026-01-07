# 图标说明

这个文件夹应该包含应用图标文件。

在运行 `npm run tauri dev` 或 `npm run tauri build` 之前，你可以使用 Tauri 的图标生成工具来创建所需的图标：

```bash
npm install --save-dev @tauri-apps/cli
npm run tauri icon path/to/your/icon.png
```

或者你可以手动放置以下图标文件:
- 32x32.png
- 128x128.png
- 128x128@2x.png
- icon.icns (macOS)
- icon.ico (Windows)

暂时你可以使用 Tauri 的默认图标，它们会在首次运行时自动生成。
