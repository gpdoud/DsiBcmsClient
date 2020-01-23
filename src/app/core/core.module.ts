import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { E404Component, HomeComponent, AboutComponent, MenuComponent, MenuitemComponent,
          FooterComponent, HelpComponent, SortPipe } from './index';

@NgModule({
  declarations: [
    E404Component, HomeComponent, AboutComponent
    , MenuComponent, MenuitemComponent, FooterComponent, HelpComponent, SortPipe
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    E404Component, HomeComponent, AboutComponent, FooterComponent, HelpComponent
    , MenuComponent, MenuitemComponent, SortPipe
  ]
})
export class CoreModule { }
