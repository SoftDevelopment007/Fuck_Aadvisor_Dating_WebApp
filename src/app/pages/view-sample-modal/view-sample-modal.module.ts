import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSampleModalPageRoutingModule } from './view-sample-modal-routing.module';

import { ViewSampleModalPage } from './view-sample-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSampleModalPageRoutingModule
  ],
  declarations: [ViewSampleModalPage]
})
export class ViewSampleModalPageModule {}
