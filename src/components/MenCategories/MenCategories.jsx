import React, { useState } from "react";
import { products } from "../MenCategories/MenCategoriesData";
import CategoriesCard from "./MenCategoriesCard";
import { Link } from 'react-router-dom'; // Ensure this import is at the top

const ITEMS_VISIBLE = 4; // how many cards visible at once

const MenCategories = () => {
  const [index, setIndex] = useState(0);

  const maxIndex = products.length - ITEMS_VISIBLE;

  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="py-2 relative">
      <h2 className="text-center text-3xl font-extrabold text-black mb-10 tracking-widest">
        MEN CATEGORIES
      </h2>


      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 25}%)` }}>
          {products.map((product) => (
            <div key={product.id} className="w-1/4 px-2 flex-shrink-0">
              {/* Wrap the card in a Link tag */}
              <Link to="/men" className="block hover:no-underline">
                <CategoriesCard product={product} />
              </Link>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          >
            ‹
          </button>
        )}

        {/* Right Arrow */}
        {index < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default MenCategories;
