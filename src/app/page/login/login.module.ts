import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MaterialModule,
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LoginModule {}
