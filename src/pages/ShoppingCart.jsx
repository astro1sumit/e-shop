import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice'; // Added updateQuantity
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button onClick={() => navigate('/')} className="text-blue-600 underline">Continue Shopping</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 rounded shadow bg-white">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded overflow-hidden">
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, type: 'dec' }))}
                    className="px-3 py-1 hover:bg-gray-100 border-r"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, type: 'inc' }))}
                    className="px-3 py-1 hover:bg-gray-100 border-l"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-sm hover:underline">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 border-t pt-4">
            <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
            <button 
              onClick={() => navigate('/billing')}
              className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
