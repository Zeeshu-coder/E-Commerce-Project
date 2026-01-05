import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import OrderService from '../services/order.service'
import UserService from '../services/user.service'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
        if (activeTab === 'products') {
            const response = await ProductService.getAllProducts();
            setProducts(response.data);
        } else if (activeTab === 'orders') {
            const response = await OrderService.getAllOrders();
            setOrders(response.data);
        } else if (activeTab === 'users') {
            const response = await UserService.getAllUsers();
            setUsers(response.data);
        }
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await ProductService.deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
        const response = await OrderService.updateOrderStatus(id, status);
        setOrders(orders.map(o => o.id === id ? response.data : o));
    } catch (error) {
        console.error("Error updating order:", error);
        alert("Failed to update order status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Dashboard</h1>
        
        <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm p-1 flex">
                <button 
                    className={`px-6 py-2 rounded-md transition-colors ${activeTab === 'products' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button 
                    className={`px-6 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button 
                    className={`px-6 py-2 rounded-md transition-colors ${activeTab === 'users' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
            </div>
        </div>

        {loading ? (
            <div className="text-center text-xl">Loading...</div>
        ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {activeTab === 'products' && (
                    <div>
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold">Manage Products</h2>
                            <Link to="/add-product" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                                Add New Product
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.stockQuantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <button 
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="text-xl font-bold">Manage Orders</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">${order.totalAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                                    ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' : 
                                                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                                                      'bg-red-100 text-red-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs" title={order.shippingAddress}>
                                                {order.shippingAddress}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                    className="text-sm border rounded p-1"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="CANCELLED">CANCELLED</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="text-xl font-bold">Manage Users</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">{user.fullName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
