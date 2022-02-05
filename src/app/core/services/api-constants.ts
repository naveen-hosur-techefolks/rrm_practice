export class ServiceConstants {
  static GET_PRODUCTS = 'Product';
  static GET_CATEGORIES = 'Category';
  static POST_CART = 'Cart';
  static GET_CUSTOMER_CART = 'Cart/GetCartProductByCustomerId';
  static GET_CUSTOMER_WISHLIST = 'Wishlist/GetWishlistProductByCustomerId';
  static POST_WISHLIST='Wishlist';
  static AUTH_LOGIN = 'Auth/login'
  static GET_ADDRESS ='Address/GetAddressByCustomerId';
  static POST_ADDRESS ='Address';
  static CREATE_ORDER = 'Orders/CreateOrderRequest';
  static GET_COUNTRIES ='Country';
  static GET_STATES ='State/GetByCountryId';
  static GET_ORDER ='Orders/GetOrdersByCustomerId';
  static GET_ORDER_DETAILS='OrderProduct/GetByOrderId';
  static GET_ORDER_HISTORIES='Orderhistory/GetOrderHistoryByOrderId';
  static GET_ORDER_BY_ID ='Orders';
  static SYNC_CART = 'Cart/createcart';
  static CUSTOMER ='Customer/{userID}';
}
