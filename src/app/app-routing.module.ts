import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as feat from './feat/index';
import * as core from './core/index';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'about',  component: core.AboutComponent },
  { path: 'home',   component: core.HomeComponent },
  { path: 'help',   component: core.HelpComponent },

  { path: 'login',            component: feat.UserLoginComponent },
  { path: 'users/list',       component: feat.UserListComponent },
  { path: 'users/create',     component: feat.UserCreateComponent },
  { path: 'users/detail/:id', component: feat.UserDetailComponent },
  { path: 'users/edit/:id',   component: feat.UserEditComponent },
  
  { path: '**', component: core.E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
