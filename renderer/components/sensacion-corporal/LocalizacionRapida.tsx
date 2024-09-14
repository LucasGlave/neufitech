import { useState, Dispatch, SetStateAction } from "react";
import ButtonAnimation from "../ButtonAnimation";
import flechaArriba from "../../public/flechaArriba.png"
import flechaAbajo from "../../public/flechaAbajo.png"
import flechaIzquierda from "../../public/flechaIzquierda.png"
import flechaDerecha from "../../public/flechaDerecha.png"

type buttonProps = {
  isOff: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>;
};

const LocalizacionRapida = ({ isOff, setAnimate }: buttonProps) => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showSVG, setShowSVG] = useState(false);
  const [xDisplacement, setXDisplacement] = useState(0);
  const [yDisplacement, setYDisplacement] = useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };
  const spawnSVG = () => {
    setXDisplacement(0);
    setYDisplacement(0);
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 10);
    setShowSVG(false);
    window.addEventListener("mousemove", handleMouseMove);
    setTimeout(() => {
      window.removeEventListener("mousemove", handleMouseMove);
      setAnimate(false);
      setShowSVG(true);
    }, 3000);
  };
  const hideSVG = () => {
    setShowSVG(false);
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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-2 w-full">
        <div className="w-full h-28">
          <ButtonAnimation
            disabled={isOff ? true : false}
            speakText="Localizacion rapida"
            text="LOCALIZACION RAPIDA"
            propClass="w-full h-28"
            state={spawnSVG}
          />
          {showSVG && mousePosition && (
            <svg
              className="absolute z-[7]"
              height="40px"
              width="40px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 487.715 487.715"
              fill="#bc2929"
              stroke="#bc2929"
              style={{
                top: `${mousePosition.y - 20 - yDisplacement}px`,
                left: `${mousePosition.x - 20 - xDisplacement}px`,
              }}
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="M208.295,444.942v42.773h73.157v-43.138c82.968-15.444,148.265-81.026,163.303-164.14h41.943 v-73.157h-41.943c-15.038-83.115-80.335-148.688-163.303-164.14V0h-73.157v42.773C124.359,57.526,58.119,123.489,42.96,207.279 H1.016v73.157H42.96C58.119,364.225,124.359,430.189,208.295,444.942z M243.857,96.527c81.237,0,147.33,66.093,147.33,147.33 s-66.093,147.33-147.33,147.33s-147.33-66.093-147.33-147.33S162.62,96.527,243.857,96.527z"></path>
                  </g>
                </g>
              </g>
            </svg>
          )}
        </div>
        <ButtonAnimation
          disabled={isOff ? true : false}
          displacementFunction={displaceCrosshair}
          speakText="Arriba"
          propClass="w-full h-28 flex justify-center items-center"
          imagen={{ src: flechaArriba, width: 60, height: 60 }}
        />
        <ButtonAnimation
          disabled={showSVG ? (isOff ? true : false) : true}
          speakText="Borrar localizacion"
          text="BORRAR LOCALIZACION"
          propClass={`w-full h-28 ${showSVG ? "" : "text-gray-400 border-gray-500"
            }`}
          state={hideSVG}
        />
      </div>
      <div className="flex flex-row gap-2 ">
        <ButtonAnimation
          displacementFunction={displaceCrosshair}
          disabled={isOff ? true : false}
          speakText="Izquierda"
          propClass="w-full h-28 flex justify-center items-center"
          imagen={{
            src: flechaIzquierda,
            width: 60,
            height: 60,
          }}
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          displacementFunction={displaceCrosshair}
          speakText="Abajo"
          propClass="w-full h-28 flex justify-center items-center"
          imagen={{ src: flechaAbajo, width: 60, height: 60 }}
        />
        <ButtonAnimation
          disabled={isOff ? true : false}
          displacementFunction={displaceCrosshair}
          speakText="Derecha"
          propClass="w-full h-28 flex justify-center items-center"
          imagen={{ src: flechaDerecha, width: 60, height: 60 }}
        />
      </div>
    </div>
  );
};

export default LocalizacionRapida;
