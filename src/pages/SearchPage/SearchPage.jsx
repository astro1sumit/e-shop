import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../../api/axiosConfig'; // Ensure this API function exists
import ProductCard from '../ProductListPage/ProductCard';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                if (query) {
                    // Make sure your backend has the /products/search endpoint!
                    const response = await searchProducts(query);
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="p-8 max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;