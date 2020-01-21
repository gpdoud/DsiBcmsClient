import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { E404Component, HomeComponent, AboutComponent, MenuComponent, MenuitemComponent } from './index';

@NgModule({
  declarations: [
    E404Component, HomeComponent, AboutComponent
    , MenuComponent, MenuitemComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    E404Component, HomeComponent, AboutComponent
    , MenuComponent, MenuitemComponent
  ]
})
export class CoreModule { }
