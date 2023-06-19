import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class'
import { BcmsComponent } from '../../common/bcms.component';
import { InstructorCohortService } from '@feat/instructorCohort/instructor-cohort.service';
import { Calendar } from '@feat/calendar/calendar.class';
import { CalendarService } from '@feat/calendar/calendar.service';

@Component({
  selector: 'app-cohort-detail',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['../cohort-form.component.css']
})
export class CohortDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;

  cohort: Cohort = new Cohort();
  instructors: string[] = [];
  calendarId: number;
  calendarName: string;

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private cohortsvc: CohortService,
    private calsvc: CalendarService
  ) {
    super(sys);
    this.pageTitle = "Cohort Detail";
    this.readonly = true;
  }

  edit(): void {
    this.router.navigateByUrl(`/cohorts/edit/${this.cohort.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.cohortsvc.remove(this.cohort).subscribe(
      res => {
        this.sys.log.debug("Cohort Remove Successful!", res);
        this.router.navigateByUrl("/cohorts/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  getCalendar(calendarId: number): void {
    this.calsvc.get(calendarId).subscribe({
      next:
        (res) => {
          this.calendarName = res.description;
          this.calendarId = res.id;
          this.sys.log.debug(res);
        },
      error:
        err => {
          this.sys.log.err(err);
        }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    let calendarId = 0;
    let cohortId = +this.route.snapshot.params["id"];
    this.cohortsvc.getInstructors(cohortId).subscribe(
      cohort => {
        this.sys.log.debug("Get list of instructors.", cohort);
        for (let ic of cohort.instructorCohorts) {
          this.instructors.push(`${ic.instructor.firstname} ${ic.instructor.lastname}`);
        }
      },
      err => {
        this.sys.log.err("Error getting list of users!", err);
      }
    );
    let id = this.route.snapshot.params.id;
    this.cohortsvc.get(id).subscribe(
      res => {
        this.cohort = res;
        this.getCalendar(this.cohort.calendarId);
        //this.cohort.instructorName = this.cohort.instructor === null ? `Not selected`  : `${this.cohort.instructor.lastname}, ${this.cohort.instructor.firstname} `; 
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );

  }

}
