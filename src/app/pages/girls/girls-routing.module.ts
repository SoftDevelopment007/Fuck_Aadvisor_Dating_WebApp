import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GirlsPage } from './girls.page';

const routes: Routes = [
  {
    path: '',
    component: GirlsPage
  },
  {
    path: ':id',
    loadChildren: () => import('./girl-profile/girl-profile.module').then(m => m.GirlProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GirlsPageRoutingModule {}
