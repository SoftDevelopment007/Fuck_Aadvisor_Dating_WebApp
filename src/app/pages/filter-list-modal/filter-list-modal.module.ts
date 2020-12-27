import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterListModalPageRoutingModule } from './filter-list-modal-routing.module';

import { FilterListModalPage } from './filter-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterListModalPageRoutingModule
  ],
  declarations: [FilterListModalPage]
})
export class FilterListModalPageModule {}
