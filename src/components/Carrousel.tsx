// 'use client'
// import React, { useRef, useState } from 'react';
// import { Virtual, Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// const Carrousel: React.FC = () => {
//   const [swiperRef, setSwiperRef] = useState<any>(null);
//   const appendNumber = useRef(500);
//   const prependNumber = useRef(1);

//   const [slides, setSlides] = useState(
//     Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
//   );

//   const prepend = () => {
//     setSlides([
//       `Slide ${prependNumber.current - 5}`,
//       `Slide ${prependNumber.current - 4}`,
//       `Slide ${prependNumber.current - 3}`,
//       `Slide ${prependNumber.current - 2}`,
//       `Slide ${prependNumber.current - 1}`,
//       ...slides,
//     ]);
//     prependNumber.current = prependNumber.current - 5;
//     swiperRef.slideTo(swiperRef.activeIndex + 5, 0);
//   };

//   const append = () => {
//     setSlides([...slides, 'Slide ' + ++appendNumber.current]);
//   };

//   const slideTo = (index: number) => {
//     swiperRef.slideTo(index - 1, 0);
//   };

//   const handleNext = () => {
//     if (swiperRef) {
//       const newIndex = swiperRef.activeIndex + 4;
//       swiperRef.slideTo(newIndex);
//     }
//   };

//   const handlePrev = () => {
//     if (swiperRef) {
//       const newIndex = swiperRef.activeIndex - 4;
//       swiperRef.slideTo(newIndex);
//     }
//   };


//   return (
//     <>
//       <Swiper
//         modules={[Virtual, Navigation, Pagination]}
//         onSwiper={setSwiperRef}
//         slidesPerView={5}
//         centeredSlides={true}
//         spaceBetween={30}
//         pagination={{
//           type: 'fraction',
//         }}
//         navigation={{
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         }}
//         virtual
//         speed={400}
//       >
//         {slides.map((slideContent, index) => (
//           <SwiperSlide key={slideContent} virtualIndex={index}>
//             {slideContent}
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="swiper-button-next" onClick={handleNext}></div>
//       <div className="swiper-button-prev" onClick={handlePrev}></div>
//     </>
//   );
// };

// export default Carrousel;
