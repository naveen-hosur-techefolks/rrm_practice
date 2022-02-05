import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/login/login/login.component';
import { CatalogComponent } from './modules/catalog/catalog/catalog.component';
import { AboutusComponent } from './modules/about-us/aboutus/aboutus.component';
import { ApproachComponent } from './modules/approach/approach/approach.component';
import { ProductDetailsComponent } from './modules/catalog/catalog/product-details/product-details.component';
import { ContactUsComponent } from './modules/contact-us/contact-us/contact-us.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/Layout/footer/footer.component';
import { HeaderComponent } from './components/Layout/header/header.component';
import { AppInterceptor } from './app-interceptor.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { SanitizePipe } from './core/pipe/sanitize.pipe';
import { CartComponent } from './modules/cart/cart/cart.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { AddressDetailsComponent } from './modules/profile/address-details/address-details.component';
import { ApiHttpService } from './core/services/api-http.service';
import { DataService } from './core/services/data/data.service';
import { NotificationService } from './core/services/notify.service';
export function tokenGetter() {
  return localStorage.getItem("rrm_token");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CatalogComponent,
    AboutusComponent,
    ApproachComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    FooterComponent,
    HeaderComponent,
    SanitizePipe,
    CartComponent,
    ProfileComponent,
    AddressDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  },ApiHttpService, DataService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
