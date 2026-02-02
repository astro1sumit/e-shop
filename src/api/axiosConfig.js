import axios from 'axios';

const API_BASE_URL = "http://e-shop-server-production.up.railway.app";

// 1. Define the API Instance FIRST
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. Helper to set Auth Token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// 3. Export API Functions (Now 'api' is defined and safe to use)
export const createPaymentOrder = (orderData) => api.post('/payment/create-order', orderData);
export const updatePaymentStatus = (data) => api.post('/payment/update-status', data);
export const createOrder = (orderData) => api.post('/orders/create', orderData);
export const searchProducts = (keyword) => api.get(`/products/search?q=${keyword}`);
export const getWishlist = () => api.get('/wishlist');
export const toggleWishlist = (productData) => api.post('/wishlist/toggle', productData);
export const getOrderHistory = () => api.get('/orders/history');

export default api;