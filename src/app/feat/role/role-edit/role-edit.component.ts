import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-role-edit',
  templateUrl: '../role-form.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent extends BcmsComponent implements OnInit {

  
  role: Role = null;
  
  constructor(
    protected sys: SystemService,
    private rolesvc: RoleService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Role Edit";
      this.readonly = false;
  }

  save(): void {
    this.rolesvc.change(this.role).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl("/roles/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    let code = this.route.snapshot.params.code;
    this.rolesvc.get(code).subscribe(
      res => {
        this.role = res;
        this.sys.log.debug("Role", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
