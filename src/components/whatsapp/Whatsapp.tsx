"use client"
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
  const [isAllow, setIsAllow] = useState(false);
  const [funcToEjec, setFuncToEjec] = useState("");
  const [activeButtons, setActiveButtons] = useState([
    "Chat-anterior",
    "Chat-siguiente",
    "Buscar-chat",
    "Nuevo-chat",
    "Seleccionar",
    "Perfil",
  ]);

  const changeState = (func: string) => {
    setIsAllow(true);
    setFuncToEjec(func);
  };

  const handleActive = (func: string) => {
    const route = whatsappRoutes.find((route) => Object.keys(route)[0] === func) as WhatsappRoute | undefined;

    if (route) {
      const config = route[func];
      if (config.buttons) {
        const newButtons = Object.keys(config.buttons);
        setActiveButtons(newButtons);
      }
    }
    setIsAllow(false);
  };

  useEffect(() => {
    if (isAllow) {
      handleActive(funcToEjec);
    }
    console.log(activeButtons)
  }, [isAllow]);

  return (
    <div className="h-[100vh] flex flex-row bg-white">
      <div className="w-[40%] p-2 gap-2 flex flex-col items-center justify-evenly">
        {whatsappRoutes.map((route, index) => {
          const buttonName = Object.keys(route)[0];
          if (activeButtons.includes(buttonName)) {
            return (
              <ButtonAnimation
                functionKeyboard={{ funct: buttonName, state: changeState }}
                key={index}
                textColor="black"
                text={`${buttonName.replace("-", " ")}`}
                buttonBorder="border-green-700"
                propClass="w-full h-[80px]"
              />
            );
          }
          return null;
        })}
      </div>
      {/* <Webview url="urlWhatsapp" /> */}
    </div>
  );
};

export default Whatsapp;
