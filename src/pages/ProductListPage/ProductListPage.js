import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import content from '../../data/content.json';
import PriceFilter from '../../components/Filters/PriceFilter';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import SizeFilter from '../../components/Filters/SizeFilter';

const ProductListPage = ({ categoryType }) => {
  // Map URL category to JSON category IDs
  const categoryIdMap = { men: 1, women: 2, kid: 3 };
  const currentCategoryId = categoryIdMap[categoryType];

  // State for all active filters
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    colors: [],
    sizes: []
  });

  // Comprehensive filter logic
  const filteredProducts = useMemo(() => {
    return content.products.filter(p => {
      const matchesCategory = p.category_id === currentCategoryId;
      const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      const matchesColor = filters.colors.length === 0 || (p.color && filters.colors.some(c => p.color.includes(c)));
      const matchesSize = filters.sizes.length === 0 || (p.size && filters.sizes.some(s => p.size.includes(s)));
      return matchesCategory && matchesPrice && matchesColor && matchesSize;
    });
  }, [filters, currentCategoryId]);
  const categoryData = content.categories.find(c => c.id === currentCategoryId);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* SIDEBAR FILTERS */}
        <aside style={{ width: '260px', borderRight: '1px solid #eee', paddingRight: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Filter</h3>
          
          <PriceFilter onChange={(val) => setFilters(prev => ({ ...prev, priceRange: val }))} />
          
          <ColorsFilter 
            colors={categoryData?.meta_data?.colors || []} 
            onChange={(val) => setFilters(prev => ({ ...prev, colors: val }))} 
          />
          
          <SizeFilter 
            sizes={categoryData?.meta_data?.sizes || []} 
            onChange={(val) => setFilters(prev => ({ ...prev, sizes: val }))} 
          />
        </aside>

        {/* PRODUCT GRID */}
        <main style={{ flex: 1, paddingLeft: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, textTransform: 'capitalize' }}>
                {categoryType} Clothing
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            {filteredProducts.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative' }}>
                  {/* Updated Image Tag to use p.thumbnail from JSON */}
                  <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{p.title}</div>
                    <div style={{ color: '#888', fontSize: '12px' }}>{p.brand}</div>
                  </div>
                  <div style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    ${p.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
              No products found matching these filters.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;