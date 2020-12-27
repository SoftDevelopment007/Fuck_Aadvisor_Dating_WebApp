import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortImagesModalPage } from './escort-images-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EscortImagesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortImagesModalPageRoutingModule {}
