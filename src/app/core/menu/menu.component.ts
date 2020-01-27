import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../core/system/system.service';
import { Menu } from './menu.class';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedInUser: User = null;
  username: string = 'Login';
  isRootOrAdmin: boolean = false;

  menus: Menu[] = [
    new Menu("BCMS", "/home", "The BCMS Home Page"),
    new Menu("Cohorts", "/cohorts/list", "The BCMS Cohorts Page"),
    new Menu("Users", "/users/list", "The BCMS Users Page", true),
    new Menu("Roles", "/roles/list", "The BCMS Roles Page", true),
    new Menu("Configs", "/configs/list", "The BCMS Configs Page", true),
    new Menu("About", "/about", "The BCMS About Page"),
    new Menu("Help", "/help", "The BCMS Helo Page"),
    new Menu("Login", "/login", "The Login/logout Page")
  ];
  constructor(
    private sys: SystemService
  ) { }

  ngOnInit() {
    this.loggedInUser = this.sys.loggedInUser;
    if(this.loggedInUser != null) {
      this.isRootOrAdmin = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
      this.username = `[${this.loggedInUser.lastname} (${this.loggedInUser.roleCode})]`;
    }
  }

}
