import { useState } from "react";
import ButtonAnimation from "../ButtonAnimation"

type ModalConfigProps = {
    closeModal: () => void,
    configuration: {
        volume: number,
        activation: number,
        voices: string
    }
}

const ModalConfig = ({ configuration, closeModal }: ModalConfigProps) => {
    const [config, setConfig] = useState({
        volume: configuration.volume,
        activation: configuration.activation,
        voices: configuration.voices
    })

    const handleSaveText = () => {
        localStorage.setItem('config', JSON.stringify(config));
    };

    const changeState = (functionToEjec: string) => {
        console.log(functionToEjec)
        functionToEjec === "saveConfig" && handleSaveText()
        functionToEjec === "closeModal" && closeModal()
    }

    return (
        <div className="absolute items-center justify-start gap-5 flex flex-col h-screen w-screen px-16 py-8 backdrop-blur-sm z-50 bg-[#000000af]">
            <div className="w-full">
                <ButtonAnimation
                    functionKeyboard={{ funct: "closeModal", state: changeState }}
                    speakText="Cerrar"
                    propClass="w-[150px] h-[80px] bg-keybackground"
                    text="CERRAR"
                />
            </div>
            <div className="bg-[#576280] flex flex-col gap-10 w-full rounded-lg p-8 border text-white font-bold text-2xl">
                <div className="mt-3 flex flex-col gap-8">
                    <div className="flex flex-col justify-between items-center gap-8 px-20">
                        <h3>VOLUMEN</h3>
                        <div className="flex w-full justify-between">
                            <ButtonAnimation
                                text="1"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="2"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="3"
                                buttonBorder="border-green-400 border-4"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="4"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="5"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="flex flex-col justify-between items-center gap-8 py-5 px-20">
                        <h3>TIEMPO DE ACTIVACION DE BOTONES</h3>
                        <div className="flex w-full justify-between">
                            <ButtonAnimation
                                text="1"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="2"
                                buttonBorder="border-green-400 border-4"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="3"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="4"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="5"
                                propClass="w-[120px] h-[100px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="flex flex-col justify-between items-center gap-8 px-20">
                        <h3>VOCES</h3>
                        <div className="flex w-full justify-around">
                            <ButtonAnimation
                                text="HOMBRE"
                                propClass="w-[180px] h-[100px] shadow-xl"
                            />
                            <ButtonAnimation
                                text="MUJER"
                                buttonBorder="border-green-400 border-4"
                                propClass="w-[180px] h-[100px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="w-full flex justify-between gap-2">
                        <ButtonAnimation
                            text="CANCELAR"
                            buttonBorder="border-red-200"
                            propClass="w-[180px] h-[100px] shadow-xl"
                        />
                        <ButtonAnimation
                            text="GUARDAR"
                            functionKeyboard={{ funct: "saveConfig", state: changeState }}
                            buttonBorder="border-green-200"
                            propClass="w-[180px] h-[100px] shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfig