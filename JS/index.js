const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // para poder usar o require no script
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/index.html`)
});
