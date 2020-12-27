import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranslationSettingPage } from './translation-setting.page';

const routes: Routes = [
  {
    path: '',
    component: TranslationSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationSettingPageRoutingModule {}
