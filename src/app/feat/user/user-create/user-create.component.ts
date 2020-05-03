import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class';
import { RoleService } from '@role/role.service';
import { Role } from '@role/role.class';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-user-create',
  templateUrl: '../user-form.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  user: User = new User();
  roles: Role[] = [];
  verifyPassword: string = '';
  passwordMessage: string = '';
  
  constructor(
    protected sys: SystemService,
    private usersvc: UserService,
    private rolesvc: RoleService,
    private router: Router
    ) { 
      super(sys);
      this.pageTitle = "User Create";
  }

  verifySamePassword(): boolean {
    return (this.user.password === this.verifyPassword);
  }

  save(): void {
    this.passwordMessage = "";
    if(!this.verifySamePassword()) {
      this.passwordMessage = "Passwords differ!";
      return;
    }
    this.usersvc.create(this.user).subscribe(
      res => {
        this.user = res;
        this.sys.log.debug("Created succcessfully!", res);
        let routerLink = this._loggedInUser.role.isRoot || this._loggedInUser.role.isAdmin 
                          ? "/users/list" : "/home"; 
        this.router.navigateByUrl(routerLink);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  genPinCode(): string {
    let pin:any = Math.floor(Math.random() * 10000);
    pin = `0000${pin}`;
    pin = <string>pin.substring(pin.length - 4);
    return pin;
  }

  ngOnInit() {
    super.ngOnInit();
    this.verifyPassword = this.user.password = "Train@MAX";
    this.user.roleCode = "stu";
    this.user.pinCode = this.genPinCode();
    this.rolesvc.list().subscribe(
      res => {
        this.roles = res;
        this.sys.log.debug("Roles", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  blurLastname(): void {
    if(this.user.firstname && this.user.lastname)
      this.user.username = `${this.user.firstname.toLowerCase().substr(0, 1)}${this.user.lastname.toLowerCase()}`
  }

}
