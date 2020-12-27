import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortVideoModalPage } from './escort-video-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EscortVideoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortVideoModalPageRoutingModule {}
