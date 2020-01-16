import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import * as menu from './menu/index';
import { AuthModule } from './auth/auth.module';
import * as auth from './auth/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, menu.MenuComponent, menu.MenuitemComponent,
    auth.UserListComponent,
    auth.E404Component
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
