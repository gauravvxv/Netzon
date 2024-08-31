import React, { useEffect } from 'react'
import { useState } from 'react'

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prevInd) =>
      prevInd === 0 ? images.length - 1 : prevInd - 1
    )
  }

  const nextSlide = () => {
    setCurrent((prevInd) =>
      prevInd === images.length - 1 ? 0 : prevInd + 1
    )
  }

  useEffect(()=>{
    const interval = setInterval(nextSlide , 3000);

    return ()=>{
      clearInterval(interval);
    }
  },[current , images.length])

  return (
    <div className="relative w-3/6 h-[70vh] max-w-7xl mx-auto">
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
                className="w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-150 cursor-pointer"
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
