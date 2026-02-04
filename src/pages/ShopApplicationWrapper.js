import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from "@clerk/clerk-react";
import Navigation from '../components/Navigation/Navigation';
import { fetchWishlist } from '../store/wishlistSlice';
import { setAuthToken } from '../api/axiosConfig';


const ShopApplicationWrapper = () => {
  const dispatch = useDispatch();
  const { getToken, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
  const initializeAuth = async () => {
    if (isLoaded && isSignedIn) {
      try {
        const token = await getToken();
        setAuthToken(token); // Sets axios.defaults.headers.common['Authorization']
        dispatch(fetchWishlist()); 
      } catch (error) {
        console.error("Auth initialization failed:", error);
      }
    } else if (isLoaded && !isSignedIn) {
      setAuthToken(null); // Clear headers on sign out
    }
  };
  initializeAuth();
}, [isSignedIn, isLoaded, getToken, dispatch]);

  // Prevent flickering or partial renders while Clerk is still initializing
  if (!isLoaded) return <div>Loading Application...</div>;

  return (
    <>
      <Navigation />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
};

export default ShopApplicationWrapper;