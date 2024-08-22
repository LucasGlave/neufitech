"use client";
import escucharMusica from "../../../public/escucharMusica.jpg";
import flechaArriba from "../../../public/flechaArriba.png";
import flechaAbajo from "../../../public/flechaAbajo.png";
import eliminar from "../../../public/eliminar.svg";
import ButtonAnimation from "../ButtonAnimation";
import { useParams } from "next/navigation";
import { mockActivities } from "./mockArray";

const Activities = () => {
  const params = useParams();
  const categoria = params.categoria
    .toString()
    .toUpperCase()
    .replace("%C3%B1", "Ñ");

  return (
    <div className="flex justify-center items-center w-full min-h-screen text-white bg-zinc-900">
      <div className="flex justify-center p-6 w-4/5">
        <div className="flex flex-col justify-around gap-8 w-full text-center">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between items-center w-full">
              <h3 className="font-semibold text-3xl w-full text-start">
                {categoria}
              </h3>
              <ButtonAnimation
                speakText="Volver"
                text="VOLVER"
                navigation="/senal-comunicacion"
                propClass="w-[200px] h-[80px]"
              />
            </div>
            <hr className="bg-white w-full h-[0.5]" />
          </div>
          <div className="flex flex-row justify-between gap-8 w-full h-full">
            <div className="w-full h-full flex flex-col gap-8">
              <div className="flex flex-row justify-start gap-8 items-center relative">
                {/* <ButtonAnimation propClass="w-[250px] h-[250px]" imagen={{ src: escucharMusica, width: 250, height: 250, add: "h-full" }} /> */}
                {Object.entries(mockActivities[0]).map(
                  ([activity, actions], i) =>
                    activity === categoria ? (
                      <div key={i} className="w-full flex">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                          {actions.map((action, index) => (
                            <ButtonAnimation
                              key={index}
                              propClass="w-full h-[400px] flex items-center justify-center"
                              innerText={`${Object.keys(action)[0]}`}
                              imagen={{
                                src: Object.values(action)[0],
                                width: 400,
                                height: 400,
                                add: "h-full w-full object-cover",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null
                )}
              </div>
            </div>
            <div className="flex gap-8 flex-col">
              <ButtonAnimation
                propClass="w-[250px] h-[250px] flex justify-center items-center"
                imagen={{ src: flechaArriba, width: 200, height: 200 }}
              />
              <ButtonAnimation
                propClass="w-[250px] h-[250px] flex justify-center items-center"
                imagen={{ src: flechaAbajo, width: 200, height: 200 }}
              />
              <ButtonAnimation
                propClass="w-[250px] h-[250px] flex justify-center items-center"
                imagen={{
                  src: eliminar,
                  width: 200,
                  height: 200,
                  add: "invert",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
