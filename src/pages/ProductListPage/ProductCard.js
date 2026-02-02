import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "@clerk/clerk-react";
import SvgFavourite from '../../components/common/SvgFavourite';
import { addToCart } from '../../store/cartSlice';
// Corrected import path for the wishlist action
import { toggleWishlistAction as toggleWishlist } from '../../store/wishlistSlice';

const ProductCard = ({ id, title, price, thumbnail, brand, slug }) => {
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();

  // 1. Check if this product is already in the wishlist
  // All Hooks MUST be inside the component function
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const isWishlisted = wishlistItems.some((item) => String(item.productId) === String(id));

  // 2. Add to Cart Handler
  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, thumbnail, brand }));
    alert("Added to cart!");
  };

  // 3. Wishlist Toggle Handler
  const handleWishlist = (e) => {
    e.preventDefault(); // Stop clicking the link behind the button

    if (!isSignedIn) {
      alert("Please login to use Wishlist");
      return;
    }

    // Send data to Redux (and then to Backend)
    dispatch(toggleWishlist({
      productId: id,
      title,
      price,
      thumbnail
    }));
  };

  return (
    <div className='flex flex-col hover:scale-105 relative border rounded-lg p-2 shadow-sm transition-transform'>
      {/* Product Image Link */}
      <Link to={`/product/${slug}`}>
        <img className='h-[320px] w-[280px] rounded-lg cursor-pointer object-cover block' src={thumbnail} alt={title} />
      </Link>

      {/* Product Details */}
      <div className='flex justify-between items-center mt-2'>
        <div className='flex flex-col'>
          <p className='text-[16px] font-bold'>{title}</p>
          {brand && <p className='text-[12px] text-gray-600'>{brand}</p>}
        </div>
        <div>
          <p className='font-bold'>${price}</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className='mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition'>
        Add to Cart
      </button>

      {/* Wishlist Button (Dynamic Color) */}
      <button
        onClick={handleWishlist}
        className='absolute top-2 right-2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100'
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <SvgFavourite
          fill={isWishlisted ? 'red' : 'none'}
          stroke={isWishlisted ? 'red' : 'black'}
        />
      </button>
    </div>
  );
};

export default ProductCard;