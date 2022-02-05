import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CatalogRoutingModule
  ],
  providers:[CommonService,ApiHttpService]
})
export class CatalogModule { }
