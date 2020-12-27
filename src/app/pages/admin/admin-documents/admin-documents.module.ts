import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDocumentsPageRoutingModule } from './admin-documents-routing.module';

import { AdminDocumentsPage } from './admin-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDocumentsPageRoutingModule
  ],
  declarations: [AdminDocumentsPage]
})
export class AdminDocumentsPageModule {}
