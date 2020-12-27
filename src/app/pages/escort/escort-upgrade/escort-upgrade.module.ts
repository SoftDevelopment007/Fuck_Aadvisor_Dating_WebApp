import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscortUpgradePageRoutingModule } from './escort-upgrade-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { EscortUpgradePage } from './escort-upgrade.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EscortUpgradePageRoutingModule, ComponentsModule],
  declarations: [EscortUpgradePage]
})
export class EscortUpgradePageModule {}
