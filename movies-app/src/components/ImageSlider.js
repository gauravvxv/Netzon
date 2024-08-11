import React from 'react'
import { useState } from 'react'

const ImageSlider = ({images}) => {
    const[current,setCurrent]  = useState(0);

    const prevSlide = () => {
        setCurrent((prevInd)=>
            prevInd === 0 ? images.length-1 : prevInd-1
    )
    }

    const nextSlide = () => {
        setCurrent((prevInd)=>
            prevInd === images.length - 1 ? 0 : prevInd + 1
        )
    }

  return (
    <div className="relative w-full h-[75vh] max-w-7xl mx-auto">
    <div className="overflow-hidden relative h-full">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  </div>
  )
}

export default ImageSlider
