import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

const useStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  products: [],
  isLoading: false,

  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      // Assuming response structure contains token and user
      const { token, user } = res.data; 
      localStorage.setItem('token', token);
      set({ token, user });
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
    toast.success('Logged out');
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/product/get-products');
      // Handle if response is array or object with products key
      const products = Array.isArray(res.data) ? res.data : res.data.products || [];
      set({ products });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (productData) => {
    try {
      const res = await api.post('/product/create-product', productData);
      set((state) => ({ products: [...state.products, res.data] }));
      toast.success('Product added successfully');
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add product');
      return false;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const res = await api.put(`/product/${id}`, productData);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...productData } : p)),
      }));
      toast.success('Product updated successfully');
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update product');
      return false;
    }
  },

  deleteProduct: async (id) => {
    try {
      // Assuming delete endpoint follows REST convention
      await api.delete(`/product/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  },
}));

export default useStore;