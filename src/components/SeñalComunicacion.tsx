"use client";
import escucharMusica from "../../public/escucharMusica.jpg";
import descansar from "../../public/descansar.jpg";
import comer from "../../public/comer.jpg";
import pelicula from "../../public/mirarPelicula.jpg";
import leer from "../../public/leer.jpg";
import beberAgua from "../../public/beberAgua.jpg";
import sandwich from "../../public/sandwich.jpg";
import beberJugo from "../../public/jugo.jpg";
import bano from "../../public/bano.jpg";
import lavarManos from "../../public/lavarManos.jpg";
import banarse from "../../public/ducharse.jpg";
import cepillarDientes from "../../public/cepillarDientes.jpg";
import flechaArriba from "../../public/flechaArriba.png";
import flechaAbajo from "../../public/flechaAbajo.png";
import eliminar from "../../public/eliminar.svg";
import ButtonAnimation from "./ButtonAnimation";

const SeñalComunicacion = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen text-white bg-zinc-900">
            <div className="flex justify-center p-6 w-4/5">
                <div className="flex flex-col justify-around gap-8 w-full text-center">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row justify-between items-center w-full">
                            <h3 className="font-semibold text-3xl w-full text-start">COCINA</h3>
                            <ButtonAnimation text="VOLVER" navigation="/" propClass="w-[200px] h-[80px]" />
                        </div>
                        <hr className="bg-white w-full h-[0.5]" />
                    </div>
                    <div className="flex flex-row justify-between w-full h-full">
                        <div className="w-full h-full flex flex-col gap-8">
                            <div className="flex flex-row justify-start gap-8 items-center relative">
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO ESCUCHAR MUSICA
                            <Image
                                src={escucharMusica}
                                className="flex object-contain w-full"
                                alt="escucharMusica"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: escucharMusica, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO DESCANSAR
                            <Image
                                src={descansar}
                                className="flex object-contain w-full"
                                alt="descansar"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: descansar, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO MIRAR UNA PELICULA
                            <Image
                                src={pelicula}
                                className="flex object-contain w-full"
                                alt="pelicula"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: pelicula, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO LEER
                            <Image
                                src={leer}
                                className="flex object-contain w-full"
                                alt="leer"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: leer, width: 250, height: 250, add: "h-full" }} />

                            </div>
                            <div className="flex flex-row justify-start gap-8 items-center relative">
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO COMER
                            <Image
                                src={comer}
                                className="flex object-contain w-full"
                                alt="comer"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: comer, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO TOMAR AGUA
                            <Image
                                src={beberAgua}
                                className="flex object-contain w-full"
                                alt="BeberAgua"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: beberAgua, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO TOMAR JUGO
                            <Image
                                src={beberJugo}
                                className="flex object-contain w-full"
                                alt="BeberJugo"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: beberJugo, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO COMER UN SANDWICH
                            <Image
                                src={sandwich}
                                className="flex object-contain w-full"
                                alt="Sandwich"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: sandwich, width: 250, height: 250, add: "h-full" }} />
                            </div>
                            <div className="flex flex-row justify-start gap-8 items-center relative">
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO IR AL BAÑO
                            <Image
                                src={bano}
                                className="flex object-contain w-full"
                                alt="bano"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: bano, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO CEPILLARME LOS DIENTES
                            <Image
                                src={cepillarDientes}
                                className="flex object-contain w-full"
                                alt="cepillarDientes"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: cepillarDientes, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO BAÑARME
                            <Image
                                src={banarse}
                                className="flex object-contain w-full"
                                alt="banarse"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: banarse, width: 250, height: 250, add: "h-full" }} />
                                {/* <button className="w-[250px] h-[250px]">
                            QUIERO LAVARME LAS MANOS
                            <Image
                                src={lavarManos}
                                className="flex object-contain w-full"
                                alt="lavarManos+"
                            />
                            </button> */}
                                <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: lavarManos, width: 250, height: 250, add: "h-full" }} />
                            </div>
                        </div>
                        <div className="flex gap-8 flex-col">
                            <ButtonAnimation propClass="w-[250px] h-[250px] flex justify-center items-center" imagen={{ src: flechaArriba, width: 200, height: 200 }} />
                            <ButtonAnimation propClass="w-[250px] h-[250px] flex justify-center items-center" imagen={{ src: flechaAbajo, width: 200, height: 200 }} />
                            <ButtonAnimation propClass="w-[250px] h-[250px] flex justify-center items-center" imagen={{ src: eliminar, width: 200, height: 200, add: "invert" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeñalComunicacion;
