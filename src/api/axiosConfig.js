import axios from 'axios';

// Pulls the backend URL from your .env file
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://demo-deployment-latest-i5xg.onrender.com/api'; 

const api = axios.create({ 
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Helper to set Auth Token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Export API Functions
export const createPaymentOrder = (orderData) => api.post('/payment/create-order', orderData);
export const updatePaymentStatus = (data) => api.post('/payment/update-status', data);
export const createOrder = (orderData) => api.post('/orders/create', orderData);
export const searchProducts = (keyword) => api.get(`/products/search?q=${keyword}`);
export const getWishlist = () => api.get('/wishlist');
export const toggleWishlist = (productData) => api.post('/wishlist/toggle', productData);
export const getOrderHistory = () => api.get('/orders/history');

export default api;