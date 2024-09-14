"use client";
import React, { useState, useEffect, useRef } from "react";
import ButtonAnimation from "../ButtonAnimation";
import trash from "../../public/eliminar.svg";
// import TestPredictor from "../TestPredictor";

type TecladoGlobalProps = {
  isOff: boolean
}

const TecladoGlobal = ({ isOff }: TecladoGlobalProps) => {
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
        window.ipc && window.ipc.sendLetter("back_space");
      }
      setOutput("");
    } else {
      let lastWord = output.split(" ").pop() as string;
      for (let i = 0; i <= lastWord?.length; i++) {
        window.ipc && window.ipc.sendLetter("back_space");
      }
      setOutput(output.substring(0, lastSpaceIndex));
    }
  };

  const deleteAll = () => {
    for (let i = 0; i <= output.length; i++) {
      window.ipc && window.ipc.sendLetter("back_space");
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

  useEffect(() => {
    isTildeActive && setIsTildeActive(false)
  }, [output])

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
      <div className="bg-zinc-900 flex flex-col w-full h-full gap-4 pt-4 p-2">
        <div className="flex flex-row justify-between items-center">
          <ButtonAnimation
            disabled={isOff}
            functionKeyboard={{ funct: "deleteAll", state: changeState }}
            imagen={{ src: trash, width: 50, height: 50, add: "invert" }}
            propClass="w-[180px] h-[60px] flex justify-center items-center"
          />
          <div className="flex gap-2">
            {/* <TestPredictor /> */}
          </div>
          <div className="flex gap-2">
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "deleteOne", state: changeState }}
              keyPress="back_space"
              propClass="min-w-[150px] h-[60px]"
              text="Borrar letra"
            />
            <ButtonAnimation
              disabled={isOff}
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
                  disabled={isOff}
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
              disabled={isOff}
              functionKeyboard={{ funct: "changeTilde", state: changeState }}
              propClass="w-full h-[60px] text-2xl"
              text={`${isTildeActive ? "SACAR TILDE" : "TILDE"}`}
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "changeMayus", state: changeState }}
              propClass="w-full h-[60px] text-2xl"
              text="MAYUS"
            />
            <ButtonAnimation
              disabled={isOff}
              keyPress="space"
              propClass="w-full h-[60px] text-2xl"
              text="____"
              functionKeyboard={{ funct: "spaceKey", state: changeState }}
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "changeSymbol", state: changeState }}
              propClass="w-full h-[60px] text-2xl"
              text={`${showSymbols ? "ABC" : "123.!"}`}
            />
            <ButtonAnimation
              disabled={isOff}
              propClass="w-full h-[60px] text-2xl"
              text="ENTER"
              keyCombination={["shift", "enter"]}
            />
            <ButtonAnimation
              disabled={isOff}
              propClass="w-full h-[60px] text-2xl"
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
