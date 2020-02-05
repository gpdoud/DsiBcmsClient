import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  
  user: User = null;
  roles: Role[] = [];
  verifyPassword: string = '';
  passwordMessage: string = '';
  
  constructor(
    protected sys: SystemService,
    private usersvc: UserService,
    private rolesvc: RoleService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      super(sys);
      this.pageTitle = "User Edit";
  }

  verifySamePassword(): boolean {
    return (this.user.password === this.verifyPassword);
  }

  save(): void {
    this.passwordMessage = "";
    if(!this.verifySamePassword()) {
      this.passwordMessage = "Passwords differ!";
      return;
    }
    this.usersvc.change(this.user).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        let routerLink = this.user.role.isRoot || this.user.role.isAdmin 
                          ? "/users/list" : "/home"; 
        this.router.navigateByUrl(routerLink);
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
    let id = this.route.snapshot.params.id;
    this.usersvc.get(id).subscribe(
      res => {
        this.user = res;
        this.verifyPassword = this.user.password;
        this.sys.log.debug("User", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
