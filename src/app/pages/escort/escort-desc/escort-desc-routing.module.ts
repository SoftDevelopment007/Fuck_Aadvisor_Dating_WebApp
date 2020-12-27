import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortDescPage } from './escort-desc.page';

const routes: Routes = [
  {
    path: '',
    component: EscortDescPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortDescPageRoutingModule {}
