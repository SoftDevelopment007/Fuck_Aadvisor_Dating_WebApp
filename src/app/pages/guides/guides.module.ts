import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { GuidesPageRoutingModule } from './guides-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { GuidesPage } from './guides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NgxPaginationModule,
    GuidesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GuidesPage]
})
export class GuidesPageModule {}
