import {app, BrowserWindow, shell, ipcMain} from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs';
import {LoadConfig, RegisterGlobalShortcut, writeFile} from "../../src/components/utils/signalPath";
import { runBuild } from './build.js'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }


  // 快捷键
  RegisterGlobalShortcut(win);

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())

    LoadConfig(win)
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // 文件
  writeFile();
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// 上传文件
ipcMain.handle('save-local-file', async (_event, { name, buffer, localORonline }) => {
  try {
    let savePath: string = '';
    if(localORonline){
      savePath = path.resolve(process.cwd(), 'resources/HBuilder-Integrate-AS/simpleDemo');
    }else {
      savePath = path.resolve(process.cwd(), 'public/onlineFile');
    }
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    const filePath = path.join(savePath, name);

    // ✅ 如果存在同名文件，先删除
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ✅ 保存新文件
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return { success: true, path: filePath, filename: name };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// 删除文件
ipcMain.handle('delete-local-file', async (_event, {filename,localORonline}) => {
  try {
    let savePath: string = '';
    if(localORonline){
      savePath = path.resolve(process.cwd(), 'resources/HBuilder-Integrate-AS/simpleDemo');
    }else {
      savePath = path.resolve(process.cwd(), 'public/onlineFile');
    }
    const filePath = path.join(savePath, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    } else {
      return { success: false, error: '文件不存在' };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
});


// 注册构建 IPC 调用
ipcMain.handle('build:start', async (event, data) => {
  const logs: string[] = [];

  const sendLog = (msg: string) => {
    logs.push(msg);
    event.sender.send('build:log', msg); // 实时发送日志到前端
  };

  const success = (msg: string) => {
    // alert('构建成功！');
    console.log('success')
  };

  const result = await runBuild(data, sendLog, success);
  return { ...result, logs };
});
