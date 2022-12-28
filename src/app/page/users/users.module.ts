import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [MaterialModule, CommonModule, UsersRoutingModule, FormsModule],
})
export class UsersModule {}
