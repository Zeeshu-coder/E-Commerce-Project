import React, { useState, useEffect, useMemo } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import ProductCard from './ProductCard'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const retrieveProducts = () => {
    ProductService.getAllProducts()
      .then(response => {
        setProducts(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(item => item.category))].filter(Boolean);
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setError("Could not load products. Please ensure backend is running.");
        setLoading(false);
      });
  };

  useEffect(() => {
    retrieveProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
        return products;
    } else {
        return products.filter(p => p.category === selectedCategory);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Products</h1>
        
        {/* Category Filter */}
        {!loading && !error && categories.length > 0 && (
            <div className="flex justify-center mb-8 flex-wrap gap-2">
                <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                        ${selectedCategory === 'All' ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                    onClick={() => setSelectedCategory('All')}
                >
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                            ${selectedCategory === category ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        )}
        
        {loading ? (
          <div className="text-center text-xl">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                    No products found.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
