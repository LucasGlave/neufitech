import path from "path";
import { app, BrowserWindow, ipcMain, WebviewTag } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import keySender from "node-key-sender";
import fs from "fs";
import { mouse, Button } from "@nut-tree-fork/nut-js";

const accentsMap = {
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

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow, webContentWindow: any;

(async () => {
  await app.whenReady();
  // const primaryDisplay = screen.getPrimaryDisplay();
  // const workAreaSize = primaryDisplay.size;

  const width = 1920 - 192;
  const height = 1080;
  mainWindow = createWindow("main", {
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      webSecurity: true,
      sandbox: true,
    },
  });

  // mainWindow.maximize()

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("close", () => {
  app.quit();
});

ipcMain.on("minimize", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.handle("send-key-combination", (event, keys) => {
  console.log(keys);
  keySender.sendCombination(keys);
});

ipcMain.handle("send-key", (event, key) => {
  console.log(key);
  keySender.sendKey(key);
});

ipcMain.handle("send-letter", (event, key) => {
  console.log(key);
  if (accentsMap[key]) {
    keySender.sendCombination(accentsMap[key]);
  } else {
    keySender.sendLetter(key);
  }
});

ipcMain.handle("get-images", (event) => {
  const imageDir = path.join(
    __dirname,
    "../renderer/public/senal-comunicacion"
  );
  try {
    const files = fs.readdirSync(imageDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    return imageFiles;
  } catch (error) {
    console.error("Error reading images:", error);
    return [];
  }
});

ipcMain.handle("click-chat", async () => {
  try {
    await mouse.click(Button.LEFT);
    return { success: true, message: `Click realizado.` };
  } catch (error) {
    console.error("Error al obtener coordenadas o hacer clic:", error);
    return { success: false, message: error.message };
  }
});
