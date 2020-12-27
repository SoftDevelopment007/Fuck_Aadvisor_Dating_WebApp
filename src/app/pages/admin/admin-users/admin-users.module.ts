import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersPageRoutingModule } from './admin-users-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminUsersPage } from './admin-users.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminUsersPageRoutingModule, NgxPaginationModule],
  declarations: [AdminUsersPage]
})
export class AdminUsersPageModule {}
