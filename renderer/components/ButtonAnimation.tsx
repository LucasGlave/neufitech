"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { WebviewTag } from "electron";
import AppManagement from "./apps";

type buttonProps = {
  text?: string;
  textColor?: string;
  buttonBorder?: string;
  propClass?: string;
  color?: string;
  navigation?: string;
  speakText?: string;
  innerText?: string;
  disabled?: boolean;
  svg?: string;
  repeat?: boolean;
  focus?: string;
  state?: () => void;
  displacementFunction?: (speakText: string) => void;
  comingSoon?: boolean;
  functionKeyboard?: {
    funct: string;
    state: (functionToEjec: string) => void;
  };
  imagen?: {
    src: StaticImport | string;
    width?: number;
    height?: number;
    add?: string;
  };
  keyCombination?: string[];
  keyPress?: string;
  tabLoop?: number;
  execute?: () => void;
  imageSetter?: React.Dispatch<React.SetStateAction<string>>;
  titleSetter?: React.Dispatch<React.SetStateAction<string>>;
  interactionDeleter?: (text) => void;
  command?: string;
  app?: string;
};

const ButtonAnimation = ({
  text,
  textColor,
  buttonBorder,
  propClass,
  navigation,
  imagen,
  color,
  speakText,
  command,
  state,
  innerText,
  disabled,
  functionKeyboard,
  svg,
  keyCombination,
  keyPress,
  tabLoop,
  displacementFunction,
  comingSoon,
  execute,
  imageSetter,
  titleSetter,
  interactionDeleter,
  repeat,
  app,
  focus,
}: buttonProps) => {
  const navigate = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    let config = JSON.parse(localStorage.getItem("config") || "{}");
    const volumeMap = {
      1: 0.2,
      2: 0.4,
      3: 0.6,
      4: 0.8,
      5: 1.0,
    };
    const activationHover = {
      1: 500,
      2: 750,
      3: 1000,
      4: 1500,
      5: 1750,
    };
    if (isActive) {
      const startTimer = () => {
        setProgress(0);
        progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 1 : 100));
        }, activationHover[config.activation] / 100);
        timer = setTimeout(async () => {
          const webview = document.getElementById("app") as WebviewTag;
          if (webview) {
            webview.executeJavaScript("document.body.focus();");
          }
          setIsAction(true);
          displacementFunction && displacementFunction(speakText as string);
          state && state();
          command && AppManagement(app, command);
          if (keyCombination) {
            if (window.ipc) {
              document.getElementById("app")?.focus();
              window.ipc.sendKeyCombination(keyCombination);
            } else {
              console.log("No se puede usar keySender");
            }
          } else if (keyPress) {
            if (window.ipc) {
              if (
                keyPress === "ñ" ||
                keyPress === "Ñ" ||
                keyPress === "@" ||
                keyPress === "%" ||
                keyPress === "/" ||
                keyPress === "=" ||
                keyPress === ";" ||
                keyPress === "?"
              ) {
                try {
                  window.focus();
                  document.getElementById("teclado-global")?.focus();
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  await navigator.clipboard.writeText(keyPress);
                  document.getElementById("app")?.focus();
                  window.ipc.sendKeyCombination(["control", "v"]);
                } catch (err) {
                  console.error("Failed to copy: ", err);
                }
              } else {
                try {
                  document.getElementById("app")?.focus();
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  window.ipc.sendLetter(keyPress);
                } catch (err) {
                  console.error("error when sending keypress: ", err);
                }
              }
            } else {
              console.log("No se puede usar keySender");
            }
          } else if (tabLoop) {
            if (window.ipc) {
              (document.getElementById("dummy") as HTMLElement).focus();
              const sendTabsUntilChatFocus = async (
                targetChatSelector: string,
                maxTabs: number = 6
              ) => {
                let chatFocused = false;
                let tabsSent = 0;
                while (!chatFocused && tabsSent < maxTabs) {
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  window.ipc.sendLetter("tab");
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  const activeElement = document.activeElement;
                  const targetChat = document.querySelector(targetChatSelector);
                  if (
                    activeElement &&
                    targetChat &&
                    activeElement === targetChat
                  ) {
                    chatFocused = true;
                    console.log("El chat ha sido enfocado correctamente.");
                  } else {
                    tabsSent++;
                  }
                }
              };
              await sendTabsUntilChatFocus("#pane-side div[role='listitem']");
            } else {
              console.log("No se puede usar keySender");
            }
          }
          if (speakText) {
            if (window.ipc) {
              window.ipc.speak(speakText);
            } else {
              const speech = new SpeechSynthesisUtterance(speakText);
              config = JSON.parse(localStorage.getItem("config") || "{}");
              const voices = window.speechSynthesis.getVoices();
              if (voices.length > 0) {
                const selectedVoice =
                  config.voices === "hombre"
                    ? voices[9].name === "Google español"
                      ? voices[9]
                      : voices[0]
                    : config.voices === "mujer"
                      ? voices[4].name.includes("Sabina")
                        ? voices[4]
                        : voices[0]
                      : voices[0];
                speech.voice = selectedVoice;
              } else {
                console.log("No voices available");
              }
              speech.volume = volumeMap[config.volume] || 1;
              window.speechSynthesis.speak(speech);
            }
          }
          if (execute) {
            execute();
          }
          functionKeyboard?.state(functionKeyboard.funct);
          navigation != null && navigate.push(navigation);
          if (imageSetter && imagen) {
            imageSetter(imagen.src as string);
          }
          if (titleSetter) {
            text == "VOLVER"
              ? titleSetter("CATEGORIAS")
              : titleSetter(innerText ? innerText : "");
          }
          interactionDeleter && interactionDeleter(innerText);

          clearInterval(progressInterval);
          setProgress(0);
          if (isActive && repeat) {
            startTimer();
          }
        }, activationHover[config.activation]); // cambiar con config
      };
      startTimer();
    }

    return () => {
      setIsAction(false);
      clearTimeout(timer);
      clearInterval(progressInterval);
      setProgress(0);
    };
  }, [isActive]);
  let wordCount: number;
  if (innerText || text) {
    let textToUse = innerText ? innerText : text;
    wordCount = textToUse.split(/\s+/).filter((word) => word.length > 0).length;
  }
  return (
    <button
      id="myButton"
      disabled={comingSoon ? true : disabled ? true : false}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
        setIsAction(false);
      }}
      className={`border-2 ${!isAction ? color : "bg-charge"} ${isActive
          ? "border-chargescale-105"
          : buttonBorder
            ? buttonBorder
            : "border-white"
        } ${propClass} ${innerText && "relative"
        } z-10 rounded-lg transition-all animate-in animate-out font-semibold ${wordCount > 1 ? "whitespace-pre-line" : "break-all"
        }   ${textColor ? textColor : "text-white"} ${comingSoon && "grayscale-[90%] overflow-hidden"
        }`}
    >
      <div
        className={`relative h-full w-full flex items-center justify-center ${svg && "p-5"
          }`}
      >
        {imagen != null ? (
          <Image
            src={imagen.src}
            width={imagen.width}
            height={imagen.height}
            alt="dynamic image"
            className={`rounded-lg object-contain relative ${imagen.add && imagen.add
              } ${innerText && "opacity-85 brightness-75"} ${comingSoon && "blur-[2px]"
              }`}
          />
        ) : text ? (
          text
        ) : (
          svg && <div dangerouslySetInnerHTML={{ __html: svg }} />
        )}
        {isActive && (
          <div
            className="absolute top-0 left-0 h-2 bg-charge"
            style={{
              width: `${100 - progress}%`,
              right: 0,
              transition: "width 0.1s linear",
            }}
          ></div>
        )}
        {isActive && (
          <div
            className="absolute bottom-0 left-0 h-2 bg-charge"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          ></div>
        )}
        {svg && (
          <div
            className="flex items-center justify-center w-[50px] h-[50px] z-[-1]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
        {innerText && (
          <h3 className="absolute font-bold text-3xl flex text-center items-center justify-center whitespace-pre-line mx-3">
            {innerText}
          </h3>
        )}
        {/* {comingSoon && (
          <div className="absolute flex rotate-[-6deg] items-center justify-center w-full h-full z-20 backdrop-blur-[1.5px]">
            <h3 className="w-[120%] mx-[-20px] bg-black py-2 opacity-80 font-bold">
              PROXIMAMENTE
            </h3>
          </div>
        )} */}
      </div>
    </button>
  );
};

export default ButtonAnimation;
