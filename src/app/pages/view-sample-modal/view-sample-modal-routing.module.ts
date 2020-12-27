import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSampleModalPage } from './view-sample-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSampleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSampleModalPageRoutingModule {}
