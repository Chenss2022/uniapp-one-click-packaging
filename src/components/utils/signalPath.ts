import {app, globalShortcut, ipcMain} from 'electron';
// import {getMacAddress, restart} from "./utils.ts";
import * as fs from "fs";
import path, {join} from 'node:path'

/**
 * 注册全局快捷键
 * @constructor
 */
function RegisterGlobalShortcut(mainWin: any) {

    //退出全屏
    globalShortcut.register('shift + ESC', () => {
        mainWin.fullScreen = false
        mainWin.webContents.send('fullScreen')
    })

    //全屏
    globalShortcut.register('shift + F1', () => {
        mainWin.fullScreen = true
        mainWin.webContents.send('unfullScreen')
    })

    // 配置页面
    globalShortcut.register('ctrl + shift + alt + s', () => {
        mainWin.webContents.send('disposition')
    })

    //开发者工具
    globalShortcut.register('ctrl + shift + i', () => {
        mainWin.webContents.openDevTools()
    })

    //重启
    // globalShortcut.register('ctrl + shift + alt + r', () => {
    //     restart()
    // })

    //关闭退出
    globalShortcut.register('ctrl + shift+ alt + q', () => {
        app.exit(0)
    })

    //屏蔽Alt+F4
    mainWin.webContents.on("before-input-event", (_: any, input: any) => {
        mainWin.webContents.setIgnoreMenuShortcuts(input.key === "F4" && input.alt);
    })
}

/**
 * 信号通道
 */
function signalPath(mainWin: any) {
    ipcMain.on('full-screen-type', (_event, type) => {
        if (type && !mainWin.isMaximized()) {
            mainWin.maximize()
        } else {
            mainWin.unmaximize()
        }
    })
    // ipcMain.handle('get-mac', () => {
    //     return getMacAddress()
    // })

    ipcMain.on('top-type', (_event, type) => {
        mainWin.setAlwaysOnTop(type)
    })

    ipcMain.on('close-window', () => {
        mainWin.close()
    })

    ipcMain.on('minimize-window', () => {
        mainWin.minimize()
    })
}

function writeFile() {
    ipcMain.on('requestConfig', (event) => {
        try {
            const data = fs.readFileSync(path.resolve(process.cwd(),'resources','storeFile','loclConfig.json'), 'utf8');
            event.sender.send('settingConfig', data); // ✅ 主动推送
        } catch (err) {
            event.sender.send('settingConfig', '[]');
        }
    });

    ipcMain.on('writeConfig', (_event, message) => {
        writeConfig(message)
    })
}

/**
 * 加载配置文件
 * @constructor
 */
function LoadConfig(mainWin:any) {
    try {
        const data = fs.readFileSync(path.resolve(process.cwd(),'resources','storeFile','loclConfig.json'), 'utf8');
        mainWin.webContents.send('settingConfig', data);
        console.log('读取配置文件成功：Success')
        // logToFile('读取配置文件成功：Success');
    } catch (err) {
        // logToFile(`读取配置文件失败：${err}`);
        console.log(`读取配置文件失败：${err}`)
    }
}

/**
 * 写入配置文件
 */
function writeConfig(message: string) {
    try {
        const data: string = JSON.stringify(message, null, 2);
        fs.writeFileSync(path.resolve(process.cwd(),'resources','storeFile','loclConfig.json'), data, 'utf8');
    } catch (err) {
        console.error(err);
    }
}



export {RegisterGlobalShortcut, signalPath,writeFile,LoadConfig }
