import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { AuthService } from '../../auth.service';
import { SignUpPage } from './sign-up.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignUpPageRoutingModule],
  declarations: [SignUpPage],
  providers: [AuthService],
})
export class SignUpPageModule {}
