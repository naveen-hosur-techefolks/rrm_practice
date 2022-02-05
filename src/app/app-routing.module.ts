import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'catalog', loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'about-us', loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'approach', loadChildren: () => import('./modules/approach/approach.module').then(m => m.ApproachModule) },
  { path: 'contact-us', loadChildren: () => import('./modules/contact-us/contact-us.module').then(m => m.ContactUsModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },



  { path: '', redirectTo: '/home', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
