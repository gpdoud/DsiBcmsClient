import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import * as feat from './feat/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatModule } from './feat/feat.module';
import { CoreModule } from './core/core.module';
import { AppInitService } from './app-init.service';

export const startupServiceFactory = (appinit: AppInitService) => {
  return () => appinit.getSettings();
}


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, FeatModule, CoreModule,
    AppRoutingModule
  ],
  providers: [
    AppInitService, { 
      provide: APP_INITIALIZER, 
      useFactory: startupServiceFactory, 
        deps: [AppInitService], 
        multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
