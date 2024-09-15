import React from "react";
import ButtonAnimation from "../ButtonAnimation";
import Image from "next/image";
import { useState, useEffect } from "react";

const ModalImages = ({ state }) => {
  const [images, setImages] = useState([]);
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
      <div>
        <h1>Image Gallery</h1>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-64">
              <Image
                src={`/senal-comunicacion/${image}`}
                alt={image}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalImages;
