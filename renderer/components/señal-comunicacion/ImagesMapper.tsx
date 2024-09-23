import React, { useEffect } from "react";
import ButtonAnimation from "../ButtonAnimation";

interface imagesMapperProps {
  images: any[];
  setImageRoute: React.Dispatch<React.SetStateAction<string>>;
  handler: () => void;
  setterHeightScroll: React.Dispatch<React.SetStateAction<number>>
  isOff: boolean
}

const ImagesMapper = ({
  images,
  setImageRoute,
  handler,
  setterHeightScroll,
  isOff
}: imagesMapperProps) => {
  useEffect(() => {
    const calculateScrollMax = () => {
      setterHeightScroll(document.getElementById("ScrollImages").scrollHeight);
    };
    setTimeout(calculateScrollMax, 500);
    window.addEventListener("resize", calculateScrollMax);
    return () => {
      window.removeEventListener("resize", calculateScrollMax);
    };
  }, []);
  return (
    <div id="ScrollImages" className="grid grid-cols-3 gap-4 h-full">
      {images.map((image, index) => (
        <ButtonAnimation
          disabled={isOff}
          key={index}
          propClass="w-full h-[250px] flex items-center justify-center"
          imagen={{
            src: image,
            width: 400,
            height: 400,
            add: "h-full w-full object-cover",
          }}
          imageSetter={setImageRoute}
          state={handler}
        />
      ))}
    </div>
  );
};

export default ImagesMapper;
