import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { SystemService } from '../../../core/system/system.service';
import { BcmsListComponent } from '../../common/bcms-list.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BcmsListComponent implements OnInit {

  users: User[] = [];
  
  constructor(
    protected sys: SystemService,
    private usersvc: UserService
    ) { 
      super(sys);
      this.pageTitle = "User List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.list().subscribe(
      res => {
        res.forEach(user => { user.roleName = user.role.name; })
        this.users = res;
        this.sys.log.debug("Users", res);
      },
      err => console.error(err)
    );
  }

}
