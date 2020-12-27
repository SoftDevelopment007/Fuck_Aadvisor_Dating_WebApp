import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPendingOnlinePage } from './admin-pending-online.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPendingOnlinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPendingOnlinePageRoutingModule {}
