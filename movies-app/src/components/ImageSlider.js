import React, { useEffect, useState } from 'react';

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prevInd) =>
      prevInd === images.length - 1 ? 0 : prevInd + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [current, images.length]);

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden">
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
