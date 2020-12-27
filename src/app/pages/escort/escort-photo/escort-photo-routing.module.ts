import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortPhotoPage } from './escort-photo.page';

const routes: Routes = [
  {
    path: '',
    component: EscortPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortPhotoPageRoutingModule {}
