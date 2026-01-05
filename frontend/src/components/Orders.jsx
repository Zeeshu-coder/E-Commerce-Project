import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import OrderService from '../services/order.service'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    OrderService.getUserOrders()
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING': return 'text-yellow-600 bg-yellow-100';
        case 'SHIPPED': return 'text-blue-600 bg-blue-100';
        case 'DELIVERED': return 'text-green-600 bg-green-100';
        case 'CANCELLED': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-100 px-6 py-4 border-b flex flex-wrap justify-between items-center">
                        <div className="flex gap-6 text-sm text-gray-600">
                            <div>
                                <span className="block font-bold">Order Placed</span>
                                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="block font-bold">Total</span>
                                <span>${order.totalAmount}</span>
                            </div>
                            <div>
                                <span className="block font-bold">Ship To</span>
                                <span>{order.shippingAddress}</span>
                            </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <span className="text-sm font-bold text-gray-500 mr-2">Order # {order.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                                <img 
                                    src={item.imageUrl || "https://via.placeholder.com/150"} 
                                    alt={item.productName} 
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="ml-6 flex-1">
                                    <h4 className="text-lg font-bold text-gray-800">{item.productName}</h4>
                                    <div className="text-gray-600">Quantity: {item.quantity}</div>
                                    <div className="text-amber-600 font-bold">${item.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
