import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import UserService from '../services/user.service'
import OrderService from '../services/order.service'
import AddressService from '../services/address.service'

const Profile = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '' // keeping legacy address field if needed
  });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // New address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  const loadProfileData = async () => {
    try {
        const userRes = await UserService.getMyProfile();
        setUser(userRes.data);
        
        const ordersRes = await OrderService.getUserOrders();
        setOrders(ordersRes.data);

        const addressRes = await AddressService.getUserAddresses();
        setAddresses(addressRes.data);
    } catch (error) {
        console.error("Error loading profile:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

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

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
        ...newAddress,
        [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
        const res = await AddressService.addAddress(newAddress);
        setAddresses([...addresses, res.data]);
        setShowAddressForm(false);
        setNewAddress({
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            isDefault: false
        });
        // Reload addresses to handle default logic updates on server side if any
        const addressRes = await AddressService.getUserAddresses();
        setAddresses(addressRes.data);
    } catch (error) {
        console.error("Error adding address:", error);
        alert("Failed to add address.");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
        try {
            await AddressService.deleteAddress(id);
            setAddresses(addresses.filter(a => a.id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
        }
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
        
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                        {/* Keeping simple address field as backup or legacy */}
                        {/* <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <textarea 
                                name="address" 
                                value={user.address || ''} 
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
                            />
                        </div> */}
                        <button 
                            type="submit" 
                            className="w-full bg-amber-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>

                {/* Address Book Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Address Book</h2>
                        <button 
                            onClick={() => setShowAddressForm(!showAddressForm)}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            {showAddressForm ? 'Cancel' : 'Add New'}
                        </button>
                    </div>
                    
                    {showAddressForm && (
                        <form onSubmit={handleAddAddress} className="mb-6 border-b pb-6">
                            <div className="grid grid-cols-1 gap-4">
                                <input 
                                    type="text" name="street" placeholder="Street Address" required
                                    value={newAddress.street} onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" name="city" placeholder="City" required
                                        value={newAddress.city} onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <input 
                                        type="text" name="state" placeholder="State" required
                                        value={newAddress.state} onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" name="zipCode" placeholder="Zip Code" required
                                        value={newAddress.zipCode} onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <input 
                                        type="text" name="country" placeholder="Country" required
                                        value={newAddress.country} onChange={handleAddressChange}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" name="isDefault" id="isDefault"
                                        checked={newAddress.isDefault} onChange={handleAddressChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="isDefault">Set as default address</label>
                                </div>
                                <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">Save Address</button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-4">
                        {addresses.length === 0 ? (
                            <p className="text-gray-500 text-sm">No addresses saved.</p>
                        ) : (
                            addresses.map(addr => (
                                <div key={addr.id} className="border rounded p-3 relative hover:bg-gray-50">
                                    {addr.default && (
                                        <span className="absolute top-2 right-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Default</span>
                                    )}
                                    <p className="font-medium">{addr.street}</p>
                                    <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                                    <p className="text-sm text-gray-600">{addr.country}</p>
                                    <button 
                                        onClick={() => handleDeleteAddress(addr.id)}
                                        className="text-red-500 text-xs mt-2 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            <div className="lg:w-2/3">
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
                                        <p className="truncate mt-1 text-xs text-gray-400">Ship to: {order.shippingAddress}</p>
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
