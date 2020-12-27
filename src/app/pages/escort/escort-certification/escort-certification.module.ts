import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortCertificationPageRoutingModule } from './escort-certification-routing.module';

import { EscortCertificationPage } from './escort-certification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscortCertificationPageRoutingModule
  ],
  declarations: [EscortCertificationPage]
})
export class EscortCertificationPageModule {}
