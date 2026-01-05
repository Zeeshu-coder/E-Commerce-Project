import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartService from '../services/cart.service';
import AuthService from '../services/auth.service';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

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

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 bg-white">
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
          onClick={handleAddToCart}
          className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
