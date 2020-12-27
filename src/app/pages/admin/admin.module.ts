import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';
import { ViewIdModalPageModule } from './view-id-modal/view-id-modal.module';
import { EscortVideoModalPageModule } from './escort-video-modal/escort-video-modal.module';
import { EscortPendingInfoModalPageModule } from './escort-pending-info-modal/escort-pending-info-modal.module';
import { PrimaryInfoModalPageModule } from './primary-info-modal/primary-info-modal.module';
import { SecondaryInfoModalPageModule } from './secondary-info-modal/secondary-info-modal.module';
import { GuideModalPageModule } from './guide-modal/guide-modal.module';
import { GuideActiveModalPageModule } from './guide-active-modal/guide-active-modal.module';
import { ResetPasswordModalPageModule } from './reset-password-modal/reset-password-modal.module';

import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminPageRoutingModule,
    ViewIdModalPageModule,
    EscortVideoModalPageModule,
    EscortPendingInfoModalPageModule,
    PrimaryInfoModalPageModule,
    SecondaryInfoModalPageModule,
    GuideModalPageModule,
    GuideActiveModalPageModule,
    ResetPasswordModalPageModule
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
