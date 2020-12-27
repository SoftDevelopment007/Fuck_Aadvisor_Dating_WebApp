import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPendingOfflinePage } from './admin-pending-offline.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPendingOfflinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPendingOfflinePageRoutingModule {}
