import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import WishlistService from '../services/wishlist.service'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import CartService from '../services/cart.service'

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    WishlistService.getWishlist()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  const handleRemove = (productId) => {
    WishlistService.removeFromWishlist(productId)
      .then(() => {
        setProducts(products.filter(p => p.id !== productId));
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleAddToCart = async (product) => {
      try {
          await CartService.addToCart(product.id, 1);
          alert("Added to cart successfully!");
      } catch (error) {
          console.error(error);
          alert("Failed to add to cart.");
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading wishlist...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Wishlist</h1>
        
        {products.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            Your wishlist is empty. <Link to="/" className="text-amber-600 hover:underline">Go shopping!</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white relative">
                  <button 
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm"
                      title="Remove from wishlist"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <img 
                        src={product.imageUrl || "https://via.placeholder.com/150"} 
                        alt={product.name} 
                        className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <h3 className="text-xl font-bold mb-2 truncate text-gray-800 hover:text-amber-600">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-2 truncate">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-amber-600">${product.price}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
