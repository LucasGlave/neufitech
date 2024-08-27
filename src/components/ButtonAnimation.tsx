"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type buttonProps = {
  text?: string;
  propClass?: string;
  color?: string;
  navigation?: string;
  speakText?: string;
  innerText?: string;
  disabled?: boolean;
  svg?: string;
  state?: () => void;
  functionKeyboard?: {
    funct: string;
    state: (functionToEjec: string) => void;
  };
  imagen?: {
    src: StaticImport;
    width: number;
    height: number;
    add?: string;
  };
  keyCombination?: string[];
  keyPress?: string;
};

const ButtonAnimation = ({
  text,
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
      timer = setTimeout(() => {
        setIsAction(true);
        state && state();
        functionKeyboard?.state(functionKeyboard.funct);
        navigation != null && navigate.push(navigation);
        if (keyCombination) {
          if (window.electronAPI) {
            window.electronAPI.sendKeyCombination(keyCombination);
          } else {
            console.log("No se puede usar keySender");
          }
        } else if (keyPress) {
          if (window.electronAPI) {
            window.electronAPI.sendKey(keyPress);
          } else {
            console.log("No se puede usar keySender");
          }
        }
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
      disabled={disabled ? true : false}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
        setIsAction(false);
      }}
      className={`border-2 ${!isAction ? color : "bg-green-400"} ${
        isActive && "border-green-400"
      } ${propClass} ${
        innerText && "relative"
      } rounded-lg font-semibold text-xl text-white`}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        {imagen != null ? (
          <Image
            src={imagen.src}
            width={imagen.width}
            height={imagen.height}
            alt="dinamic image"
            className={`rounded-lg object-cover relative  ${
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
        {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
        {isActive && (
          <div
            className="absolute top-0 left-0 h-4 bg-green-400"
            style={{
              width: `${100 - progress}%`,
              right: 0,
              transition: "width 0.1s linear",
            }}
          ></div>
        )}
        {isActive && (
          <div
            className="absolute bottom-0 left-0 h-4 bg-green-400"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          ></div>
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
