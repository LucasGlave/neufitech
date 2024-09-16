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

    const handleSaveConfig = () => {
        localStorage.setItem('config', JSON.stringify(config));
    };
    const handleCancelConfig = () => {
        setConfig(JSON.parse(localStorage.getItem('config')))
    };

    const changeState = (functionToEjec: string) => {
        const [action, value] = functionToEjec.split(" ");

        switch (action) {
            case "volume":
                setConfig((prev) => ({
                    ...prev,
                    volume: Number(value),
                }));
                break;
            case "activation":
                setConfig((prev) => ({
                    ...prev,
                    activation: Number(value),
                }));
                break;
            case "voices":
                setConfig((prev) => ({
                    ...prev,
                    voices: value,
                }));
                break;
            case "saveConfig":
                handleSaveConfig();
                break;
            case "cancelConfig":
                handleCancelConfig();
                break;
            case "closeModal":
                closeModal();
                break;
            default:
                console.warn(`Unknown action: ${action}`);
                break;
        }
    }

    return (
        <div className="absolute items-center justify-start gap-5 flex flex-col h-screen w-screen px-16 py-8 backdrop-blur-sm z-50 bg-[#000000af]">
            <div className="w-full">
                <ButtonAnimation
                    functionKeyboard={{ funct: "closeModal", state: changeState }}
                    speakText="Cerrar"
                    propClass="w-[150px] h-[60px] bg-keybackground"
                    text="CERRAR"
                />
            </div>
            <div className="bg-[#576280] h-[90%] flex flex-col gap-10 w-full rounded-lg p-8 border text-white font-bold text-2xl">
                <div className="mt-3 flex flex-col gap-8">
                    <div className="flex flex-col justify-between items-center gap-8 px-20">
                        <h3>VOLUMEN</h3>
                        <div className="flex w-full justify-around">
                            <ButtonAnimation
                                functionKeyboard={{ funct: "volume 1", state: changeState }}
                                text="1"
                                disabled={config.volume === 1}
                                buttonBorder={`${config.volume === 1 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "volume 2", state: changeState }}
                                text="2"
                                disabled={config.volume === 2}
                                buttonBorder={`${config.volume === 2 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "volume 3", state: changeState }}
                                text="3"
                                disabled={config.volume === 3}
                                buttonBorder={`${config.volume === 3 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "volume 4", state: changeState }}
                                text="4"
                                disabled={config.volume === 4}
                                buttonBorder={`${config.volume === 4 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "volume 5", state: changeState }}
                                text="5"
                                disabled={config.volume === 5}
                                buttonBorder={`${config.volume === 5 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="flex flex-col justify-between items-center gap-8 py-5 px-20">
                        <h3>TIEMPO DE ACTIVACION DE BOTONES</h3>
                        <div className="flex w-full justify-around">
                            <ButtonAnimation
                                functionKeyboard={{ funct: "activation 1", state: changeState }}
                                text="1"
                                disabled={config.activation === 1}
                                buttonBorder={`${config.activation === 1 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "activation 2", state: changeState }}
                                text="2"
                                disabled={config.activation === 2}
                                buttonBorder={`${config.activation === 2 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "activation 3", state: changeState }}
                                text="3"
                                disabled={config.activation === 3}
                                buttonBorder={`${config.activation === 3 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "activation 4", state: changeState }}
                                text="4"
                                disabled={config.activation === 4}
                                buttonBorder={`${config.activation === 4 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "activation 5", state: changeState }}
                                text="5"
                                disabled={config.activation === 5}
                                buttonBorder={`${config.activation === 5 && "border-green-400 border-4"}`}
                                propClass="w-[120px] h-[80px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="flex flex-col justify-between items-center gap-8 px-20">
                        <h3>VOCES</h3>
                        <div className="flex w-full justify-around">
                            <ButtonAnimation
                                functionKeyboard={{ funct: "voices hombre", state: changeState }}
                                text="HOMBRE"
                                disabled={config.voices === "hombre"}
                                buttonBorder={`${config.voices === "hombre" && "border-green-400 border-4"}`}
                                propClass="w-[180px] h-[80px] shadow-xl"
                            />
                            <ButtonAnimation
                                functionKeyboard={{ funct: "voices mujer", state: changeState }}
                                text="MUJER"
                                disabled={config.voices === "mujer"}
                                buttonBorder={`${config.voices === "mujer" && "border-green-400 border-4"}`}
                                propClass="w-[180px] h-[80px] shadow-xl"
                            />
                        </div>
                    </div>
                    <hr className="h-[1px] w-full bg-white" />
                    <div className="w-full flex justify-between gap-2">
                        <ButtonAnimation
                            text="CANCELAR"
                            functionKeyboard={{ funct: "cancelConfig", state: changeState }}
                            buttonBorder="border-red-200"
                            propClass="w-[180px] h-[80px] shadow-xl"
                        />
                        <ButtonAnimation
                            text="GUARDAR"
                            functionKeyboard={{ funct: "saveConfig", state: changeState }}
                            buttonBorder="border-green-200"
                            propClass="w-[180px] h-[80px] shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfig