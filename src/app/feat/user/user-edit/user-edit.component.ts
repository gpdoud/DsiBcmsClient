import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../core/system/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { RoleService } from '../../role/role.service';
import { Role } from '../../role/role.class';
import { BcmsComponent } from '../../common/bcms.compoent';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BcmsComponent implements OnInit {

  pageTitle: string = "User Edit";
  readonly: boolean = false;

  user: User = null;
  roles: Role[] = [];

  constructor(
    protected sys: SystemService,
    private usersvc: UserService,
    private rolesvc: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    super(sys);
  }

  save(): void {
    this.usersvc.change(this.user).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
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
    let id = this.route.snapshot.params.id;
    this.usersvc.get(id).subscribe(
      res => {
        this.user = res;
        this.sys.log.debug("User", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
