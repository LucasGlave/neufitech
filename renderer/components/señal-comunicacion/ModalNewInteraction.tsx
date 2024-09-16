import React from "react";
import ButtonAnimation from "../ButtonAnimation";
import { useState, useEffect } from "react";
import ImagesMapper from "./ImagesMapper";
import ModalKeyboard from "./ModalKeyboard";

const ModalNewInteraction = ({ state }) => {
  const [interactionText, setInteractionText] = useState("");
  const [images, setImages] = useState([]);
  const [imageRoute, setImageRoute] = useState("");
  const [step, setStep] = useState("title");

  useEffect(() => {
    window.ipc
      .getImages()
      .then((imageFiles) => {
        setImages(imageFiles);
      })
      .catch((err) => {
        console.error("Failed to fetch images:", err);
      });
  }, []);

  const handleKeyboard = () => {
    setStep("image");
  };

  const handleImage = () => {
    setStep("check");
  };

  const handleReset = () => {
    setStep("title");
  };

  return (
    <div className="absolute items-center justify-start gap-5 flex flex-col h-screen w-screen p-16 backdrop-blur-sm z-50 bg-[#000000af]">
      <div className="w-full">
        <ButtonAnimation
          functionKeyboard={{ funct: "closeModal", state: state }}
          speakText="Cerrar"
          propClass="w-[150px] h-[80px] bg-keybackground"
          text="CERRAR"
        />
      </div>
      {step == "title" && (
        <ModalKeyboard
          output={interactionText}
          setOutput={setInteractionText}
          handleSave={handleKeyboard}
        />
      )}
      {step == "image" && (
        <div>
          <div>{interactionText}</div>
          <ImagesMapper
            images={images}
            setImageRoute={setImageRoute}
            handler={handleImage}
          />
        </div>
      )}
      {step == "check" && (
        <div>
          <div>Se agregará el siguiente botón:</div>
          <ButtonAnimation
            disabled={true}
            propClass="w-full h-[250px] flex items-center justify-center"
            innerText={interactionText.toUpperCase()}
            speakText={interactionText}
            imagen={{
              src: imageRoute,
              width: 400,
              height: 400,
              add: "h-full w-full object-cover",
            }}
          />
          <div>Está conforme?</div>
          <ButtonAnimation
            propClass="w-full h-[250px] flex items-center justify-center"
            innerText={"CAMBIAR FOTO"}
            speakText={"cambiar foto"}
            imagen={{
              src: imageRoute,
              width: 400,
              height: 400,
              add: "h-full w-full object-cover",
            }}
            state={handleKeyboard}
          />
          <ButtonAnimation
            propClass="w-full h-[250px] flex items-center justify-center"
            innerText={"CAMBIAR TEXTO"}
            speakText={"cambiar texto"}
            imagen={{
              src: imageRoute,
              width: 400,
              height: 400,
              add: "h-full w-full object-cover",
            }}
            state={handleReset}
          />
        </div>
      )}
    </div>
  );
};

export default ModalNewInteraction;
