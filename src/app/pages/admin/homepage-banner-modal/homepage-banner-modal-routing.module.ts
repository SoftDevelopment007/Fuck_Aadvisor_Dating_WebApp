import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageBannerModalPage } from './homepage-banner-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HomepageBannerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageBannerModalPageRoutingModule {}
