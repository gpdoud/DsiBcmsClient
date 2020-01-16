import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as auth from './index';
import { E404Component } from './e404/e404.component';

@NgModule({
  declarations: [
    auth.UserListComponent,
    E404Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    auth.UserListComponent
  ]
})
export class AuthModule { }
