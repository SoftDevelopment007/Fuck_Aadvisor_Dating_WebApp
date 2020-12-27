import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortVideoModalPageRoutingModule } from './escort-video-modal-routing.module';

import { EscortVideoModalPage } from './escort-video-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortVideoModalPageRoutingModule
  ],
  declarations: [EscortVideoModalPage]
})
export class EscortVideoModalPageModule {}
