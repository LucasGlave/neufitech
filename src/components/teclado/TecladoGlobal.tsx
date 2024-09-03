"use client";
import React, { useState, useEffect, useRef } from "react";
import ButtonAnimation from "../ButtonAnimation";
import trash from "../../../public/eliminar.svg";

const TecladoGlobal = () => {
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

  const [output, setOutput] = useState<string>("");
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false);
  const [showSymbols, setShowSymbols] = useState<boolean>(false);
  const [symbolPage, setSymbolPage] = useState<number>(1);
  const [isTildeActive, setIsTildeActive] = useState<boolean>(false);
  const [isAllow, setIsAllow] = useState(false);
  const [ejecFunction, setEjecFunction] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentSymbolsLayout =
    symbolPage === 1 ? SymbolsLayoutPage1 : SymbolsLayoutPage2;

  const changeState = (functionToEjec: string) => {
    setIsAllow(true);
    setEjecFunction(functionToEjec);
  };

  const deleteLastWord = () => {
    const lastSpaceIndex = output.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      for (let i = 0; i <= output.length; i++) {
        window.electronAPI && window.electronAPI.sendLetter("back_space");
      }
      setOutput("");
    } else {
      let lastWord = output.split(" ").pop() as string;
      for (let i = 0; i <= lastWord?.length; i++) {
        window.electronAPI && window.electronAPI.sendLetter("back_space");
      }
      setOutput(output.substring(0, lastSpaceIndex));
    }
  };

  const deleteAll = () => {
    for (let i = 0; i <= output.length; i++) {
      window.electronAPI && window.electronAPI.sendLetter("back_space");
    }
    setOutput("");
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

  const functionAction = (key?: string) => {
    ejecFunction === "deleteAll" && deleteAll();
    ejecFunction === "deleteOne" && setOutput((prev) => prev.slice(0, -1));
    ejecFunction === "deleteLastWord" && deleteLastWord();
    ejecFunction === "changeTilde" && setIsTildeActive(!isTildeActive);
    ejecFunction === "changeMayus" && setIsUpperCase(!isUpperCase);
    ejecFunction === "changeSymbol" && setShowSymbols(!showSymbols);
    ejecFunction === "spaceKey" && setOutput((prev) => prev + " ");
    ejecFunction === "enterKey" && setOutput((prev) => prev + "\n");
    ejecFunction.includes("pressKey") &&
      ((key = ejecFunction.split(" ")[1]), setOutput((prev) => prev + key));
  };

  useEffect(() => {
    functionAction();
    setIsAllow(false);
    setEjecFunction("");
  }, [isAllow === true]);

  return (
    <div
      className="flex flex-col gap-8 items-center bg-keyboardHeader shadow-md h-[40%]"
      ref={containerRef}
      id="teclado-global"
      tabIndex={-1}
    >
      <div className="bg-zinc-900 flex flex-col w-full h-full gap-8 pt-4 p-2">
        <div className="flex flex-row justify-between items-center">
          <ButtonAnimation
            functionKeyboard={{ funct: "deleteAll", state: changeState }}
            imagen={{ src: trash, width: 50, height: 50, add: "invert" }}
            propClass="w-[180px] h-[64px] flex justify-center items-center"
          />
          <div className="flex gap-2">
            <ButtonAnimation
              propClass="min-w-[150px] h-[60px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="min-w-[150px] h-[60px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="min-w-[150px] h-[60px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="min-w-[150px] h-[60px]"
              text="Sug. palabra"
            />
          </div>
          <div className="flex gap-2">
            <ButtonAnimation
              functionKeyboard={{ funct: "deleteOne", state: changeState }}
              keyPress="back_space"
              propClass="min-w-[150px] h-[60px]"
              text="Borrar letra"
            />
            <ButtonAnimation
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
                  key={`${rowIndex}-${index}`}
                  text={key}
                  propClass="w-full h-full text-5xl"
                  keyPress={key}
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
              functionKeyboard={{ funct: "changeTilde", state: changeState }}
              propClass="w-full h-full"
              text="TILDE"
            />
            <ButtonAnimation
              functionKeyboard={{ funct: "changeMayus", state: changeState }}
              propClass="w-full h-full"
              text="MAYUS"
            />
            <ButtonAnimation
              keyPress="space"
              propClass="w-full h-full"
              text="____"
              functionKeyboard={{ funct: "spaceKey", state: changeState }}
            />
            <ButtonAnimation
              functionKeyboard={{ funct: "changeSymbol", state: changeState }}
              propClass="w-full h-full"
              text="123.!"
            />
            <ButtonAnimation
              propClass="w-full h-full"
              text="INTRO"
              keyCombination={["shift", "enter"]}
            />
            <ButtonAnimation
              propClass="w-full h-full"
              text="Enviar"
              keyPress={"enter"}
              functionKeyboard={{ funct: "deleteAll", state: changeState }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TecladoGlobal;
