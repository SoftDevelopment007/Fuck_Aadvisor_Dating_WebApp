import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordModalPageRoutingModule } from './reset-password-modal-routing.module';

import { ResetPasswordModalPage } from './reset-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordModalPageRoutingModule
  ],
  declarations: [ResetPasswordModalPage]
})
export class ResetPasswordModalPageModule {}
