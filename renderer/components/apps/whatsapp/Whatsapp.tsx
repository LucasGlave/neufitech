"use client";
import { useEffect, useState, useRef } from "react";
import ButtonAnimation from "../../ButtonAnimation";
import Webview from "../Webview";
import TecladoGlobal from "../../teclado/TecladoGlobal";
import flechaArriba from "../../../public/flechaArriba.png";
import flechaAbajo from "../../../public/flechaAbajo.png";

const Whatsapp = () => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [base, setBase] = useState(false);
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [step, setStep] = useState("base");
  const [heightDivs, setHeightDivs] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const distanceRef = useRef<HTMLDivElement | null>(null);
  const [gap, setGap] = useState(0);
  const [activeButtons, setActiveButtons] = useState({
    "interaccion-rapida": true,
    perfil: true,
    "nuevo-grupo": true,
    "nuevo-chat": true,
    aceptar: false,
    "buscar-chat": true,
    "buscar-en-chat": true,
    "fijar-chat": false,
    volver: false,
  });

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        const div1Rect = containerRef.current.getBoundingClientRect();
        const div2Rect = distanceRef.current.getBoundingClientRect();
        const distance = div2Rect.top - div1Rect.bottom;
        setGap(Math.round(distance));
        setHeightDivs(Math.round(div1Rect.height));
      }
    }, 0);
  }, []);

  useEffect(() => {
    switch (step) {
      case "base":
        setActiveButtons({
          "interaccion-rapida": false,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          aceptar: false,
          "buscar-chat": false,
          "buscar-en-chat": false,
          "fijar-chat": false,
          volver: false,
        });
        break;
      case "interaccion-rapida":
        setActiveButtons({
          "interaccion-rapida": true,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          aceptar: false,
          "buscar-chat": true,
          "buscar-en-chat": true,
          "fijar-chat": true,
          volver: true,
        });
        break;
      case "perfil":
        setActiveButtons({
          "interaccion-rapida": false,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          aceptar: false,
          "buscar-chat": false,
          "buscar-en-chat": false,
          "fijar-chat": false,
          volver: true,
        });
        break;
      case "nuevo-grupo":
        setActiveButtons({
          "interaccion-rapida": true,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          "buscar-chat": false,
          aceptar: true,
          "buscar-en-chat": false,
          "fijar-chat": false,
          volver: true,
        });
        break;
      case "nuevo-chat":
        setActiveButtons({
          "interaccion-rapida": true,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          "buscar-chat": false,
          aceptar: true,
          "buscar-en-chat": false,
          "fijar-chat": false,
          volver: true,
        });
        break;
      case "buscar-chat":
        setActiveButtons({
          "interaccion-rapida": true,
          perfil: false,
          "nuevo-grupo": false,
          "nuevo-chat": false,
          aceptar: false,
          "buscar-chat": false,
          "buscar-en-chat": false,
          "fijar-chat": false,
          volver: true,
        });
        break;
      case "fijar-chat":
        break;
      case "volver":
        setActiveButtons({
          "interaccion-rapida": true,
          perfil: true,
          "nuevo-grupo": true,
          "nuevo-chat": true,
          aceptar: false,
          "buscar-chat": true,
          "buscar-en-chat": true,
          "fijar-chat": false,
          volver: false,
        });
        break;
    }
  }, [step]);

  const changeState = (func: string) => {
    switch (func) {
      case "changeIsOff":
        setIsOff(!isOff);
        break;
      case "changeKeyboard":
        setShowKeyboard(!showKeyboard);
        break;
      case "interaccionRapida":
        setIsActiveSelect(true);
        setTimeout(() => {
          setIsActiveSelect(false);
        }, 2500);
        step === "base" && setStep("interaccion-rapida");
        break;
      case "profile":
        setStep("perfil");
        break;
      case "newGroup":
        setStep("nuevo-grupo");
        break;
      case "newChat":
        setStep("nuevo-chat");
        break;
      case "findInChat":
        setStep("buscar-en-chat");
        break;
      case "fixedChat":
        setStep("fijar-chat");
        break;
      case "back":
        if (step === "buscar-en-chat") {
          base ? (setStep("base"), setBase(false)) : setBase(true);
        } else {
          setStep("base");
        }
        break;
    }
  };

  return (
    <div className="h-[100vh] flex flex-row bg-white">
      <div className="w-full relative flex items-center justify-center">
        <div
          className={`absolute top-0 left-0 w-[15%] border-red-400 h-full z-10 ${
            isActiveSelect &&
            "bg-gradient-to-b from-green-200 via-green-400 to-green-600 animate-grow-bar-y"
          }`}
        />
        <div className="w-[12%] h-full flex flex-col">
          <div
            className={`flex flex-col z-20 justify-between bg-[#f0f2f5] rounded-bl-xl px-2 py-6 w-full`}
          >
            {/* <div className=""> */}
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Volver"
              buttonBorder="border-green-700"
              svg='<svg viewBox="0 0 24 24" id="SVGRoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1"> <path d="M 9 2 A 1.0001 1.0001 0 0 0 8 3 L 8 8 A 1 1 0 0 0 9 9 A 1 1 0 0 0 10 8 L 10 4 L 18 4 L 18 20 L 10 20 L 10 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 16 L 8 21 A 1.0001 1.0001 0 0 0 9 22 L 19 22 A 1.0001 1.0001 0 0 0 20 21 L 20 3 A 1.0001 1.0001 0 0 0 19 2 L 9 2 z M 7.0292969 9 A 1 1 0 0 0 6.2929688 9.2929688 L 4.3125 11.273438 L 4.2929688 11.292969 A 1.0001 1.0001 0 0 0 4.2832031 11.302734 A 1 1 0 0 0 4.2363281 11.355469 A 1 1 0 0 0 4.1855469 11.421875 A 1 1 0 0 0 4.1464844 11.482422 A 1.0001 1.0001 0 0 0 4.1289062 11.509766 A 1 1 0 0 0 4.0996094 11.566406 A 1 1 0 0 0 4.0683594 11.638672 A 1.0001 1.0001 0 0 0 4.0644531 11.650391 A 1 1 0 0 0 4.0410156 11.714844 A 1.0001 1.0001 0 0 0 4.0332031 11.75 A 1 1 0 0 0 4.0234375 11.791016 A 1.0001 1.0001 0 0 0 4.015625 11.828125 A 1 1 0 0 0 4.0078125 11.871094 A 1.0001 1.0001 0 0 0 4.0019531 11.943359 A 1.0001 1.0001 0 0 0 4 11.988281 A 1 1 0 0 0 4 12 A 1 1 0 0 0 4.0019531 12.029297 A 1.0001 1.0001 0 0 0 4.0039062 12.066406 A 1 1 0 0 0 4.0078125 12.117188 A 1.0001 1.0001 0 0 0 4.0117188 12.146484 A 1 1 0 0 0 4.0253906 12.222656 A 1 1 0 0 0 4.0410156 12.28125 A 1.0001 1.0001 0 0 0 4.0546875 12.324219 A 1 1 0 0 0 4.0585938 12.337891 A 1.0001 1.0001 0 0 0 4.0878906 12.408203 A 1.0001 1.0001 0 0 0 4.1210938 12.474609 A 1 1 0 0 0 4.1347656 12.501953 A 1.0001 1.0001 0 0 0 4.1640625 12.546875 A 1 1 0 0 0 4.1777344 12.568359 A 1.0001 1.0001 0 0 0 4.2011719 12.601562 A 1 1 0 0 0 4.21875 12.623047 A 1.0001 1.0001 0 0 0 4.265625 12.677734 A 1 1 0 0 0 4.2851562 12.699219 A 1.0001 1.0001 0 0 0 4.2929688 12.707031 A 1 1 0 0 0 4.3339844 12.746094 L 6.2929688 14.707031 A 1 1 0 0 0 7.7070312 14.707031 A 1 1 0 0 0 7.7070312 13.292969 L 7.4140625 13 L 14 13 A 1 1 0 0 0 15 12 A 1 1 0 0 0 14 11 L 7.4140625 11 L 7.7070312 10.707031 A 1 1 0 0 0 7.7070312 9.2929688 A 1 1 0 0 0 7.0292969 9 z " id="path6945" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#000000;stop-opacity:1;opacity:1"></path> </g> </g></svg>'
              navigation="/"
              color="bg-white"
              propClass="w-full"
            />
            {/* </div> */}
          </div>
          <div
            className={`flex flex-col z-20 my-6 justify-between px-2 w-full h-full`}
          >
            <ButtonAnimation
              disabled={isOff}
              state={() => changeState}
              buttonBorder="border-green-700"
              command="scrollTop"
              app="whatsapp"
              imagen={{ src: flechaArriba, add: "w-[35%] invert" }}
              textColor="text-green-700"
              color="bg-[#d9fdd359]"
              propClass="w-full h-[11%] font-bold"
            />
            <ButtonAnimation
              disabled={isOff}
              state={() => changeState}
              buttonBorder="border-green-700"
              command="scrollBottom"
              app="whatsapp"
              imagen={{ src: flechaAbajo, add: "w-[35%] invert" }}
              textColor="text-green-700"
              color="bg-[#d9fdd359]"
              propClass="w-full h-[11%] font-bold"
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "profile", state: changeState }}
              keyCombination={["control", "alt", "comma"]}
              buttonBorder="border-green-700"
              command="perfil"
              app="whatsapp"
              text="Perfil"
              textColor="text-black"
              color="bg-[#d9fdd359]"
              propClass="w-full h-[11%] font-bold"
            />
            <ButtonAnimation
              disabled={isOff}
              functionKeyboard={{ funct: "newGroup", state: changeState }}
              buttonBorder="border-green-700"
              keyCombination={["control", "alt", "shift", "n"]}
              text="Nuevo grupo"
              textColor="text-black"
              color="bg-[#d9fdd359]"
              propClass="w-full h-[11%] font-bold"
            />
            <div ref={containerRef} className="h-[11%]">
              <ButtonAnimation
                disabled={isOff}
                functionKeyboard={{ funct: "newChat", state: changeState }}
                buttonBorder="border-green-700"
                keyCombination={["control", "alt", "n"]}
                text="Nuevo chat"
                textColor="text-black"
                color="bg-[#d9fdd359]"
                propClass="w-full h-full font-bold"
              />
            </div>
            <div ref={distanceRef} className="h-[11%]">
              <ButtonAnimation
                disabled={isOff}
                state={() => setShowKeyboard(!showKeyboard)}
                buttonBorder="border-green-700"
                keyPress="escape"
                text={showKeyboard ? "Esconder teclado" : "Mostrar teclado"}
                textColor="text-black"
                color="bg-[#d9fdd359]"
                propClass="w-full h-full font-bold"
              />
            </div>
          </div>
        </div>
        {/* Botonera left */}
        <div className="flex flex-col w-[85%] h-full">
          <Webview url="https://web.whatsapp.com" />
          {showKeyboard && <TecladoGlobal isOff={isOff} />}
        </div>
        {/* Botonera right */}
        <div className="w-[12%] h-full flex flex-col">
          <div
            className={`flex flex-col z-20 justify-between bg-[#f0f2f5] rounded-br-xl px-2 py-6 w-full`}
          >
            <ButtonAnimation
              functionKeyboard={{ funct: "changeIsOff", state: changeState }}
              speakText="Suspender"
              buttonBorder="border-green-700"
              color="bg-white"
              svg={
                !isOff
                  ? '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z" fill="#0F0F0F"></path> </g></svg>'
                  : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#0F0F0F"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#0F0F0F"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#0F0F0F"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#0F0F0F"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#0F0F0F"></path> </g></svg>'
              }
              propClass={`w-full`}
            />
          </div>
          <div
            style={{ gap: gap }}
            className={`flex flex-col z-20 justify-start mt-6 px-2 w-full h-full`}
          >
            <div style={{ height: heightDivs }}>
              <ButtonAnimation
                disabled={isOff}
                state={() => changeState}
                buttonBorder="border-green-700"
                command="scrollTopChat"
                app="whatsapp"
                imagen={{ src: flechaArriba, add: "w-[35%] invert" }}
                textColor="text-green-700"
                color="bg-[#d9fdd359]"
                propClass={`w-full h-full font-bold`}
              />
            </div>
            <div style={{ height: heightDivs }}>
              <ButtonAnimation
                disabled={isOff}
                state={() => changeState}
                buttonBorder="border-green-700"
                command="scrollBottomChat"
                app="whatsapp"
                imagen={{ src: flechaAbajo, add: "w-[35%] invert" }}
                textColor="text-green-700"
                color="bg-[#d9fdd359]"
                propClass={`w-full h-full font-bold`}
              />
            </div>

            <div style={{ height: heightDivs }}>
              <ButtonAnimation
                disabled={isOff}
                functionKeyboard={{
                  funct: "interaccionRapida",
                  state: changeState,
                }}
                buttonBorder="border-green-700"
                command="interaccionRapida"
                app="whatsapp"
                text="Interaccion rapida"
                textColor="text-black"
                color="bg-[#d9fdd359]"
                propClass={`w-full h-full font-bold`}
              />
            </div>
            {activeButtons["perfil"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{ funct: "profile", state: changeState }}
                  keyCombination={["control", "alt", "comma"]}
                  buttonBorder="border-green-700"
                  command="perfil"
                  app="whatsapp"
                  text="Perfil"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["nuevo-grupo"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{ funct: "newGroup", state: changeState }}
                  buttonBorder="border-green-700"
                  keyCombination={["control", "alt", "shift", "n"]}
                  text="Nuevo grupo"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["nuevo-chat"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{ funct: "newChat", state: changeState }}
                  buttonBorder="border-green-700"
                  keyCombination={["control", "alt", "n"]}
                  text="Nuevo chat"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["buscar-en-chat"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{
                    funct: "findInChat",
                    state: changeState,
                  }}
                  buttonBorder="border-green-700"
                  keyCombination={["control", "alt", "shift", "f"]}
                  text="Buscar en el chat"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["fijar-chat"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{
                    funct: "fixedChat",
                    state: changeState,
                  }}
                  buttonBorder="border-green-700"
                  keyCombination={["control", "alt", "shift", "p"]}
                  text="Fijar chat"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["aceptar"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{ funct: "Accept", state: changeState }}
                  buttonBorder="border-green-700"
                  keyPress="enter"
                  text="Aceptar"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
            {activeButtons["volver"] && (
              <div style={{ height: heightDivs }}>
                <ButtonAnimation
                  disabled={isOff}
                  functionKeyboard={{ funct: "back", state: changeState }}
                  buttonBorder="border-green-700"
                  keyPress="escape"
                  text="Volver"
                  textColor="text-black"
                  color="bg-[#d9fdd359]"
                  propClass={`w-full h-full font-bold`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
