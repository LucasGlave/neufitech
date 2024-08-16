"use client";
import Image from "next/image";
import cuerpoHombreFrontal from "../../public/hombreFrente.svg";
import cuerpoMujerFrontal from "../../public/mujerFrente.svg";
import cuerpoHombreEspalda from "../../public/hombreEspalda.svg";
import cuerpoMujerEspalda from "../../public/mujerEspalda.svg";
import flechaAbajo from "../../public/flechaAbajo.png";
import flechaArriba from "../../public/flechaArriba.png";
import flechaDerecha from "../../public/flechaDerecha.png";
import flechaIzquierda from "../../public/flechaIzquierda.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const SensacionCorporal = () => {
    const [sex, setSex] = useState(false);
    const [position, setPosition] = useState(false);

    const navigate = useRouter();

    const handleNavigate = (page: string) => {
        navigate.push(page);
    };
    return (
        <div className="w-full h-full flex">
            <div className="flex flex-row justify-around gap-12 w-full h-screen bg-zinc-900 p-12">
                <div className="relative h-full w-1/2 bg-white rounded-lg flex justify-center items-center">
                    {position ? (
                        <Image
                            src={position && sex ? cuerpoHombreEspalda : cuerpoMujerEspalda}
                            alt="cuerpoHumanoFrontal"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <Image
                            src={sex ? cuerpoHombreFrontal : cuerpoMujerFrontal}
                            alt="cuerpoHumanoEspalda"
                            className="w-full h-full object-contain"
                        />
                    )}

                    <button
                        onClick={() => setSex(!sex)}
                        className="absolute w-36 h-36 top-0 left-0 border bg-neutral-400 rounded-br-md rounded-tl-md font-semibold text-xl text-white"
                    >
                        {sex ? "HOMBRE" : "MUJER"}
                    </button>
                    <button className="absolute w-36 h-36 top-0 right-0 border bg-neutral-400 rounded-bl-md rounded-tr-md font-semibold text-xl text-white">
                        CABEZA
                    </button>
                    <button className="absolute w-36 h-36 left-0 bg-neutral-400 rounded-br-md rounded-tr-md font-semibold text-xl text-white">
                        VIENTRE
                    </button>
                    <button className="absolute w-36 h-36 right-0 bg-neutral-400 rounded-bl-md rounded-tl-md font-semibold text-xl text-white">
                        MANO
                    </button>
                    <button className="absolute w-36 h-36 bottom-0 left-0 border bg-neutral-400 rounded-tr-md rounded-bl-md font-semibold text-xl text-white">
                        PIE
                    </button>
                    <button className="absolute w-36 h-36 bottom-0 right-0 border bg-neutral-400 rounded-tl-md rounded-br-md font-semibold text-xl text-white">
                        VOLVER
                    </button>
                </div>

                <div className="flex flex-col justify-between items-center w-144 bg-zinc-900">
                    <div className="flex flex-row gap-2">
                        <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                            LOCALICACION RAPIDA
                        </button>
                        <button
                            onClick={() => setPosition(!position)}
                            className="w-44 h-28 border rounded-md font-light text-xl text-white"
                        >
                            GIRAR
                        </button>
                        <button
                            onClick={() => handleNavigate("/")}
                            className="w-44 h-28 border rounded-md font-light text-xl text-white"
                        >
                            VOLVER
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <button className="w-44 h-28 "></button>
                            <button className="flex justify-center items-center w-44 h-28 border rounded-md font-light text-xl text-white">
                                <Image
                                    src={flechaArriba}
                                    alt="flechaAbajo"
                                    width={60}
                                    height={60}
                                />
                            </button>
                            <button className="w-44 h-28 "></button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="flex justify-center items-center w-44 h-28 border rounded-md font-light text-xl text-white">
                                <Image
                                    src={flechaIzquierda}
                                    alt="flechaAbajo"
                                    width={60}
                                    height={60}
                                />
                            </button>
                            <button className="flex justify-center items-center w-44 h-28 border rounded-md font-light text-xl text-white">
                                <Image
                                    src={flechaAbajo}
                                    alt="flechaAbajo"
                                    width={60}
                                    height={60}
                                />
                            </button>
                            <button className="flex justify-center items-center w-44 h-28 border rounded-md font-light text-xl text-white">
                                <Image
                                    src={flechaDerecha}
                                    alt="flechaAbajo"
                                    width={60}
                                    height={60}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                DOLOR
                            </button>
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                ADORMECIDO
                            </button>
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                HORMIGUEO
                            </button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                PICOR
                            </button>
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                PRESION
                            </button>
                            <button className="w-44 h-28 border rounded-md font-light text-xl text-white">
                                MOLESTIA
                            </button>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="w-44 h-28 bg-amber-300 rounded-md font-semibold text-xl">
                                LEVE
                            </button>
                            <button className="w-44 h-28 bg-orange-400 rounded-md font-semibold text-xl">
                                MODERADO
                            </button>
                            <button className="w-44 h-28 bg-red-500 rounded-md font-semibold text-xl">
                                FUERTE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensacionCorporal;
