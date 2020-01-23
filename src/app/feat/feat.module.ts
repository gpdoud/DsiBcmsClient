import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserSearchPipe } from './user/user-search.pipe';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleCreateComponent } from './role/role-create/role-create.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserDetailComponent,
        UserCreateComponent,
        UserEditComponent,
        UserLoginComponent,
        UserSearchPipe,
        RoleListComponent,
        RoleDetailComponent,
        RoleEditComponent,
        RoleCreateComponent
    ],
    imports: [FormsModule, CommonModule, RouterModule, CoreModule],
    exports: [
        UserListComponent
    ]
})
export class FeatModule {}