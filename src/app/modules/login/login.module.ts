import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[CommonService,ApiHttpService]
})
export class LoginModule { }
