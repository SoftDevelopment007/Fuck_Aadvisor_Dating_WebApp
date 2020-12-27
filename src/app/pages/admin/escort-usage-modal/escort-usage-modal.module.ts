import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortUsageModalPageRoutingModule } from './escort-usage-modal-routing.module';

import { EscortUsageModalPage } from './escort-usage-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortUsageModalPageRoutingModule
  ],
  declarations: [EscortUsageModalPage]
})
export class EscortUsageModalPageModule {}
