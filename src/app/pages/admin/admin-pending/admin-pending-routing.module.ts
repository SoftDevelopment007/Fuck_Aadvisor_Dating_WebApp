import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPendingPage } from './admin-pending.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPendingPageRoutingModule {}
