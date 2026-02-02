import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        // If the item exists, add the new quantity to the existing one
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, push the new item
        state.cartItems.push(newItem);
      }
      // Recalculate total
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
      // Recalculate total after removal
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
      );
    },

    // ADD THIS NEW REDUCER:
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        if (type === 'inc') {
          existingItem.quantity += 1;
        } else if (type === 'dec' && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }

      // Always update the total amount when quantity changes
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;