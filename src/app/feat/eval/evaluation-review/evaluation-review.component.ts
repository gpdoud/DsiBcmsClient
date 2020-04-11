import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from '../evaluation.class';
import { User } from '@feat/user/user.class';
import { Question } from '@feat/quest/question.class';

@Component({
  selector: 'app-eval-review',
  templateUrl: './evaluation-review.component.html',
  styleUrls: ['./evaluation-review.component.css']
})
export class EvaluationReviewComponent extends BcmsComponent implements OnInit {

  evalId: number = 0;
  user: User = new User();
  eval: Evaluation = new Evaluation();

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation Review"
  }

  ngOnInit() {
    super.ngOnInit();
    this.user = this.sys.loggedInUser
    this.evalId = this.route.snapshot.params.id;
    this.evalsvc.get(this.evalId).subscribe(
      (res: Evaluation) => {
        this.eval = res;
        this.sys.log.debug("Evaluation:", res);
      },
      err => {
        this.sys.log.err("Failed to read evaluation:", this.evalId, err);
      }
    );
  }

}
