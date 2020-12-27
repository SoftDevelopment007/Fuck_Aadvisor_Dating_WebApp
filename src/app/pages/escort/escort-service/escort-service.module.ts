import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

import { EscortServicePageRoutingModule } from './escort-service-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortServicePage } from './escort-service.page';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: '.',
  precision: 0,
  prefix: '$ ',
  suffix: '',
  thousands: ','
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyMaskModule,
    EscortServicePageRoutingModule,
    ComponentsModule
  ],
  declarations: [EscortServicePage],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }]
})
export class EscortServicePageModule {}
