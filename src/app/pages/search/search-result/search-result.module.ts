import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResultPageRoutingModule } from './search-result-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { SearchResultPage } from './search-result.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SearchResultPageRoutingModule, ComponentsModule],
  declarations: [SearchResultPage]
})
export class SearchResultPageModule {}
