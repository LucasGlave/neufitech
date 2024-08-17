"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type buttonProps = {
  text?: string
  propClass?: string
  navigation?: string
  imagen?: {
    src: StaticImport,
    width: number,
    height: number
  }
}

const ButtonAnimation = ({ text, propClass, navigation, imagen }: buttonProps) => {
  const navigate = useRouter()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isActive) {
      timer = setTimeout(() => {
        console.log("llegue")
        navigation != null && navigate.push(navigation)
        setIsActive(false)
      }, 1000)
    }
    return (() => clearTimeout(timer))
  }, [isActive])

  return (
    <button onMouseEnter={() => { setIsActive(true) }} onMouseLeave={() => { setIsActive(false) }} className={`border ${isActive && "border-green-400 bg-green-300"} ${propClass} rounded-lg font-semibold text-xl text-white`}>
      {imagen != null ? <Image src={imagen.src} alt='dinamic image' /> : text}
    </button>
  )
}

export default ButtonAnimation