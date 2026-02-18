import React from 'react';
import useStore from '../store/useStore';

const Sidebar = ({ onNavigate, activeView }) => {
  const logout = useStore((state) => state.logout);

  return (
    <div className="w-full md:w-64 bg-slate-900 text-white p-5 flex flex-col md:min-h-screen shadow-xl z-10">
      <h2 className="text-2xl font-bold mb-4 md:mb-8 text-center md:text-left tracking-wide text-indigo-400">Kriziano home Admin</h2>
      <ul className="list-none p-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible mb-4 md:mb-0">
        <li 
          onClick={() => onNavigate('list')} 
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap flex-1 md:flex-none text-center md:text-left ${activeView === 'list' ? 'bg-indigo-600 shadow-lg md:translate-x-1' : 'hover:bg-slate-800 hover:text-indigo-300'}`}
        >Product List</li>
        <li 
          onClick={() => onNavigate('add')} 
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap flex-1 md:flex-none text-center md:text-left ${activeView === 'add' ? 'bg-indigo-600 shadow-lg md:translate-x-1' : 'hover:bg-slate-800 hover:text-indigo-300'}`}
        >Add Product</li>
        <li 
          onClick={() => onNavigate('orders')} 
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap flex-1 md:flex-none text-center md:text-left ${activeView === 'orders' ? 'bg-indigo-600 shadow-lg md:translate-x-1' : 'hover:bg-slate-800 hover:text-indigo-300'}`}
        >Orders</li>
      </ul>
      <div className="md:mt-auto pt-4 md:pt-0 border-t border-slate-700 md:border-none">
        <button 
          onClick={logout}
          className="w-full p-3 rounded-lg cursor-pointer transition-all duration-200 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white font-semibold border border-red-500/20 hover:border-red-600 flex items-center justify-center gap-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;