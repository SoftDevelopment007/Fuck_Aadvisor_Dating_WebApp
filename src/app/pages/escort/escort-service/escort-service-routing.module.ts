import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortServicePage } from './escort-service.page';

const routes: Routes = [
  {
    path: '',
    component: EscortServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortServicePageRoutingModule {}
