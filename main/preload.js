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
  speak: (text) => {
    ipcRenderer.send("speak", text);
  },
  onPerformTTS: (callback) => ipcRenderer.on("perform-tts", (event, text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  })
});

