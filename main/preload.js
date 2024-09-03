const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  sendKeyCombination: (keys) => ipcRenderer.send("send-key-combination", keys),
  sendKey: (key) => ipcRenderer.send("send-key", key),

  sendLetter: (key) => ipcRenderer.send("send-letter", key),

  speak: (text) => {
    ipcRenderer.send("speak", text);
  },
});
