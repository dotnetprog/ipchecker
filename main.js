const { app ,BrowserWindow,ipcMain,net,Notification } = require('electron')
const path = require('node:path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
    width: 600,
    height: 200,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
  mainWindow.once('focus', () => {
    mainWindow.flashFrame(false);
})
  //mainWindow.webContents.openDevTools();
}
app.setAppUserModelId("ipchecker");
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') 
        app.quit();
});
ipcMain.handle("getMyIp", async () => {
    const response = await fetch("https://api.ipify.org");
    return await response.text();
});
ipcMain.handle("notify", async (context,title,body) => {
  new Notification({ title: title, body: body }).show();
});

ipcMain.handle("flashframe", async (context,title,body) => {
  mainWindow.flashFrame(true);
});