import React, { useState, useEffect } from "react";
import { products } from "./ProductsData";
// Import the functional ProductCard that has Redux and wishlist logic
import ProductCard from "../../pages/ProductListPage/ProductCard";

const NewArrivals = () => {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4); // Default for desktop

  // Logic to handle responsiveness for every device
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 cards
      } else {
        setVisibleItems(4); // Desktop: 4 cards
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = products.length - visibleItems;

  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="py-10 px-4 md:px-16 relative overflow-hidden">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-black mb-10 tracking-widest">
        NEW ARRIVALS
      </h2>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * (100 / visibleItems)}%)` }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="px-2 flex-shrink-0" 
                style={{ width: `${100 / visibleItems}%` }} // Dynamic width for responsiveness
              >
                {/* Pass the specific props required by the functional ProductCard */}
                <ProductCard 
                  id={product.id} 
                  title={product.title} 
                  price={product.price} 
                  thumbnail={product.image} 
                  brand={product.brand || "Fashion Brand"}
                  slug={product.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow - Maintained original UI with improved positioning for small screens */}
        {index > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-[-10px] md:left-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          >
            ‹
          </button>
        )}

        {/* Right Arrow - Maintained original UI with improved positioning for small screens */}
        {index < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute right-[-10px] md:right-2 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;