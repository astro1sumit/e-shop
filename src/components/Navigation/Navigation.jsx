import React, { useState } from 'react';
import { Wishlist } from '../common/Wishlist';
import { CartIcon } from '../common/CartIcon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './Navigation.css';

const Navigation = () => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);

// In your JSX:
<span>My Wishlist ({items.length})</span>

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className='flex items-center py-4 px-16 justify-between bg-white shadow-sm sticky top-0 z-50'>
      {/* Logo Section */}
      <div className='flex items-center gap-6 mr-6'>
        <Link className='text-3xl text-black font-bold' to='/'>E-Shop</Link>
      </div>

      {/* Nav Links */}
      <div className='flex items-center gap-10'>
        <ul className='flex gap-14 text-gray-600 justify-center font-medium'>
          <li><NavLink to='/' className={({isActive})=> isActive ? 'text-black border-b-2 border-black pb-1' : 'hover:text-black transition-colors'}>Shop</NavLink></li>
          <li><NavLink to='/men' className={({isActive})=> isActive ? 'text-black border-b-2 border-black pb-1' : 'hover:text-black transition-colors'}>Men</NavLink></li>
          <li><NavLink to='/women' className={({isActive})=> isActive ? 'text-black border-b-2 border-black pb-1' : 'hover:text-black transition-colors'}>Women</NavLink></li>
          <li><NavLink to='/kid' className={({isActive})=> isActive ? 'text-black border-b-2 border-black pb-1' : 'hover:text-black transition-colors'}>Kids</NavLink></li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className='flex justify-center flex-1 mx-10'>
        <div className='border rounded-full flex items-center px-4 py-1 bg-gray-50 w-full max-w-md focus-within:ring-1 focus-within:ring-black transition-all'>
          <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.34-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
          </svg>
          <input 
            type='text' 
            className='px-4 py-1 bg-transparent outline-none w-full text-sm' 
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Action Icons: Wishlist, Cart, Profile */}
      <div className='flex items-center gap-8'>
        <Link to="/wishlist" title="Wishlist">
          <Wishlist/>
        </Link>
        
        <Link to='/cart-items' className='relative' title="Cart">
          <CartIcon/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile Logic: Swaps between Login button and User Logo */}
        <div className="nav-profile border-l pl-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all text-xs font-bold uppercase tracking-wider">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: 'h-9 w-9 border border-gray-200' } }} />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;