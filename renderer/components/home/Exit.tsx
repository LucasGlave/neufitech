import { useState } from "react";
import ButtonAnimation from "../ButtonAnimation"

type ExitProps = {
    state?: (functionToEjec: string) => void
}

const Exit = ({ state }: ExitProps) => {
    return (
        <div className="absolute items-center justify-center gap-5 flex flex-col h-screen w-screen px-16 py-8 backdrop-blur-sm z-50 bg-[#000000af]">
            <div className="bg-[#576280] items-center justify-center flex flex-col gap-10 w-[50%] h-[50%] rounded-lg p-8 border text-white font-bold text-2xl">
                <h3>DESEA SALIR DE LA APLICACION?</h3>
                <div className="flex gap-8">
                    <ButtonAnimation
                        speakText="Cerrar"
                        propClass="w-[150px] h-[80px] bg-keybackground"
                        text="SI"
                        execute={() => window.ipc.send('close', null)}
                    />
                    <ButtonAnimation
                        functionKeyboard={{ funct: "showExit", state: state }}
                        speakText="Cerrar"
                        propClass="w-[150px] h-[80px] bg-keybackground"
                        text="NO"
                    />
                </div>
            </div>
        </div>
    )
}

export default Exit