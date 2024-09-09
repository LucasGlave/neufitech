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
  speak: (speakText) => {
    console.log("hola")
    const speakNow = () => {
      const speech = new SpeechSynthesisUtterance(speakText);
      speech.lang = "es-ES";
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        speech.voice = voices.find(voice => voice.lang.startsWith("es")) || voices[0];
        window.speechSynthesis.speak(speech);
      } else {
        console.log("No voices available");
      }
    };
  },
});
