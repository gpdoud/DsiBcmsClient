import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../../core/system/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { NotFound } from '../../common/not-found.class';
import { IpService } from '@core/ip/ip.service';
import { Ip } from '@core/ip/ip.class';
import { LogService } from '@core/log/log.service';
import { Log, LogSeverity } from '@core/log/log.class';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = new User();
  message: string = '';
  get isValidDomain(): boolean { return this.ipsvc.isValidDomain };
  extIp: string = 'getting ip ...';

  constructor(
    private ipsvc: IpService,
    private logSvc: LogService,
    protected sys: SystemService,
    private usersvc: UserService,
    private router: Router
  ) { }

  login(): void {
    this.usersvc.login(this.user.username, this.user.password).subscribe(
      res => {
        let msg = `${res.firstname} ${res.lastname} has logged in.`;
        this.logSvc.logInfo(msg);
        this.sys.setLoggedInUser(res);
        this.sys.log.debug(msg, res);
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

    this.ipsvc.getCurrentIp();
    this.ipsvc.getIp().subscribe(
      (res: Ip) => {
        this.extIp = res.ip;
        this.sys.log.debug("Current external IP [", this.extIp, "]");
      }
    );
    // this.sys.log.warn("Login fixed in user-login.component line 57.")
    // let msg = `*** WARNING: Forced gpdoud as user ***`;
    // this.logSvc.warning(msg).subscribe(res => console.warn(res), err => console.error(err));
    // this.user.username = "gpdoud";
    // this.user.password = "maxpass";
    if (!this.sys.config.checkLogin) {
      this.login();
    }
  }

}
