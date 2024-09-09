"use client";
import React, { useEffect, useState } from "react";
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
  displacementFunction?: (direction: string) => void;
  functionKeyboard?: {
    funct: string;
    state: (functionToEjec: string) => void;
  };
  imagen?: {
    src: StaticImport;
    width?: number;
    height?: number;
    add?: string;
  };
  keyCombination?: string[];
  keyPress?: string;
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
}: buttonProps) => {
  const navigate = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    if (isActive) {
      setProgress(0);
      progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 10);
      timer = setTimeout(async () => {
        setIsAction(true);
        state && state();
        displacementFunction && displacementFunction(speakText as string);
        if (keyCombination) {
          if (window.electronAPI) {
            document.getElementById("whatsapp-webview")?.focus();
            window.electronAPI.sendKeyCombination(keyCombination);
          } else {
            console.log("No se puede usar keySender");
          }
        } else if (keyPress) {
          if (window.electronAPI) {
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
                window.electronAPI.sendKeyCombination(["control", "v"]);
              } catch (err) {
                console.error("Failed to copy: ", err);
              }
            } else {
              document.getElementById("whatsapp-webview")?.focus();
              window.electronAPI.sendLetter(keyPress);
            }
          } else {
            console.log("No se puede usar keySender");
          }
        }
        if (speakText) {
          if (window.electronAPI) {
            window.electronAPI.speak(speakText);
          } else {
            const utterance = new SpeechSynthesisUtterance(speakText);
            window.speechSynthesis.speak(utterance);
          }
        }
        functionKeyboard?.state(functionKeyboard.funct);
        navigation != null && navigate.push(navigation);
        clearInterval(progressInterval);
        setProgress(0);
        setTimeout(() => {
          setIsActive(false);
        }, 100);
      }, 1000);
    }
    return () => {
      setIsAction(false);
      clearTimeout(timer);
      clearInterval(progressInterval);
      setProgress(0);
    };
  }, [isActive]);

  return (
    <button
      id="myButton"
      disabled={disabled ? true : false}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
        setIsAction(false);
      }}
      className={`border-2 ${!isAction ? color : "bg-charge"} ${
        isActive
          ? "border-charge" && "scale-105"
          : buttonBorder
          ? buttonBorder
          : "border-white"
      } ${propClass} ${
        innerText && "relative"
      } z-10 rounded-lg transition-all animate-in animate-out font-semibold ${
        textColor ? textColor : "text-white"
      }`}
    >
      <div className="relative h-full w-full flex items-center justify-center">
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
          svg && (
            <div
              className="bg-white"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          )
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
          <h3 className="absolute font-bold text-3xl flex text-center items-center justify-center">
            {innerText}
          </h3>
        )}
      </div>
    </button>
  );
};

export default ButtonAnimation;
