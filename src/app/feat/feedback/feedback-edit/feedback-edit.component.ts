import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '@core/system/system.service';
import { BcmsComponent } from '@feat/common/bcms.component';
import { Feedback } from '../feedback.class';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-edit',
  templateUrl: '../feedback-form.component.html',
  styleUrls: ['./feedback-edit.component.css']
})
export class FeedbackEditComponent extends BcmsComponent implements OnInit {

  feedback: Feedback = new Feedback();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
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
    let id = this.route.snapshot.params.id;
    this.fbsvc.get(id).subscribe(
      res => {
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
