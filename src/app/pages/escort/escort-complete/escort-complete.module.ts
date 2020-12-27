import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortCompletePageRoutingModule } from './escort-complete-routing.module';

import { EscortCompletePage } from './escort-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortCompletePageRoutingModule
  ],
  declarations: [EscortCompletePage]
})
export class EscortCompletePageModule {}
