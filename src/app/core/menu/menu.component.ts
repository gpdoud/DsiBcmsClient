import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../core/system/system.service';
import { Menu } from './menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string = 'Admin';

  menus: Menu[] = [
    new Menu("BCMS", "/home", "The BCMS Home Page"),
    new Menu("Users", "/users/list", "The BCMS Users Page"),
    new Menu("Roles", "/roles/list", "The BCMS Roles Page"),
    new Menu("About", "/about", "The BCMS About Page"),
    new Menu("Help", "/help", "The BCMS Helo Page"),
    new Menu("Login", "/login", "The Login/logout Page")
  ];
  constructor(
    private sys: SystemService
  ) { }

  ngOnInit() {
    this.username = this.sys.isUserLoggedIn() 
      ? `[${this.sys.loggedInUser.lastname} (${this.sys.loggedInUser.roleCode})]` 
      : "Login";
  }

}
