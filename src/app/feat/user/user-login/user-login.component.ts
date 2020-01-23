import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../../core/system/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { NotFound } from '../../common/not-found.class';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = new User();
  message: string = '';

  constructor(
    protected sys: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  login(): void {
    this.sys.clearLoggedInUser();
    this.usersvc.login(this.user.username, this.user.password).subscribe(
      res => { 
        let e404 = (res as unknown) as NotFound;
        if(e404.status == 404) return;
        this.sys.log.debug("Login successful!", res);
        this.router.navigateByUrl("/home");
      },
      err => { this.sys.log.debug(err); }
    );
  }

  ngOnInit() {
  }

}
