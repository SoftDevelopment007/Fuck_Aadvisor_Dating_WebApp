import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortPaymentPage } from './escort-payment.page';

const routes: Routes = [
  {
    path: '',
    component: EscortPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortPaymentPageRoutingModule {}
