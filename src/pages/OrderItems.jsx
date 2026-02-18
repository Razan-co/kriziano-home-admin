

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderItems = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Order Selected</h2>
        <button 
          onClick={() => navigate('/admin')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-500 mt-1">Order ID: #{order._id}</p>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm"
          >
            Back to Orders
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Customer</label>
              <div className="font-medium text-gray-900">{order.user?.name}</div>
              <div className="text-sm text-gray-500">{order.user?.email}</div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
              <div className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
              <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Amount</label>
              <div className="font-medium text-gray-900 text-lg">${order.total}</div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">Items ({order.items.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold text-right">Price</th>
                  <th className="px-6 py-4 font-semibold text-center">Quantity</th>
                  <th className="px-6 py-4 font-semibold text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      {item.product?._id && <div className="text-xs text-gray-400 mt-0.5">ID: {item.product._id}</div>}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">${item.price}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">${item.subTotal || (item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;