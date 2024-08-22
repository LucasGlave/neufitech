import { contextBridge, ipcRenderer } from "electron";
import speak from "offline-tts";

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    speak: (text) => {
        exec(speak(text), (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar say: ${error}`);
                return;
            }
        });
    }
});