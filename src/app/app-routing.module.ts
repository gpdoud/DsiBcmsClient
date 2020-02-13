import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as feat from './feat/index';
import * as core from './core/index';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'about',                                  component: core.AboutComponent },
  { path: 'home',                                   component: core.HomeComponent },
  { path: 'help',                                   component: core.HelpComponent },
        
  { path: 'attendance/checkinout/:id',              component: feat.AttendanceCheckinoutComponent },
  { path: 'attendance/pincode/:id/:cohortId/:checkedIn', component: feat.AttendancePincodeComponent },
  { path: 'attendance/checkinout',                  component: feat.AttendanceMenuCheckinoutComponent },

  { path: 'cohorts/list',                           component: feat.CohortListComponent },
  { path: 'cohorts/create',                         component: feat.CohortCreateComponent },
  { path: 'cohorts/detail/:id',                     component: feat.CohortDetailComponent },
  { path: 'cohorts/edit/:id',                       component: feat.CohortEditComponent },
          
  { path: 'configs/list',                           component: feat.ConfigListComponent },
  { path: 'configs/create',                         component: feat.ConfigCreateComponent },
  { path: 'configs/edit/:key',                      component: feat.ConfigEditComponent },
          
  { path: 'enrollments/list/:id',                   component: feat.EnrollmentListComponent },
        
  { path: 'login',                                  component: feat.UserLoginComponent },
  { path: 'users/list',                             component: feat.UserListComponent },
  { path: 'users/create',                           component: feat.UserCreateComponent },
  { path: 'users/detail/:id',                       component: feat.UserDetailComponent },
  { path: 'users/edit/:id',                         component: feat.UserEditComponent },
        
  { path: 'roles/list',                             component: feat.RoleListComponent },
  { path: 'roles/create',                           component: feat.RoleCreateComponent },
  { path: 'roles/detail/:code',                     component: feat.RoleDetailComponent },
  { path: 'roles/edit/:code',                       component: feat.RoleEditComponent },
          
  { path: '**',                                     component: core.E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
