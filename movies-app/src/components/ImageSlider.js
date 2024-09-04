import React, { useState, useEffect } from 'react';

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
      <div className="relative flex items-center justify-center">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full"
            >
              <div className="relative w-full h-[20vh] sm:h-[30vh] md:h-[50vh] lg:h-[60vh] xl:h-[80vh] overflow-hidden">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="w-full h-full rounded-xl transition-transform duration-500 transform hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
