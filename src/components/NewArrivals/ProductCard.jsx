import React from "react";

const ProductCard = ({ id, title, price, thumbnail, brand, slug }) => {
  return (
    <div className='flex flex-col hover:scale-105 relative border rounded-lg p-2 shadow-sm transition-transform'>
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <p className="font-medium mt-1">₹ {product.price}</p>
      </div>
    </div>

  );
};

export default ProductCard;
