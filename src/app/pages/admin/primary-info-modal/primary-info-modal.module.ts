import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimaryInfoModalPageRoutingModule } from './primary-info-modal-routing.module';
import { BrMaskerModule } from 'br-mask';

import { PrimaryInfoModalPage } from './primary-info-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PrimaryInfoModalPageRoutingModule, BrMaskerModule],
  declarations: [PrimaryInfoModalPage]
})
export class PrimaryInfoModalPageModule {}
