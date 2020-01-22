import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { SystemService } from '../../../core/system/system.service';
import { BcmsComponent } from '../../common/bcms.compoent';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BcmsComponent implements OnInit {

  users: User[] = [];
  
  constructor(
    protected sys: SystemService,
    private usersvc: UserService
  ) { 
    super(sys);
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.list().subscribe(
      res => {
        this.users = res;
        this.sys.log.debug("Users", res);
      },
      err => console.error(err)
    );
  }

}
