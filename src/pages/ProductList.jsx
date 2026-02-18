import React, { useEffect } from 'react';
import useStore from '../store/useStore';

const ProductList = ({ onEdit }) => {
  const { products, fetchProducts, deleteProduct, isLoading, filteredProductCount, currentPage } = useStore();
  const pageSize = 8; // Backend default page size
  const totalPages = Math.ceil(filteredProductCount / pageSize);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredProductCount} Products</span>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg">No products available.</div>
      ) : (
        <>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold rounded-tl-lg">Image</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Qty</th>
                <th className="p-4 font-semibold rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 border border-gray-200">
                      <img 
                        src={product.image_url || 'https://placehold.co/100?text=No+Image'} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/100?text=Error'; }}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    <div className="line-clamp-1 max-w-xs" title={product.name}>{product.name}</div>
                  </td>
                  <td className="p-4 text-indigo-600 font-semibold">${product.price}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{product.quantity}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => onEdit(product)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium shadow-sm">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-md hover:bg-red-100 hover:border-red-200 transition-all text-sm font-medium shadow-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-600 font-medium">Page {currentPage} of {totalPages || 1}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default ProductList;