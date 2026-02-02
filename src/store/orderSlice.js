import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchOrderHistory = createAsyncThunk('orders/fetchHistory', async () => {
    const response = await api.get('/orders/history');
    return response.data;
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: { history: [], loading: false },
    extraReducers: (builder) => {
        
        builder
            .addCase(fetchOrderHistory.pending, (state) => { state.loading = true; })
            .addCase(fetchOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            });
    },
    
});

export default orderSlice.reducer;