import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { Feedback } from '../feedback.class';
import { FeedbackService } from '../feedback.service';
import { ConfigService } from '@feat/config/config.service';
import { Config } from '@feat/config/config.class';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: '../feedback-form.component.html',
  styleUrls: ['../feedback-form.component.css']
})
export class FeedbackEditComponent extends BcmsComponent implements OnInit {

  feedback: Feedback = new Feedback();
  canEdit: boolean;
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
    this.pageTitle = "Feedback Edit";
    this.readonly = false;
  }

  save(): void {
    this.fbsvc.change(this.feedback).subscribe(
      res => {
        this.sys.log.debug("Change successful!", res);
        this.router.navigateByUrl("/feedbacks/list");
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.cfgsvc.search("category.").subscribe(
      (res: Config[]) => { 
        this.categories = [];
        res.forEach(c => this.categories.push(c.dataValue));
      }
    );
    this.canEdit = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
    let id = this.route.snapshot.params.id;
    this.fbsvc.get(id).subscribe(
      res => {
        res.loggedInUserIsOwner = this.sys.loggedInUser.id == res.userId;
        res.userName = `${res.user.firstname} ${res.user.lastname}`;
        this.feedback = res;
        this.sys.log.debug("Feedback", res);
      },
      err => {
        this.sys.log.err(err);
      }
    );
  }

}
