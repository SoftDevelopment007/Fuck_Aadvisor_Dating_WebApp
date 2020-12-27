import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCountryPage } from './admin-country.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCountryPageRoutingModule {}
