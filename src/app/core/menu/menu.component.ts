import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Menu[] = [
    new Menu("BCMS", "/home", "The BCMS Home Page"),
    new Menu("Users", "/users/list", "The BCMS Users Page"),
    new Menu("About", "/about", "The BCMS About Page"),
    new Menu("Help", "/help", "The BCMS Helo Page"),
    new Menu("Login", "/login", "The Login/logout Page")
  ];
  constructor() { }

  ngOnInit() {
  }

}
