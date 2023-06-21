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
  profileRouterLink: string = "";
  isRootOrAdmin: boolean = false;

  menus: Menu[] = [
    new Menu("BCMS", "/home", "The BCMS Home Page"),
    new Menu("Evals", "/evals/stud/list", "Student Evaluations"),
    new Menu("Asmnts", "/assessments/listbystudent", "Student Assessments"),
    new Menu("Cohorts", "/cohorts/list", "The BCMS Cohorts Page", true, true),
    new Menu("Evals(a)", "/evals/list", "Evaluations", true, true),
    new Menu("Users", "/users/list", "The BCMS Users Page", true, false),
    new Menu("Roles", "/roles/list", "The BCMS Roles Page", true, false),
    new Menu("Configs", "/configs/list", "The BCMS Configs Page", true, false),
    new Menu("Calendars", "/calendars/list", "Cohort calendars", true, false),
    new Menu("Schedule", "/calendars/student", "Student Schedule"),
    new Menu("CheckIn/Out", "/attendance/checkinout", "Student checkin/out"),
    new Menu("About", "/about", "The BCMS About Page"),
    // new Menu("Feedback", "/feedbacks/list", "The BCMS Feedback Page"),
    // new Menu("Help", "/help", "The BCMS Helo Page"),
    new Menu("Kb", "/kbs/list", "The BCMS Kb Page"),
    new Menu("Kb Cat", "/kbcats/list", "The BCMS Kb Category Page", true, false),
    new Menu("Logs", "/logs/list", "Log files", true, false),
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
      this.profileRouterLink = `/users/edit/${this.loggedInUser.id}`;
    }
  }

}
