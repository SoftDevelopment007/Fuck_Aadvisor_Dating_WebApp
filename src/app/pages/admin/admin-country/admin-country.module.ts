import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCountryPageRoutingModule } from './admin-country-routing.module';

import { AdminCountryPage } from './admin-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCountryPageRoutingModule
  ],
  declarations: [AdminCountryPage]
})
export class AdminCountryPageModule {}
