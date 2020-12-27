import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortBecomePageRoutingModule } from './escort-become-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BrMaskerModule } from 'br-mask';

import { ViewSampleModalPageModule } from '../view-sample-modal/view-sample-modal.module';
import { CartModalPageModule } from '../cart-modal/cart-modal.module';

import { EscortBecomePage } from './escort-become.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortBecomePageRoutingModule,
    PipesModule,
    BrMaskerModule,
    ViewSampleModalPageModule,
    CartModalPageModule
  ],
  declarations: [EscortBecomePage]
})
export class EscortBecomePageModule {}
