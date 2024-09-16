"use client";
import { useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ButtonAnimation from "./ButtonAnimation";

type CarrouselProps = {
  estados: string[]
  isOff: boolean
}

let uniqueIdCounter = Date.now();

const CarrouselEstados = ({ estados, isOff }: CarrouselProps) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const changeState = (functionToEjec: string): void | null => {
    if (functionToEjec !== "handleNext" && functionToEjec !== "handlePrev") return null
    functionToEjec === "handleNext" ? handleNext() : functionToEjec === "handlePrev" && handlePrev()
  }
  const handleNext = () => {
    if (!swiperRef) return;
    const newIndex = swiperRef.activeIndex + 2;
    if (newIndex >= estados.length) {
      swiperRef.slideTo(0);
    } else {
      swiperRef.slideTo(newIndex);
    }
  };

  const handlePrev = () => {
    if (!swiperRef) return;
    const newIndex = swiperRef.activeIndex - 2;
    if (newIndex < 0) {
      swiperRef.slideTo(estados.length);
    } else {
      swiperRef.slideTo(newIndex);
    }
  };

  return (
    <div className="w-[550px] relative text-white flex items-center justify-center">
      <ButtonAnimation
        disabled={isOff}
        functionKeyboard={{ funct: "handlePrev", state: changeState }}
        buttonBorder="border-transparent"
        propClass="swiper-button-prev p-6 after:text-white"
      />
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        speed={400}
        className="w-[400px] flex items-start justify-start"
      >
        {estados.map((slideContent) => {
          const uniqueKey = `${slideContent}-${uniqueIdCounter++}`;
          return (
            <SwiperSlide key={uniqueKey}>
              <ButtonAnimation
                disabled={isOff}
                functionKeyboard={{ funct: "handlePrev", state: changeState }}
                speakText={`${slideContent}`}
                text={`${slideContent}`}
                propClass="w-full h-[80px]"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <ButtonAnimation
        functionKeyboard={{ funct: "handleNext", state: changeState }}
        disabled={isOff}
        buttonBorder="border-transparent"
        propClass="swiper-button-next p-6 after:text-white"
      />
    </div>
  );
};

export default CarrouselEstados;
