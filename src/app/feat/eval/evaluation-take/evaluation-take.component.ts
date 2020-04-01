import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from '../evaluation.class';
import { Question } from '@feat/quest/question.class';

@Component({
  selector: 'app-evaluation-take',
  templateUrl: './evaluation-take.component.html',
  styleUrls: ['./evaluation-take.component.css']
})
export class EvaluationTakeComponent extends BcmsComponent implements OnInit {
  
  evalId: any;
  eval: Evaluation = new Evaluation();
  quests: Question[] = [];
  question: Question;
  idx: number = 0;

  next(): void {
    if(this.idx < this.quests.length) {
      this.idx++;
      this.question = this.quests[this.idx];
    }
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation Take"
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalId = this.route.snapshot.params.id;
    this.evalsvc.get(this.evalId).subscribe(
      (res: Evaluation) => {
        this.eval = res;
        this.quests = this.eval.questions;
        this.question = this.quests[0];
        this.sys.log.debug("Evaluation:", res, this.evalId);
      }, 
      err => {
        this.sys.log.err("Failed to read the evaluation:", err, this.evalId);
      }
    );
  }

}
