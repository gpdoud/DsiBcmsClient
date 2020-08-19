import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { E404Component, HomeComponent, AboutComponent, MenuComponent, MenuitemComponent,
          FooterComponent, HelpComponent, SortPipe, BoolDisplayPipe, MenuSecurityPipe, 
          NotifyComponent, RevisionsComponent, DevTeamComponent, 
          LogListComponent, LogDetailComponent, LogCreateComponent, LogEditComponent, LogSearchPipe, FilterActivePipe
        } from './index';


@NgModule({
  declarations: [
    E404Component, HomeComponent, AboutComponent
    , MenuComponent, MenuitemComponent, FooterComponent, HelpComponent, SortPipe, BoolDisplayPipe
    , MenuSecurityPipe, NotifyComponent, RevisionsComponent, DevTeamComponent
    , LogListComponent, LogDetailComponent, LogCreateComponent, LogEditComponent, LogSearchPipe, FilterActivePipe
  ],
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  exports: [
    E404Component, HomeComponent, AboutComponent, FooterComponent, HelpComponent
    , MenuComponent, MenuitemComponent, SortPipe, BoolDisplayPipe, NotifyComponent
    , MenuSecurityPipe, NotifyComponent, RevisionsComponent, DevTeamComponent
    , LogListComponent, LogDetailComponent, LogCreateComponent, LogEditComponent, LogSearchPipe, FilterActivePipe
  ]
})
export class CoreModule { }
