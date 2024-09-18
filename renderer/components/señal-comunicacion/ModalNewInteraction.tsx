import React, { Dispatch, SetStateAction } from "react";
import ButtonAnimation from "../ButtonAnimation";
import { useState, useEffect } from "react";
import ImagesMapper from "./ImagesMapper";
import ModalKeyboard from "./ModalKeyboard";

interface modalNewInteractionProps {
  state: (functionToEjec: string) => void;
  category: string;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  setArraySeñales: Dispatch<SetStateAction<InteractionsArray>>;
}

const ModalNewInteraction = ({
  state,
  category,
  setActiveModal,
  setArraySeñales,
}: modalNewInteractionProps) => {
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
    imageRoute ? setStep("check") : setStep("image");
  };

  const handleImage = () => {
    setStep("check");
  };

  const handleReset = () => {
    setStep("title");
  };
  const handleAccept = () => {
    let señales = JSON.parse(localStorage.getItem("senal-comunicacion"));
    let object;
    if (category == "CATEGORIAS") {
      object = {
        title: interactionText.toUpperCase(),
        url: imageRoute,
        entries: [],
      };
      señales.push(object);
    } else {
      object = {
        frase: interactionText.toUpperCase(),
        url: imageRoute,
      };
      señales.forEach((categoria) => {
        if (categoria.title == category) {
          categoria.entries.push(object);
        }
      });
    }
    localStorage.setItem("senal-comunicacion", JSON.stringify(señales));
    setArraySeñales(señales);
    setActiveModal(false);
  };

  return (
    <div className="absolute items-center justify-start gap-5 flex flex-col min-h-screen w-screen p-16 backdrop-blur-sm z-50 bg-zinc-900">
      <div className="w-full">
        <ButtonAnimation
          state={() => setActiveModal(false)}
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
          <div>Elija una imagen para: {interactionText.toUpperCase()}</div>
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
          <ButtonAnimation
            propClass="w-full h-[250px] flex items-center justify-center"
            innerText={"ACEPTAR"}
            speakText={"ACEPTAR"}
            imagen={{
              src: "si.jpg",
              width: 400,
              height: 400,
              add: "h-full w-full object-cover",
            }}
            state={handleAccept}
          />
        </div>
      )}
    </div>
  );
};

export default ModalNewInteraction;
