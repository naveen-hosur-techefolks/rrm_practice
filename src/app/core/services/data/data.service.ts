import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Cart } from '../../models/cart';

@Injectable({ providedIn: 'root' })
export class DataService {
    cartItems: Cart[] = [];
    private cartState = new BehaviorSubject<Cart[]>([]);

    saveCartItems(items: any) {
        this.cartItems = [...items];
        this.cartState.next(this.cartItems);
    }

    addCartItem(item: any) {
        var existingItem = this.cartItems.find(x => x.id === item.id);
        if (existingItem) {
            existingItem = item;
        } else {
            this.cartItems.push(item)
        }
        this.cartState.next(this.cartItems);
    }
    removeCartItem(item: any) {
        var existingItem = this.cartItems.find(x => x.id === item.id);
        if (existingItem) {
            existingItem = item;
        } else {
            this.cartItems = this.cartItems.filter((_item) => _item.id !== item.id)
            this.cartState.next(this.cartItems);
        }
        this.cartState.next(this.cartItems);
    }

    getCartItems(): Observable<any> {
        return this.cartState.asObservable();
    }
    getCartCount(): Observable<number> {
        return this.cartState.pipe(
            map((cart) => {
                const count = cart
                    .map((item) => item.quantity)
                    .reduce((p, c) => p + c, 0);
                return count;
            })
        );
    }
    getCartTotal(): Observable<number> {
        return this.cartState.pipe(
            map((cart) => {
                const subTotal = cart
                    .map((item) => item.quantity * item.product.price)
                    .reduce((p, c) => p + c, 0);
                return subTotal;
            })
        );
    }
}
