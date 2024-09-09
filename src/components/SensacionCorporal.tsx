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
import ButtonAnimation from "./ButtonAnimation";
import Crosshair from "./Crosshair";

const SensacionCorporal = () => {
  const [sex, setSex] = useState(false);
  const [position, setPosition] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [xDisplacement, setXDisplacement] = useState(0);
  const [yDisplacement, setYDisplacement] = useState(0);
  const [animate, setAnimate] = useState(false);

  const changeState = () => {
    setIsOff(!isOff);
  };
  const functionState = (which: string) => {
    which === "sex" ? setSex(!sex) : setPosition(!position);
  };

  const displaceCrosshair = (direction: string) => {
    let displacement = 10;
    switch (direction) {
      case "Arriba":
        setYDisplacement(yDisplacement + displacement);
        break;
      case "Abajo":
        setYDisplacement(yDisplacement - displacement);
        break;
      case "Derecha":
        setXDisplacement(xDisplacement - displacement);
        break;
      case "Izquierda":
        setXDisplacement(xDisplacement + displacement);
        break;
    }
  };
  return (
    <div className="flex flex-row justify-around gap-12 w-full h-screen bg-zinc-900 p-12">
      <div className="h-full w-[10%] flex flex-col justify-between">
        <ButtonAnimation
          speakText="Salir"
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
        {position ? (
          <Image
            src={position && sex ? cuerpoHombreEspalda : cuerpoMujerEspalda}
            alt="cuerpoHumanoFrontal"
            className="w-full h-full object-contain z-5"
          />
        ) : (
          <Image
            src={sex ? cuerpoHombreFrontal : cuerpoMujerFrontal}
            alt="cuerpoHumanoEspalda"
            className="w-full h-full object-contain z-[5]"
          />
        )}
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText={`${sex ? "Hombre" : "Mujer"}`}
          state={() => functionState("sex")}
          text={`${sex ? "MUJER" : "HOMBRE"}`}
          color="bg-white"
          propClass="absolute w-32 h-32 top-0 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Cabeza"
          text="CABEZA"
          color="bg-white"
          propClass="absolute w-32 h-32 top-0 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Vientre"
          text="VIENTRE"
          color="bg-white"
          propClass="absolute w-32 h-32 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Mano"
          text="MANO"
          color="bg-white"
          propClass="absolute w-32 h-32 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Pie"
          text="PIE"
          color="bg-white"
          propClass="absolute w-32 h-32 bottom-0 left-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          speakText="Volver"
          text="VOLVER"
          color="bg-white"
          propClass="absolute w-32 h-32 bottom-0 right-0"
          buttonBorder="border-zinc-900"
          textColor="text-zinc-900"
        />
        <div
          className={`absolute bottom-0 left-0 h-full w-full bg-green-500 transition-all z-[1]
          ${animate ? "animate-grow-bar" : ""}`}
        />
      </div>
      <div className="flex flex-col justify-between gap-2 items-center w-[40%] bg-zinc-900">
        <div className="flex flex-row gap-2">
          {/* <ButtonAnimation
            disabled={isOff ? true : false}
            speakText="Localizacion rapida"
            text="LOCALIZACION RAPIDA"
            propClass="w-44 h-28"
            state={spawnSVG}
          /> */}
          <Crosshair
            isOff={isOff}
            xDisplacement={xDisplacement}
            yDisplacement={yDisplacement}
            animate={animate}
            setAnimate={setAnimate}
            setXDisplacement={setXDisplacement}
            setYDisplacement={setYDisplacement}
          />
          <ButtonAnimation
            disabled={isOff ? true : false}
            state={() => functionState("girar")}
            speakText="Girar"
            text="GIRAR"
            propClass="w-44 h-28"
          />
          <ButtonAnimation
            functionKeyboard={{ funct: "changeIsOff", state: changeState }}
            speakText="Suspender"
            text="SUSPENDER"
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
