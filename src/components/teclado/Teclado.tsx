"use client";
import React, { useState, useEffect, useRef } from "react";
import ButtonAnimation from "../ButtonAnimation";
import trash from "../../../public/eliminar.svg";

const Teclado = () => {
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
      setOutput("");
    }
    setOutput(output.substring(0, lastSpaceIndex));
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
    ejecFunction === "deleteAll" && setOutput("");
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
      className="flex flex-col gap-8 items-center bg-keyboardHeader shadow-md h-screen"
      ref={containerRef}
    >
      <div className="w-full flex flex-row justify-between items-center p-4">
        <ButtonAnimation
          speakText="Salir"
          //   svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
          text="SALIR"
          navigation="/"
          propClass="w-[180px] h-[80px] bg-keybackground"
        />
        <div className="flex gap-2">
          <ButtonAnimation
            speakText="Si"
            text="SI"
            propClass="w-[180px] h-[80px]"
          />
          <ButtonAnimation
            speakText="No"
            text="NO"
            propClass="w-[180px] h-[80px]"
          />
        </div>
        <div className="flex gap-2">
          <ButtonAnimation
            speakText="Estoy escribiendo"
            text="Estoy escribiendo"
            propClass="w-[180px] h-[80px]"
          />
          <ButtonAnimation
            speakText="Necesito ayuda"
            text="Necesito ayuda"
            propClass="w-[180px] h-[80px]"
          />
        </div>
        <div className="flex gap-2">
          <ButtonAnimation
            speakText="Suspender"
            text="SUSPENDER"
            propClass="w-[180px] h-[80px] bg-keybackground"
          />
          <ButtonAnimation
            speakText="Ajustes"
            text="ENGRA"
            propClass="w-[180px] h-[80px] bg-keybackground"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full px-4">
        <div className="flex gap-2">
          <ButtonAnimation
            text="COPIAR"
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
          <ButtonAnimation
            text="HABLAR"
            speakText={output}
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
        </div>
        <textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          className="w-3/4 h-[120px] p-2 border rounded resize-none"
          style={{ fontSize: "44px" }}
          placeholder="Tu texto aparecerá aquí..."
        />
        <div className="flex gap-2">
          <ButtonAnimation
            disabled={true}
            text="GUARDAR FRASE"
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
          <ButtonAnimation
            disabled={true}
            text="FRASES GUARDADAS"
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
        </div>
      </div>
      <div className="bg-zinc-900 flex flex-col w-full h-full gap-8 pt-8 p-4">
        <div className="flex flex-row justify-between items-center">
          <ButtonAnimation
            functionKeyboard={{ funct: "deleteAll", state: changeState }}
            imagen={{ src: trash, width: 50, height: 50, add: "invert" }}
            propClass="w-[180px] h-[80px] flex justify-center items-center"
          />
          <div className="flex gap-2">
            <ButtonAnimation
              propClass="w-[200px] h-[80px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="w-[200px] h-[80px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="w-[200px] h-[80px]"
              text="Sug. palabra"
            />
            <ButtonAnimation
              propClass="w-[200px] h-[80px]"
              text="Sug. palabra"
            />
          </div>
          <div className="flex gap-2">
            <ButtonAnimation
              functionKeyboard={{ funct: "deleteOne", state: changeState }}
              propClass="w-[180px] h-[80px]"
              text="Borrar letra"
            />
            <ButtonAnimation
              functionKeyboard={{ funct: "deleteLastWord", state: changeState }}
              propClass="w-[180px] h-[80px]"
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
              functionKeyboard={{ funct: "spaceKey", state: changeState }}
              propClass="w-full h-full"
              text="____"
            />
            <ButtonAnimation
              functionKeyboard={{ funct: "changeSymbol", state: changeState }}
              propClass="w-full h-full"
              text="SIMBOLOS"
            />
            <ButtonAnimation
              functionKeyboard={{ funct: "enterKey", state: changeState }}
              propClass="w-full h-full"
              text="INTRO"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teclado;
