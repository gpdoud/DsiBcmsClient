import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { Assessment } from '../assessment.class';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { User } from '@feat/user/user.class';
import { UserService } from '@feat/user/user.service';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: '../assessment-form.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent extends BcmsComponent implements OnInit {

  verified: boolean = false;
  cohortId: number = 0;
  users: User[] = [];
  user: User = new User();
  
  asmt: Assessment = new Assessment();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private asmtsvc: AssessmentService,
    private usersvc: UserService
  ) { 
    super(sys);
    this.pageTitle = "Assessment Detail";
    this.readonly = true;
  }

  // save(): void {}
  edit(): void {
    this.router.navigateByUrl(`/assessments/edit/${this.asmt.id}/${this.cohortId}`);
  }
  delete(): void {
    this.verified = !this.verified;
  }
  verifyDelete(): void {
    this.asmtsvc.remove(this.asmt).subscribe(
      res => {
        this.sys.log.debug("Assessment Remove Successful!", res);
        this.router.navigateByUrl(`/assessments/list/${this.cohortId}`);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

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
    let id = this.route.snapshot.params.id;
    this.cohortId = this.route.snapshot.params.cohortId;
    this.asmtsvc.get(id).subscribe(
      res => {
        this.asmt = res;
        this.sys.log.debug(res);
        this.getUser(this.asmt.enrollment.userId);
      },
      err => {
        this.sys.log.err(err);
      }
    );  }

}
