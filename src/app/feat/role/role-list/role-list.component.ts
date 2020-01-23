import { Component, OnInit } from '@angular/core';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { BoolDisplayPipe } from '@core/util/bool-display.pipe';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends BcmsListComponent  implements OnInit {

  roles: Role[] = [];
  
  constructor(
    protected sys: SystemService,
    private rolesvc: RoleService
    ) { 
      super(sys);
      this.pageTitle = "Role List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.rolesvc.list().subscribe(
      res => {
        this.roles = res;
        this.sys.log.debug("Roles", res);
      },
      err => console.error(err)
    );
  }

}
