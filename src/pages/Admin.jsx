import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import OrderList from './OrderList';

const Admin = () => {
  const [view, setView] = useState('list'); // 'list', 'add', 'update'
  const [editingProduct, setEditingProduct] = useState(null);

  const handleNavigate = (newView) => {
    setView(newView);
    if (newView !== 'update') setEditingProduct(null);
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setView('update');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50 text-gray-900">
      <Sidebar onNavigate={handleNavigate} activeView={view} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {view === 'list' && (
            <ProductList onEdit={handleStartEdit} />
          )}
          {view === 'add' && (
            <AddProduct onCancel={() => setView('list')} />
          )}
          {view === 'update' && editingProduct && (
            <UpdateProduct product={editingProduct} onCancel={() => setView('list')} />
          )}
          {view === 'orders' && (
            <OrderList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin