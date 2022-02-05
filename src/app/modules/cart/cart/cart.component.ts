import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Address } from 'src/app/core/models/address';
import { Cart } from 'src/app/core/models/cart';
import { createorder } from 'src/app/core/models/createorder';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NotificationService } from 'src/app/core/services/notify.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressDetailsComponent } from '../../profile/address-details/address-details.component';
import { DataService } from 'src/app/core/services/data/data.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public isTokenAvailable: boolean;
  public totalPrice: number;
  public gst: number;
  cartItems: Cart[] = [];
  addressList: Address[] = [];
  billingAddressId: number;
  deliveryAddressId: number;
  defaultProductImgUrl: string = "../../assets/nav-img/ProductImgComingSoon.png";

  constructor(private readonly router: Router,
    private readonly jwtHelperService: JwtHelperService,
    private readonly commonService: CommonService,
    private readonly notification: NotificationService,
    private modalService: NgbModal,
    private dataService: DataService) {
    this.isTokenAvailable = true;
    this.totalPrice = 0;
    this.gst = 0;
    this.billingAddressId = 0;
    this.deliveryAddressId = 0;
  }

  ngOnInit(): void {
    if (!this.jwtHelperService.tokenGetter() || this.jwtHelperService.isTokenExpired()) {
      this.isTokenAvailable = false;
    }
    if (this.isTokenAvailable) {
      this.commonService.getCart().subscribe((response) => {
        this.cartItems = response;
        this.updateTotalPrice(this.cartItems);
        this.dataService.saveCartItems(this.cartItems);
      });
      this.getAddress();
    }
    else {
      let cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        this.cartItems = JSON.parse(cartItems);
        this.updateTotalPrice(this.cartItems);
        this.dataService.saveCartItems(this.cartItems);
      }
    }

  }
  getAddress() {
    this.commonService.getAddress().subscribe((res) => {
      this.addressList = res;
    })
  }
  updateTotalPrice(cartItems: Cart[]) {
    let totalPrice = 0;
    let gst = 0;
    cartItems.forEach((cartItem) => {
      const productPrice = cartItem?.product?.price * cartItem.quantity;
      totalPrice += productPrice;
      gst += (productPrice * cartItem?.product?.tax) / 100;
    })
    this.totalPrice = totalPrice;
    this.gst = parseFloat(gst.toFixed(2));
  }
  handleProductQuantity(type: string, product: any) {
    // Write condition to handle increment and decrement according to the stocks of products present in Database.
    if (type === 'inc') {
      product.quantity = product.quantity + 1;
    } else if (type === 'dec') {
      product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;
    }
    const productTobeAdded = this.cartItems.find((ci) => ci.id === product.id);
    console.log(this.cartItems);
    if (product.quantity === 0) {
      this.cartItems = this.cartItems.filter((_item) => _item.id !== product.id)
    }
    if (productTobeAdded) {
      productTobeAdded.quantity = product.quantity;
      this.commonService.editCart(productTobeAdded).subscribe((response) => {
        // if (product.quantity === 0) {
        //   this.cartItems = this.cartItems.filter((_item) => _item.id !== product.id)
        // }
        // console.log(this.cartItems);
        this.updateTotalPrice(this.cartItems);
      });
    }
  }
  checkout() {
    if (this.billingAddressId == 0) {
      return this.notification.showError('Please Select an address to do billing')
    }
    if (this.deliveryAddressId == 0) {
      return this.notification.showError('Please Select an address to deliver')
    }
    const orderRequest: createorder[] = [];
    this.cartItems.forEach((cart) => {
      const req: createorder = {
        billingAddressId: this.billingAddressId,
        deliveryAddressId: this.deliveryAddressId,
        productId: cart.productId,
        quantity: cart.quantity,
        sellingPrice: cart?.product?.price,
        totalPrice: this.totalPrice + this.gst,
        name: cart?.product?.name,
        isactive: true
      }
      orderRequest.push(req);
    })
    this.commonService.createOrder(orderRequest).subscribe((res) => {
      console.log(res);
      this.cartItems = [];
      this.billingAddressId = 0;
      this.deliveryAddressId = 0;
    })
  }
  loginNow() {
    this.router.navigate(['login']);
  }
  shopNow() {
    this.router.navigate(['catalog']);
  }
  addAddress() {
    const modalRef = this.modalService.open(AddressDetailsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.result.then((res) => {
      this.getAddress();
    }, (reason) => {
      this.getAddress();
    })
  }

}
