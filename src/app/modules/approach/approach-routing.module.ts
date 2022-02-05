import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproachComponent } from './approach/approach.component';

const routes: Routes = [
  { path: '', component: ApproachComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproachRoutingModule { }
