import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { Product } from 'src/app/core/models/product';
import { Wishlist } from 'src/app/core/models/wishlist';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  cartItems: Cart[];
  products: Product[];
  wishlistItems: any;
  filteredProducts: Product[];
  wishListProducts: Wishlist[];
  defaultProductImgUrl: string = "../../assets/nav-img/ProductImgComingSoon.png";
  constructor(private readonly commonService: CommonService, private sanitizer: DomSanitizer) {
    this.filteredProducts = [];
    this.wishListProducts = [];
    this.cartItems = [];
    this.products = [];
  }

  ngOnInit(): void {
    const cartItemsPromise = this.commonService.getCart();
    const productsPromise = this.commonService.getProducts();
    const customerWishlistPromise = this.commonService.getCustomerWishlist();

    // forkJoin() to make parallel calls
    forkJoin([cartItemsPromise, productsPromise, customerWishlistPromise]).subscribe(responses => {
      this.cartItems = responses[0];
      this.products = responses[1];
      this.wishlistItems = responses[2];
      this.filteredProducts = [];
      this.products.forEach(async (product: Product) => {
        product.quantity = 0
      });


      this.cartItems.forEach((item: Cart) => {
        var product = this.products.find((p: Product) => p.id === item.productId); // changed item.id to item.productId need to test
        if (product) {
          product.quantity = item.quantity > 0 ? item.quantity : 0;
        }
      })
      this.wishlistItems.forEach((item: Wishlist) => {
        var product = this.products.find((p: Product) => p.id === item.productId);
        if (product) {
          this.filteredProducts.push(product);
          product.isWishlist = true;
        }
      })
    });
  }
  handleProductQuantity(type: string, product: any) {
    // Write condition to handle increment and decrement according to the stocks of products present in Database.
    if (type === 'inc') {
      product.quantity = product.quantity + 1;
    } else if (type === 'dec') {
      product.quantity = product.quantity - 1;
    }
    const productTobeAdded = this.cartItems.find((ci) => ci.id === product.id);
    if (productTobeAdded) {
      productTobeAdded.quantity = product.quantity;
      this.commonService.editCart(productTobeAdded).subscribe((response) => {
        console.log(response);
      });
    }
  }

  addToCart(product: Product) {
    product.quantity = 1;
    const productTobeAdded = this.cartItems.find((ci: Cart) => ci.id === product.id);
    if (productTobeAdded) {
      productTobeAdded.quantity += product.quantity;
      this.commonService.editCart(productTobeAdded).subscribe((response) => {
        console.log(response);
      });
    } else {
      const cartItem: Cart = {
        id: 0,
        productId: product.id,
        customerId: 1,
        name: product.name,
        quantity: product.quantity === 0 ? product.quantity + 1 : product.quantity,
        description: product.description,
        product: product,
        isActive: true

      }
      this.commonService.addCart(cartItem).subscribe((response) => {
        console.log(response);
      });
    }



    // const addProduct:Product|undefined =this.cart.find(c=>c.id === product.id);
    // if(product && addProduct){
    //   addProduct.quantity = addProduct.quantity+1;
    // } else{
    //   this.cart.push(product);
    // }
  }
  removeItemFromWishlist(product: Product) {
    const wishList: Wishlist = {
      productId: product.id,
      isactive: true
    }
    this.commonService.deleteWishlist(wishList).subscribe((res) => {
      product.isWishlist = false;
    })
  }
  addItemToWishlist(product: Product) {
    // service call
    const wishList: Wishlist = {
      productId: product.id,
      isactive: true
    }
    this.commonService.addWishlist(wishList).subscribe((res) => {
      product.isWishlist = true;
    });
  }
}
