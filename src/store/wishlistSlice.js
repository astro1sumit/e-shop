import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, toggleWishlist as apiToggle } from '../api/axiosConfig';
import axios from 'axios';

// Fetch initial wishlist from backend
export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => {
    const response = await getWishlist();
    return response.data; // Expecting List<Wishlist>
});

// Toggle action that handles both Adding and Removing
// Change this in your wishlistSlice.js
export const toggleWishlistAction = createAsyncThunk(
    'wishlist/toggle',
    async (productData) => {
        // Use your existing apiToggle function which likely has the base URL and headers
        const response = await apiToggle(productData); 
        return response.data; 
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: { items: [], loading: false, error: null },
    reducers: {}, // Logic moved to extraReducers to sync with backend
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(toggleWishlistAction.fulfilled, (state, action) => {
                const { status, product, productId } = action.payload;

                if (status === "Added") {
                    state.items.push(product);
                } else if (status === "Removed") {
                    // Force String conversion to bypass type mismatches (Number vs String)
                    const targetId = String(productId || (product && product.productId));

                    state.items = state.items.filter(item => {
                        const itemId = String(item.productId || item.id);
                        return itemId !== targetId;
                    });
                }
            });
    },
});

export default wishlistSlice.reducer;