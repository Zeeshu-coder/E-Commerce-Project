import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import UserService from '../services/user.service'
import OrderService from '../services/order.service'

const Profile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
        const userRes = await UserService.getMyProfile();
        setUser(userRes.data);
        
        const ordersRes = await OrderService.getUserOrders();
        setOrders(ordersRes.data);
    } catch (error) {
        console.error("Error loading profile:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await UserService.updateProfile(user);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    } catch (error) {
        console.error("Error updating profile:", error);
        setMessage('Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                    {message && (
                        <div className={`p-3 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input 
                                type="text" 
                                name="fullName" 
                                value={user.fullName || ''} 
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={user.email || ''} 
                                disabled
                                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input 
                                type="text" 
                                name="phoneNumber" 
                                value={user.phoneNumber || ''} 
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <textarea 
                                name="address" 
                                value={user.address || ''} 
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
            
            <div className="md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-600">No orders found.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map(order => (
                                <div key={order.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold">Order #{order.id}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                              order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 
                                              order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                                              'bg-red-100 text-red-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                        <p>Total: ${order.totalAmount}</p>
                                        <p>Items: {order.items.length}</p>
                                    </div>
                                </div>
                            ))}
                            {orders.length > 5 && (
                                <div className="text-center mt-4">
                                    <a href="/orders" className="text-amber-500 hover:underline">View all orders</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
