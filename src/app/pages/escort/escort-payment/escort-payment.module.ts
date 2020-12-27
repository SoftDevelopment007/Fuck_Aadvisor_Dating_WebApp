import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortPaymentPageRoutingModule } from './escort-payment-routing.module';
import { BrMaskerModule } from 'br-mask';

import { EscortPaymentPage } from './escort-payment.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortPaymentPageRoutingModule, BrMaskerModule],
  declarations: [EscortPaymentPage]
})
export class EscortPaymentPageModule {}
