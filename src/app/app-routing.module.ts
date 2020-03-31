import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as feat from './feat/index';
import * as core from './core/index';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'about',                                          component: core.AboutComponent },
  { path: 'home',                                           component: core.HomeComponent },
  { path: 'help',                                           component: core.HelpComponent },

  { path: 'assessments/list/:cohortId',                     component: feat.AssessmentListComponent },
  { path: 'assessments/detail/:id/:cohortId',               component: feat.AssessmentDetailComponent },
  { path: 'assessments/create/:cohortId',                   component: feat.AssessmentCreateComponent },
  { path: 'assessments/edit/:id/:cohortId',                 component: feat.AssessmentEditComponent },
  { path: 'assessments/listbystudent',                      component: feat.AssessmentStudentListComponent },
        
  { path: 'attendance/checkinout/:id',                      component: feat.AttendanceCheckinoutComponent },
  { path: 'attendance/pincode/:id/:cohortId/:checkedIn',    component: feat.AttendancePincodeComponent },
  { path: 'attendance/checkinout',                          component: feat.AttendanceMenuCheckinoutComponent },
  { path: 'attendance/report/:cohortId',                    component: feat.AttendanceReportComponent },

  { path: 'cohorts/list',                                   component: feat.CohortListComponent },
  { path: 'cohorts/create',                                 component: feat.CohortCreateComponent },
  { path: 'cohorts/detail/:id',                             component: feat.CohortDetailComponent },
  { path: 'cohorts/edit/:id',                               component: feat.CohortEditComponent },
          
  { path: 'configs/list',                                   component: feat.ConfigListComponent },
  { path: 'configs/create',                                 component: feat.ConfigCreateComponent },
  { path: 'configs/edit/:key',                              component: feat.ConfigEditComponent },
          
  { path: 'enrollments/list/:id',                           component: feat.EnrollmentListComponent },
  
  { path: 'evals/list',                                     component: feat.EvaluationListComponent },

  { path: 'feedbacks/list',                                 component: feat.FeedbackListComponent },
  { path: 'feedbacks/create',                               component: feat.FeedbackCreateComponent },
  { path: 'feedbacks/detail/:id',                           component: feat.FeedbackDetailComponent },
  { path: 'feedbacks/edit/:id',                             component: feat.FeedbackEditComponent },

  { path: 'revisions',                                      component: core.RevisionsComponent },

  { path: 'login',                                          component: feat.UserLoginComponent },
  { path: 'users/list',                                     component: feat.UserListComponent },
  { path: 'users/create',                                   component: feat.UserCreateComponent },
  { path: 'users/detail/:id',                               component: feat.UserDetailComponent },
  { path: 'users/edit/:id',                                 component: feat.UserEditComponent },
  
  { path: 'quests/list/:evalid',                            component: feat.QuestionListComponent },
  { path: 'quests/detail/:id',                              component: feat.QuestionDetailComponent },
  { path: 'quests/create/:evalId',                          component: feat.QuestionCreateComponent },
  { path: 'quests/edit/:id',                                component: feat.QuestionEditComponent },
        
  { path: 'roles/list',                                     component: feat.RoleListComponent },
  { path: 'roles/create',                                   component: feat.RoleCreateComponent },
  { path: 'roles/detail/:code',                             component: feat.RoleDetailComponent },
  { path: 'roles/edit/:code',                               component: feat.RoleEditComponent },
          
  { path: '**',                                             component: core.E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
