import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondaryInfoModalPageRoutingModule } from './secondary-info-modal-routing.module';

import { SecondaryInfoModalPage } from './secondary-info-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SecondaryInfoModalPageRoutingModule],
  declarations: [SecondaryInfoModalPage]
})
export class SecondaryInfoModalPageModule {}
