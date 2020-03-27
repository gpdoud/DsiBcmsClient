import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { Feedback } from '../feedback.class';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: '../feedback-form.component.html',
  styleUrls: ['../feedback-form.component.css']
})
export class FeedbackCreateComponent extends BcmsComponent implements OnInit {

  feedback: Feedback = new Feedback();
  canEdit: boolean;
  categories: string[] = [
    "KB", "Git/GitHub", "SQL", "C#", "HTML", "CSS", "Javascript"
    , "Bootstrap", "jQuery", "Typescript", "Angular", "Misc"
  ];
  constructor(
    protected sys: SystemService,
    private router: Router,
    private fbsvc: FeedbackService
  ) {
    super(sys);
    this.pageTitle = "Feedback Create";
    this.readonly = false;
  }

  save(): void {
    this.fbsvc.create(this.feedback).subscribe(
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
    this.canEdit = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
    this.feedback.userId = this.sys.loggedInUser.id;
    this.feedback.userName = `${this.sys.loggedInUser.firstname} ${this.sys.loggedInUser.lastname}`;
  }

}
