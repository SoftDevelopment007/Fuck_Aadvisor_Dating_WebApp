import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortPersonalPage } from './escort-personal.page';

const routes: Routes = [
  {
    path: '',
    component: EscortPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortPersonalPageRoutingModule {}
