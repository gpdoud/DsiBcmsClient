import { Component, OnInit } from '@angular/core';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { Feedback } from '../feedback.class';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent extends BcmsListComponent implements OnInit {

  feedbacks: Feedback[] = [];
  maxTextLen: number = 50;
  canEdit: boolean;

  constructor(
    protected sys: SystemService,
    private fbsvc: FeedbackService
  ) {
    super(sys);
    this.pageTitle = "Feedback List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.canEdit = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
    this.fbsvc.list().subscribe(
      res => {
        res.forEach(x => {
          x.userName = `${x.user.firstname} ${x.user.lastname}`;
          if (x.text.length > this.maxTextLen) {
            x.text = x.text.substr(0, this.maxTextLen) + " ...";
          }
        });
        this.feedbacks = res;
        this.sys.log.debug("Feedbacks", res);
      },
      err => console.error(err)
    );
  }

}
