"use client";
import React, { useState, useEffect, useRef } from "react";
import ButtonAnimation from "../ButtonAnimation";
import TestPredictor from "../TestPredictor";
import SaveText from "./SaveText";
import ModalTexts from "./ModalTexts";
import CarrouselEstados from "../CarrouselEstados";
import ModalConfig from "../home/ModalConfig";

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
  const [activeModal, setActiveModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [savedTexts, setSavedTexts] = useState([]);

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

  const defaultConfig = {
    volume: 3,
    activation: 3,
    voices: "mujer"
  };
  const [config, setConfig] = useState({ ...defaultConfig });

  useEffect(() => {
    if (localStorage.getItem('config')) {
      setConfig(JSON.parse(localStorage.getItem('config')))
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(config));
    }
  }, [config]);

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(output.length, output.length);
    }
    isTildeActive && setIsTildeActive(false)
    getLastWord()
  }, [output])

  const handleSaveText = () => {
    if (output.length > 0) {
      const existingTexts = JSON.parse(localStorage.getItem('texts')) || [];
      existingTexts.push(output.trim());
      localStorage.setItem('texts', JSON.stringify(existingTexts));
    }
  };

  const handleShowTexts = () => {
    const storedTexts = JSON.parse(localStorage.getItem('texts')) || [];
    setSavedTexts(storedTexts);
    setActiveModal(true)
  };

  const handleDeleteText = (textToDelete: string) => {
    const updatedPhrases = savedTexts.filter(text => text === textToDelete);
    localStorage.setItem('texts', JSON.stringify(updatedPhrases));
    setSavedTexts(updatedPhrases);
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
    ejecFunction === "changeIsOff" && setIsOff(!isOff)
    ejecFunction === "saveText" && handleSaveText()
    ejecFunction === "getTexts" && handleShowTexts()
    ejecFunction === "closeModal" && setActiveModal(false)
    ejecFunction === "showConfig" && setShowModal(true)
    ejecFunction.includes("pressKey") &&
      ((key = ejecFunction.split(" ")[1]), setOutput((prev) => prev + key));
    ejecFunction.includes("addWord") &&
      ((deleteLastWord(), key = ejecFunction.split(" ")[1]), setOutput((prev) => !prev ? key + " " : prev + " " + key + " "))
    ejecFunction.includes("deleteText") && handleDeleteText(ejecFunction.slice(11, ejecFunction.length - 1))
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
      {activeModal && <ModalTexts activeTexts={savedTexts} state={changeState} />}
      {showModal && <ModalConfig configuration={config} closeModal={closeModal} />}
      <div className="w-full flex flex-row justify-between items-center p-4 h-[15%]">
        <ButtonAnimation
          disabled={isOff}
          speakText="Volver"
          svg='<svg viewBox="0 0 24 24" id="SVGRoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1"> <path d="M 9 2 A 1.0001 1.0001 0 0 0 8 3 L 8 8 A 1 1 0 0 0 9 9 A 1 1 0 0 0 10 8 L 10 4 L 18 4 L 18 20 L 10 20 L 10 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 16 L 8 21 A 1.0001 1.0001 0 0 0 9 22 L 19 22 A 1.0001 1.0001 0 0 0 20 21 L 20 3 A 1.0001 1.0001 0 0 0 19 2 L 9 2 z M 7.0292969 9 A 1 1 0 0 0 6.2929688 9.2929688 L 4.3125 11.273438 L 4.2929688 11.292969 A 1.0001 1.0001 0 0 0 4.2832031 11.302734 A 1 1 0 0 0 4.2363281 11.355469 A 1 1 0 0 0 4.1855469 11.421875 A 1 1 0 0 0 4.1464844 11.482422 A 1.0001 1.0001 0 0 0 4.1289062 11.509766 A 1 1 0 0 0 4.0996094 11.566406 A 1 1 0 0 0 4.0683594 11.638672 A 1.0001 1.0001 0 0 0 4.0644531 11.650391 A 1 1 0 0 0 4.0410156 11.714844 A 1.0001 1.0001 0 0 0 4.0332031 11.75 A 1 1 0 0 0 4.0234375 11.791016 A 1.0001 1.0001 0 0 0 4.015625 11.828125 A 1 1 0 0 0 4.0078125 11.871094 A 1.0001 1.0001 0 0 0 4.0019531 11.943359 A 1.0001 1.0001 0 0 0 4 11.988281 A 1 1 0 0 0 4 12 A 1 1 0 0 0 4.0019531 12.029297 A 1.0001 1.0001 0 0 0 4.0039062 12.066406 A 1 1 0 0 0 4.0078125 12.117188 A 1.0001 1.0001 0 0 0 4.0117188 12.146484 A 1 1 0 0 0 4.0253906 12.222656 A 1 1 0 0 0 4.0410156 12.28125 A 1.0001 1.0001 0 0 0 4.0546875 12.324219 A 1 1 0 0 0 4.0585938 12.337891 A 1.0001 1.0001 0 0 0 4.0878906 12.408203 A 1.0001 1.0001 0 0 0 4.1210938 12.474609 A 1 1 0 0 0 4.1347656 12.501953 A 1.0001 1.0001 0 0 0 4.1640625 12.546875 A 1 1 0 0 0 4.1777344 12.568359 A 1.0001 1.0001 0 0 0 4.2011719 12.601562 A 1 1 0 0 0 4.21875 12.623047 A 1.0001 1.0001 0 0 0 4.265625 12.677734 A 1 1 0 0 0 4.2851562 12.699219 A 1.0001 1.0001 0 0 0 4.2929688 12.707031 A 1 1 0 0 0 4.3339844 12.746094 L 6.2929688 14.707031 A 1 1 0 0 0 7.7070312 14.707031 A 1 1 0 0 0 7.7070312 13.292969 L 7.4140625 13 L 14 13 A 1 1 0 0 0 15 12 A 1 1 0 0 0 14 11 L 7.4140625 11 L 7.7070312 10.707031 A 1 1 0 0 0 7.7070312 9.2929688 A 1 1 0 0 0 7.0292969 9 z " id="path6945" style="color:#FFFFFFF\;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#FFFFFFF\;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#FFFFFFF\;solid-opacity:1;vector-effect:none;fill:#FFFFFFF\;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#FFFFFFF\;stop-opacity:1;opacity:1"></path> </g> </g></svg>'
          navigation="/"
          propClass="min-w-[80px] h-[80px] bg-keybackground"
        />
        <div className="flex gap-2">
          <ButtonAnimation
            disabled={isOff}
            speakText="Si"
            text="SI"
            propClass="min-w-[100px] h-[80px]"
          />
          <ButtonAnimation
            disabled={isOff}
            speakText="No"
            text="NO"
            propClass="min-w-[100px] h-[80px]"
          />
        </div>
        <div>
          <CarrouselEstados isOff={isOff} estados={["Estoy escribiendo", "Necesito ayuda", "Gracias", "Puedes repetir, por favor?", "No entiendo", "Por favor, espere un momento"]} />
        </div>
        <div className="flex gap-2">
          <ButtonAnimation
            functionKeyboard={{ funct: 'changeIsOff', state: changeState }}
            speakText="Suspender"
            svg={!isOff ? '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#FFFF"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#FFFF"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#FFFF"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#FFFF"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#FFFF"></path> </g></svg>'}
            propClass="min-w-[150px] h-[80px] bg-keybackground"
          />
          <ButtonAnimation
            functionKeyboard={{ funct: 'showConfig', state: changeState }}
            disabled={isOff}
            speakText="Configuracion"
            svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.25 480.13"><defs><style>.cls-1{fill:#fff;}</style></defs><title>ícono configuración</title><path class="cls-1" d="M224.8,17.9c-13.4,4.3-25.2,15.6-30.5,29.1-1.3,3.5-1.8,9-2.2,25l-.6,20.5-2.7.9c-2.6.9-3.5.3-15.7-11.7-10.7-10.5-14.2-13.3-20.3-16.2a49.07,49.07,0,0,0-42.8.1c-6.6,3.1-9.4,5.5-24.2,20.2S68.7,103.4,65.6,110a49.41,49.41,0,0,0-.1,42.8c2.9,6.1,5.6,9.6,16.2,20.3,12,12.2,12.6,13.1,11.7,15.7l-.9,2.7-20.5.6c-16,.4-21.5.9-25,2.2-13.8,5.4-25.4,17.8-29.4,31.6-2.3,7.9-2.3,52.3,0,60.2,4,13.8,15.6,26.2,29.4,31.6,3.5,1.3,9,1.8,25,2.2l20.5.6.9,2.7c.9,2.6.3,3.5-11.7,15.7-10.5,10.7-13.3,14.2-16.2,20.3a49.07,49.07,0,0,0,.1,42.8c3.1,6.6,5.5,9.4,20.2,24.2s17.6,17.1,24.2,20.2a49.41,49.41,0,0,0,42.8.1c6.1-2.9,9.6-5.6,20.3-16.2,12.2-12,13.1-12.6,15.7-11.7l2.7.9L192,440c.5,18.3.8,21.1,2.8,25.9,5.8,13.9,17.4,24.5,31.1,28.5,4.3,1.3,10.6,1.6,30.3,1.6,22.5,0,25.5-.2,31.1-2.1a49.85,49.85,0,0,0,30.4-29c1.3-3.4,1.8-9,2.2-24.9l.6-20.5,2.7-.9c2.6-.9,3.5-.3,15.7,11.7,10.7,10.6,14.2,13.3,20.3,16.2a49.41,49.41,0,0,0,42.8-.1c6.6-3.1,9.4-5.5,24.2-20.2s17.1-17.6,20.2-24.2a49.41,49.41,0,0,0,.1-42.8c-2.9-6.1-5.6-9.6-16.2-20.3-12-12.2-12.6-13.1-11.7-15.7l.9-2.7,20.5-.6c16-.4,21.5-.9,25-2.2,13.8-5.4,25.4-17.8,29.4-31.6,2.3-7.9,2.3-52.3,0-60.2-4-13.8-15.6-26.2-29.4-31.6-3.5-1.3-9-1.8-25-2.2l-20.5-.6-.9-2.7c-.9-2.6-.3-3.5,11.7-15.7,10.5-10.7,13.3-14.2,16.2-20.3a49.07,49.07,0,0,0-.1-42.8c-3.1-6.6-5.5-9.4-20.2-24.2S408.6,68.7,402,65.6a49.41,49.41,0,0,0-42.8-.1c-6.1,2.9-9.6,5.6-20.3,16.2-12.2,12-13.1,12.6-15.7,11.7l-2.7-.9L319.9,72c-.4-16-.9-21.5-2.2-25-5.4-13.8-17.8-25.4-31.6-29.4C277.7,15.1,232.8,15.4,224.8,17.9Zm54.1,32.6A16.4,16.4,0,0,1,287,61.6c.5,2.1,1,13.7,1,25.7,0,28.3-.1,28.1,16.6,34.6,5.4,2.2,12.4,5.1,15.4,6.5,5.9,2.7,11.1,3.3,15.7,1.5,1.5-.5,10.5-8.6,19.8-17.9,24.5-24.2,25.3-24.3,45.7-4.2,7.1,7,13.8,14.1,14.9,15.9,2.5,4,2.7,10.9.6,14.9-.9,1.6-8.6,9.9-17.2,18.4s-16.3,16.9-17.1,18.7c-2.1,4.8-1.7,10.1,1.2,16.3,1.4,3,4.3,10,6.5,15.4,6.5,16.7,6.3,16.6,34.6,16.6,12,0,23.6.5,25.7,1a16.4,16.4,0,0,1,11.1,8.1c1.8,3.1,2,5.2,2,22.9s-.2,19.8-2,22.9a16.4,16.4,0,0,1-11.1,8.1c-2.1.5-13.7,1-25.7,1-28.3,0-28.1-.1-34.6,16.6-2.2,5.4-5.1,12.4-6.5,15.4-2.9,6.2-3.3,11.5-1.2,16.3.8,1.8,8.4,10.2,17.1,18.7s16.3,16.8,17.2,18.4c2.1,4,1.9,10.9-.6,14.9-1.1,1.8-7.8,8.9-14.8,15.9-20.5,20.1-21.3,20-45.8-4.2-9.3-9.3-18.3-17.4-19.8-17.9-4.6-1.8-9.8-1.2-15.7,1.5-3,1.4-10,4.3-15.4,6.5-17.1,6.7-16.9,6.2-17.6,38.6-.5,23.6-.6,25.3-2.6,28-4.7,6.3-6.9,6.8-28.4,6.8-17.7,0-19.8-.2-22.9-2a16.4,16.4,0,0,1-8.1-11.1c-.5-2.1-1-13.7-1-25.7,0-28.3.1-28.1-16.6-34.6-5.4-2.2-12.4-5.1-15.4-6.5-5.9-2.7-11.1-3.3-15.7-1.5-1.5.5-10.4,8.6-19.8,17.9-24.5,24.2-25.3,24.3-45.7,4.2-7.1-7-13.8-14.1-14.9-15.9-2.5-4-2.7-10.9-.6-14.9.9-1.6,8.6-9.9,17.2-18.4s16.3-16.9,17.1-18.7c2.1-4.8,1.7-10.1-1.2-16.3-1.4-3-4.3-10-6.5-15.4-6.5-16.7-6.3-16.6-34.6-16.6-12,0-23.6-.5-25.7-1a16.4,16.4,0,0,1-11.1-8.1c-1.8-3.1-2-5.2-2-22.9s.2-19.8,2-22.9A16.4,16.4,0,0,1,61.6,225c2.1-.5,13.7-1,25.7-1,28.3,0,28.1.1,34.6-16.6,2.2-5.4,5.1-12.4,6.5-15.4,2.9-6.2,3.3-11.5,1.2-16.3-.8-1.8-8.4-10.2-17.1-18.7s-16.3-16.8-17.2-18.4c-2.1-4-1.9-10.9.6-14.9,1.1-1.8,7.8-8.9,14.8-15.9,20.5-20.1,21.3-20,45.8,4.2,9.4,9.3,18.3,17.4,19.8,17.9,4.7,1.8,9.9,1.2,16.2-1.7,3.3-1.6,10.4-4.6,15.7-6.6,10-3.9,14.2-7.2,15.3-11.9.2-1.2.6-12.8.7-25.7.3-21.4.5-23.8,2.3-26.9A17.07,17.07,0,0,1,237.1,49c1.9-.5,11.3-.8,20.9-.7C273.5,48.5,275.9,48.7,278.9,50.5Z" transform="translate(-15.88 -15.87)"/><path class="cls-1" d="M236,178a81.44,81.44,0,0,0-58,58.4c-2.7,10.9-2.8,28.3,0,39.2A81.13,81.13,0,0,0,236.4,334c10.9,2.7,28.3,2.7,39.2,0A81.46,81.46,0,0,0,334,275.6c2.7-10.9,2.7-28.3,0-39.2A81.13,81.13,0,0,0,275.6,178C264.9,175.3,246.6,175.3,236,178Zm33,32.7c7.9,2.2,12.6,4.9,18.6,10.5,10.5,9.9,15.4,21,15.4,34.7A46.59,46.59,0,0,1,256,303c-13.8,0-24.9-4.9-34.8-15.4-8.3-8.8-12.2-18.8-12.2-31.6,0-13.2,3.9-22.9,12.9-32.3C234.7,210.2,251,205.7,269,210.7Z" transform="translate(-15.88 -15.87)"/></svg>'
            propClass="min-w-[100px] h-[80px] bg-keybackground"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full px-4">
        <div className="flex gap-2">
          <ButtonAnimation
            comingSoon={true}
            disabled={isOff}
            speakText="Reemplazar"
            svg="<svg id='Capa_1' data-name='Capa 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 511.93 511.97'><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono reemplazar</title><path class='cls-1' d='M63.4,2.4C48.6,6.3,37.2,12.8,25.7,23.9A81.67,81.67,0,0,0,7.5,49.3C.6,63.9.6,63.6.2,114.7c-.3,43.5-.2,46.7,1.7,54.7,7.2,30.3,30.1,53.9,60.7,62.8,7.7,2.3,8.9,2.3,54.4,2.3,52.7,0,52.9,0,69.6-8a83.18,83.18,0,0,0,39.8-39.8c8.1-17,8.1-17,8.1-69.7,0-42.1-.2-47.1-1.8-53-9-31.5-32.5-54.7-63-62C162.2.2,157.9,0,117,.1,73.6.1,72.3.2,63.4,2.4Zm93.8,41.7a42.85,42.85,0,0,1,33.8,37c1.2,9.6,1.2,63.2,0,72.8-1.3,9.8-4.7,16.9-11.6,24.2A40.57,40.57,0,0,1,154,191c-9.9,1.2-64.6,1.2-73.5,0-18.3-2.7-32.6-15.9-36.4-33.8-1.4-6.7-1.5-71.8-.1-79.3,2.9-15.5,15.6-29.2,31-33.3C82,42.7,148.8,42.3,157.2,44.1Z' transform='translate(-0.07 -0.04)'/><path class='cls-1' d='M353.3,1.5c-1.7.7-15.5,13-30.6,27.4-29,27.5-34.1,33.5-39.8,46.9a85.08,85.08,0,0,0-5.9,31,72.39,72.39,0,0,0,5.1,28.4c6.1,15.7,12.5,23.1,51.7,59.7,9,8.4,17.9,15.9,19.8,16.7,7.2,3,18.8,1.2,24.2-3.9,7.3-6.8,8.7-20.6,2.9-28.4-1.2-1.6-13.7-13.7-27.7-26.9l-25.4-23.9,39.4-.3c23.7-.1,41.6.2,44.9.8A42.87,42.87,0,0,1,447,166c.5,4.1,1,17.8,1,30.3,0,20.5.2,23.2,1.9,26.6a21.58,21.58,0,0,0,34.8,5.5c2.3-2.3,4.7-5.9,5.3-8.1.8-2.7,1.1-13.1.8-34.8-.4-28.2-.7-31.7-2.7-38.3-8.2-27.7-28.5-48.8-55.9-58.3l-9.7-3.4L375.1,85l-47.4-.5,16.9-16c40.6-38.4,39.9-37.5,39.7-48.1A20.86,20.86,0,0,0,372.8,1.9C368.3-.4,358.1-.6,353.3,1.5Z' transform='translate(-0.07 -0.04)'/><path class='cls-1' d='M34.6,278.5a22.6,22.6,0,0,0-11.8,10.9c-1.8,3.6-1.9,5.5-1.6,36.5l.4,32.6,3.2,9.5a82,82,0,0,0,21.1,34.1A83.26,83.26,0,0,0,80,423.3l9.5,3.2,46.8.3c25.7.2,46.7.7,46.7,1.2s-11.1,11.2-24.7,23.9-26,25-27.5,27.3a21.46,21.46,0,0,0,8.3,30.9c4.6,2.3,14.4,2.6,19.3.5,3.5-1.4,53.7-48.3,59.2-55.2a81.08,81.08,0,0,0,16-34.8c2-9.5,1.4-25.5-1.2-35.1-2.3-8.6-8.4-21-13.8-28.2s-54.8-53.8-59.8-56.4c-4.7-2.5-14.7-2.5-19.7.1a21.7,21.7,0,0,0-9,30c1.2,2,13.5,14.4,27.5,27.4S183,382.6,183,383.1c0,1.4-77.7,1.1-84.2-.2a44.2,44.2,0,0,1-33.7-33.7c-.6-3.1-1.1-15.6-1.1-30.5,0-28.6-.5-30.7-7.6-36.5A21.51,21.51,0,0,0,34.6,278.5Z' transform='translate(-0.07 -0.04)'/><path class='cls-1' d='M343.8,278.9c-24.9,5.4-47.3,23.2-58.4,46.6-7.8,16.5-7.7,15.6-8.1,65.4-.4,38.2-.2,45.5,1.2,52.5A85.81,85.81,0,0,0,342.3,510c7.5,1.8,11.9,2,52.2,2,40.5,0,44.7-.2,52.3-2A85.73,85.73,0,0,0,510,446.8c1.8-7.6,2-11.8,2-52.3,0-40.3-.2-44.7-2-52.2-7.2-30.3-30.1-53.6-61.5-62.9-5.3-1.5-11.5-1.8-51-2C356.7,277.1,351.7,277.3,343.8,278.9ZM431.5,321A42.8,42.8,0,0,1,468,355.5c.8,4.1,1,17.5.8,43-.3,35.5-.4,37.2-2.6,42.5A46.46,46.46,0,0,1,441,466.2c-5.3,2.2-7,2.3-42.5,2.6-25.4.2-38.9,0-43-.8-18.5-3.6-32-18.1-34.5-37.1-1.2-9.6-1.2-63.2,0-72.8,1.3-9.8,4.7-16.9,11.6-24.2a42.14,42.14,0,0,1,23.9-12.8C365,319.9,423.1,319.8,431.5,321Z' transform='translate(-0.07 -0.04)'/></svg>"
            propClass="w-[150px] h-[120px] bg-keybackground"
          />
          <ButtonAnimation
            disabled={isOff}
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
          className="w-3/4 h-[120px] p-2 border rounded resize-none"
          style={{ fontSize: "44px" }}
          placeholder="Tu texto aparecerá aquí..."
        />
        <SaveText state={changeState} isOff={isOff} />
      </div>
      <div className="bg-zinc-900 flex flex-col w-full h-full gap-4 pt-4 p-2">
        <div className="flex flex-row justify-between items-center px-4">
          <ButtonAnimation
            disabled={isOff}
            functionKeyboard={{ funct: "deleteAll", state: changeState }}
            speakText="Eliminar"
            svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.44 511.9"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono eliminar</title><path class="cls-1" d="M218,1.6C200.8,6.2,185,19.2,177.3,35c-5.4,11-7.3,20.6-7.3,36.9V85l-56.9.2-56.9.3-4.4,3c-13.6,9.7-12.4,30.1,2.3,37.6,3.2,1.6,5.9,1.9,17.3,1.9H85l.2,147.2.3,147.3,2.7,9.7a107.19,107.19,0,0,0,29.6,50c15.9,15.2,32.5,24,53.7,28.3,7,1.4,17.6,1.5,88,1.2,79.7-.3,80-.3,88-2.6a134.07,134.07,0,0,0,32.2-14.8c8.4-5.5,22.3-19.2,28.3-27.9a116.15,116.15,0,0,0,15.8-34.2l2.7-9.7.3-147.3L427,128h13.6c15.3,0,18.9-1.1,24.2-7.6a21.91,21.91,0,0,0-4.6-31.9l-4.4-3-56.9-.3L342,85V71.9c0-16.2-1.9-25.8-7.2-36.8-7.6-15.9-24-29.2-41.3-33.6C285-.6,226.1-.6,218,1.6Zm65.1,42.5a22.68,22.68,0,0,1,12.8,11.2c1.8,3.7,2.1,6.2,2.1,17V85H214V72.3c0-10.8.3-13.3,2.1-17a23.24,23.24,0,0,1,12.1-11C232.7,42.7,277.8,42.6,283.1,44.1ZM383.8,271.2c-.3,132.5-.5,143.8-2.1,149.3a68.22,68.22,0,0,1-45.2,46.2c-5.6,1.7-11,1.8-80.5,1.8s-74.9-.1-80.5-1.8a68.22,68.22,0,0,1-45.2-46.2c-1.6-5.5-1.8-16.8-2.1-149.3L127.9,128H384.1Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M203.5,193.6a22.24,22.24,0,0,0-9.6,9.6c-1.8,3.6-1.9,7.2-1.9,95.3,0,89.2.1,91.7,2,95.4,7.4,14.6,27.9,15.8,37.5,2.3l3-4.4.3-91.6.2-91.6-2.5-5.2c-3.8-7.8-8.8-10.8-18.4-11.2C208.6,192,205.7,192.4,203.5,193.6Z" transform="translate(-42.3 0.06)"/><path class="cls-1" d="M289.5,193.4c-4.5,1.9-9.1,7-10.9,11.8-1.5,3.9-1.6,13.6-1.4,95.5l.3,91.1,3,4.4c9.6,13.5,30.1,12.3,37.5-2.3,1.9-3.7,2-6.2,2-95.4,0-99.5.3-94.1-5.4-100.3C309.4,192.4,297.1,190.1,289.5,193.4Z" transform="translate(-42.3 0.06)"/></svg>'
            propClass="w-[80px] h-[60px] flex justify-center items-center"
          />
          <div className="flex gap-2">
            <TestPredictor keys={`${lastWord}`} isOff={isOff} state={changeState} />
          </div>
          <div className="flex gap-2">
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "deleteOne", state: changeState }}
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
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={`${isTildeActive ? "SACAR TILDE" : "TILDE"}`}
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "changeMayus", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={isUpperCase ? "MINUS" : "MAYUS"}
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "spaceKey", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text="____"
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "changeSymbol", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text={`${showSymbols ? "ABC" : "123.!"}`}
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "enterKey", state: changeState }}
              propClass="w-full h-full min-h-[60px] text-2xl"
              text="ENTER"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teclado;
