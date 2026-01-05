import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import { useParams, useNavigate } from 'react-router-dom'
import CartService from '../services/cart.service'
import AuthService from '../services/auth.service'
import WishlistService from '../services/wishlist.service'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = (id) => {
    ProductService.getProductById(id)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  const handleAddToCart = async () => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      await CartService.addToCart(product.id, 1);
      alert("Added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      alert("Please login to add items to wishlist.");
      navigate("/login");
      return;
    }

    try {
      await WishlistService.addToWishlist(product.id);
      alert("Added to wishlist successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to wishlist.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
            <div className="md:w-1/2">
                <img 
                    src={product.imageUrl || "https://via.placeholder.com/600"} 
                    alt={product.name} 
                    className="w-full h-96 object-cover"
                />
            </div>
            <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">{product.category}</p>
                <div className="text-2xl font-bold text-amber-600 mb-6">${product.price}</div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                </p>
                <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                        ${product.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="ml-4 text-gray-600">
                        {product.stockQuantity} items available
                    </span>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stockQuantity <= 0}
                        className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition-colors
                            ${product.stockQuantity > 0 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button 
                        onClick={handleAddToWishlist}
                        className="py-3 px-6 rounded-lg font-bold text-amber-500 border-2 border-amber-500 hover:bg-amber-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
