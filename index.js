const { app, BrowserWindow, Tray, Menu, clipboard, shell, Notification, NativeImage } = require('electron')
const fs = require('fs')
const path = require('path')
const gen = require('./generatePassword')

let tray = null
let win = null

function createWindow() {
    win = new BrowserWindow({
        width: 810,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        maximizable: false,
        maxHeight: 540,
        maxWidth: 810,
        minHeight: 540,
        minWidth: 810,
    })
    win.setIcon(path.join(__dirname, 'icon@2x.png'))

    var winMenu = Menu.buildFromTemplate([
        {
            label: 'File',
            role: 'fileMenu',
            type: 'submenu',
            submenu: [
                {
                    label: 'Close',
                    type: 'normal',
                    role: 'close',
                    click() {
                        win.hide()
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit PPG',
                    type: 'normal',
                    click() {
                        app.exit()
                    },
                    accelerator: 'CmdOrCtrl+Q'
                }
            ]
        },
        {
            label: 'Window',
            role: 'windowMenu',
            type: 'submenu',
            submenu: [
                {
                    label: 'Reload',
                    role: 'reload',
                    type: 'normal',
                    click() {
                        win.reload()
                    }
                },
                {
                    label: 'Open devTools',
                    role: 'toggleDevTools',
                    type: 'normal',
                    click() {
                        win.webContents.openDevTools()
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'New window',
                    type: 'normal',
                    click() {
                        createWindow()
                    }
                }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            type: 'submenu',
            submenu: [
                {
                    label: 'GitHub', click() {
                        shell.openExternal('https://github.com/cmexdev/ppg')
                    }
                }
            ]
        }
    ])

    Menu.setApplicationMenu(winMenu)

    win.loadFile('index.html')

    win.on('close', (e) => {
        e.preventDefault()
        win.hide()
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', () => {
    tray = new Tray(path.join(__dirname, 'icon@2x.png'))
    const trayMenu = Menu.buildFromTemplate([
        {
            label: 'Powerful Password Generator', enabled: false
        },
        {
            type: 'separator'
        },
        {
            label: 'Open PPG', type: 'normal', click() { win.show() }
        },
        {
            type: 'separator'
        },
        {
            label: 'Password', type: 'submenu', submenu: [
                {
                    label: 'Generate new and copy', type: 'normal', click() {
                        clipboard.writeText(gen.gen())
                        new Notification({
                            title: 'PPG copied to clipboard!',
                            body: 'Your new password was copied to your clipboard.',
                        }).show()
                    }
                }
            ]
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit PPG', type: 'normal', click() { app.exit() }
        }
    ])
    tray.setToolTip('PPG')
    tray.setContextMenu(trayMenu)
})