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
  globalShortcut,
} from "electron";
import serve from "electron-serve";
import { createWindow, getImages } from "./helpers";
import keySender from "node-key-sender";
import fs from "fs";
import { exec } from "child_process";
import { mouse, Button, Point } from "@nut-tree-fork/nut-js";

global.isTobii = false;
let mainWindow: BrowserWindow | null = null;
let webContentWindow: any;
let tobiiProcess: any | null = null;

let exeServerPath: string;
let exeCalibratePath: string;

// Check if the app is packaged
if (app.isPackaged) {
  // In production, when the app is packaged
  exeServerPath = path.join(
    process.resourcesPath,
    "renderer",
    "lib",
    "TobiiServer",
    "TobiiElectronServer.exe"
  );
  exeCalibratePath = path.join(
    process.resourcesPath,
    "renderer",
    "lib",
    "TobiiServer",
    "TobiiCalibrate.exe"
  );
} else {
  // In development
  exeServerPath = path.join(
    __dirname,
    "../renderer/lib/TobiiServer/TobiiElectronServer.exe"
  );
  exeCalibratePath = path.join(
    __dirname,
    "../renderer/lib/TobiiServer/TobiiCalibrate.exe"
  );
}
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
    alwaysOnTop: true,
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
    mainWindow.webContents.openDevTools();
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
  }

  globalShortcut.register("F10", () => {
    mainWindow?.webContents.send("tobii-control-updated", !global.isTobii);
    global.isTobii = !global.isTobii;
  });

  globalShortcut.register("F9", () => {
    if (mainWindow.getOpacity() == 1) {
      mainWindow.setOpacity(0);
    } else {
      mainWindow.setOpacity(1);
    }
  });

  tobiiProcess = exec(exeServerPath);

  tobiiProcess?.stdout?.on("data", (data: any) => {
    if (global.isTobii) {
      const eyeData = JSON.parse(data.replace(/(\d),(\d)/g, "$1.$2"));
      const point = new Point(eyeData.x, eyeData.y)
      // robot.moveMouse(eyeData.x, eyeData.y);
      mouse.setPosition(point)
    }
  });
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

ipcMain.handle("tobii-calibrate", async () => {
  const calibrateProcess = exec(exeCalibratePath);
  return true;
});

ipcMain.handle("tobii-check", async () => {
  return !!tobiiProcess;
});

ipcMain.handle("tobii-start", async () => {
  if (!tobiiProcess) {
    tobiiProcess = exec(exeServerPath);

    tobiiProcess?.stdout?.on("data", (data: any) => {
      if (global.isTobii) {
        const eyeData = JSON.parse(data.replace(/(\d),(\d)/g, "$1.$2"));
        const point = new Point(eyeData.x, eyeData.y)
        // robot.moveMouse(eyeData.x, eyeData.y);
        mouse.setPosition(point)
      }
    });
  }

  return true;
});

ipcMain.handle("tobii-stop", async () => {
  if (tobiiProcess) {
    tobiiProcess.kill("SIGTERM");
    tobiiProcess = null;
  }

  return true;
});

ipcMain.handle("tobii-toggle", async () => {
  global.isTobii = !global.isTobii;
  mainWindow?.webContents.send("tobii-control-updated", !global.isTobii);
  return true;
});

ipcMain.on("set-tobii-in-control", (event, newConfig) => {
  mainWindow?.webContents.send("tobii-control-updated", !global.isTobii);
  global.isTobii = !global.isTobii;
});

ipcMain.handle("tobii-in-control", async () => {
  return global.isTobii;
});

ipcMain.handle("save-image", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "gif"] }],
  });

  if (result.canceled) return getImages();

  //revisar si es necesario repetir el existsSync
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
