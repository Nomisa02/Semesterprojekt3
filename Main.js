const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./database');

// Additional flags for Raspberry Pi compatibility
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('use-gl=swiftshader');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-gpu-sandbox');
app.disableHardwareAcceleration();

function createWindow() {
    const win = new BrowserWindow({
        width: 790,
        height: 470,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
            offscreen: true,
            spareRenderer: true
        },
        // Enhanced window options for Pi compatibility
        backgroundColor: '#ffffff',
        show: false,
        frame: true,
        autoHideMenuBar: true
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