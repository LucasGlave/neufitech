import path from "path";
import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import keySender from "node-key-sender";
import fs from "fs";
import { exec } from 'child_process';
import robot from "robotjs"

global.isTobii = false;
let mainWindow: BrowserWindow | null = null;
let tobiiProcess: any | null = null;

let exeServerPath: string;
let exeCalibratePath: string;

// Check if the app is packaged
if (app.isPackaged) {
  // In production, when the app is packaged
  exeServerPath = path.join(process.resourcesPath, 'renderer', 'lib', 'TobiiServer', 'TobiiElectronServer.exe');
  exeCalibratePath  = path.join(process.resourcesPath, 'renderer', 'lib', 'TobiiServer', 'TobiiCalibrate.exe');
} else {
  // In development
  exeServerPath = path.join(__dirname, '../renderer/lib/TobiiServer/TobiiElectronServer.exe');
  exeCalibratePath = path.join(__dirname, '../renderer/lib/TobiiServer/TobiiCalibrate.exe');
}

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

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1920,
    height: 1080,
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }

  globalShortcut.register('F10', () => {
    mainWindow?.webContents.send('tobii-control-updated', !global.isTobii);
    global.isTobii = !global.isTobii;
  });
  
  globalShortcut.register('F9', () => {
    if(mainWindow.getOpacity() == 1) {
      mainWindow.setOpacity(0);
    } else { mainWindow.setOpacity(1); }
  });

  tobiiProcess = exec(exeServerPath);

  tobiiProcess?.stdout?.on('data', (data:any) => {
    if(global.isTobii) {
      const eyeData = JSON.parse(data.replace(/(\d),(\d)/g, '$1.$2'))
      robot.moveMouse(eyeData.x, eyeData.y);
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

ipcMain.handle('tobii-calibrate', async () => {
  const calibrateProcess = exec(exeCalibratePath);
  return true;
});

ipcMain.handle('tobii-check', async () => {
  return !!tobiiProcess;
});

ipcMain.handle('tobii-start', async () => {
  if(!tobiiProcess) {
    tobiiProcess = exec(exeServerPath);

    tobiiProcess?.stdout?.on('data', (data:any) => {
      if(global.isTobii) {
        const eyeData = JSON.parse(data.replace(/(\d),(\d)/g, '$1.$2'))
        robot.moveMouse(eyeData.x, eyeData.y);
      }
    });
  }

  return true
})

ipcMain.handle('tobii-stop', async () => {
  if(tobiiProcess) {
    tobiiProcess.kill('SIGTERM');
    tobiiProcess = null;
  }

  return true
})

ipcMain.handle('tobii-toggle', async () => {
  global.isTobii = !global.isTobii;
  mainWindow?.webContents.send('tobii-control-updated', !global.isTobii);
  return true
});

ipcMain.on('set-tobii-in-control', (event, newConfig) => {
  mainWindow?.webContents.send('tobii-control-updated', !global.isTobii);
  global.isTobii = !global.isTobii;
});

ipcMain.handle('tobii-in-control', async () => {
  return global.isTobii;
});
