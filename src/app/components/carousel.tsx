'use client';
// import './ImageCarousel.css';
import Image from 'next/image';
import { getTrendingPosterPaths } from '../lib/tmdb';
import { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [images, setImages] = useState<string[]>([]); 

  useEffect(() => {
    async function fetchImages() {
      const paths = await getTrendingPosterPaths();
      setImages(paths);
    //   console.log('PATHS', paths)
    }
    fetchImages();
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div className=" relative transform-style-preserve-3d perspective-1000 animation-gallery cursor-pointer  ">
        {images.map((item, index) => (
          <span
            key={index}
            className="absolute h-[150px] w-[100px] transform-style-preserve-3d"
            style={{
              '--i': index + 1,
              transform: `rotateY(calc(var(--i) * 45deg)) translateZ(300px)`,
            } as React.CSSProperties}
          >
            <div className="   h-[150px] w-[100px]  absolute rounded-lg border-[6px] border-ridge border-[#ccc]"></div>
            <Image
              src={item} // Use the poster path string directly
              alt={`Gallery item ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;