// api/endpoints.js
export class ApiEndpoints {
  // Base URL
  //static BASE_URL = 'https://krizianohome.com/';
   static BASE_URL = 'https://kriziano-homes.onrender.com';

  // Product Service Endpoints
  static PRODUCT = {
    GET_PRODUCTS: this.BASE_URL+'/product/get-products',
    GET_PRODUCT: this.BASE_URL+'/product/get-product/:product_id',
    GET_CATEGORIES:this.BASE_URL+ '/product/get-categories',
    CREATE_PRODUCT: this.BASE_URL+'/product/create-product',
    UPDATE_PRODUCT:this.BASE_URL+ '/product/:id',
    ADD_WISHLIST: this.BASE_URL+'/product/add-cart',
    GET_CART: this.BASE_URL+'/product/get-cart',
    GET_WISHLISTS: this.BASE_URL+'/product/get-wishlists',
    REMOVE_CART: this.BASE_URL+'/product/remove-cart',
    REMOVE_WISHLIST:this.BASE_URL+ '/product/remove-wishlist',
  };

  // Auth Service Endpoints
  static AUTH = {
    CREATE_USER:this.BASE_URL+ '/auth/create-user',
    LOGIN: this.BASE_URL+'/auth/login',
    LOGOUT:this.BASE_URL+ '/auth/logout',
    GET_USER: this.BASE_URL+'/auth/get-user',
  };

  // Order Service Endpoints
  static ORDER = {
    CREATE_ADDRESS: this.BASE_URL+'/order/create-address',
    GET_ADDRESS:this.BASE_URL+ '/order/get-address',
    CREATE_ORDER: this.BASE_URL+'/order/create-order',
    VERIFY_PAYMENT: this.BASE_URL+'/order/verify-payment',
    GET_ORDERS: this.BASE_URL+'/order/get-orders',
    ADMIN_ORDERS: this.BASE_URL+'/order/admin/orders',
    ADMIN_UPDATE_STATUS: this.BASE_URL+'/order/admin/order/:id/status',
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
