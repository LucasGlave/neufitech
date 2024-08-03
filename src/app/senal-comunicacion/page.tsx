"use client";
import React from "react";
import escucharMusica from "../../../public/escucharMusica.jpg";
import descansar from "../../../public/descansar.jpg";
import comer from "../../../public/comer.jpg";
import pelicula from "../../../public/mirarPelicula.jpg";
// import serie from "../../../public/mirarSerie.jpg";
import leer from "../../../public/leer.jpg";
import beberAgua from "../../../public/beberAgua.jpg";
import sandwich from "../../../public/sandwich.jpg";
import beberJugo from "../../../public/jugo.jpg";
import bano from "../../../public/bano.jpg";
import lavarManos from "../../../public/lavarManos.jpg";
import banarse from "../../../public/ducharse.jpg";
import cepillarDientes from "../../../public/cepillarDientes.jpg";
import flechaDerecha from "../../../public/flecha-derecha.png";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
// import { useRouter } from "next/navigation";

const page = () => {
//   const navigate = useRouter();

//   const handleNavigate = (page: string) => {
//     navigate.push(page);
//   };
  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-50">
      <div className="flex justify-center p-6 w-4/5">
        <div className="flex flex-col justify-around gap-2 w-full text-center">
          <h3 className="font-semibold">ACTIVIDADES</h3>
          <div className="flex flex-row justify-around gap-8 items-center relative">
            <button className="w-[250px] h-[250px]">
              QUIERO ESCUCHAR MUSICA
              <Image
                src={escucharMusica}
                className="flex object-contain w-full"
                alt="escucharMusica"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO DESCANSAR
              <Image
                src={descansar}
                className="flex object-contain w-full"
                alt="descansar"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO MIRAR UNA PELICULA
              <Image
                src={pelicula}
                className="flex object-contain w-full"
                alt="pelicula"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO LEER
              <Image
                src={leer}
                className="flex object-contain w-full"
                alt="leer"
              />
            </button>
            {/* <button className='w-[250px] h-[250px]'>
                QUIERO MIRAR UNA SERIE
              <Image src={serie} className='flex object-contain w-full' alt="serie" />
            </button> */}
            {/* <button className="absolute right-0 top-[35%]">
              <Image
                src={flechaDerecha}
                alt="flechaDerecha"
                width={100}
                height={100}
              />
            </button> */}
          </div>
          {/* <div className="flex flex-col justify-around gap-4 w-full"> */}
           <h3 className="font-semibold">COCINA</h3>
            <div className="flex flex-row justify-around gap-8 items-center relative">
            <button className="w-[250px] h-[250px]">
              QUIERO COMER
              <Image
                src={comer}
                className="flex object-contain w-full"
                alt="comer"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO TOMAR AGUA
              <Image
                src={beberAgua}
                className="flex object-contain w-full"
                alt="BeberAgua"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO TOMAR JUGO
              <Image
                src={beberJugo}
                className="flex object-contain w-full"
                alt="BeberJugo"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO COMER UN SANDWICH
              <Image
                src={sandwich}
                className="flex object-contain w-full"
                alt="Sandwich"
              />
            </button>
            {/* <button className="absolute right-0 top-[35%]">
              <Image
                src={flechaDerecha}
                alt="flechaDerecha"
                width={100}
                height={100}
              />
            </button> */}
          </div>
          {/* </div> */}
          {/* <div className="flex flex-col justify-around gap-4 w-full"> */}
           <h3 className="font-semibold">BAÑO</h3>
            <div className="flex flex-row justify-around gap-8 items-center relative">
            <button className="w-[250px] h-[250px]">
              QUIERO IR AL BAÑO
              <Image
                src={bano}
                className="flex object-contain w-full"
                alt="bano"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO CEPILLARME LOS DIENTES
              <Image
                src={cepillarDientes}
                className="flex object-contain w-full"
                alt="cepillarDientes"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO BAÑARME
              <Image
                src={banarse}
                className="flex object-contain w-full"
                alt="banarse"
              />
            </button>
            <button className="w-[250px] h-[250px]">
              QUIERO LAVARME LAS MANOS
              <Image
                src={lavarManos}
                className="flex object-contain w-full"
                alt="lavarManos+"
              />
            </button>

            {/* <button className="absolute right-0 top-[35%]">
              <Image
                src={flechaDerecha}
                alt="flechaDerecha"
                width={100}
                height={100}
              />
            </button> */}
          </div>
         {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
