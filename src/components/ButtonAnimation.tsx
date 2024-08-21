"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Voice {
  name: string;
  gender: "female" | "male";
}

interface Options {
  text: string;
  volume?: number;
  speed?: number;
  voice?: Voice | string;
}

type buttonProps = {
  text?: string
  propClass?: string
  color?: string
  navigation?: string
  speakText?: string
  innerText?: string
  state?: () => void
  imagen?: {
    src: StaticImport,
    width: number,
    height: number
    add?: string
  }
}

const ButtonAnimation = ({ text, propClass, navigation, imagen, color, speakText, state, innerText }: buttonProps) => {
  const navigate = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [isAction, setIsAction] = useState(false)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive) {
      timer = setTimeout(() => {
        setIsAction(true)
        state && state()
        if (speakText) {
          if (window.electron) {
            window.electron.speak(speakText);
          } else {
            console.log(window)
            const say = require('offline-tts')
            say(speakText, 1, 1, 1, 1);
          }
        }
        navigation != null && navigate.push(navigation)
        setTimeout(() => {
          setIsActive(false)
        }, 1000)
      }, 1000)
    }
    return (() => clearTimeout(timer))
  }, [isActive])

  return (
    <button onMouseEnter={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false); setIsAction(false) }} className={`border-2 ${!isAction ? color : "bg-green-300"} ${isActive && "border-green-400"} ${propClass} ${innerText && "relative"} rounded-lg font-semibold text-xl text-white`}>
      {imagen != null ? <Image src={imagen.src} width={imagen.width} height={imagen.height} alt='dinamic image' className={`rounded-lg object-cover ${imagen.add && imagen.add} ${innerText && "opacity-85 brightness-75"}`} /> : text}
      {innerText && <h3 className='absolute font-bold text-3xl flex text-center items-center justify-center'>{innerText}</h3>}
    </button>
  )
}

export default ButtonAnimation