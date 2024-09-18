"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  execute?: () => void;
  imageSetter?: React.Dispatch<React.SetStateAction<string>>;
  titleSetter?: React.Dispatch<React.SetStateAction<string>>;
  interactionDeleter?: (text) => void;
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
  state,
  innerText,
  disabled,
  functionKeyboard,
  svg,
  keyCombination,
  keyPress,
  displacementFunction,
  comingSoon,
  execute,
  imageSetter,
  titleSetter,
  interactionDeleter,
}: buttonProps) => {
  const navigate = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isActive) {
      const startTimer = () => {
        setProgress(0);
        progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 1 : 100));
        }, 10);
        timer = setTimeout(async () => {
          setIsAction(true);
          displacementFunction && displacementFunction(speakText as string);
          state && state();
          if (keyCombination) {
            if (window.ipc) {
              document.getElementById("whatsapp-webview")?.focus();
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
                  document.getElementById("whatsapp-webview")?.focus();
                  window.ipc.sendKeyCombination(["control", "v"]);
                } catch (err) {
                  console.error("Failed to copy: ", err);
                }
              } else {
                document.getElementById("whatsapp-webview")?.focus();
                window.ipc.sendLetter(keyPress);
              }
            } else {
              console.log("No se puede usar keySender");
            }
          }
          if (speakText) {
            if (window.ipc) {
              window.ipc.speak(speakText);
            } else {
              const utterance = new SpeechSynthesisUtterance(speakText);
              window.speechSynthesis.speak(utterance);
              console.log(window.speechSynthesis.getVoices());
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
        }, 1000); // cambiar con config
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
      className={`border-2 ${!isAction ? color : "bg-charge"} ${
        isActive
          ? "border-chargescale-105"
          : buttonBorder
          ? buttonBorder
          : "border-white"
      } ${propClass} ${
        innerText && "relative"
      } z-10 rounded-lg transition-all animate-in animate-out font-semibold ${
        wordCount > 1 ? "whitespace-pre-line" : "break-all"
      }   ${textColor ? textColor : "text-white"} ${
        comingSoon && "grayscale-[50%] overflow-hidden"
      }`}
    >
      <div
        className={`relative h-full w-full flex items-center justify-center ${
          svg && "p-5"
        }`}
      >
        {imagen != null ? (
          <Image
            src={imagen.src}
            width={imagen.width}
            height={imagen.height}
            alt="dynamic image"
            className={`rounded-lg object-contain relative ${
              imagen.add && imagen.add
            } ${innerText && "opacity-85 brightness-75"}`}
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
          <h3 className="absolute font-bold text-3xl flex text-center items-center justify-center whitespace-pre-line">
            {innerText}
          </h3>
        )}
        {comingSoon && (
          <div className="absolute flex rotate-[-6deg] items-center justify-center w-full h-full z-20 backdrop-blur-[1.5px]">
            <h3 className="w-[120%] mx-[-20px] bg-black py-2 opacity-80 font-bold">
              PROXIMAMENTE
            </h3>
          </div>
        )}
      </div>
    </button>
  );
};

export default ButtonAnimation;
