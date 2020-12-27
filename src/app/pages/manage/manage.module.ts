import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ManagePageRoutingModule } from './manage-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { ManagePage } from './manage.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, ManagePageRoutingModule, ComponentsModule],
  declarations: [ManagePage]
})
export class ManagePageModule {}
