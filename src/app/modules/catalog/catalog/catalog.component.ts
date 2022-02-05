import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, filter, forkJoin, map, Observable, OperatorFunction } from 'rxjs';
import { Cart } from 'src/app/core/models/cart';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { Wishlist } from 'src/app/core/models/wishlist';
import { CommonService } from 'src/app/core/services/common/common.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public model: any;
  public isTokenAvailable: boolean;

  products: Product[] = [];
  categories: Category[] = [];
  tabs: Category[] = [];
  subTabs: Category[] = [];
  cart: Product | undefined;
  cartItems: Cart[] = [];
  allSubTab: Category;
  filteredProducts: Product[] = [];
  wishlistItems: Wishlist[] = [];
  defaultProductImgUrl: string = "../../assets/nav-img/ProductImgComingSoon.png";
  constructor(private readonly commonService: CommonService, private readonly jwtHelperService: JwtHelperService,
    private sanitizer: DomSanitizer, private dataService: DataService) {
    this.isTokenAvailable = true;
    this.allSubTab = {
      id: 0,
      name: 'Show All',
      parentCategoryId: 0,
      description: 'Temporary',
      isActive: true
    };

  }
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.products.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)?.map((pr) => pr.name))
    )


  ngOnInit(): void {
    if (!this.jwtHelperService.tokenGetter() || this.jwtHelperService.isTokenExpired()) {
      this.isTokenAvailable = false;
    }

    this.commonService.getCategories().subscribe((response) => {
      this.categories = response;
      this.tabs.push(...this.categories.filter(c => c.parentCategoryId === null));
    });
    if (this.isTokenAvailable) {
      const cartItemsPromise = this.commonService.getCart();
      const productsPromise = this.commonService.getProducts();
      const customerWishlistPromise = this.commonService.getCustomerWishlist();

      // forkJoin() to make parallel calls
      forkJoin([cartItemsPromise, productsPromise, customerWishlistPromise]).subscribe(responses => {
        this.cartItems = responses[0];
        this.products = responses[1];
        this.wishlistItems = responses[2];
        this.products.forEach(async (product) => {
          product.quantity = 0
        });
        this.filteredProducts = this.products.slice();
        this.cartItems.forEach((item) => {
          var product = this.products.find(product => product.id === item.productId); // changed item.id to item.productId need to test
          if (product) {
            product.quantity = item.quantity > 0 ? item.quantity : 0;
          }
        })
        this.wishlistItems.forEach((item) => {
          var product = this.products.find(product => product.id === item.productId);
          if (product) {
            product.isWishlist = true;
          }
        })
        this.dataService.saveCartItems(this.cartItems);
      });
    } else {
      this.commonService.getProducts().subscribe((response) => {
        this.products = response;
        this.products.forEach(async (product) => {
          product.quantity = 0
        });
        this.filteredProducts = this.products.slice();
        console.log(this.products);
        let cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
          this.cartItems = JSON.parse(cartItems);
          this.cartItems.forEach((item) => {
            var product = this.products.find(product => product.id === item.productId); // changed item.id to item.productId need to test
            if (product) {
              product.quantity = item.quantity > 0 ? item.quantity : 0;
            }
          });
          this.dataService.saveCartItems(this.cartItems);
        }
      })
    }


  }
  getSubCategories(tab: Category) {
    this.subTabs = [];
    if (tab && tab.id) {
      this.subTabs = this.categories.filter(c => c.parentCategoryId === tab.id)
      this.allSubTab.name = 'Show All ' + tab.name;
      this.allSubTab.id = tab.id;
      // this.allSubTab.parentCategoryId = tab.id;
    }
  }

  updateCart(product: Product, type: string) {
    if (type === 'inc') {
      product.quantity = product.quantity + 1;
    } else if (type === 'dec') {
      product.quantity = product.quantity - 1;
    }
    const productTobeAdded = this.cartItems.find((ci) => ci.productId === product.id);
    if (productTobeAdded) {
      productTobeAdded.quantity = product.quantity;
      console.log(this.cartItems);
      if (this.isTokenAvailable) {
        this.commonService.editCart(productTobeAdded).subscribe((response) => {
          this.dataService.saveCartItems(this.cartItems);
        });
      } else {
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        this.dataService.saveCartItems(this.cartItems);
      }

    } else {
      const cartItem: Cart = {
        id: 0,
        productId: product.id,
        name: product.name,
        quantity: 1,
        description: product.description,
        product: product,
        isActive: true
      }
      if (this.isTokenAvailable) {
        this.commonService.addCart(cartItem).subscribe((response) => {
          console.log(response);
          this.cartItems.push(cartItem)
          this.dataService.saveCartItems(this.cartItems);
        });
      } else {
        this.cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        this.dataService.saveCartItems(this.cartItems);
      }
    }
  }

  // handleProductQuantity(type: string, product: any) {
  //   // Write condition to handle increment and decrement according to the stocks of products present in Database.
  //   if (type === 'inc') {
  //     product.quantity = product.quantity + 1;
  //   } else if (type === 'dec') {
  //     product.quantity = product.quantity - 1;
  //   }
  //   const productTobeAdded = this.cartItems.find((ci) => ci.productId === product.id);
  //   if (productTobeAdded) {
  //     productTobeAdded.quantity = product.quantity;
  //     this.commonService.editCart(productTobeAdded).subscribe((response) => {
  //       console.log(response);
  //       if (type === 'inc') {
  //         this.dataService.addCartItem(productTobeAdded);
  //       } else {
  //         this.dataService.removeCartItem(productTobeAdded);
  //       }
  //     });
  //   }
  // }
  // addToCart(product: Product) {
  //   product.quantity = 1;
  //   // const productTobeAdded = this.cartItems.find((ci) => ci.id === product.id);
  //   // if (productTobeAdded) {
  //   //   productTobeAdded.quantity += product.quantity;
  //   //   this.commonService.editCart(productTobeAdded).subscribe((response) => {
  //   //     console.log(response);

  //   //     this.dataService.addCartItem(productTobeAdded);
  //   //   });
  //   // } else {
  //   //   const cartItem: Cart = {
  //   //     id: 0,
  //   //     productId: product.id,
  //   //     name: product.name,
  //   //     quantity: product.quantity === 0 ? product.quantity + 1 : product.quantity,
  //   //     description: product.description,
  //   //     product: product,
  //   //     isActive: true

  //   //   }
  //   //   this.commonService.addCart(cartItem).subscribe((response) => {
  //   //     console.log(response);
  //   //     this.dataService.addCartItem(cartItem);
  //   //   });
  //   // }

  //   const cartItem: Cart = {
  //     id: 0,
  //     productId: product.id,
  //     name: product.name,
  //     quantity: 1,
  //     description: product.description,
  //     product: product,
  //     isActive: true
  //   }
  //   if (this.isTokenAvailable) {
  //     this.commonService.addCart(cartItem).subscribe((response) => {
  //       console.log(response);
  //       this.dataService.addCartItem(cartItem);
  //       this.cartItems.push()
  //     });
  //   } else {

  //   }


  // }

  OnCategorySelect(subTab: Category) {
    this.filteredProducts = this.products.filter((p) => p.categoryId == subTab.id);
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
