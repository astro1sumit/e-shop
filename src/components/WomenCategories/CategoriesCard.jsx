import React from "react";

const CategoriesCard = ({ product }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-3">
        
      </div>
    </div>
  );
};

export default CategoriesCard;
