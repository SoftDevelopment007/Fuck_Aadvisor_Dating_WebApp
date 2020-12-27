import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageRoutingModule } from './login-routing.module';
import { RegisterPageModule } from '../register/register.module';
import { ForgotPasswordModalPageModule } from '../forgot-password-modal/forgot-password-modal.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    LoginPageRoutingModule,
    RegisterPageModule,
    ForgotPasswordModalPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
