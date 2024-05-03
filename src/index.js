// Base settings for electron js

const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const downloadImages = require('./utils/downloadImages')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preloader.js')
        }
    })

    win.setMenuBarVisibility(false)
    win.setTitle('Image Parser')
    win.loadFile('src/index.html')
}

app.whenReady().then(() => createWindow())
app.on('window-all-closed', () => app.quit())

ipcMain.handle('downloadImages', async () => {
    return await downloadImages()
})