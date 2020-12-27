import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaFilterModalPageRoutingModule } from './area-filter-modal-routing.module';
import { SuburbsListModalPageModule } from '../suburbs-list-modal/suburbs-list-modal.module';

import { AreaFilterModalPage } from './area-filter-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AreaFilterModalPageRoutingModule, SuburbsListModalPageModule],
  declarations: [AreaFilterModalPage]
})
export class AreaFilterModalPageModule {}
