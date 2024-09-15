import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  sendKeyCombination: (keys: any) =>
    ipcRenderer.send("send-key-combination", keys),
  sendKey: (key: any) => ipcRenderer.send("send-key", key),
  sendLetter: (key: any) => ipcRenderer.send("send-letter", key),
  speak: (speakText: any) => {
    const speech = new SpeechSynthesisUtterance(speakText);
    speech.lang = "es-ES";
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speech.voice =
        voices.find((voice) => voice.lang.startsWith("es")) || voices[0];
      window.speechSynthesis.speak(speech);
    } else {
      console.log("No voices available");
    }
  },
  getImages: () => ipcRenderer.invoke("get-images"),
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
