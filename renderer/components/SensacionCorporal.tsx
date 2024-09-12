"use client";
import Image from "next/image";
import flechaAbajo from "../public/flechaAbajo.png";
import flechaArriba from "../public/flechaArriba.png";
import flechaDerecha from "../public/flechaDerecha.png";
import flechaIzquierda from "../public/flechaIzquierda.png";
import bodyMujer from "../public/frente-body-mujer.svg";
import bodyHombre from "../public/frente-body-hombre.svg";
import { useState } from "react";
import ButtonAnimation from "./ButtonAnimation";
import Crosshair from "./Crosshair";

const SensacionCorporal = () => {
  const [sex, setSex] = useState(false); // false = mujer, true = hombre
  const [position, setPosition] = useState(false); // false = frente, true = espalda
  const [part, setPart] = useState("body"); // Parte del cuerpo seleccionada
  const [isOff, setIsOff] = useState(false);
  const [xDisplacement, setXDisplacement] = useState(0);
  const [yDisplacement, setYDisplacement] = useState(0);
  const [animate, setAnimate] = useState(false);

  const getBodyImage = () => {
    const gender = sex ? "hombre" : "mujer";
    const orientation = position ? "atras" : "frente";
    return require(`../public/${orientation}-${part}-${gender}.svg`).default;
  };

  const changeSex = () => {
    setSex(!sex);
  };

  const changePosition = () => {
    setPosition(!position);
  };
  const changePart = (newPart: string) => {
    setPart(newPart);
  };

  const displaceCrosshair = (direction: string) => {
    let displacement = 10;
    switch (direction) {
      case "Arriba":
        setYDisplacement((prev) => prev + displacement);
        break;
      case "Abajo":
        setYDisplacement((prev) => prev - displacement);
        break;
      case "Derecha":
        setXDisplacement((prev) => prev - displacement);
        break;
      case "Izquierda":
        setXDisplacement((prev) => prev + displacement);
        break;
    }
  };

  return (
    <div className="flex flex-row justify-around gap-12 w-full h-screen bg-zinc-900 p-12">
      <div className="h-full w-[10%] flex flex-col justify-between">
        <ButtonAnimation
          speakText="Volver"
          disabled={isOff ? true : false}
          svg='<svg viewBox="0 0 24 24" id="SVGRoot" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1"> <path d="M 9 2 A 1.0001 1.0001 0 0 0 8 3 L 8 8 A 1 1 0 0 0 9 9 A 1 1 0 0 0 10 8 L 10 4 L 18 4 L 18 20 L 10 20 L 10 16 A 1 1 0 0 0 9 15 A 1 1 0 0 0 8 16 L 8 21 A 1.0001 1.0001 0 0 0 9 22 L 19 22 A 1.0001 1.0001 0 0 0 20 21 L 20 3 A 1.0001 1.0001 0 0 0 19 2 L 9 2 z M 7.0292969 9 A 1 1 0 0 0 6.2929688 9.2929688 L 4.3125 11.273438 L 4.2929688 11.292969 A 1.0001 1.0001 0 0 0 4.2832031 11.302734 A 1 1 0 0 0 4.2363281 11.355469 A 1 1 0 0 0 4.1855469 11.421875 A 1 1 0 0 0 4.1464844 11.482422 A 1.0001 1.0001 0 0 0 4.1289062 11.509766 A 1 1 0 0 0 4.0996094 11.566406 A 1 1 0 0 0 4.0683594 11.638672 A 1.0001 1.0001 0 0 0 4.0644531 11.650391 A 1 1 0 0 0 4.0410156 11.714844 A 1.0001 1.0001 0 0 0 4.0332031 11.75 A 1 1 0 0 0 4.0234375 11.791016 A 1.0001 1.0001 0 0 0 4.015625 11.828125 A 1 1 0 0 0 4.0078125 11.871094 A 1.0001 1.0001 0 0 0 4.0019531 11.943359 A 1.0001 1.0001 0 0 0 4 11.988281 A 1 1 0 0 0 4 12 A 1 1 0 0 0 4.0019531 12.029297 A 1.0001 1.0001 0 0 0 4.0039062 12.066406 A 1 1 0 0 0 4.0078125 12.117188 A 1.0001 1.0001 0 0 0 4.0117188 12.146484 A 1 1 0 0 0 4.0253906 12.222656 A 1 1 0 0 0 4.0410156 12.28125 A 1.0001 1.0001 0 0 0 4.0546875 12.324219 A 1 1 0 0 0 4.0585938 12.337891 A 1.0001 1.0001 0 0 0 4.0878906 12.408203 A 1.0001 1.0001 0 0 0 4.1210938 12.474609 A 1 1 0 0 0 4.1347656 12.501953 A 1.0001 1.0001 0 0 0 4.1640625 12.546875 A 1 1 0 0 0 4.1777344 12.568359 A 1.0001 1.0001 0 0 0 4.2011719 12.601562 A 1 1 0 0 0 4.21875 12.623047 A 1.0001 1.0001 0 0 0 4.265625 12.677734 A 1 1 0 0 0 4.2851562 12.699219 A 1.0001 1.0001 0 0 0 4.2929688 12.707031 A 1 1 0 0 0 4.3339844 12.746094 L 6.2929688 14.707031 A 1 1 0 0 0 7.7070312 14.707031 A 1 1 0 0 0 7.7070312 13.292969 L 7.4140625 13 L 14 13 A 1 1 0 0 0 15 12 A 1 1 0 0 0 14 11 L 7.4140625 11 L 7.7070312 10.707031 A 1 1 0 0 0 7.7070312 9.2929688 A 1 1 0 0 0 7.0292969 9 z " id="path6945" style="color:#FFFFFFF\;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-variant-east-asian:normal;font-feature-settings:normal;font-variation-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#FFFFFFF\;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;shape-margin:0;inline-size:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#FFFFFFF\;solid-opacity:1;vector-effect:none;fill:#FFFFFFF\;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate;stop-color:#FFFFFFF\;stop-opacity:1;opacity:1"></path> </g> </g></svg>'
          navigation="/"
          propClass="w-44 h-28"
        />
        <div className="w-44 h-28" />
        <div className="flex flex-col gap-2">
          <ButtonAnimation
            disabled={isOff ? true : false}
            speakText="Si"
            text="SI"
            propClass="w-44 h-28"
          />
          <ButtonAnimation
            disabled={isOff ? true : false}
            speakText="No"
            text="NO"
            propClass="w-44 h-28"
          />
        </div>
      </div>
      <div className="relative h-full w-[40%] bg-white rounded-lg flex justify-center items-center">
        <Image
          src={getBodyImage()}
          width={part === "body" ? 330 : 450}
          height={part === "body" ? 330 : 450}
          alt="cuerpoHumanoFrontal"
          className="object-contain z-[5]"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText={`${sex ? "Mujer" : "Hombre"}`}
          state={changeSex}
          text={`${sex ? "MUJER" : "HOMBRE"}`}
          color="bg-white"
          propClass="absolute w-32 h-32 top-0 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Cabeza"
          state={() => changePart("cabeza")}
          text="CABEZA"
          color="bg-white"
          propClass="absolute w-32 h-32 top-0 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Vientre"
          state={() => changePart("vientre")}
          text="VIENTRE"
          color="bg-white"
          propClass="absolute w-32 h-32 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Mano"
          state={() => changePart("mano")}
          text="MANO"
          color="bg-white"
          propClass="absolute w-32 h-32 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Pie"
          state={() => changePart("pie")}
          text="PIE"
          color="bg-white"
          propClass="absolute w-32 h-32 bottom-0 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Volver"
          state={() => changePart("body")}
          text="VOLVER"
          color="bg-white"
          propClass="absolute w-32 h-32 bottom-0 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <div
          className={`absolute bottom-0 left-0 h-full w-full  transition-all z-[1] 
            ${animate ? "bg-green-400 animate-grow-bar" : ""}
            `}
        />
      </div>
      <div className="flex flex-col justify-between gap-2 items-center w-[40%] bg-zinc-900">
        <div className="flex flex-row gap-2">
          <Crosshair
            isOff={isOff}
            xDisplacement={xDisplacement}
            yDisplacement={yDisplacement}
            setAnimate={setAnimate}
            setXDisplacement={setXDisplacement}
            setYDisplacement={setYDisplacement}
          />
          <ButtonAnimation
            disabled={isOff ? true : false}
            state={changePosition}
            speakText="Girar"
            text="GIRAR"
            propClass="w-44 h-28"
          />
          <ButtonAnimation
            functionKeyboard={{
              funct: "changeIsOff",
              state: () => setIsOff(!isOff),
            }}
            speakText="Suspender"
            svg={
              !isOff
                ? '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#FFFF"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#FFFF"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#FFFF"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#FFFF"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#FFFF"></path> </g></svg>'
            }
            propClass="w-44 h-28"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div className="w-44 h-28 "></div>
            <ButtonAnimation
              disabled={isOff ? true : false}
              displacementFunction={displaceCrosshair}
              speakText="Arriba"
              propClass="w-44 h-28 flex justify-center items-center"
              imagen={{ src: flechaArriba, width: 60, height: 60 }}
            />
            <div className="w-44 h-28 "></div>
          </div>
          <div className="flex flex-row gap-2">
            <ButtonAnimation
              displacementFunction={displaceCrosshair}
              disabled={isOff ? true : false}
              speakText="Izquierda"
              propClass="w-44 h-28 flex justify-center items-center"
              imagen={{ src: flechaIzquierda, width: 60, height: 60 }}
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              displacementFunction={displaceCrosshair}
              speakText="Abajo"
              propClass="w-44 h-28 flex justify-center items-center"
              imagen={{ src: flechaAbajo, width: 60, height: 60 }}
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              displacementFunction={displaceCrosshair}
              speakText="Derecha"
              propClass="w-44 h-28 flex justify-center items-center"
              imagen={{ src: flechaDerecha, width: 60, height: 60 }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Dolor"
              text="DOLOR"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Adormecido"
              text="ADORMECIDO"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Hormigueo"
              text="HORMIGUEO"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
          </div>
          <div className="flex flex-row gap-2">
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Picor"
              text="PICOR"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Presion"
              text="PRESION"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Molestia"
              text="MOLESTIA"
              color="bg-transparent"
              propClass="w-44 h-28"
            />
          </div>
          <div className="flex flex-row gap-2">
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Leve"
              text="LEVE"
              color="bg-amber-300"
              propClass="w-44 h-28"
              buttonBorder="border-amber-300"
              textColor="text-zinc-900"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Moderado"
              text="MODERADO"
              color="bg-orange-400"
              propClass="w-44 h-28"
              buttonBorder="border-orange-400"
              textColor="text-zinc-900"
            />
            <ButtonAnimation
              disabled={isOff ? true : false}
              speakText="Fuerte"
              text="FUERTE"
              color="bg-red-500"
              propClass="w-44 h-28"
              buttonBorder="border-red-500"
              textColor="text-zinc-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensacionCorporal;
