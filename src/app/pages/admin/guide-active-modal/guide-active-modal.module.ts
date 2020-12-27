import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuideActiveModalPageRoutingModule } from './guide-active-modal-routing.module';

import { GuideActiveModalPage } from './guide-active-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuideActiveModalPageRoutingModule
  ],
  declarations: [GuideActiveModalPage]
})
export class GuideActiveModalPageModule {}
