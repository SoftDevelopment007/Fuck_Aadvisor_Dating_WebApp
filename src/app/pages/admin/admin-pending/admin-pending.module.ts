import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPendingPageRoutingModule } from './admin-pending-routing.module';

import { AdminPendingPage } from './admin-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPendingPageRoutingModule
  ],
  declarations: [AdminPendingPage]
})
export class AdminPendingPageModule {}
