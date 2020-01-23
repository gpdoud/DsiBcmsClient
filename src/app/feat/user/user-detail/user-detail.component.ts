import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';

import { BcmsComponent } from '../../common/bcms.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BcmsComponent implements OnInit {

  pageTitle: string = "User Detail";
  readonly: boolean = true;
  verified: boolean = false;

  user: User = new User();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private usersvc: UserService
  ) { 
    super(sys);
  }

  edit(): void {
    this.router.navigateByUrl(`/users/edit/${this.user.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
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
