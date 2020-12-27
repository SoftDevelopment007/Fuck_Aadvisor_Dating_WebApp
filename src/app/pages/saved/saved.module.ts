import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SavedPageRoutingModule } from './saved-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { SavedPage } from './saved.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, SavedPageRoutingModule, ComponentsModule],
  declarations: [SavedPage]
})
export class SavedPageModule {}
