import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIdModalPage } from './view-id-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewIdModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewIdModalPageRoutingModule {}
