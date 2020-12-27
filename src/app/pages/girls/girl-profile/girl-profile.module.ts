import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { GirlProfilePageRoutingModule } from './girl-profile-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SecurityWarningModalPageModule } from '../security-warning-modal/security-warning-modal.module';

import { GirlProfilePage } from './girl-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GirlProfilePageRoutingModule,
    ComponentsModule,
    SecurityWarningModalPageModule
  ],
  declarations: [GirlProfilePage]
})
export class GirlProfilePageModule {}
