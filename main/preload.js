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
    try {
      ipcRenderer.send("speak", text);
    } catch (e) {
      console.error(e);
    }
  },
  onPerformTTS: (callback) =>
    ipcRenderer.on("perform-tts", (event, text) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("Error en la síntesis de voz:", err);
      }
    }),
});
