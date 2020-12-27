import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { GirlsPageRoutingModule } from './girls-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AreaFilterModalPageModule } from '../area-filter-modal/area-filter-modal.module';

import { GirlsPage } from './girls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NgxPaginationModule,
    GirlsPageRoutingModule,
    ComponentsModule,
    AreaFilterModalPageModule
  ],
  declarations: [GirlsPage]
})
export class GirlsPageModule {}
