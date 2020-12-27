import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuideModalPageRoutingModule } from './guide-modal-routing.module';

import { GuideModalPage } from './guide-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuideModalPageRoutingModule
  ],
  declarations: [GuideModalPage]
})
export class GuideModalPageModule {}
