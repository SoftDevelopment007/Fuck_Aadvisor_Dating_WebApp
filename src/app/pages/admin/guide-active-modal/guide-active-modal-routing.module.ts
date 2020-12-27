import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuideActiveModalPage } from './guide-active-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GuideActiveModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideActiveModalPageRoutingModule {}
