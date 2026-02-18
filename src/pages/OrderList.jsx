import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const OrderList = () => {
  const { orders, fetchOrders, updateOrderStatus, isLoading } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{orders.length} Orders</span>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold rounded-tl-lg">Order ID</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="p-4 text-sm font-medium text-gray-900">#{order._id.slice(-6)}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-900">{order.user?.name || 'Unknown'}</div>
                    <div className="text-xs">{order.user?.email}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{order.items?.length || 0} items</td>
                  <td className="p-4 text-sm font-semibold text-gray-900">${order.total}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border-none outline-none cursor-pointer appearance-none ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => navigate('/order/items', { state: { order } })}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                      View Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;