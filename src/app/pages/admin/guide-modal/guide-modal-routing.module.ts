import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuideModalPage } from './guide-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GuideModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideModalPageRoutingModule {}
