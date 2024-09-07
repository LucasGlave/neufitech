"use client";
import { useEffect, useState } from "react";
import Webview from "../Webview";
import ButtonAnimation from "../ButtonAnimation";
import whatsappRoutes from "./routeWhatsapp";
import TecladoGlobal from "../teclado/TecladoGlobal";

type RouteConfig = {
  keyCombination?: string[];
  keyPress?: string;
  buttons?: Record<string, RouteConfig>;
};

type WhatsappRoute = Record<string, RouteConfig>;

const Whatsapp = () => {
  const [funcToEjec, setFuncToEjec] = useState("");
  const [isOff, setIsOff] = useState(false);
  const [activeButtons, setActiveButtons] = useState([
    "Chat-anterior",
    "Chat-siguiente",
    // "Buscar-chat",
    "Nuevo-chat",
    // "Seleccionar",
    "Perfil",
  ]);
  const [activeButtonConfigs, setActiveButtonConfigs] = useState<Record<string, RouteConfig>>({});

  const changeState = (func: string) => {
    setFuncToEjec(func);
  };

  const handleActive = (func: string) => {
    if (func === "Volver") {
      setActiveButtons([
        "Chat-anterior",
        "Chat-siguiente",
        // "Buscar-chat",
        "Nuevo-chat",
        // "Seleccionar",
        "Perfil",
      ]);
      setActiveButtonConfigs({});
      return;
    }
    if (func === "changeIsOff") {
      setIsOff(!isOff)
    }

    const route = whatsappRoutes.find((route) => Object.keys(route)[0] === func) as WhatsappRoute | undefined;

    if (route) {
      const config = route[func];
      if (config && config.buttons) {
        const newButtons = Object.keys(config.buttons);
        setActiveButtons(newButtons);
        setActiveButtonConfigs(config.buttons);
      } else {
        setActiveButtons([
          "Chat-anterior",
          "Chat-siguiente",
          // "Buscar-chat",
          "Nuevo-chat",
          // "Seleccionar",
          "Perfil",
        ]);
        setActiveButtonConfigs({});
      }
    }
    setFuncToEjec("")
  };

  useEffect(() => {
    if (funcToEjec) {
      handleActive(funcToEjec);
    }
  }, [funcToEjec]);

  return (
    <div className="h-[100vh] flex flex-row bg-white">
      <div
        className="w-full flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-between w-full h-full">
          <div className="flex w-full justify-between items-center gap-2 p-2">
            {/* Conseguir svgs en negro y no usar invert */}
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Salir"
              buttonBorder="border-pink-400"
              svg='<svg viewBox="0 0 24 24" id="SVGRoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1"> <path d="M 9 2 A 1.0001 1.0001 0 0 0 8 3 L 8 8 A 1 1 0 0 0 9 9 A 1 1 0 0 0 10 8 L 10 4 L 18 4 L 18 20 L 10 20 L 10 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 16 L 8 21 A 1.0001 1.0001 0 0 0 9 22 L 19 22 A 1.0001 1.0001 0 0 0 20 21 L 20 3 A 1.0001 1.0001 0 0 0 19 2 L 9 2 z M 7.0292969 9 A 1 1 0 0 0 6.2929688 9.2929688 L 4.3125 11.273438 L 4.2929688 11.292969 A 1.0001 1.0001 0 0 0 4.2832031 11.302734 A 1 1 0 0 0 4.2363281 11.355469 A 1 1 0 0 0 4.1855469 11.421875 A 1 1 0 0 0 4.1464844 11.482422 A 1.0001 1.0001 0 0 0 4.1289062 11.509766 A 1 1 0 0 0 4.0996094 11.566406 A 1 1 0 0 0 4.0683594 11.638672 A 1.0001 1.0001 0 0 0 4.0644531 11.650391 A 1 1 0 0 0 4.0410156 11.714844 A 1.0001 1.0001 0 0 0 4.0332031 11.75 A 1 1 0 0 0 4.0234375 11.791016 A 1.0001 1.0001 0 0 0 4.015625 11.828125 A 1 1 0 0 0 4.0078125 11.871094 A 1.0001 1.0001 0 0 0 4.0019531 11.943359 A 1.0001 1.0001 0 0 0 4 11.988281 A 1 1 0 0 0 4 12 A 1 1 0 0 0 4.0019531 12.029297 A 1.0001 1.0001 0 0 0 4.0039062 12.066406 A 1 1 0 0 0 4.0078125 12.117188 A 1.0001 1.0001 0 0 0 4.0117188 12.146484 A 1 1 0 0 0 4.0253906 12.222656 A 1 1 0 0 0 4.0410156 12.28125 A 1.0001 1.0001 0 0 0 4.0546875 12.324219 A 1 1 0 0 0 4.0585938 12.337891 A 1.0001 1.0001 0 0 0 4.0878906 12.408203 A 1.0001 1.0001 0 0 0 4.1210938 12.474609 A 1 1 0 0 0 4.1347656 12.501953 A 1.0001 1.0001 0 0 0 4.1640625 12.546875 A 1 1 0 0 0 4.1777344 12.568359 A 1.0001 1.0001 0 0 0 4.2011719 12.601562 A 1 1 0 0 0 4.21875 12.623047 A 1.0001 1.0001 0 0 0 4.265625 12.677734 A 1 1 0 0 0 4.2851562 12.699219 A 1.0001 1.0001 0 0 0 4.2929688 12.707031 A 1 1 0 0 0 4.3339844 12.746094 L 6.2929688 14.707031 A 1 1 0 0 0 7.7070312 14.707031 A 1 1 0 0 0 7.7070312 13.292969 L 7.4140625 13 L 14 13 A 1 1 0 0 0 15 12 A 1 1 0 0 0 14 11 L 7.4140625 11 L 7.7070312 10.707031 A 1 1 0 0 0 7.7070312 9.2929688 A 1 1 0 0 0 7.0292969 9 z " id="path6945" style="color:#FFFFFFF\;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#FFFFFFF\;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#FFFFFFF\;solid-opacity:1;vector-effect:none;fill:#FFFFFFF\;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#FFFFFFF\;stop-opacity:1;opacity:1"></path> </g> </g></svg>'
              navigation="/"
              propClass="w-full h-[80px] invert"
            />
            <ButtonAnimation
              functionKeyboard={{ funct: 'changeIsOff', state: changeState }}
              speakText="Suspender"
              buttonBorder="border-pink-400"
              svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
              propClass="w-full h-[80px] invert"
            />
          </div>
          <div
            className="p-2 gap-2 grid w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(45%, 1fr))",
              gridAutoRows: "auto",
            }}
          >
            {activeButtons.map((buttonName, index) => {
              const buttonConfig = activeButtonConfigs[buttonName] || {};
              const route = whatsappRoutes.find((route) => Object.keys(route)[0] === buttonName) as WhatsappRoute | undefined;
              return (
                <ButtonAnimation
                  disabled={isOff ? true : false}
                  functionKeyboard={{ funct: buttonName, state: changeState }}
                  keyCombination={!buttonConfig.keyCombination ? route && route[buttonName].keyCombination : buttonConfig.keyCombination}
                  keyPress={!buttonConfig.keyPress ? route && route[buttonName].keyPress : buttonConfig.keyPress}
                  key={index}
                  textColor="black"
                  text={`${buttonName.replace("-", " ").replace("-", " ")}`}
                  buttonBorder="border-green-700"
                  propClass="w-full h-[80px]"
                />
              );
            })}
          </div>
          <div />
        </div>
        <div className="flex flex-col w-full h-full">
          <Webview url="https://web.whatsapp.com" />
          <TecladoGlobal />
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
