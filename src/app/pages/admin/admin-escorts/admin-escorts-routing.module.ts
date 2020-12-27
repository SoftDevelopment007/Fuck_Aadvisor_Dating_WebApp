import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEscortsPage } from './admin-escorts.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEscortsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEscortsPageRoutingModule {}
