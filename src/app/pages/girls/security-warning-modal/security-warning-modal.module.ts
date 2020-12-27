import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityWarningModalPageRoutingModule } from './security-warning-modal-routing.module';

import { SecurityWarningModalPage } from './security-warning-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityWarningModalPageRoutingModule
  ],
  declarations: [SecurityWarningModalPage]
})
export class SecurityWarningModalPageModule {}
