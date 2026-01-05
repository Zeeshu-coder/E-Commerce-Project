import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import CartService from '../services/cart.service'
import OrderService from '../services/order.service'
import { Link, useNavigate } from 'react-router-dom'

import AuthService from '../services/auth.service'

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
        navigate("/login");
        return;
    }
    loadCart();
  }, []);

  const loadCart = () => {
    CartService.getCart()
      .then(response => {
        setCart(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  const handleRemove = (productId) => {
    CartService.removeFromCart(productId)
      .then(response => {
        setCart(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    CartService.updateQuantity(productId, newQuantity)
      .then(response => {
        setCart(response.data);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
        alert("Please enter a shipping address.");
        return;
    }

    try {
        await OrderService.placeOrder(shippingAddress);
        alert("Order placed successfully!");
        navigate("/orders");
    } catch (error) {
        console.error(error);
        alert("Failed to place order.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading cart...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Shopping Cart</h1>
        
        {(!cart || !cart.items || cart.items.length === 0) ? (
          <div className="text-center text-xl text-gray-600">
            Your cart is empty. <Link to="/" className="text-amber-600 hover:underline">Go shopping!</Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cart.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-16 w-16">
                                                <img className="h-16 w-16 rounded object-cover" src={item.imageUrl || "https://via.placeholder.com/150"} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${item.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center border rounded w-max">
                                            <button 
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                                onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                            >-</button>
                                            <span className="px-3 py-1">{item.quantity}</span>
                                            <button 
                                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                                                onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${item.subTotal}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleRemove(item.productId)}
                                            className="text-red-600 hover:text-red-900"
                                        >Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${cart.totalPrice}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>${cart.totalPrice}</span>
                    </div>
                    
                    {!isCheckingOut ? (
                        <button 
                            onClick={() => setIsCheckingOut(true)}
                            className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors font-bold"
                        >
                            Proceed to Checkout
                        </button>
                    ) : (
                        <form onSubmit={handleCheckout} className="mt-4 animate-fade-in">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Shipping Address</label>
                            <textarea
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500 mb-4"
                                rows="3"
                                placeholder="Enter your full address"
                                required
                            />
                            <div className="flex gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsCheckingOut(false)}
                                    className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-bold"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
