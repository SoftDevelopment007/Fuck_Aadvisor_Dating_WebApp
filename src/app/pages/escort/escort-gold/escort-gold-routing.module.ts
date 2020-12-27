import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortGoldPage } from './escort-gold.page';

const routes: Routes = [
  {
    path: '',
    component: EscortGoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortGoldPageRoutingModule {}
