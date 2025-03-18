import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { GoogleButtonComponent } from 'src/app/ui/google-button/google-button.component';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    GoogleButtonComponent,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
