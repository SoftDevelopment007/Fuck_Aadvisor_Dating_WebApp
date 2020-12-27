import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuburbsListModalPage } from './suburbs-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SuburbsListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuburbsListModalPageRoutingModule {}
