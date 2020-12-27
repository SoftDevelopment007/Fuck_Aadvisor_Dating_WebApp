import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortUpgradePage } from './escort-upgrade.page';

const routes: Routes = [
  {
    path: '',
    component: EscortUpgradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscortUpgradePageRoutingModule {}
