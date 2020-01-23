import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../../../core/system/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';

import { BcmsComponent } from '../../common/bcms.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BcmsComponent implements OnInit {

  pageTitle: string = "User Detail";
  readonly: boolean = true;

  user: User = new User();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private usersvc: UserService
  ) { 
    super(sys);
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
