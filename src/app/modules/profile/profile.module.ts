import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrdersComponent,
    WishlistComponent,
    OrderDetailsComponent,
    AddressBookComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  providers:[CommonService,ApiHttpService]
})
export class ProfileModule { }
