import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortGoldPageRoutingModule } from './escort-gold-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortGoldPage } from './escort-gold.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortGoldPageRoutingModule, ComponentsModule],
  declarations: [EscortGoldPage]
})
export class EscortGoldPageModule {}
