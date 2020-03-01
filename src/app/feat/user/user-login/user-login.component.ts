import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../../core/system/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { NotFound } from '../../common/not-found.class';
import { IpService } from '@core/ip/ip.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = new User();
  message: string = '';
  get isValidDomain(): boolean { return this.ipsvc.isValidDomain };

  constructor(
    private ipsvc: IpService,
    protected sys: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  login(): void {
    this.usersvc.login(this.user.username, this.user.password).subscribe(
      res => {
        this.sys.setLoggedInUser(res);
        this.sys.log.debug("Login successful!", res);
        this.router.navigateByUrl("/home");
      },
      err => { 
        this.sys.log.debug(err); 
        let e404 = (err as unknown) as NotFound;
        if (e404.status == 404) {
          this.message = "Username/password is not found!";
          return;
        } 
      }
    );
  }

  ngOnInit() {
    this.sys.clearLoggedInUser();
    // this.user.username = "gpdoud";
    // this.user.password = "MaxPass@8888";
    if (!this.sys.config.checkLogin) {
      this.login();
    }
  }

}
