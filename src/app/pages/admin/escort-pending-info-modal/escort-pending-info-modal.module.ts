import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortPendingInfoModalPageRoutingModule } from './escort-pending-info-modal-routing.module';

import { EscortPendingInfoModalPage } from './escort-pending-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortPendingInfoModalPageRoutingModule
  ],
  declarations: [EscortPendingInfoModalPage]
})
export class EscortPendingInfoModalPageModule {}
