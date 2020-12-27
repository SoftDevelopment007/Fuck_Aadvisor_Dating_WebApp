import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GirlProfilePage } from './girl-profile.page';

const routes: Routes = [
  {
    path: '',
    component: GirlProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GirlProfilePageRoutingModule {}
