const { app, BrowserWindow, ipcMain } = require("electron");
// const serve = require("electron-serve");
const path = require("path");
const keySender = require("node-key-sender");

// const appServe = app.isPackaged
//   ? serve({
//       directory: join(__dirname, "../out"),
//     })
//   : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // Importante: Desactiva nodeIntegration para seguridad
      contextIsolation: true,
      webviewTag: true,
    },
  });
  win.maximize();
  win.removeMenu();
  // win.fullScreen = true
  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("send-key-combination", (event, keys) => {
  keySender.sendCombination(keys);
});

ipcMain.on("send-key", (event, key) => {
  keySender.sendKey(key);
});
