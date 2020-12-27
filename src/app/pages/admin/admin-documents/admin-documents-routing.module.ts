import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDocumentsPage } from './admin-documents.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDocumentsPageRoutingModule {}
