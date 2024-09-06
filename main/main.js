const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const keySender = require("node-key-sender");

var accentsMap = {
  á: ["dead_acute", "a"],
  é: ["dead_acute", "e"],
  í: ["dead_acute", "i"],
  ó: ["dead_acute", "o"],
  ú: ["dead_acute", "u"],
  Á: ["dead_acute", "A"],
  É: ["dead_acute", "E"],
  Í: ["dead_acute", "I"],
  Ó: ["dead_acute", "O"],
  Ú: ["dead_acute", "U"],
};
keySender.aggregateKeyboardLayout(accentsMap);

let appServe = null;

const loadAppServe = async () => {
  if (app.isPackaged) {
    const { default: serve } = await import('electron-serve');
    appServe = serve({
      directory: path.join(__dirname, "resources/app/dist"),
    });
  }
};

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      webviewTag: true,
    },
  });

  win.maximize();
  win.removeMenu();

  if (app.isPackaged) {
    await appServe(win);
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", () => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.whenReady().then(async () => {
  await loadAppServe();  // Asegúrate de cargar appServe antes de crear la ventana
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

ipcMain.on("send-letter", (event, key) => {
  if (accentsMap[key]) {
    keySender.sendCombination(accentsMap[key]);
  } else {
    keySender.sendLetter(key);
  }
});

ipcMain.on("speak", (event, text) => {
  event.sender.send("perform-tts", text);
});
