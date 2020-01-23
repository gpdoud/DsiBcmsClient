import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-user-create',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  user: User = new User();
  roles: Role[] = [];
  
  constructor(
    protected sys: SystemService,
    private usersvc: UserService,
    private rolesvc: RoleService,
    private router: Router
    ) { 
      super(sys);
      this.pageTitle = "User Create";
  }

  save(): void {
    this.user.password = "MaxPass@8888";
    this.usersvc.create(this.user).subscribe(
      res => {
        this.user = res;
        this.sys.log.debug("Created succcessfully!", res);
        this.router.navigateByUrl("/users/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.rolesvc.list().subscribe(
      res => {
        this.roles = res;
        this.sys.log.debug("Roles", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
