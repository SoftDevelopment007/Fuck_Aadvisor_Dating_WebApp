import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEscortsPageRoutingModule } from './admin-escorts-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';
import { EscortUsageModalPageModule } from '../escort-usage-modal/escort-usage-modal.module';

import { AdminEscortsPage } from './admin-escorts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEscortsPageRoutingModule,
    NgxPaginationModule,
    ComponentsModule,
    EscortUsageModalPageModule
  ],
  declarations: [AdminEscortsPage]
})
export class AdminEscortsPageModule {}
