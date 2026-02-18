// api/endpoints.js
export class ApiEndpoints {
  // Base URL
//   static BASE_URL = 'http://localhost:3333/api/v1';
  //static BASE_URL = 'https://krizianohome.com/';
   static BASE_URL = 'https://kriziano-homes.onrender.com/';

  // Product Service Endpoints
  static PRODUCT = {
    GET_PRODUCTS: '/product/get-products',
    GET_PRODUCT: '/product/get-product/:product_id',
    GET_CATEGORIES: '/product/get-categories',
    CREATE_PRODUCT: '/product/create-product',
    UPDATE_PRODUCT: '/product/:id',
    ADD_WISHLIST: '/product/add-wishlist',
    ADD_CART: '/product/add-cart',
    GET_CART: '/product/get-cart',
    GET_WISHLISTS: '/product/get-wishlists',
    REMOVE_CART: '/product/remove-cart',
    REMOVE_WISHLIST: '/product/remove-wishlist',
  };

  // Auth Service Endpoints
  static AUTH = {
    CREATE_USER: '/auth/create-user',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_USER: '/auth/get-user',
  };

  // Order Service Endpoints
  static ORDER = {
    CREATE_ADDRESS: '/order/create-address',
    GET_ADDRESS: '/order/get-address',
    CREATE_ORDER: '/order/create-order',
    VERIFY_PAYMENT: '/order/verify-payment',
    GET_ORDERS: '/order/get-orders',
    ADMIN_ORDERS: '/order/admin/orders',
    ADMIN_UPDATE_STATUS: '/order/admin/order/:id/status',
  };

  // Helper methods to build full URLs
  static getProductUrl(productId) {
    return this.PRODUCT.UPDATE_PRODUCT.replace(':id', productId);
  }

  static getAdminOrderStatusUrl(orderId) {
    return this.ORDER.ADMIN_UPDATE_STATUS.replace(':id', orderId);
  }

  static getProductUrlById(productId) {
    return this.PRODUCT.GET_PRODUCT.replace(':product_id', productId);
  }
}
