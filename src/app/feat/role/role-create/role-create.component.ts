import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-role-create',
  templateUrl: '../role-form.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  role: Role = new Role();
  
  constructor(
    protected sys: SystemService,
    private rolesvc: RoleService,
    private router: Router
  ) {
    super(sys);
    this.pageTitle = "Role Create";
  }

  save(): void {
    this.rolesvc.create(this.role).subscribe(
      res => {
        this.role = res;
        this.sys.log.debug("Created succcessfully!", res);
        this.router.navigateByUrl("/roles/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
