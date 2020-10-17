import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { EvaluationService } from '@feat/eval/evaluation.service';
import { SystemService } from '@system/system.service';
import { QuestionService } from '../question.service';
import { Evaluation } from '@feat/eval/evaluation.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent extends BcmsListComponent implements OnInit {

  eval: Evaluation = new Evaluation();
  evalId: number = 0;
  get isRootOrAdmin(): boolean {
    return this.sys.userIsRootOrAdmin;
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private evalsvc: EvaluationService,
    private questsvc: QuestionService
  ) { 
    super(sys);
    this.pageTitle = "Question List";
  }

  canMaint(e: Evaluation): void {
    e.canMaint = this.isRootOrAdmin || this.sys.loggedInUser.id == e.userId;
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalId = this.route.snapshot.params.evalid;
    this.evalsvc.get(this.evalId).subscribe(
      res => {
        this.canMaint(res);
        this.eval = res;
        this.sys.log.debug("Evaluation:", res);
      },
      err => {
        this.sys.log.err("ERROR reading eval:", err);
      }
    );
  }

}
