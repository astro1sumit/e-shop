import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../api/axiosConfig';
import './BillingPage.css';

const BillingPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleInput = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const isAddressComplete = address.fullName && address.address && address.city && address.zipCode;

  const handlePayment = async () => {
    if (!isAddressComplete) {
      alert("Please enter a delivery address first.");
      return;
    }

    // Ensure Razorpay SDK is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const orderData = {
  ...address,
  totalAmount,
  items: cartItems.map(item => ({
    productId: item.id,
    title: item.title, // Add this line
    quantity: item.quantity,
    price: item.price
  }))
};

    try {
      // 1. Create order in backend
      const response = await API.post('/payment/create-order', orderData);
      
      // SAFETY CHECK: Parse if response.data is a string (common with JSONObject)
      const data = typeof response.data === 'string' 
          ? JSON.parse(response.data) 
          : response.data;

      const { razorpayOrderId, amount, key } = data;

      if (!razorpayOrderId) {
        alert("Backend failed to return a valid Razorpay Order ID. Check server logs.");
        return;
      }

      const options = {
        key: key, 
        amount: amount, 
        currency: "INR",
        name: "E-Shop",
        description: "Order for " + address.fullName,
        order_id: razorpayOrderId, 
        prefill: {
          name: address.fullName,
          email: address.email
        },
        notes: {
          shipping_address: `${address.address}, ${address.city}, ${address.zipCode}`
        },
        handler: async (res) => {
          // 2. Success callback: Update status in backend
          try {
            await API.post('/payment/update-status', {
              razorpayOrderId: res.razorpay_order_id,
              status: "PAID"
            });
            alert("Payment Successful! Your order has been placed.");
            // Optional: Redirect to a success page here
          } catch (updateErr) {
            console.error("Failed to update status:", updateErr);
            alert("Payment recorded, but status update failed. Contact support.");
          }
        },
        modal: {
          ondismiss: function() {
            console.log("Checkout modal closed by user");
          }
        },
        theme: { color: "#000000" }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Critical Payment Error:", err);
      alert("Could not initialize payment. Ensure backend is running.");
    }
  };

  return (
    <div className="billing-page-container flex flex-col items-center py-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-10 text-gray-900">Checkout</h2>
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg border">
        <h3 className="text-xl font-bold mb-6">1. Delivery Address</h3>
        <div className="grid grid-cols-1 gap-5 mb-10">
          <input name="fullName" placeholder="Full Name" className="border border-gray-300 p-4 rounded-lg outline-none focus:ring-2 focus:ring-black" onChange={handleInput} required />
          <input name="email" type="email" placeholder="Email Address" className="border border-gray-300 p-4 rounded-lg outline-none focus:ring-2 focus:ring-black" onChange={handleInput} required />
          <input name="address" placeholder="Street Address / Building No." className="border border-gray-300 p-4 rounded-lg outline-none focus:ring-2 focus:ring-black" onChange={handleInput} required />
          <div className="grid grid-cols-2 gap-5">
            <input name="city" placeholder="City" className="border border-gray-300 p-4 rounded-lg outline-none focus:ring-2 focus:ring-black" onChange={handleInput} required />
            <input name="zipCode" placeholder="Pincode" className="border border-gray-300 p-4 rounded-lg outline-none focus:ring-2 focus:ring-black" onChange={handleInput} required />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6">2. Order Summary</h3>
        <div className="bg-gray-50 p-6 rounded-xl mb-10">
          <div className="flex justify-between font-bold text-2xl">
            <span>Grand Total:</span> 
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          disabled={!isAddressComplete}
          className={`w-full py-5 rounded-xl font-bold text-xl uppercase transition-all shadow-md ${isAddressComplete ? 'bg-black text-white hover:bg-gray-800 active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {isAddressComplete ? `Pay Now ₹${totalAmount}` : 'Enter Address to Pay'}
        </button>
      </div>
    </div>
  );
};

export default BillingPage;