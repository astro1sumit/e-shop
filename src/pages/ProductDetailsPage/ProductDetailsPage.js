import React, { useState } from 'react'; 
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from "@clerk/clerk-react"; 
import { addToCart } from '../../store/cartSlice';
import { toggleWishlistAction } from '../../store/wishlistSlice';
import ProductColors from './ProductColors';
import SizeFilter from '../../components/Filters/SizeFilter';
import SvgFavourite from '../../components/common/SvgFavourite';

const ProductDetailsPage = () => {
  // --- 1. Move ALL Hooks to the top level ---
  const product = useLoaderData();
  const dispatch = useDispatch();
  const { isSignedIn, getToken } = useAuth(); // Call useAuth here, not inside handlers
  const [quantity, setQuantity] = useState(1);
  
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  // --- 2. Handle the "null" product check AFTER hooks ---
  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  // Check if wishlisted using String conversion for safety
  const isWishlisted = wishlistItems.some(
    (item) => String(item.productId) === String(product.id)
  );

  const handleQuantity = (type) => {
    if (type === 'dec') {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: quantity 
    }));
    alert(`${quantity} items added to cart!`);
  };

  const handleWishlist = async (e) => {
    if (e) e.preventDefault();

    if (!isSignedIn) {
      alert("Please login to use Wishlist");
      return;
    }

    // Get token to ensure the request is authorized
    const token = await getToken();

    dispatch(toggleWishlistAction({
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      token: token // Pass the token if your thunk needs it manually
    }));
  };

  return (
    <div className='max-w-[1200px] mx-auto p-5'>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='flex-1 relative'>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='w-full rounded-xl object-cover h-[500px]'
          />
        </div>

        <div className='flex-1'>
          <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
          <p className='text-xl text-gray-700 mb-4'>${product.price}</p>

          <div className='mb-6'>
            <p className='font-bold mb-2'>Select Color</p>
            <ProductColors colors={product.color} />
          </div>

          <div className='mb-6'>
            <SizeFilter sizes={product.size} hidleTitle={false} multi={false} />
          </div>

          <div className='mb-6'>
            <p className='font-bold mb-2'>Quantity</p>
            <div className='flex items-center border w-fit rounded-lg'>
              <button onClick={() => handleQuantity('dec')} className='px-4 py-2 hover:bg-gray-100'>-</button>
              <span className='px-4 py-2 font-medium border-x'>{quantity}</span>
              <button onClick={() => handleQuantity('inc')} className='px-4 py-2 hover:bg-gray-100'>+</button>
            </div>
          </div>

          <div className='flex gap-4 items-center'>
            <button
              onClick={handleAddToCart}
              className='flex-1 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors'>
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className='border p-3 rounded-lg hover:bg-gray-50 transition shadow-sm'
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <SvgFavourite
                fill={isWishlisted ? 'red' : 'none'}
                stroke={isWishlisted ? 'red' : 'black'}
              />
            </button>
          </div>

          <div className='mt-8 pt-8 border-t'>
            <h3 className='font-bold mb-2'>Description</h3>
            <p className='text-gray-600 leading-relaxed'>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;