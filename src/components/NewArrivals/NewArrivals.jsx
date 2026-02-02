import React, { useState } from "react";
import { products } from "./ProductsData";
// Import the functional ProductCard that has Redux and wishlist logic
import ProductCard from "../../pages/ProductListPage/ProductCard";

const ITEMS_VISIBLE = 4; // how many cards visible at once

const NewArrivals = () => {
  const [index, setIndex] = useState(0);

  const maxIndex = products.length - ITEMS_VISIBLE;

  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="py-10 relative">
      <h2 className="text-center text-3xl font-extrabold text-black mb-10 tracking-widest">
        NEW ARRIVALS
      </h2>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / ITEMS_VISIBLE)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/4 px-2 flex-shrink-0">
              {/* Pass the specific props required by the functional ProductCard */}
              <ProductCard 
                id={product.id} 
                title={product.title} 
                price={product.price} 
                thumbnail={product.image} // Mapping 'image' from data to 'thumbnail' prop
                brand={product.brand || "Fashion Brand"}
                slug={product.id}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          >
            ‹
          </button>
        )}

        {/* Right Arrow */}
        {index < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;