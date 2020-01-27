import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { BcmsComponent } from '@feat/common/bcms.component';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-cohort-create',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['./cohort-create.component.css']
})
export class CohortCreateComponent extends BcmsComponent implements OnInit {

  cohort: Cohort = new Cohort();
  users: User[] = [];
  
  constructor(
    protected sys: SystemService,
    private cohortsvc: CohortService,
    private usersvc: UserService,
    private router: Router
    ) {
      super(sys);
      this.pageTitle = "Cohort Create";
      this.readonly = false;
  }

  save(): void {
    this.cohortsvc.create(this.cohort).subscribe(
      res => {
        this.sys.log.debug("Create successful!", res);
        this.router.navigateByUrl("/cohorts/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.getInstructors().subscribe(
      res => {
        this.users = res;
        this.sys.log.debug("Get list of instructors.", res);
      },
      err => {
        this.sys.log.err("Error getting list of instructors!", err);
      }
    );
  }

}
