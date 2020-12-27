import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortCertificationPage } from './escort-certification.page';

const routes: Routes = [
  {
    path: '',
    component: EscortCertificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortCertificationPageRoutingModule {}
