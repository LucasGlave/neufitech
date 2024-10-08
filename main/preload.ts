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
    ipcRenderer.invoke("send-key-combination", keys),
  sendKey: (key: any) => ipcRenderer.invoke("send-key", key),
  sendLetter: (key: any) => ipcRenderer.invoke("send-letter", key),
  getImages: () => ipcRenderer.invoke("get-images"),
  saveImage: () => ipcRenderer.invoke("save-image"),
  auth: (code: string) => ipcRenderer.invoke("auth", code),
  speak: (speakText: any) => {
    const speech = new SpeechSynthesisUtterance(speakText);

    const config = JSON.parse(localStorage.getItem("config") || "{}");

    const speakWithVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        let selectedVoice;

        if (config.voices === "hombre") {
          selectedVoice = voices.find(
            (voice) => voice.name == "Microsoft Raul - Spanish (Mexico)"
          );
        } else if (config.voices === "mujer") {
          selectedVoice = voices.find(
            (voice) => voice.name == "Microsoft Sabina - Spanish (Mexico)"
          );
        }

        if (!selectedVoice) {
          switch (config.voices) {
            case "hombre":
              selectedVoice = voices.find(
                (voice) => voice.name == "Microsoft Pablo - Spanish (Spain)"
              );
              break;
            case "mujer":
              selectedVoice = voices.find(
                (voice) => voice.name == "Microsoft Helena - Spanish (Spain)"
              );
              break;
          }
        }

        selectedVoice = selectedVoice || voices[0];

        speech.voice = selectedVoice;

        const volumeMap = {
          1: 0.2,
          2: 0.4,
          3: 0.6,
          4: 0.8,
          5: 1.0,
        };
        speech.volume = volumeMap[config.volume] || 1;

        window.speechSynthesis.speak(speech);
      } else {
        console.log("No voices available");
      }
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakWithVoices;
    } else {
      speakWithVoices();
    }
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
