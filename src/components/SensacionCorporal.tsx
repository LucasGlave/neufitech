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
                <ButtonAnimation text="SUSPENDER" propClass=" w-44 h-28" />
                <div className="flex flex-col gap-2">
                    <ButtonAnimation text="SI" propClass="w-44 h-28" />
                    <ButtonAnimation text="NO" propClass=" w-44 h-28" />
                </div>
                <ButtonAnimation text="SALIR" propClass=" w-44 h-28" />
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
                <ButtonAnimation state={() => functionState("sex")} text={`${sex ? "HOMBRE" : "MUJER"}`} color="bg-black" propClass="absolute w-36 h-36 top-0 left-0" />
                <ButtonAnimation text="CABEZA" color="bg-black" propClass="absolute w-36 h-36 top-0 right-0" />
                <ButtonAnimation text="VIENTRE" color="bg-black" propClass="absolute w-36 h-36 left-0" />
                <ButtonAnimation text="MANO" color="bg-black" propClass="absolute w-36 h-36 right-0" />
                <ButtonAnimation text="PIE" color="bg-black" propClass="absolute w-36 h-36 bottom-0 left-0" />
                <ButtonAnimation text="VOLVER" color="bg-black" propClass="absolute w-36 h-36 bottom-0 right-0" />
            </div>
            <div className="flex flex-col justify-between gap-2 items-center w-[40%] bg-zinc-900">
                <div className="flex flex-row gap-2">
                    <ButtonAnimation text="LOCALIZACION RAPIDA" propClass=" w-44 h-28" />
                    <ButtonAnimation state={() => functionState("girar")} text="GIRAR" propClass="w-44 h-28" />
                    <ButtonAnimation text="VOLVER" navigation="/" propClass=" w-44 h-28" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <div className="w-44 h-28 "></div>
                        <ButtonAnimation propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaArriba, width: 60, height: 60 }} />
                        <div className="w-44 h-28 "></div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaIzquierda, width: 60, height: 60 }} />
                        <ButtonAnimation propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaAbajo, width: 60, height: 60 }} />
                        <ButtonAnimation propClass="w-44 h-28 flex justify-center items-center" imagen={{ src: flechaDerecha, width: 60, height: 60 }} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation text="DOLOR" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation text="ADORMECIDO" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation text="HORMIGUEO" color="bg-transparent" propClass="w-44 h-28" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation text="PICOR" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation text="PRESION" color="bg-transparent" propClass="w-44 h-28" />
                        <ButtonAnimation text="MOLESTIA" color="bg-transparent" propClass="w-44 h-28" />
                    </div>
                    <div className="flex flex-row gap-2">
                        <ButtonAnimation text="LEVE" color="bg-amber-300" propClass="w-44 h-28" />
                        <ButtonAnimation text="MODERADO" color="bg-orange-400" propClass="w-44 h-28" />
                        <ButtonAnimation text="FUERTE" color="bg-red-500" propClass="w-44 h-28" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SensacionCorporal;
