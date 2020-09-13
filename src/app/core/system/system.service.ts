import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppInitService } from '../../app-init.service';
import { LoggerService } from '../logger/logger.service';
import { User } from '../../feat/user/user.class';
import { IpService } from '@core/ip/ip.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  config: any = null;
  get url(): string {
    return this.config.baseurl;
  }

  get log(): LoggerService {
    return this.logger;
  }

  private _loggedInUser: User = null;
  setLoggedInUser(user: User): void {
    this._loggedInUser = user;
  }
  clearLoggedInUser(): void {
    this._loggedInUser = null;
  }
  isUserLoggedIn(): boolean {
    return this._loggedInUser != null;
  }
  get loggedInUser(): User {
    return this._loggedInUser;
  }
  checkLogin(): void {
    if(!this.isUserLoggedIn()) {
      this.router.navigateByUrl("/login");
    }
  }
  get userIsRoot(): boolean {
    return this.isUserLoggedIn && this.loggedInUser.role != null && this.loggedInUser.role.isRoot;
  }
  get userIsAdmin(): boolean {
    return this.isUserLoggedIn && this.loggedInUser.role != null && this.loggedInUser.role.isAdmin;
  }
  get userIsInstructor(): boolean {
    return this.isUserLoggedIn && this.loggedInUser.role != null && this.loggedInUser.role.isInstructor;
  }
  get userIsRootOrAdmin(): boolean {
    return this.userIsRoot || this.userIsAdmin;
  }
  get userIsRootAdminOrInstructor(): boolean {
    return this.userIsRoot || this.userIsAdmin || this.userIsInstructor;
  }

  constructor(
    private init: AppInitService,
    private router: Router,
    private logger: LoggerService,
    private ipsvc: IpService
  ) { 
    this.config = init.config;
    this.logger.setSeverity(this.config.logSeverity);
    this.log.debug("System config:", this.config);
  }
}
