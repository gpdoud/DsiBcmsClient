import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { UserListComponent, UserDetailComponent, UserCreateComponent, UserEditComponent, UserLoginComponent, UserSearchPipe,
            RoleListComponent, RoleDetailComponent, RoleEditComponent, RoleCreateComponent, RoleSearchPipe,
            ConfigListComponent, ConfigSearchPipe, ConfigEditComponent, ConfigCreateComponent,
            CohortListComponent, CohortDetailComponent, CohortEditComponent, CohortCreateComponent, CohortSearchPipe, 
            EnrollmentListComponent, EnrollmentSearchPipe, 
            EvaluationListComponent, EvaluationDetailComponent, EvaluationCreateComponent, EvaluationEditComponent, EvaluationTakeComponent,
            EvaluationStudentListComponent, EvaluationReviewComponent, 
            AttendanceCheckinoutComponent, AttendanceStudentComponent, AttendancePincodeComponent, AttendanceMenuCheckinoutComponent,
            BcmsComponent, BcmsListComponent,
            AssessmentListComponent, AssessmentDetailComponent, AssessmentEditComponent, AssessmentCreateComponent, AssessmentStudentListComponent,
            AttendanceReportComponent, AssessmentSearchPipe, AttendanceReportStudentComponent, AttendanceReportAttendanceComponent,
            AttendanceReportSearchPipe,
            FeedbackListComponent, FeedbackDetailComponent, FeedbackCreateComponent, FeedbackEditComponent, FeedbackSearchPipe,
            QuestionListComponent, QuestionDetailComponent, QuestionEditComponent, QuestionCreateComponent,
            EvaluationSearchPipe, EvaluationTemplateOnlyPipe, EvaluationAssignComponent, EvaluationReviewItemComponent
            , KbListComponent, KbDetailComponent, KbCreateComponent, KbEditComponent, KbSearchPipe
            , KbCategoryListComponent, KbCategoryCreateComponent, KbCategoryEditComponent,
             CommentaryListComponent, CommentaryEditComponent, CommentaryDetailComponent, CommentaryCreateComponent, CommentarySearchPipe
        } from './index';
import { KbCategorySearchPipe } from './kb/kb-category-search.pipe';



        
        @NgModule({
            declarations: [
                UserListComponent, UserDetailComponent, UserCreateComponent, UserEditComponent, UserLoginComponent, UserSearchPipe,
                RoleListComponent, RoleDetailComponent, RoleEditComponent, RoleCreateComponent, RoleSearchPipe,
                ConfigListComponent, ConfigSearchPipe, ConfigEditComponent, ConfigCreateComponent, 
                CohortListComponent, CohortDetailComponent, CohortEditComponent, CohortCreateComponent, CohortSearchPipe, 
                EnrollmentListComponent, EnrollmentSearchPipe, 
                EvaluationListComponent, EvaluationDetailComponent, EvaluationCreateComponent, EvaluationEditComponent, EvaluationTakeComponent,
                EvaluationStudentListComponent, EvaluationReviewComponent, 
                AttendanceCheckinoutComponent, AttendanceStudentComponent, AttendancePincodeComponent, AttendanceMenuCheckinoutComponent,
                BcmsComponent, BcmsListComponent, 
                AssessmentListComponent, AssessmentDetailComponent, AssessmentEditComponent, AssessmentCreateComponent, AssessmentStudentListComponent,
                AttendanceReportComponent, AssessmentSearchPipe, AttendanceReportStudentComponent, AttendanceReportAttendanceComponent,
                AttendanceReportSearchPipe, 
                FeedbackListComponent, FeedbackDetailComponent, FeedbackCreateComponent, FeedbackEditComponent, FeedbackSearchPipe, 
                QuestionListComponent, QuestionDetailComponent, QuestionEditComponent, QuestionCreateComponent, 
                EvaluationCreateComponent, EvaluationEditComponent, EvaluationDetailComponent, EvaluationTakeComponent, 
                EvaluationSearchPipe, EvaluationTemplateOnlyPipe, EvaluationAssignComponent, EvaluationReviewItemComponent
                , KbListComponent, KbDetailComponent, KbCreateComponent, KbEditComponent, KbSearchPipe
                , KbCategoryListComponent, KbCategoryCreateComponent, KbCategoryEditComponent, KbCategorySearchPipe, CommentaryListComponent, CommentaryEditComponent, CommentaryDetailComponent, CommentaryCreateComponent, CommentarySearchPipe
    ],
    imports: [FormsModule, CommonModule, RouterModule, CoreModule],
    exports: [
        UserListComponent
    ]
})
export class FeatModule { }