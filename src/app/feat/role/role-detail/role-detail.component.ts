import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '../../common/bcms.component';

@Component({
  selector: 'app-role-detail',
  templateUrl: '../role-form.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent extends BcmsComponent implements OnInit {

  readonly: boolean = true;
  verified: boolean = false;

  role: Role = new Role();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private rolesvc: RoleService
  ) {
    super(sys);
    this.pageTitle = "Role Detail";
  }

  edit(): void {
    this.router.navigateByUrl(`/roles/edit/${this.role.code}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.rolesvc.remove(this.role).subscribe(
      res => {
        this.sys.log.debug("Role Remove Successful!", res);
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
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
