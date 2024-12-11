const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getPrices: () => ipcRenderer.invoke('get-prices'),
    saveSelection: (item) => ipcRenderer.invoke('save-selection', item)
});