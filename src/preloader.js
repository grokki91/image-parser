// Electron context setting

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electron', {
    downloadImages: async () => {
        return await ipcRenderer.invoke('downloadImages')
    }
})