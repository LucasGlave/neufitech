const { app, BrowserWindow, ipcMain } = require("electron");
// const serve = require("electron-serve");
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


ipcMain.on("send-letter", (event, key) => {
  if (accentsMap[key]) {
    keySender.sendCombination(accentsMap[key]);
  } else {
    keySender.sendLetter(key);
  }
});

ipcMain.on("speak", (event, text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
});

