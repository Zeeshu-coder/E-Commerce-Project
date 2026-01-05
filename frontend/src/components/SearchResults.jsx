import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import ProductCard from './ProductCard'
import { useSearchParams } from 'react-router-dom'

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
        searchProducts(query);
    }
  }, [query]);

  const searchProducts = (searchQuery) => {
    setLoading(true);
    ProductService.searchProducts(searchQuery)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Search Results for "{query}"</h1>
        
        {loading ? (
          <div className="text-center text-xl">Searching...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
                <div className="col-span-full text-center text-gray-500 text-xl">
                    No products found matching your search.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
