import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';

@NgModule({
  declarations: [
    MenuComponent, MenuitemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent, MenuitemComponent
  ]
})
export class MenuModule { }
