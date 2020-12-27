import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortDescPageRoutingModule } from './escort-desc-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortDescPage } from './escort-desc.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortDescPageRoutingModule, ComponentsModule],
  declarations: [EscortDescPage]
})
export class EscortDescPageModule {}
