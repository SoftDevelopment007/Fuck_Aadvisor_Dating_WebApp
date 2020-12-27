import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortSchedulePageRoutingModule } from './escort-schedule-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortSchedulePage } from './escort-schedule.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortSchedulePageRoutingModule, ComponentsModule],
  declarations: [EscortSchedulePage]
})
export class EscortSchedulePageModule {}
