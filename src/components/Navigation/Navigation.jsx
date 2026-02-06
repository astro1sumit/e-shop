import React, { useState } from 'react';
import { Wishlist } from '../common/Wishlist';
import { CartIcon } from '../common/CartIcon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './Navigation.css';

const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);
  const {cartItems} = useSelector((state) => state.cart);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='flex items-center py-4 px-4 md:px-16 justify-between bg-white shadow-sm sticky top-0 z-50 flex-wrap'>
      {/* Logo */}
      <Link className='text-2xl md:text-3xl text-black font-bold' to='/'>E-Shop</Link>

      {/* Hamburger Toggle (Mobile) */}
      <button className='md:hidden p-2' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        </svg>
      </button>

      {/* Search Bar - Full width on mobile */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex order-3 md:order-2 w-full md:flex-1 md:mx-10 mt-4 md:mt-0 justify-center`}>
        <div className='border rounded-full flex items-center px-4 py-1 bg-gray-50 w-full max-w-md'>
          <input
            type='text'
            className='px-4 py-1 bg-transparent outline-none w-full text-base' // 16px font prevents iOS zoom
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Links & Icons */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row order-4 md:order-3 w-full md:w-auto items-center gap-6 mt-4 md:mt-0`}>
        <ul className='flex flex-col md:flex-row gap-6 md:gap-10 text-gray-600 font-medium items-center'>
          <li><NavLink to='/men'>Men</NavLink></li>
          <li><NavLink to='/women'>Women</NavLink></li>
          <li><NavLink to='/kid'>Kids</NavLink></li>
        </ul>
        <div className='flex items-center gap-6 border-t md:border-none pt-4 md:pt-0'>
          <Link to="/wishlist" className="relative">
            <Wishlist />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link to="/cart-items" className="relative">
            <CartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <SignedIn><UserButton /></SignedIn>
          <SignedOut><SignInButton mode="modal"><button className="text-xs font-bold">LOGIN</button></SignInButton></SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;