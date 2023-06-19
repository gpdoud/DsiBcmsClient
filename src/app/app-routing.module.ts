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

  { path: 'calendars/list',                                 component: feat.CalendarListComponent },
  { path: 'calendars/create',                               component: feat.CalendarCreateComponent },
  { path: 'calendars/detail/:id',                           component: feat.CalendarDetailComponent },
  { path: 'calendars/edit/:id',                             component: feat.CalendarChangeComponent },

  { path: 'calendarDays/list',                              component: feat.CalendarDayListComponent },
  { path: 'calendarDays/create',                            component: feat.CalendarDayCreateComponent },
  { path: 'calendarDays/detail/:id',                        component: feat.CalendarDayDetailComponent },
  { path: 'calendarDays/edit/:id',                          component: feat.CalendarDayChangeComponent },

  { path: 'cohorts/list',                                   component: feat.CohortListComponent },
  { path: 'cohorts/create',                                 component: feat.CohortCreateComponent },
  { path: 'cohorts/detail/:id',                             component: feat.CohortDetailComponent },
  { path: 'cohorts/edit/:id',                               component: feat.CohortEditComponent },
  { path: 'cohorts/instructors/:id',                        component: feat.CohortInstructorComponent },
          
  { path: 'configs/list',                                   component: feat.ConfigListComponent },
  { path: 'configs/create',                                 component: feat.ConfigCreateComponent },
  { path: 'configs/edit/:key',                              component: feat.ConfigEditComponent },
          
  { path: 'enrollments/list/:id',                           component: feat.EnrollmentListComponent },

  { path: 'devteam',                                        component: core.DevTeamComponent },
  
  { path: 'evals/list',                                     component: feat.EvaluationListComponent },
  { path: 'evals/detail/:id',                               component: feat.EvaluationDetailComponent },
  { path: 'evals/create',                                   component: feat.EvaluationCreateComponent },
  { path: 'evals/edit/:id',                                 component: feat.EvaluationEditComponent },
  { path: 'evals/take/:id',                                 component: feat.EvaluationTakeComponent },
  { path: 'evals/stud/list',                                component: feat.EvaluationStudentListComponent },
  { path: 'evals/review/:id',                               component: feat.EvaluationReviewComponent },
  { path: 'evals/assign/:id',                               component: feat.EvaluationAssignComponent },

  { path: 'feedbacks/list',                                 component: feat.FeedbackListComponent },
  { path: 'feedbacks/create',                               component: feat.FeedbackCreateComponent },
  { path: 'feedbacks/detail/:id',                           component: feat.FeedbackDetailComponent },
  { path: 'feedbacks/edit/:id',                             component: feat.FeedbackEditComponent },
  
  { path: 'intructorCohort/add/:cohortId',                  component: feat.InstructorCohortAddInstructorComponent },

  { path: 'kbs/list',                                       component: feat.KbListComponent },
  { path: 'kbs/create',                                     component: feat.KbCreateComponent },
  { path: 'kbs/detail/:id',                                 component: feat.KbDetailComponent },
  { path: 'kbs/edit/:id',                                   component: feat.KbEditComponent },

  { path: 'kbcats/list',                                    component: feat.KbCategoryListComponent },
  { path: 'kbcats/create',                                  component: feat.KbCategoryCreateComponent },
  { path: 'kbcats/edit/:id',                                component: feat.KbCategoryEditComponent },
//  { path: 'kbcats/detail/:id',                               component: feat.KbDetailComponent },

  { path: 'logs/list',                                      component: core.LogListComponent },
  { path: 'logs/create',                                    component: core.LogCreateComponent },
  { path: 'logs/detail/:id',                                component: core.LogDetailComponent },
  { path: 'logs/edit/:id',                                  component: core.LogEditComponent },

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

  { path: 'commentaries/list/:studentId',                           component: feat.CommentaryListComponent },
  { path: 'commentaries/create/:studentId',                  component: feat.CommentaryCreateComponent },
  { path: 'commentaries/detail/:id',                         component: feat.CommentaryDetailComponent },
  { path: 'commentaries/edit/:id',                           component: feat.CommentaryEditComponent },
          
  { path: '**',                                             component: core.E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
