import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from 'src/app/pages/login-page/components/login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPageComponent } from './register-page/register-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginPageModule { }
