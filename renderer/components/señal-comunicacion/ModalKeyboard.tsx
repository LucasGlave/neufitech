"use client";
import React, { useState, useEffect, useRef } from "react";
import ButtonAnimation from "../ButtonAnimation";
import TestPredictor from "../TestPredictor";

interface modalKeyboardProps {
  output: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
}

const ModalKeyboard = ({
  output,
  setOutput,
  handleSave,
}: modalKeyboardProps) => {
  const KeyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    [",", "z", "x", "c", "v", "b", "n", "m", "."],
  ];

  const SymbolsLayoutPage1 = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["@", "#", "$", "&", "_", "-", "(", ")", "=", "%"],
    ["'", '"', "*", ":", ";", "/", "!", "?", "+"],
  ];

  const SymbolsLayoutPage2 = [
    ["£", "€", "¥", "¢", "©", "®", "±", "÷", "¿"],
    ["[", "]", "{", "}", "<", ">", "~", "^", "¡"],
    ["`", "|", "\\", "×", "¬", "§", "¶", "•"],
  ];

  const tildeMap = {
    a: "á",
    e: "é",
    i: "í",
    o: "ó",
    u: "ú",
    n: "ñ",
  };

  const [lastWord, setLastWord] = useState<string>("");
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false);
  const [showSymbols, setShowSymbols] = useState<boolean>(false);
  const [symbolPage, setSymbolPage] = useState<number>(1);
  const [isTildeActive, setIsTildeActive] = useState<boolean>(false);
  const [isAllow, setIsAllow] = useState(false);
  const [ejecFunction, setEjecFunction] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOff, setIsOff] = useState(false);

  const currentSymbolsLayout =
    symbolPage === 1 ? SymbolsLayoutPage1 : SymbolsLayoutPage2;

  const changeState = (functionToEjec: string) => {
    setIsAllow(true);
    setEjecFunction(functionToEjec);
  };

  const deleteLastWord = () => {
    const lastSpaceIndex = output.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      setOutput("");
    }
    setOutput(output.substring(0, lastSpaceIndex));
  };

  const getLastWord = () => {
    const lastSpaceIndex = output.lastIndexOf(" ");
    setLastWord(output.substring(lastSpaceIndex + 1));
  };

  const getUpdatedKeyboardLayout = () => {
    let layout = KeyboardLayout;

    if (isTildeActive) {
      layout = layout.map((row) =>
        row.map((key) =>
          key in tildeMap ? tildeMap[key as keyof typeof tildeMap] : key
        )
      );
    }

    if (isUpperCase) {
      layout = layout.map((row) => row.map((key) => key.toUpperCase()));
    }

    return layout;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(output.length, output.length);
    }
    isTildeActive && setIsTildeActive(false);
    getLastWord();
  }, [output]);

  const functionAction = (key?: string) => {
    ejecFunction === "deleteAll" && setOutput("");
    ejecFunction === "deleteOne" && setOutput((prev) => prev.slice(0, -1));
    ejecFunction === "deleteLastWord" && deleteLastWord();
    ejecFunction === "changeTilde" && setIsTildeActive(!isTildeActive);
    ejecFunction === "changeMayus" && setIsUpperCase(!isUpperCase);
    ejecFunction === "changeSymbol" && setShowSymbols(!showSymbols);
    ejecFunction === "spaceKey" && setOutput((prev) => prev + " ");
    ejecFunction === "changeIsOff" && setIsOff(!isOff);
    ejecFunction.includes("pressKey") &&
      ((key = ejecFunction.split(" ")[1]), setOutput((prev) => prev + key));
    ejecFunction.includes("addWord") &&
      ((deleteLastWord(), (key = ejecFunction.split(" ")[1])),
      setOutput((prev) => (!prev ? key + " " : prev + " " + key + " ")));
  };

  useEffect(() => {
    functionAction();
    setIsAllow(false);
    setEjecFunction("");
  }, [isAllow === true]);

  return (
    <div
      className="flex flex-col gap-8 items-center bg-keyboardHeader shadow-md h-[85%] w-[95%]"
      ref={containerRef}
    >
      <div className="w-full flex flex-row justify-between items-center p-4 h-[15%]">
        <div className="flex gap-2">
          <ButtonAnimation
            functionKeyboard={{ funct: "changeIsOff", state: changeState }}
            speakText="Suspender"
            svg={
              !isOff
                ? '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#FFFF"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#FFFF"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#FFFF"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#FFFF"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#FFFF"></path> </g></svg>'
            }
            propClass="min-w-[150px] h-[80px] bg-keybackground"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full px-4">
        <div className="flex gap-2 justify-between">
          <ButtonAnimation
            disabled={isOff ? true : false}
            speakText="Guardar"
            text="Guardar"
            propClass="w-[150px] h-[120px] bg-keybackground text-2xl"
            state={handleSave}
          />
          <ButtonAnimation
            disabled={isOff ? true : false}
            svg='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.72"></g><g id="SVGRepo_iconCarrier"> <path d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z" stroke="#FFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
            speakText={output}
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
        </div>
        <textarea
          id="textarea"
          ref={textareaRef}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          className="w-3/4 h-[120px] p-2 border rounded resize-none text-black"
          style={{ fontSize: "44px" }}
          placeholder="Escriba frase para agregar..."
        />
      </div>
      <div className="bg-zinc-900 flex flex-col w-full h-full gap-4 pt-4 p-2">
        <div className="flex flex-row justify-between items-center px-4">
          <ButtonAnimation
            disabled={isOff ? true : false}
            functionKeyboard={{ funct: "deleteAll", state: changeState }}
            speakText="Eliminar"
            svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.44 511.9"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono eliminar</title><path class="cls-1" d="M218,1.6C200.8,6.2,185,19.2,177.3,35c-5.4,11-7.3,20.6-7.3,36.9V85l-56.9.2-56.9.3-4.4,3c-13.6,9.7-12.4,30.1,2.3,37.6,3.2,1.6,5.9,1.9,17.3,1.9H85l.2,147.2.3,147.3,2.7,9.7a107.19,107.19,0,0,0,29.6,50c15.9,15.2,32.5,24,53.7,28.3,7,1.4,17.6,1.5,88,1.2,79.7-.3,80-.3,88-2.6a134.07,134.07,0,0,0,32.2-14.8c8.4-5.5,22.3-19.2,28.3-27.9a116.15,116.15,0,0,0,15.8-34.2l2.7-9.7.3-147.3L427,128h13.6c15.3,0,18.9-1.1,24.2-7.6a21.91,21.91,0,0,0-4.6-31.9l-4.4-3-56.9-.3L342,85V71.9c0-16.2-1.9-25.8-7.2-36.8-7.6-15.9-24-29.2-41.3-33.6C285-.6,226.1-.6,218,1.6Zm65.1,42.5a22.68,22.68,0,0,1,12.8,11.2c1.8,3.7,2.1,6.2,2.1,17V85H214V72.3c0-10.8.3-13.3,2.1-17a23.24,23.24,0,0,1,12.1-11C232.7,42.7,277.8,42.6,283.1,44.1ZM383.8,271.2c-.3,132.5-.5,143.8-2.1,149.3a68.22,68.22,0,0,1-45.2,46.2c-5.6,1.7-11,1.8-80.5,1.8s-74.9-.1-80.5-1.8a68.22,68.22,0,0,1-45.2-46.2c-1.6-5.5-1.8-16.8-2.1-149.3L127.9,128H384.1Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M203.5,193.6a22.24,22.24,0,0,0-9.6,9.6c-1.8,3.6-1.9,7.2-1.9,95.3,0,89.2.1,91.7,2,95.4,7.4,14.6,27.9,15.8,37.5,2.3l3-4.4.3-91.6.2-91.6-2.5-5.2c-3.8-7.8-8.8-10.8-18.4-11.2C208.6,192,205.7,192.4,203.5,193.6Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M289.5,193.4c-4.5,1.9-9.1,7-10.9,11.8-1.5,3.9-1.6,13.6-1.4,95.5l.3,91.1,3,4.4c9.6,13.5,30.1,12.3,37.5-2.3,1.9-3.7,2-6.2,2-95.4,0-99.5.3-94.1-5.4-100.3C309.4,192.4,297.1,190.1,289.5,193.4Z" transform="translate(-42.3 0.06)"/></svg>'
            propClass="w-[80px] h-[60px] flex justify-center items-center"
          />
          <div className="flex gap-2">
            <TestPredictor
              keys={`${lastWord}`}
              isOff={isOff}
              state={changeState}
            />
          </div>
          <div className="flex gap-2">
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "deleteOne", state: changeState }}
              propClass="min-w-[150px] h-[60px]"
              text="Borrar letra"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "deleteLastWord", state: changeState }}
              propClass="min-w-[150px] h-[60px]"
              text="Borrar palabra"
            />
          </div>
        </div>
        <div className="grid gap-2 w-full h-full px-4">
          {(showSymbols
            ? currentSymbolsLayout
            : getUpdatedKeyboardLayout()
          ).map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key, index) => (
                <ButtonAnimation
                  disabled={isOff ? true : false}
                  key={`${rowIndex}-${index}`}
                  text={key}
                  propClass="w-full h-full text-5xl"
                  functionKeyboard={{
                    funct: `pressKey ${key}`,
                    state: changeState,
                  }}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-center gap-2 mt-1">
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "changeTilde", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={`${isTildeActive ? "SACAR TILDE" : "TILDE"}`}
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "changeMayus", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={isUpperCase ? "MINUS" : "MAYUS"}
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "spaceKey", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text="____"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              functionKeyboard={{ funct: "changeSymbol", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={`${showSymbols ? "ABC" : "123.!"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalKeyboard;
