import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortImagesModalPageRoutingModule } from './escort-images-modal-routing.module';

import { EscortImagesModalPage } from './escort-images-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortImagesModalPageRoutingModule
  ],
  declarations: [EscortImagesModalPage]
})
export class EscortImagesModalPageModule {}
