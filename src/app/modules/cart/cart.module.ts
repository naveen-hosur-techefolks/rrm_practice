import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { NotificationService } from 'src/app/core/services/notify.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  providers:[CommonService,ApiHttpService,NotificationService]
})
export class CartModule { }
