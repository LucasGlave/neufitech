import React from "react";
import ButtonAnimation from "../ButtonAnimation";

interface imagesMapperProps {
  images: any[];
  setImageRoute: React.Dispatch<React.SetStateAction<string>>;
  handler: () => void;
}

const ImagesMapper = ({
  images,
  setImageRoute,
  handler,
}: imagesMapperProps) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <ButtonAnimation
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
    </div>
  );
};

export default ImagesMapper;
