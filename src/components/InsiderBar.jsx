import React from "react";

const InsiderBar = () => {
  return (
    <div className="bg-[#00110b] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Left Section */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <div className="font-bold text-lg">
            <span className="bg-white text-[#243f35] px-1 mr-1">E</span>
            Shop
          </div>

          <div className="flex items-center gap-2">
            📦 <span>Free Shipping</span>
          </div>

          <div className="flex items-center gap-2">
            📺 <span>Inside the Ropes Access</span>
          </div>

          <div className="flex items-center gap-2">
            👟 <span>Exclusive Products And More...</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-5 py-2 text-sm font-semibold rounded">
            JOIN INSIDER
          </button>

          <button className="border border-white px-5 py-2 text-sm font-semibold rounded">
            SIGN IN
          </button>
        </div>

      </div>
    </div>
  );
};

export default InsiderBar;
