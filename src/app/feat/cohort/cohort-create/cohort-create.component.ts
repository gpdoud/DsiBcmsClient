import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { BcmsComponent } from '@feat/common/bcms.component';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';
import { InstructorCohortService } from '@feat/instructorCohort/instructor-cohort.service';

@Component({
  selector: 'app-cohort-create',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['../cohort-form.component.css']
})
export class CohortCreateComponent extends BcmsComponent implements OnInit {

  cohort: Cohort = new Cohort();
  users: User[] = [];
  instructors: string[] = [];
  
  constructor(
    protected sys: SystemService,
    private cohortsvc: CohortService,
    private icsvc: InstructorCohortService,
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
    this.icsvc.list().subscribe(
      res => {
        this.sys.log.debug("Get list of instructors.", res);
        for (let ic of res) {
          //this.instructors.push(`${ic.instructor.firstname} ${ic.instructor.lastname}`);
        }
      },
      err => {
        this.sys.log.err("Error getting list of instructors!", err);
      }
    );
  }

}
