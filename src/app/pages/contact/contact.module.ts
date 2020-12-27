import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ContactPage } from './contact.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContactPageRoutingModule, PipesModule],
  declarations: [ContactPage]
})
export class ContactPageModule {}
