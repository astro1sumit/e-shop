import React from "react";

const CategoriesCard = ({ product }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-auto h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="px-2 py-4">
        <h3 className="text-center font-light">{product.title}</h3>

      </div>
    </div>
  );
};

export default CategoriesCard;
