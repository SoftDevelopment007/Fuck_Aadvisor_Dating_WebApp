import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPendingOnlinePageRoutingModule } from './admin-pending-online-routing.module';

import { AdminPendingOnlinePage } from './admin-pending-online.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPendingOnlinePageRoutingModule
  ],
  declarations: [AdminPendingOnlinePage]
})
export class AdminPendingOnlinePageModule {}
