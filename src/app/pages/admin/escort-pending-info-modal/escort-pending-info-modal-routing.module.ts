import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortPendingInfoModalPage } from './escort-pending-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EscortPendingInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortPendingInfoModalPageRoutingModule {}
