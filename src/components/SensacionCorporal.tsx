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
import ButtonAnimation from "./ButtonAnimation";

const SensacionCorporal = () => {
    const [sex, setSex] = useState(false);
    const [position, setPosition] = useState(false);
    const functionState = (wich: string) => {
        wich === "sex" ? setSex(!sex) : setPosition(!position)
    }
    return (
        <div className="flex flex-row justify-around gap-12 w-full h-screen bg-zinc-900 p-12">
            <div className="h-full w-[10%] flex flex-col justify-between">
                <ButtonAnimation speakText="Suspender" text="SUSPENDER" propClass=" w-44 h-28" />
                <div className="flex flex-col gap-2">
                    <ButtonAnimation speakText="Si" text="SI" propClass="w-44 h-28" />
                    <ButtonAnimation speakText="No" text="NO" propClass=" w-44 h-28" />
                </div>
                <ButtonAnimation speakText="Salir" navigation="/" text="SALIR" propClass=" w-44 h-28" />
            </div>
            <div className="relative h-full w-[40%] bg-white rounded-lg flex justify-center items-center">
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
                <ButtonAnimation speakText={`${sex ? "Hombre" : "Mujer"}`} state={() => functionState("sex")} text={`${sex ? "HOMBRE" : "MUJER"}`} color="bg-white" propClass="absolute w-32 h-32 top-0 left-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
                <ButtonAnimation speakText="Cabeza" text="CABEZA" color="bg-white" propClass="absolute w-32 h-32 top-0 right-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
                <ButtonAnimation speakText="Vientre" text="VIENTRE" color="bg-white" propClass="absolute w-32 h-32 left-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
                <ButtonAnimation speakText="Mano" text="MANO" color="bg-white" propClass="absolute w-32 h-32 right-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
                <ButtonAnimation speakText="Pie" text="PIE" color="bg-white" propClass="absolute w-32 h-32 bottom-0 left-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
                <ButtonAnimation speakText="Volver" text="VOLVER" color="bg-white" propClass="absolute w-32 h-32 bottom-0 right-0" buttonBorder="border-zinc-900" textColor="text-zinc-900" />
            </div>
            <div className="flex flex-col justify-between gap-2 items-center w-[40%] bg-zinc-900">
                <div className="flex flex-row gap-2">
                    <ButtonAnimation speakText="Localizacion rapida" text="LOCALIZACION RAPIDA" propClass=" w-44 h-28" />
                    <ButtonAnimation state={() => functionState("girar")} speakText="Girar" text="GIRAR" propClass="w-44 h-28" />
                    {/* <ButtonAnimation text="VOLVER" speakText="Volver" navigation="/" propClass=" w-44 h-28" /> */}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <div className="w-44 h-28 "></div>
                        <ButtonAnimation speakText="Arriba" propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaArriba, width: 60, height: 60 }} />
                        <div className="w-44 h-28 "></div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation speakText="Izquierda" propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaIzquierda, width: 60, height: 60 }} />
                        <ButtonAnimation speakText="Abajo" propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaAbajo, width: 60, height: 60 }} />
                        <ButtonAnimation speakText="Derecha" propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaDerecha, width: 60, height: 60 }} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation speakText="Dolor" text="DOLOR" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation speakText="Adormecido" text="ADORMECIDO" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation speakText="Hormigueo" text="HORMIGUEO" color="bg-transparent" propClass="w-44 h-28" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation speakText="Picor" text="PICOR" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation speakText="Presion" text="PRESION" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation speakText="Molestia" text="MOLESTIA" color="bg-transparent" propClass="w-44 h-28" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation speakText="Leve" text="LEVE" color="bg-amber-300" propClass="w-44 h-28" buttonBorder="border-amber-300" textColor="text-zinc-900" />
                        <ButtonAnimation speakText="Moderado" text="MODERADO" color="bg-orange-400" propClass="w-44 h-28" buttonBorder="border-orange-400" textColor="text-zinc-900" />
                        <ButtonAnimation speakText="Fuerte" text="FUERTE" color="bg-red-500" propClass="w-44 h-28" buttonBorder="border-red-500" textColor="text-zinc-900" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensacionCorporal;
