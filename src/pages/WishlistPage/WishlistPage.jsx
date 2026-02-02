import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductListPage/ProductCard';
import { fetchWishlist, toggleWishlistAction } from '../../store/wishlistSlice';

const WishlistPage = () => {
    const { items, loading } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const handleRemove = (item) => {
        // Dispatch the full item to ensure ID properties are available
        dispatch(toggleWishlistAction(item));
    };

    if (loading) return <div className="p-10 text-center">Loading your favorites...</div>;

    return (
        <div className="p-8 max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold mb-6">My Wishlist ({items.length})</h1>

            {items.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Link to="/" className="text-blue-600 hover:underline font-medium">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item) => {
                        // Determine the ID once to ensure consistency between the card and the button
                        const consistentId = item.productId || item.id;

                        return (
                            <div key={consistentId} className="relative group border p-2 rounded-lg bg-white shadow-sm">
                                <ProductCard
                                    product={item}
                                    id={consistentId}
                                    title={item.title}
                                    price={item.price}
                                    thumbnail={item.thumbnail}
                                />

                                <button
                                    onClick={() => handleRemove(item)}
                                    // Add pointer-events-auto to ensure it's not blocked by overlapping elements
                                    className="mt-2 w-full py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium relative z-10"
                                >
                                    🗑️ Remove from Wishlist
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;