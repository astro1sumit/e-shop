import React, { useEffect, useState } from "react";
import { heroImages } from "./heroImages";

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Hero ${i + 1}`}
            className="w-full h-auto flex-shrink-0 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
