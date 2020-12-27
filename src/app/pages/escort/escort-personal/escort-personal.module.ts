import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortPersonalPageRoutingModule } from './escort-personal-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortPersonalPage } from './escort-personal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortPersonalPageRoutingModule, ComponentsModule],
  declarations: [EscortPersonalPage]
})
export class EscortPersonalPageModule {}
