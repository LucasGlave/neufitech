import React from 'react'

type buttonProps = {
    text?: string
    color?: string
    size?: string
}

const ButtonAnimation = ({text, color, size}: buttonProps) => {
  return (
    <button className={`border p-5 ${color} ${size} rounded-lg absolute top-0 right-0 hover:bg-yellow-300 font-semibold text-xl text-white`}>{text}</button>
  )
}

export default ButtonAnimation