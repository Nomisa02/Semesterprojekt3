const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./database');

// Add these flags for Raspberry Pi compatibility
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.disableHardwareAcceleration();

function createWindow() {
    const win = new BrowserWindow({
        width: 790,
        height: 470,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true
        },
        // Add these window-specific options
        backgroundColor: '#ffffff',
        show: false
    });

    // Show window when ready to avoid white flashing
    win.once('ready-to-show', () => {
        win.show();
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});