"use client";
import { useEffect, useState } from "react";
import Webview from "../Webview";
import ButtonAnimation from "../ButtonAnimation";
import whatsappRoutes from "./routeWhatsapp";

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
    "Buscar-chat",
    "Nuevo-chat",
    "Seleccionar",
    "Perfil",
  ]);
  const [activeButtonConfigs, setActiveButtonConfigs] = useState<Record<string, RouteConfig>>({});

  const changeState = (func: string) => {
    setFuncToEjec(func);
  };

  const handleActive = (func: string) => {
    // Verificamos si la función es "Volver"
    if (func === "Volver") {
      setActiveButtons([
        "Chat-anterior",
        "Chat-siguiente",
        "Buscar-chat",
        "Nuevo-chat",
        "Seleccionar",
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
        setActiveButtonConfigs(config.buttons); // Guardamos la configuración de los botones activos
      } else {
        setActiveButtons([
          "Chat-anterior",
          "Chat-siguiente",
          "Buscar-chat",
          "Nuevo-chat",
          "Seleccionar",
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
      <div className="w-[40%] p-2 gap-2 flex flex-col items-center justify-evenly">
        {activeButtons.map((buttonName, index) => {
          const buttonConfig = activeButtonConfigs[buttonName] || {};
          return (
            <ButtonAnimation
              functionKeyboard={{ funct: buttonName, state: changeState }}
              keyCombination={buttonConfig.keyCombination || []} // Pasa keyCombination si existe
              keyPress={buttonConfig.keyPress || ""} // Pasa keyPress si existe
              key={index}
              textColor="black"
              text={`${buttonName.replace("-", " ")}`}
              buttonBorder="border-green-700"
              propClass="w-full h-[80px]"
            />
          );
        })}
      </div>
      <Webview url="https://web.whatsapp.com" />
    </div>
  );
};

export default Whatsapp;
