import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { ApiEndpoints } from '../api/endpoints';

const useStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  products: [],
  filteredProductCount: 0,
  orders: [],
  totalOrders: 0,
  totalRevenue: 0,
  currentPage: 1,
  isLoading: false,
  isCheckingAuth: true,

  login: async (email, password) => {
    try {
      const res = await api.post(ApiEndpoints.AUTH.LOGIN, { email, password });
      const { user } = res.data;
      localStorage.setItem('token', 'auth'); // Set a dummy token for persistence
      set({ token: 'auth', user });
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

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await api.get(ApiEndpoints.AUTH.GET_USER);
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      console.log(error);
      set({ isCheckingAuth: false, user: null });
    }
  },

  fetchProducts: async (page = 1) => {
    set({ isLoading: true });
    try {
      const url = `${ApiEndpoints.PRODUCT.GET_PRODUCTS}?page=${page}`;
      const res = await api.get(url);
      const { products, filteredProductCount } = res.data;
      set({ products, filteredProductCount, currentPage: page });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (productData) => {
    try {
      const res = await api.post(ApiEndpoints.PRODUCT.CREATE_PRODUCT, productData);
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
      const url = ApiEndpoints.getProductUrl(id);
      const res = await api.put(url, productData);
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
      const url = ApiEndpoints.getProductUrl(id);
      await api.delete(url);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get(ApiEndpoints.ORDER.ADMIN_ORDERS);
      set({
        orders: res.data.orders,
        totalOrders: res.data.totalOrders,
        totalRevenue: res.data.totalRevenue
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch orders');
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const url = ApiEndpoints.getAdminOrderStatusUrl(id);
      const res = await api.put(url, { status });
      set((state) => ({
        orders: state.orders.map((o) => (o._id === id ? { ...o, status: res.data.order.status } : o)),
      }));
      toast.success('Order status updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  },

  logout: async () => {
    try {
      const url = ApiEndpoints.AUTH.LOGOUT;
      const res = await api.get(url);
      toast.success('Logged out succesfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout');
    }
  },
}));

export default useStore;
