import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortCompletePage } from './escort-complete.page';

const routes: Routes = [
  {
    path: '',
    component: EscortCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortCompletePageRoutingModule {}
