import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { AssessmentService } from '@assessment/assessment.service';
import { Assessment } from '../assessment.class';
import { UserService } from '@feat/user/user.service';
import { User } from '@feat/user/user.class';
import { EnrollmentService } from '@feat/enrollment/enrollment.service';

@Component({
  selector: 'app-assessment-create',
  templateUrl: '../assessment-form.component.html',
  styleUrls: ['./assessment-create.component.css']
})
export class AssessmentCreateComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  cohortId: number = 0;
  enrollmentId: number = 0;
  
  asmt: Assessment = new Assessment();
  users: User[] = [];
  user: User = new User();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private asmtsvc: AssessmentService,
    private usersvc: UserService,
    private enrlsvc: EnrollmentService
  ) { 
    super(sys);
    this.pageTitle = "Assessment Create";
    this.readonly = false;
  }

  save(): void {
    this.enrlsvc.getByCohortAndUser(this.cohortId, this.user.id).subscribe(
      res => {
        this.enrollmentId = res.id;
        this.sys.log.debug("Enrollment", res);
        // set the enrollmentId in asmt
        this.asmt.enrollmentId = this.enrollmentId;
        this.sys.log.debug("Assessment before create", this.asmt);
        this.asmtsvc.create(this.asmt).subscribe(
          res => {
            this.sys.log.debug("Change successful!", res);
            let routerLink = this._loggedInUser.role.isRoot || this._loggedInUser.role.isAdmin 
                              ? `/assessments/list/${this.cohortId}` : "/home"; 
            this.router.navigateByUrl(routerLink);
          },
          err => {
            this.sys.log.err(err);
          }
        );
      }, 
      err => {
        this.sys.log.err(err);
      }
    );
  }
  // edit(): void {}
  // delete(): void {}
  // verifyDelete(): void {}
  
  getUser(id): void {
    this.usersvc.get(id).subscribe(
      res => {
        this.user = res;
        this.sys.log.debug("User", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  compareFn(u1, u2) { return false; }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = this.route.snapshot.params.cohortId;
    this.usersvc.list().subscribe(
      res => {
        this.users = res;
        this.sys.log.debug("Users:", res);
      },
      err => {
        this.sys.log.debug(err);
      }
    );

  }

}
