import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PipesModule } from '../pipes/pipes.module';

import { FuckHeaderComponent } from './fuck-header/fuck-header.component';
import { EscortHeaderComponent } from './escort-header/escort-header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FuckGuideComponent } from './fuck-guide/fuck-guide.component';
import { FuckFactsComponent } from './fuck-facts/fuck-facts.component';
import { EscortUpgradePopoverComponent } from './escort-upgrade-popover/escort-upgrade-popover.component';

@NgModule({
  declarations: [
    FuckHeaderComponent,
    EscortHeaderComponent,
    ProgressBarComponent,
    FuckGuideComponent,
    FuckFactsComponent,
    EscortUpgradePopoverComponent
  ],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([]), TranslateModule, PipesModule],
  exports: [
    FuckHeaderComponent,
    EscortHeaderComponent,
    ProgressBarComponent,
    FuckGuideComponent,
    FuckFactsComponent,
    EscortUpgradePopoverComponent
  ]
})
export class ComponentsModule {}
