import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { E404Component, HomeComponent, AboutComponent, MenuComponent, MenuitemComponent,
          FooterComponent, HelpComponent, SortPipe, BoolDisplayPipe, MenuSecurityPipe, 
          NotifyComponent, RevisionsComponent, DevTeamComponent } from './index';


@NgModule({
  declarations: [
    E404Component, HomeComponent, AboutComponent
    , MenuComponent, MenuitemComponent, FooterComponent, HelpComponent, SortPipe, BoolDisplayPipe
    , MenuSecurityPipe, NotifyComponent, RevisionsComponent, DevTeamComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    E404Component, HomeComponent, AboutComponent, FooterComponent, HelpComponent
    , MenuComponent, MenuitemComponent, SortPipe, BoolDisplayPipe, NotifyComponent
    , MenuSecurityPipe, NotifyComponent, RevisionsComponent, DevTeamComponent
  ]
})
export class CoreModule { }
