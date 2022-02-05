import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../../models/address';
import { Cart } from '../../models/cart';
import { createorder } from '../../models/createorder';
import { Customer } from '../../models/customer';
import { loginrequest } from '../../models/loginrequest';
import { User } from '../../models/user';
import { Wishlist } from '../../models/wishlist';
import { ServiceConstants } from '../api-constants';
import { ApiHttpService } from '../api-http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseAPIUrl: string;
  private userData:User;
  constructor(private apiHttpService: ApiHttpService,private readonly jwtService:JwtHelperService) {
    this.baseAPIUrl = environment.apiUrl;
    this.userData = this.jwtService.decodeToken(this.jwtService.tokenGetter())

  }
  getProducts(): Observable<any> {
    return this.apiHttpService.get(ServiceConstants.GET_PRODUCTS);
  }
  getCategories(): Observable<any> {
    return this.apiHttpService.get(ServiceConstants.GET_CATEGORIES);
  }
  addCart(cartItem: Cart): Observable<any> {
    return this.apiHttpService.post(ServiceConstants.POST_CART, cartItem);
  }
  getCart(): Observable<any> {
    return this.apiHttpService.get(`${ServiceConstants.GET_CUSTOMER_CART}`);
  }
  getCustomerWishlist(): Observable<any> {
    return this.apiHttpService.get(`${ServiceConstants.GET_CUSTOMER_WISHLIST}`);
  }
  addWishlist(wishList:Wishlist): Observable<any> {
    return this.apiHttpService.post(ServiceConstants.POST_WISHLIST,wishList);
  }
  deleteWishlist(wishList:Wishlist): Observable<any> {
    return this.apiHttpService.delete(`${ServiceConstants.POST_WISHLIST}/${wishList.productId}`,wishList);
  }
  editCart(cartItem: Cart): Observable<any> {
    return this.apiHttpService.put(`${ServiceConstants.POST_CART}/${cartItem.id}`, cartItem);
  }
  addAddress(adddress:any):Observable<any>{
    return this.apiHttpService.post(`${ServiceConstants.POST_ADDRESS}`,adddress);
  }
  editAddress(adddress:Address):Observable<any>{
    return this.apiHttpService.put(`${ServiceConstants.POST_ADDRESS}/${adddress.id}`,adddress);
  }
  getAddress():Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_ADDRESS}`);
  }
  login(loginrequest: loginrequest): Observable<any> {
    loginrequest.userType = 0;
    return this.apiHttpService.post(`${ServiceConstants.AUTH_LOGIN}`, loginrequest);
  }
  createOrder(order:createorder[]):Observable<any>{
    return this.apiHttpService.post(`${ServiceConstants.CREATE_ORDER}`,order)
  }
  getCountries():Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_COUNTRIES}`);
  }
  getStates(countryId:any):Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_STATES}/${countryId}`);
  }
  getOrders():Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_ORDER}`)
  }
  getOrderDetails(orderId:number):Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_ORDER_DETAILS}/${orderId}`);
  }
  getOrderHistories(orderId:number):Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_ORDER_HISTORIES}/${orderId}`);
  }
  getOrder(id:number):Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.GET_ORDER_BY_ID}/${id}`);
  }
  deleteAddress(id?:number):Observable<any>{
    return this.apiHttpService.delete(`${ServiceConstants.POST_ADDRESS}/${id}`);
  }
  syncCartItems(cartItems: any):Observable<any>{
    return this.apiHttpService.post(`${ServiceConstants.SYNC_CART}`, cartItems);
  }
  getCustomer():Observable<any>{
    return this.apiHttpService.get(`${ServiceConstants.CUSTOMER.replace('{userID}',this.userData.UserId)}`)
  }
  updateCustomer(customer:Customer):Observable<any>{
    return this.apiHttpService.put(`${ServiceConstants.CUSTOMER.replace('{userID}',this.userData.UserId)}`,customer)
  }
}
