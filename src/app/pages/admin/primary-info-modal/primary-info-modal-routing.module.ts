import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimaryInfoModalPage } from './primary-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PrimaryInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimaryInfoModalPageRoutingModule {}
