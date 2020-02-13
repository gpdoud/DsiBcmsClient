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
            AttendanceCheckinoutComponent, AttendanceStudentComponent, AttendancePincodeComponent,
            BcmsComponent, BcmsListComponent, AttendanceMenuCheckinoutComponent
        } from './index';

@NgModule({
    declarations: [
        UserListComponent, UserDetailComponent, UserCreateComponent, UserEditComponent, UserLoginComponent, UserSearchPipe,
        RoleListComponent, RoleDetailComponent, RoleEditComponent, RoleCreateComponent, RoleSearchPipe,
        ConfigListComponent, ConfigSearchPipe, ConfigEditComponent, ConfigCreateComponent, 
        CohortListComponent, CohortDetailComponent, CohortEditComponent, CohortCreateComponent, CohortSearchPipe, 
        EnrollmentListComponent, EnrollmentSearchPipe, AttendanceCheckinoutComponent, AttendanceStudentComponent, AttendancePincodeComponent,
        BcmsComponent, BcmsListComponent, AttendanceMenuCheckinoutComponent
    ],
    imports: [FormsModule, CommonModule, RouterModule, CoreModule],
    exports: [
        UserListComponent
    ]
})
export class FeatModule { }