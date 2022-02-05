import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookComponent } from './address-book/address-book.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orderdetails/:orderId', component: OrderDetailsComponent },
  { path: 'addressbook', component: AddressBookComponent },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
