import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIdModalPageRoutingModule } from './view-id-modal-routing.module';

import { ViewIdModalPage } from './view-id-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewIdModalPageRoutingModule
  ],
  declarations: [ViewIdModalPage]
})
export class ViewIdModalPageModule {}
