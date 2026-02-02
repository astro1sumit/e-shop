import content from '../data/content.json';

export const loadProductBySlug = async ({ params }) => {
    const { slug } = params;
    
    // Find product by ID from the local JSON content
    const product = content.products.find(p => p.id.toString() === slug);
    
    if (!product) {
        throw new Response("Not Found", { status: 404 });
    }
    
    return product;
};