const { contextBridge } = require('electron');

// Expose limited APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
    appVersion: '1.0.0'
});
