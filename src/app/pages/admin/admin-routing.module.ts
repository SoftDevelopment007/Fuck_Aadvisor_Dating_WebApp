import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'admin-pending',
    loadChildren: () => import('./admin-pending/admin-pending.module').then(m => m.AdminPendingPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-pending-offline',
    loadChildren: () =>
      import('./admin-pending-offline/admin-pending-offline.module').then(m => m.AdminPendingOfflinePageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-pending-online',
    loadChildren: () =>
      import('./admin-pending-online/admin-pending-online.module').then(m => m.AdminPendingOnlinePageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-notification',
    loadChildren: () =>
      import('./admin-notification/admin-notification.module').then(m => m.AdminNotificationPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-escorts',
    loadChildren: () => import('./admin-escorts/admin-escorts.module').then(m => m.AdminEscortsPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-guides',
    loadChildren: () => import('./admin-guides/admin-guides.module').then(m => m.AdminGuidesPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-documents',
    loadChildren: () => import('./admin-documents/admin-documents.module').then(m => m.AdminDocumentsPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-country',
    loadChildren: () => import('./admin-country/admin-country.module').then(m => m.AdminCountryPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then(m => m.AdminHomePageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin-settings',
    loadChildren: () => import('./admin-settings/admin-settings.module').then(m => m.AdminSettingsPageModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'escort-images-modal',
    loadChildren: () =>
      import('./escort-images-modal/escort-images-modal.module').then(m => m.EscortImagesModalPageModule)
  },
  {
    path: 'escort-pending-info-modal',
    loadChildren: () =>
      import('./escort-pending-info-modal/escort-pending-info-modal.module').then(
        m => m.EscortPendingInfoModalPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}
