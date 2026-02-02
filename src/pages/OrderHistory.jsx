import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderHistory } from '../store/orderSlice';

const OrderHistory = () => {
    const { history, loading } = useSelector(state => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrderHistory());
    }, [dispatch]);

    if (loading) return <p className="text-center p-10">Loading orders...</p>;

    return (
        <div className="p-8 max-w-[1000px] mx-auto">
            <h1 className="text-2xl font-bold mb-6">Order History</h1>
            {history.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                history.map(order => (
                    <div key={order.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
                        <div className="flex justify-between border-b pb-2 mb-2">
                            <span className="font-bold">Order ID: #{order.id}</span>
                            <span className={`px-2 py-1 rounded text-sm ${order.paymentStatus === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {order.paymentStatus}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <div className="mt-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm py-1">
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-2 pt-2 text-right font-bold">
                            Total: ${order.totalAmount}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;