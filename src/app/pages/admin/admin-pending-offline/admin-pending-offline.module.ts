import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPendingOfflinePageRoutingModule } from './admin-pending-offline-routing.module';

import { AdminPendingOfflinePage } from './admin-pending-offline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPendingOfflinePageRoutingModule
  ],
  declarations: [AdminPendingOfflinePage]
})
export class AdminPendingOfflinePageModule {}
