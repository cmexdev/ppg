const { app, BrowserWindow, Tray, Menu, clipboard } = require('electron')
const fs = require('fs')
const path = require('path')

let tray = null
let win = null

function createWindow() {
    win = new BrowserWindow({
        width: 810,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'split.js')
        },
        maximizable: false,
        maxHeight: 540,
        maxWidth: 810,
        minHeight: 540,
        minWidth: 810,
    })
    win.setIcon('icon@2x.png')

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
                    label: 'Quit PPG',
                    type: 'normal',
                    role: 'quit',
                    click() {
                        app.quit()
                    }
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
                    label: 'GitHub'
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
    tray = new Tray('icon@2x.png')
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
                    label: 'New', type: 'normal', click() {
                        clipboard.writeText(genPassword())
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

function genPassword() {
    const data = fs.readFileSync('alpha.txt')
    const split = data.toString().split('\n')
    const join = split.join('')
    const words = join.split('\r')

    var threeLetters = []

    words.forEach(el => {
        if (el.length === 3) {
            threeLetters.push(el)
        }
    })

    let rn = Math.floor(Math.random() * threeLetters.length)
    var threeRandomWord = threeLetters[rn][0].toUpperCase() + threeLetters[rn].substring(1)

    let zeroThroughNine = Math.floor(Math.random() * 9)

    var fiveLetters = []

    words.forEach(el => {
        if (el.length === 5) {
            fiveLetters.push(el)
        }
    })

    let rnForFive = Math.floor(Math.random() * fiveLetters.length)
    var fiveRandomWord = fiveLetters[rnForFive][0].toUpperCase() + fiveLetters[rn].substring(1)

    const punc = [',', '.', '/', '?', ';', ':']
    let rnForPunc = Math.floor(Math.random() * punc.length)
    var randomPunc = punc[rnForPunc]

    var fourLetters = []

    words.forEach(el => {
        if (el.length === 4) {
            fourLetters.push(el)
        }
    })

    let rnForFour = Math.floor(Math.random() * fourLetters.length)
    var fourRandomWord = fourLetters[rnForFour][0].toUpperCase() + fourLetters[rn].substring(1)

    const password = threeRandomWord + zeroThroughNine + fiveRandomWord + randomPunc + fourRandomWord
    return password
}