import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscortBecomePage } from './escort-become.page';

const routes: Routes = [
  {
    path: '',
    component: EscortBecomePage
  },
  {
    path: 'certification',
    loadChildren: () =>
      import('./escort-certification/escort-certification.module').then(m => m.EscortCertificationPageModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./escort-photo/escort-photo.module').then(m => m.EscortPhotoPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./escort-personal/escort-personal.module').then(m => m.EscortPersonalPageModule)
  },
  {
    path: 'desc',
    loadChildren: () => import('./escort-desc/escort-desc.module').then(m => m.EscortDescPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./escort-service/escort-service.module').then(m => m.EscortServicePageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./escort-schedule/escort-schedule.module').then(m => m.EscortSchedulePageModule)
  },
  {
    path: 'gold',
    loadChildren: () => import('./escort-gold/escort-gold.module').then(m => m.EscortGoldPageModule)
  },
  {
    path: 'upgrade',
    loadChildren: () => import('./escort-upgrade/escort-upgrade.module').then(m => m.EscortUpgradePageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./escort-payment/escort-payment.module').then(m => m.EscortPaymentPageModule)
  },
  {
    path: 'complete',
    loadChildren: () => import('./escort-complete/escort-complete.module').then(m => m.EscortCompletePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscortBecomePageRoutingModule {}
