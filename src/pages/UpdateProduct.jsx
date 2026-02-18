import React, { useState } from 'react';
import useStore from '../store/useStore';

const UpdateProduct = ({ product, onCancel }) => {
  const updateProduct = useStore((state) => state.updateProduct);
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    quantity: product.quantity || '',
    category: product.category || '',
    image_url: product.image_url || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description.length < 50) {
        alert('Description must be at least 50 characters.');
        return;
    }
    const success = await updateProduct(product._id, formData);
    if (success) {
        onCancel();
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-100 pb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Image URL</label>
          <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" required />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Description <span className="text-xs font-normal text-gray-500">(min 50 chars)</span></label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[120px]" required />
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all font-medium">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;