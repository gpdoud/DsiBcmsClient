import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import * as auth from './auth/index';

const routes: Routes = [
  { path: '', redirectTo: '/user/list', pathMatch: 'full' },
  { path: 'users/list', component: auth.UserListComponent },
  { path: '**', component: auth.E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
