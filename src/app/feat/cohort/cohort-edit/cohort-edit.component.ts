import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { BcmsComponent } from '@feat/common/bcms.component';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';
import { InstructorCohortService } from '@feat/instructorCohort/instructor-cohort.service';
import { CalendarService } from '@feat/calendar/calendar.service';
import { Calendar } from '@feat/calendar/calendar.class';

@Component({
  selector: 'app-cohort-edit',
  templateUrl: '../cohort-form.component.html',
  styleUrls: ['../cohort-form.component.css']
})
export class CohortEditComponent extends BcmsComponent implements OnInit {

  cohort: Cohort = null;
  users: User[] = [];
  instructors: string[] = [];
  calendars: Calendar[] = [];
  calendarId: number;


  constructor(
    protected sys: SystemService,
    private cohortsvc: CohortService,
    private calsvc: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(sys);
    this.pageTitle = "Cohort Edit";
    this.readonly = false;
  }

  save(): void {
    this.cohortsvc.change(this.cohort).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl("/cohorts/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    let cohortId = this.route.snapshot.params["id"];
    this.cohortsvc.getInstructors(cohortId).subscribe(
      cohort => {
        this.sys.log.debug("Get list of instructors.", cohort);
        for (let ic of cohort.instructorCohorts) {
          this.instructors.push(`${ic.instructor.firstname} ${ic.instructor.lastname}`);
        }
      },
      err => {
        this.sys.log.err("Error getting list of instructors!", err);
      }
    );
    this.calsvc.list().subscribe({
      next: (res) => {
        this.calendars = res;
        this.sys.log.debug("Calendars:", res);
      },
      error: err => {
        this.sys.log.err(err);
      }
    });
    let id = this.route.snapshot.params.id;
    this.cohortsvc.get(id).subscribe(
      res => {
        this.cohort = res;
        this.sys.log.debug("Cohort", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
