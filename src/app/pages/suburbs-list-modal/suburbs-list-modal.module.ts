import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuburbsListModalPageRoutingModule } from './suburbs-list-modal-routing.module';

import { SuburbsListModalPage } from './suburbs-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuburbsListModalPageRoutingModule
  ],
  declarations: [SuburbsListModalPage]
})
export class SuburbsListModalPageModule {}
