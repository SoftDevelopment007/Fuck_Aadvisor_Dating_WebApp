import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortPhotoPageRoutingModule } from './escort-photo-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortPhotoPage } from './escort-photo.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortPhotoPageRoutingModule, ComponentsModule],
  declarations: [EscortPhotoPage]
})
export class EscortPhotoPageModule {}
