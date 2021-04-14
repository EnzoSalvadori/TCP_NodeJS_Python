const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // para poder usar o require no script
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`)
});