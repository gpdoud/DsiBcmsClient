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
  canEdit: boolean  = this.sys.loggedInUser != null 
                      && (this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin);

  constructor(
    protected sys: SystemService,
    private fbsvc: FeedbackService
  ) {
    super(sys);
    this.pageTitle = "Feedback List";
  }

  ngOnInit() {
    super.ngOnInit();
    // this.canEdit = this.sys.loggedInUser.role.isRoot || this.sys.loggedInUser.role.isAdmin;
    this.fbsvc.list().subscribe(
      res => {
        res.forEach(x => {
          x.loggedInUserIsOwner = this.sys.loggedInUser.id == x.userId;
          x.userName = `${x.user.firstname} ${x.user.lastname}`;
          if (x.text.length > this.maxTextLen) {
            x.text = x.text != null ? x.text.substr(0, this.maxTextLen) + " ..." : null;
            x.response = x.response != null ? x.response.substr(0, this.maxTextLen) + " ..." : null;
          }
        });
        this.feedbacks = res;
        this.sys.log.debug("Feedbacks", res);
      },
      err => console.error(err)
    );
  }

}
