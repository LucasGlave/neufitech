import path from "path";

import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  net,
  protocol,
  session,
  WebviewTag,
} from "electron";

import serve from "electron-serve";
import { createWindow, getImages } from "./helpers";
import keySender from "node-key-sender";
import fs from "fs";
import { mouse, Button } from "@nut-tree-fork/nut-js";

const userDataPath = app.getPath("userData");
const userImagesDir = path.join(userDataPath, "user_images");

if (!fs.existsSync(userImagesDir)) {
  fs.mkdirSync(userImagesDir, { recursive: true });
}

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
  }
  mainWindow.webContents.openDevTools();
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

app.on("ready", () => {
  protocol.registerFileProtocol("local", (request, callback) => {
    const url = request.url.substr(7);
    const decodedPath = decodeURI(url);
    callback({ path: path.normalize(decodedPath) });
  });
});

ipcMain.handle("send-key-combination", (event, keys) => {
  keySender.sendCombination(keys);
});

ipcMain.handle("send-key", (event, key) => {
  keySender.sendKey(key);
});

ipcMain.handle("send-letter", (event, key) => {
  keySender.sendLetter(key);
});

ipcMain.handle("get-images", (event) => {
  return getImages();
});

ipcMain.handle("save-image", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }],
  });

  if (result.canceled) return getImages();

  const userDataPath = app.getPath("userData");
  const userImagesDir = path.join(userDataPath, "user_images");

  if (!fs.existsSync(userImagesDir)) {
    fs.mkdirSync(userImagesDir, { recursive: true });
  }

  const selectedFilePath = result.filePaths[0];
  const fileName = path.basename(selectedFilePath);
  const destinationPath = path.join(userImagesDir, fileName);

  fs.copyFileSync(selectedFilePath, destinationPath);

  return getImages();
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

ipcMain.handle("auth", async (event, code) => {
  console.log("main: auth", code);
  try {
    const response = await fetch(
      "https://neufitech-back-api.onrender.com/api/compare-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "electron://localhost",
        },
        body: JSON.stringify({ code }),
      }
    );
    return response.status;
  } catch (error) {
    throw new Error(error);
  }
});
