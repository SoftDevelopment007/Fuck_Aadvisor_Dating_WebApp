import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminGuidesPageRoutingModule } from './admin-guides-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { AdminGuidesPage } from './admin-guides.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminGuidesPageRoutingModule, NgxPaginationModule, PipesModule],
  declarations: [AdminGuidesPage]
})
export class AdminGuidesPageModule {}
