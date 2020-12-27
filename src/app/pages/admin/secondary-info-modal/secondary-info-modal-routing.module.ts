import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondaryInfoModalPage } from './secondary-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SecondaryInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondaryInfoModalPageRoutingModule {}
