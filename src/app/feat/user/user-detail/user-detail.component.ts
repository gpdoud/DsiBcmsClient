import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';

import { BcmsComponent } from '../../common/bcms.component';
import { Role } from '@feat/role/role.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;
  
  user: User = new User();
  roles: Role[] = [];
  verifyPassword: string;
  passwordMessage: string;
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService
    ) { 
      super(sys);
      this.pageTitle = "User Detail";
      this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/users/edit/${this.user.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verifyDelete(): void {
    this.usersvc.remove(this.user).subscribe(
      res => {
        this.sys.log.debug("User Remove Successful!", res);
        this.router.navigateByUrl("/users/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    let id = this.route.snapshot.params.id;
    this.usersvc.get(id).subscribe(
      res => {
        this.user = res;
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
