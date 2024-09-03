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
        <div
          className="p-2 gap-2 grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(45%, 1fr))",
            gridAutoRows: "auto",
            gap: "8px",
            maxWidth: "25%",
          }}
        >
          {activeButtons.map((buttonName, index) => {
            const buttonConfig = activeButtonConfigs[buttonName] || {};
            const route = whatsappRoutes.find((route) => Object.keys(route)[0] === buttonName) as WhatsappRoute | undefined;
            return (
              <ButtonAnimation
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
        <div className="flex flex-col w-full h-full">
          <Webview url="https://web.whatsapp.com" />
          <TecladoGlobal />
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
