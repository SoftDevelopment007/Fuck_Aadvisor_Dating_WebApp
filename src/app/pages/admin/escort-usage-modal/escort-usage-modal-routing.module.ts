import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortUsageModalPage } from './escort-usage-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EscortUsageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortUsageModalPageRoutingModule {}
