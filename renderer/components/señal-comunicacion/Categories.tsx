"use client";
import ButtonAnimation from "../ButtonAnimation";
import Scroll from "../Scroll";
import { useEffect, useState } from "react";
import ModalNewInteraction from "./ModalNewInteraction";
import InteractiveMap from "./InteractiveMap";
import { arrayModel } from "./mockArray";
import DeletionMap from "./DeletionMap";

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
    let array = JSON.parse(localStorage.getItem("senal-comunicacion"));
    if (!array) {
      localStorage.setItem("senal-comunicacion", JSON.stringify(arrayModel));
    }
  }, [arraySeñales]);

  const changeState = (functionToEjec: string) => {
    setIsAllow(true);
    setEjecFunction(functionToEjec);
  };

  const handleModal = () => {
    setActiveModal(true);
  };

  const toggleDelete = () => {
    setDeleteInteraction(!deleteInteraction);
  };

  useEffect(() => {
    const calculateScrollMax = () => {
      setScrollMax(document.getElementById("ScrollMax").scrollHeight);
    };
    setTimeout(calculateScrollMax, 500);
    window.addEventListener("resize", calculateScrollMax);
    return () => {
      window.removeEventListener("resize", calculateScrollMax);
    };
  }, []);

  return (
    <div
      id="ScrollMax"
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
                svg={
                  !isOff
                    ? '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 341.65"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Ãcono activar eye tracker</title><path class="cls-1" d="M234.5,85.6c-40.7,4.7-70.8,13.2-104,29.5-33.9,16.6-59.8,35-85.5,60.8C23.9,197,11.4,214.6,4,233.5.6,242.2.5,242.9.5,256S.6,269.8,4,278.5c7.5,19.1,20,36.7,41.4,58,59.9,59.6,140.5,92.8,219,90.2,25.8-.9,43.8-3.8,69.3-11.1,75.6-21.8,153-82.7,174.3-137.1,3.4-8.7,3.5-9.4,3.5-22.5s-.1-13.8-3.5-22.5c-4.2-10.6-10.9-22.1-19.9-34.3-7.8-10.5-32.3-35.2-44.1-44.6-58-45.8-123.9-70-189.5-69.4C245.2,85.2,236.2,85.5,234.5,85.6ZM281,130.1c45,5,95.4,26.9,135,58.5,11.7,9.3,30.3,28.2,37.9,38.4,8.7,11.7,14.4,23.2,14.4,29,0,9.9-13.1,29.8-32.3,49.1-21.1,21.1-44.6,37.7-73.5,52-36.1,17.8-69.6,26-106.6,26-38.3,0-72.7-8.7-111.1-28.2A329.64,329.64,0,0,1,96,323.4c-11.3-9-30.1-28-37.3-37.7C49.9,274,43.6,261.6,43.6,256c.1-9.9,13.2-29.8,32.4-49.1,13.7-13.7,23.9-22,41.8-34C168.7,139.1,226.3,123.9,281,130.1Z" transform="translate(-0.5 -85.19)"/><path class="cls-1" d="M243.5,171c-34.6,5.4-61.4,29.6-70.6,63.5-1.8,6.4-2.2,10.8-2.2,21.5s.4,15.1,2.2,21.5c8.3,30.7,30.9,53.4,61.6,61.6,6.3,1.7,10.8,2.2,21.5,2.2s15.2-.5,21.5-2.2c30.7-8.2,53.4-31,61.6-61.6,3.1-11.4,3.1-31.7,0-43-8.3-30.8-31.4-53.8-61.6-61.5C268.2,170.6,252.1,169.7,243.5,171ZM271,216.9c16.8,6.5,28,23.8,26.8,41.4-1.3,18.1-12.8,32.6-30.1,37.9-16.9,5.1-35.7-1.6-46-16.2-16.1-23.1-5.2-55.2,21.8-64C251.3,213.4,263.1,213.8,271,216.9Z" transform="translate(-0.5 -85.19)"/></svg>'
                    : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z" fill="#FFFF"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z" fill="#FFFF"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z" fill="#FFFF"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z" fill="#FFFF"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z" fill="#FFFF"></path> </g></svg>'
                } propClass="w-[200px] h-[80px]"
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
      {!activeModal &&
        <div className="flex w-[15%] pt-[7rem] h-full items-start justify-start flex-col relative">
          <Scroll
            isOff={isOff}
            maxScrollValue={scrollMax}
            addFunction={handleModal}
            deleteFunction={toggleDelete}
          />
        </div>
      }
    </div>
  );
};

export default Categories;
