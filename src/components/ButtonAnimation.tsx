"use client"
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type buttonProps = {
  text?: string
  propClass?: string
  color?: string
  navigation?: string
  state?: () => void
  imagen?: {
    src: StaticImport,
    width: number,
    height: number
    add?: string
  }
}

const ButtonAnimation = ({ text, propClass, navigation, imagen, color, state }: buttonProps) => {
  const navigate = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [isAction, setIsAction] = useState(false)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive) {
      timer = setTimeout(() => {
        setIsAction(true)
        state && state()
        navigation != null && navigate.push(navigation)
        setTimeout(() => {
          setIsActive(false)
        }, 1000)
      }, 1000)
    }
    return (() => clearTimeout(timer))
  }, [isActive])

  return (
    <button onMouseEnter={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false); setIsAction(false) }} className={`border-2 ${!isAction ? color : "bg-green-300"} ${isActive && "border-green-400"} ${propClass} rounded-lg font-semibold text-xl text-white`}>
      {imagen != null ? <Image src={imagen.src} width={imagen.width} height={imagen.height} alt='dinamic image' className={`rounded-lg object-cover ${imagen.add && imagen.add}`} /> : text}
    </button>
  )
}

export default ButtonAnimation