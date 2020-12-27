import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepageBannerModalPageRoutingModule } from './homepage-banner-modal-routing.module';

import { HomepageBannerModalPage } from './homepage-banner-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepageBannerModalPageRoutingModule
  ],
  declarations: [HomepageBannerModalPage]
})
export class HomepageBannerModalPageModule {}
