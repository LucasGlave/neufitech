interface Window {
  electronAPI: {
    speak: (text: string) => void;
    sendKeyCombination: (keys: array) => void;
  };
}
declare module "node-key-sender" {
  interface KeySender {
    startBatch(): KeySender;
    sendKey(key: string): KeySender;
    sendKeys(keys: string[]): KeySender;
    sendCombination(keys: string[]): KeySender;
    setOption(option: string, value: string): void;
    isWindows: boolean;
    isMac: boolean;
    isLinux: boolean;
  }

  const keySender: KeySender;
  export = keySender;
}
