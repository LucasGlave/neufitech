"use client";
import ButtonAnimation from "../ButtonAnimation";
import Scroll from "../Scroll";
import { useEffect, useState } from "react";
import ModalNewInteraction from "./ModalNewInteraction";
import InteractiveMap from "./InteractiveMap";
import { arrayModel } from "./mockArray";
import DeletionMap from "./DeletionMap";
import eliminar from "../../public/eliminar.svg";
import plus from "../../public/plus.svg";

const Categories = () => {
  const [isAllow, setIsAllow] = useState(false);
  const [ejecFunction, setEjecFunction] = useState("");
  const [isOff, setIsOff] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [screenType, setScreenType] = useState("CATEGORIAS");
  const [arraySeñales, setArraySeñales] = useState([]);
  const [deleteInteraction, setDeleteInteraction] = useState(false);
  const [scrollMax, setScrollMax] = useState(0);

  useEffect(() => {
    let array = JSON.parse(localStorage.getItem("senal-comunicacion"));
    if (array) {
      setArraySeñales(array);
    }
  }, []);

  useEffect(() => {
    let array = localStorage.getItem("senal-comunicacion");
    if (!array) {
      localStorage.setItem("senal-comunicacion", JSON.stringify(arrayModel));
    }
  }, [arraySeñales]);

  const changeState = (functionToEjec: string) => {
    setIsAllow(true);
    setEjecFunction(functionToEjec);
  };

  const functionAction = () => {
    ejecFunction === "closeModal" && setActiveModal(false);
  };

  const handleModal = () => {
    setActiveModal(true);
  };

  const toggleDelete = () => {
    setDeleteInteraction(!deleteInteraction);
  };

  useEffect(() => {
    const calculateScrollMax = () => {
      setScrollMax(innerHeight);
    };
    setTimeout(calculateScrollMax, 500);
    window.addEventListener("resize", calculateScrollMax);
    return () => {
      window.removeEventListener("resize", calculateScrollMax);
    };
  }, []);

  return (
    <div
      id="scrollMax"
      className="flex items-start justify-center p-8 w-full min-h-screen text-white bg-zinc-900"
    >
      {activeModal && (
        <ModalNewInteraction
          state={changeState}
          category={screenType}
          setActiveModal={setActiveModal}
          setArraySeñales={setArraySeñales}
        />
      )}
      <div className="flex justify-start w-[85%]">
        <div className="flex flex-col justify-around gap-8 w-full text-center">
          <div className="flex flex-col relative w-full gap-8">
            <div className="flex flex-row items-center justify-between w-full">
              {screenType == "CATEGORIAS" ? (
                <ButtonAnimation
                  disabled={isOff ? true : false}
                  speakText="Volver"
                  text="VOLVER"
                  navigation="/"
                  propClass="w-[200px] h-[80px]"
                />
              ) : (
                <ButtonAnimation
                  disabled={isOff ? true : false}
                  speakText="Volver"
                  text="VOLVER"
                  titleSetter={setScreenType}
                  propClass="w-[200px] h-[80px]"
                />
              )}
              <h3 className="font-semibold text-3xl w-full text-center">
                {screenType}
              </h3>
              <ButtonAnimation
                state={() => setIsOff(!isOff)}
                speakText="Suspender"
                svg='<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
                propClass="w-[200px] h-[80px]"
              />
            </div>
            <hr className="bg-white w-full h-[0.5]" />
          </div>
          {!deleteInteraction ? (
            <InteractiveMap
              array={arraySeñales}
              disableState={isOff}
              pageTitle={screenType}
              setPageTitle={setScreenType}
            />
          ) : (
            <DeletionMap
              array={arraySeñales}
              disableState={isOff}
              pageTitle={screenType}
              setPageTitle={setScreenType}
              setArraySeñales={setArraySeñales}
              setDeleteInteraction={setDeleteInteraction}
            />
          )}
        </div>
      </div>
      <div className="flex w-[15%] pt-[7rem] h-full items-start justify-start flex-col relative">
        <div className="fixed flex flex-col justify-center items-center gap-8">
          <Scroll
            maxScrollValue={scrollMax}
            addFunction={handleModal}
            deleteFunction={toggleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
