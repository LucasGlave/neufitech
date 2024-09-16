import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  sendKeyCombination: (keys: any) => ipcRenderer.send("send-key-combination", keys),
  sendKey: (key: any) => ipcRenderer.send("send-key", key),
  sendLetter: (key: any) => ipcRenderer.send("send-letter", key),
  speak: (speakText: any) => {
    const speech = new SpeechSynthesisUtterance(speakText);
    const config = JSON.parse(localStorage.getItem('config') || '{}');
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const selectedVoice = config.voices === "hombre" ? voices[9].name === "Google español" ? voices[9] : voices[0] : config.voices === "mujer" ? voices[4].name.includes("Sabina") ? voices[4] : voices[0] : voices[0]
      speech.voice = selectedVoice;
    } else {
      console.log("No voices available");
    }
    const volumeMap = {
      1: 0.2,
      2: 0.4,
      3: 0.6,
      4: 0.8,
      5: 1.0
    };
    speech.volume = volumeMap[config.volume] || 1;
    window.speechSynthesis.speak(speech);
  }
}

contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler
