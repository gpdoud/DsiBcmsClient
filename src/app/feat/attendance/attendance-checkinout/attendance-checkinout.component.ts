import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '@system/system.service';
import { AttendanceService } from '@attendance/attendance.service';
import { Attendance } from '@attendance/attendance.class';
import { Cohort } from '@feat/cohort/cohort.class';
import { CohortService } from '@feat/cohort/cohort.service';
import { User } from '@feat/user/user.class';
import { BcmsListComponent } from '@feat/common/bcms-list.component';

@Component({
  selector: 'app-attendance-checkinout',
  templateUrl: './attendance-checkinout.component.html',
  styleUrls: ['./attendance-checkinout.component.css']
})
export class AttendanceCheckinoutComponent extends BcmsListComponent implements OnInit {

  pageTitle: string = "Attendance Check-in/out";
  buttonClass: string = "btn btn-secondary btn-lg";

  cohortId: number = 0;

  students: User[] = [];

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private cohortsvc: CohortService,
    private attsvc: AttendanceService
  ) { 
    super(sys);
  }

  refresh(): void {
    this.cohortId = this.route.snapshot.params.id;
    this.cohortsvc.get(this.cohortId).subscribe(
      res => {
        this.students = [];
        res.enrollments.forEach(e => this.students.push(e.user));
        this.sys.log.debug("Cohort:", res);
        this.sys.log.debug("Students:", this.students);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = this.route.snapshot.params.id;
    this.cohortsvc.get(this.cohortId).subscribe(
      res => {
        this.students = [];
        res.enrollments.forEach(e => this.students.push(e.user));
        this.sys.log.debug("Cohort:", res);
        this.sys.log.debug("Students:", this.students);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
