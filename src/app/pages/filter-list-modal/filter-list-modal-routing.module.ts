import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterListModalPage } from './filter-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FilterListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterListModalPageRoutingModule {}
