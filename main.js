const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./database');

// Platform-specific settings
if (process.platform === 'linux') {
    // Disable GPU acceleration on Linux to avoid X11 issues
    app.commandLine.appendSwitch('disable-gpu');
    app.commandLine.appendSwitch('no-sandbox');
    app.disableHardwareAcceleration();
    // Set display environment variable
    process.env.DISPLAY = ':0';
}

function createWindow() {
    const win = new BrowserWindow({
        width: 790,
        height: 470,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        // Use software rendering
        backgroundColor: '#ffffff',
        show: false,
        frame: true,
        autoHideMenuBar: true,
        // X11 specific options
        x11: {
            useXDG: true,
            disableCompositingManager: true
        }
    });

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

// Error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});