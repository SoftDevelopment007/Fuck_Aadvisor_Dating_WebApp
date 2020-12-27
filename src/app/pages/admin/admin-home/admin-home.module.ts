import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminHomePageRoutingModule } from './admin-home-routing.module';
import { HomepageBannerModalPageModule } from '../homepage-banner-modal/homepage-banner-modal.module';

import { AdminHomePage } from './admin-home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminHomePageRoutingModule, HomepageBannerModalPageModule],
  declarations: [AdminHomePage]
})
export class AdminHomePageModule {}
