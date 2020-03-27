import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { CohortService } from '@cohort/cohort.service';
import { Cohort } from '@cohort/cohort.class';
import { UserService } from '@user/user.service';
import { User } from '@user/user.class'
import { BcmsComponent } from '../../common/bcms.component';
import { Feedback } from '../feedback.class';
import { FeedbackService } from '../feedback.service';
import { ConfigService } from '@feat/config/config.service';
import { Config } from '@feat/config/config.class';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: '../feedback-form.component.html',
  styleUrls: ['../feedback-form.component.css']
})
export class FeedbackDetailComponent extends BcmsComponent implements OnInit {

  feedback: Feedback = new Feedback();
  canEdit: boolean  = this.sys.loggedInUser != null 
                    && (this.sys.loggedInUser.id == this.feedback.userId 
                      || this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin);
  categories: string[] = [
    "KB", "Git/GitHub", "SQL", "C#", "HTML", "CSS", "Javascript"
    , "Bootstrap", "jQuery", "Typescript", "Angular", "Misc"
  ];
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private cfgsvc: ConfigService,
    private fbsvc: FeedbackService
  ) { 
    super(sys);
    this.pageTitle = "Feedback Detail";
    this.readonly = true;
}

  verified: boolean = false;

  save(): void {}

  edit(): void {
    this.router.navigateByUrl(`/feedbacks/edit/${this.feedback.id}`);
  }

  delete(): void {
    this.verified = !this.verified;
  }

  verifyDelete(): void {
    this.fbsvc.remove(this.feedback).subscribe(
      res => {
        this.sys.log.debug("Feedback Remove Successful!", res);
        this.router.navigateByUrl("/feedbacks/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    // this.canEdit = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
    this.cfgsvc.search("category.").subscribe(
      (res: Config[]) => { 
        this.categories = [];
        res.forEach(c => this.categories.push(c.dataValue));
      }
    );    let id = this.route.snapshot.params.id;
    this.fbsvc.get(id).subscribe(
      res => {
        res.loggedInUserIsOwner = this.sys.loggedInUser != null && this.sys.loggedInUser.id == res.userId;
        res.userName = `${res.user.firstname} ${res.user.lastname}`;
        this.feedback = res;
        this.sys.log.debug(res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
