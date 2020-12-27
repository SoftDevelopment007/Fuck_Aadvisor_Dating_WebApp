import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuidesPage } from './admin-guides.page';

const routes: Routes = [
  {
    path: '',
    component: AdminGuidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGuidesPageRoutingModule {}
