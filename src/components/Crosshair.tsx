import { useState, Dispatch, SetStateAction } from "react";
import ButtonAnimation from "./ButtonAnimation";

type buttonProps = {
  isOff: boolean;
  xDisplacement: number;
  yDisplacement: number;
  setXDisplacement: Dispatch<SetStateAction<number>>;
  setYDisplacement: Dispatch<SetStateAction<number>>;
  setAnimate: Dispatch<SetStateAction<boolean>>;
};

const Crosshair = ({
  isOff,
  xDisplacement,
  yDisplacement,
  setXDisplacement,
  setYDisplacement,
  setAnimate,
}: buttonProps) => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showSVG, setShowSVG] = useState(false);

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
      setShowSVG(true);
    }, 3000);
  };
  return (
    <div className="w-44 h-28">
      <ButtonAnimation
        disabled={isOff ? true : false}
        speakText="Localizacion rapida"
        text="LOCALIZACION RAPIDA"
        propClass="w-44 h-28"
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
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M208.295,444.942v42.773h73.157v-43.138c82.968-15.444,148.265-81.026,163.303-164.14h41.943 v-73.157h-41.943c-15.038-83.115-80.335-148.688-163.303-164.14V0h-73.157v42.773C124.359,57.526,58.119,123.489,42.96,207.279 H1.016v73.157H42.96C58.119,364.225,124.359,430.189,208.295,444.942z M243.857,96.527c81.237,0,147.33,66.093,147.33,147.33 s-66.093,147.33-147.33,147.33s-147.33-66.093-147.33-147.33S162.62,96.527,243.857,96.527z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      )}
    </div>
  );
};

export default Crosshair;
