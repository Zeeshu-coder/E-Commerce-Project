import React, { useState } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.createProduct(product);
      setMessage('Product created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
          {message && (
            <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                rows="3"
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        required
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
                    <input 
                        type="number" 
                        name="stockQuantity" 
                        value={product.stockQuantity} 
                        onChange={handleChange} 
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                    />
                </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                value={product.category} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input 
                type="text" 
                name="imageUrl" 
                value={product.imageUrl} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
