import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '@enrollment/enrollment.service';
import { Enrollment } from '@enrollment/enrollment.class';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { SystemService } from '@system/system.service';
import { BcmsListComponent } from '@common/bcms-list.component';
import { User } from '@feat/user/user.class';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent extends BcmsListComponent implements OnInit {

  notEnrolled: User[] = [];
  cohort: Cohort = new Cohort();
  cohortId: number = 0;

  constructor(
    protected sys: SystemService,
    private enrollsvc: EnrollmentService,
    private cohortsvc: CohortService,
    private route: ActivatedRoute
  ) {
    super(sys);
    this.pageTitle = "Enrollment List";
  }

  enroll(userId: number): void {
    let e: Enrollment = new Enrollment();
    e.userId = userId;
    e.cohortId = this.cohortId;
    this.enrollsvc.create(e).subscribe(
      res => {
        this.sys.log.trace(`Enrolled student ${userId} to cohort id: ${this.cohortId}`);
        this.sys.log.debug(res);
        this.refresh(this.cohortId);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }
  drop(userId: number): void {
    let e: Enrollment = new Enrollment();
    e.userId = userId;
    e.cohortId = this.cohortId;
    this.enrollsvc.remove(e).subscribe(
      res => {
        this.sys.log.trace(`Dropped student ${userId} from cohort id: ${this.cohortId}`);
        this.sys.log.debug(res);
        this.refresh(this.cohortId);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }
  refresh(id: number): void {
    this.cohortsvc.get(id).subscribe(
      res => {
        this.cohort = res;
        this.sys.log.trace("Retrieve cohort for cohort id:");
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
    this.enrollsvc.getNotEnrolled(this.cohortId).subscribe(
      res => {
        this.notEnrolled = res;
        this.sys.log.trace("Retrieve enrollments for cohort id:");
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = Number(this.route.snapshot.params.id);
    this.refresh(this.cohortId);

  }

}
