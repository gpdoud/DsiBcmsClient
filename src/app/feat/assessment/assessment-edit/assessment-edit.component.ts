import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { AssessmentService } from '../assessment.service';
import { Assessment } from '../assessment.class';
import { User } from '@feat/user/user.class';
import { UserService } from '@feat/user/user.service';


@Component({
  selector: 'app-assessment-edit',
  templateUrl: '../assessment-form.component.html',
  styleUrls: ['./assessment-edit.component.css']
})
export class AssessmentEditComponent extends BcmsComponent implements OnInit {

  readonly: boolean = false;
  cohortId: number = 0;
  asmt: Assessment = null;
  users: User[] = [];
  user: User = new User();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private asmtsvc: AssessmentService,
    private usersvc: UserService
  ) { 
    super(sys);
    this.pageTitle = "Assessment Edit";
    this.readonly = false;
  }

  save(): void {
    this.asmtsvc.change(this.asmt).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        let routerLink = this._loggedInUser.role.isRoot || this._loggedInUser.role.isAdmin 
                          ? `/assessments/list/${this.cohortId}` : "/home"; 
        this.router.navigateByUrl(routerLink);
      },
      err => {
        this.sys.log.err(err);
      }
    );  }
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

  compareFn(user1: User, user2: User) : boolean {
    if(user1 == null || user2 == null) return false;
    return user1.id === user2.id;
  }

  ngOnInit() {
    super.ngOnInit();
    this.usersvc.list().subscribe(
      res => {
        this.users = res;
        this.sys.log.debug("Users:", res);
      },
      err => {
        this.sys.log.debug(err);
      }
    );
    this.cohortId = this.route.snapshot.params.cohortId;
    let id = this.route.snapshot.params.id;
    this.asmtsvc.get(id).subscribe(
      res => {
        this.asmt = res;
        this.sys.log.debug("Assessment", res);
        this.getUser(this.asmt.enrollment.userId);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
