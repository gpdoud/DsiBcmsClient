import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from '../evaluation.class';
import { Question } from '@feat/quest/question.class';
import { QuestionService } from '@feat/quest/question.service';
import { Observable } from 'rxjs';

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
  count: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  get ans(): number { return this.eval.questions[this.idx].userAnswerNbr; }
  set ans(res: number) { this.eval.questions[this.idx].userAnswerNbr = Number(res); }

  registerAnswer(answer: number): void {
    this.ans = answer;
    this.saveQuest();
  }

  countdown!: string;
  handleTimerExpiredEvent(): void {
    console.warn("Timer expired!");
    this.done();
  }

  canComplete: boolean = false;
  answeredQuestions: number = 0;
  countAnsweredQuestions(): void {
    let sum = 0;
    for (let q of this.eval.questions) {
      if (q.userAnswerNbr !== -1) {
        sum++;
      }
    }
    if (this.eval.questions.length === sum) {
      this.canComplete = true;
    }
  }

  calcTotalPoints(qs: Question[]): number {
    let total = 0;
    qs.forEach(q => {
      if (q.correctAnswerNbr === q.userAnswerNbr) {
        total += q.pointValue;
      }
    });
    return total;
  }
  done(): void {
    this.eval.isDone = true;
    this.eval.pointsScored = this.calcTotalPoints(this.eval.questions);
    // this.eval.questions = null;
    this.evalsvc.change(this.eval).subscribe(
      res => {
        this.saveQuest();
        this.sys.log.debug("Successful update of evaluation:", res);
        this.router.navigateByUrl("/evals/stud/list");
      },
      err => {
        this.sys.log.err("Failed update of evaluation:", this.eval, err);
      }
    );
  }
  saveQuest(): void {
    this.saveQuestion(this.eval.questions[this.idx]).subscribe(
      res => {
        this.sys.log.debug("Successfully updated question:", res);
        this.countAnsweredQuestions();
      },
      err => {
        this.sys.log.err("Failed to update question:", this.question, err);
      }
    );
  }
  prev(): void {
    this.prevQuestion();
  }
  next(): void {
    this.nextQuestion();
  }

  nextQuestion(): void {
    if (this.idx < this.quests.length - 1) {
      this.idx++;
      this.question = this.quests[this.idx];
    }
    this.isFirst = this.idx == 0;
    this.isLast = this.idx == this.count - 1;
  }
  prevQuestion(): void {
    if (this.idx > 0) {
      this.idx--;
      this.question = this.quests[this.idx];
    }
    this.isFirst = this.idx == 0;
    this.isLast = this.idx == this.count - 1;
  }
  saveQuestion(q: Question): Observable<any> {
    return this.questsvc.change(q) as Observable<any>;
  }

  verifyDone: boolean = false;
  finished(): void { this.verifyDone = !this.verifyDone; }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private evalsvc: EvaluationService,
    private questsvc: QuestionService
  ) {
    super(sys);
    this.pageTitle = "Evaluation Take";
  }

  refresh(): void {
    this.evalsvc.get(this.evalId).subscribe(
      (res: Evaluation) => {
        this.eval = res;
        this.quests = this.eval.questions;
        this.count = this.quests.length;
        this.question = this.quests[0];
        this.countdown = `${this.eval.timeLimitMinutes}:${this.eval.timeLimitSeconds}`;
        this.sys.log.debug("Evaluation:", res, this.evalId);
        this.countAnsweredQuestions();
      },
      err => {
        this.sys.log.err("Failed to read the evaluation:", err, this.evalId);
      }
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalId = this.route.snapshot.params.id;
    this.refresh();

    // this.evalsvc.get(this.evalId).subscribe(
    //   (res: Evaluation) => {
    //     this.eval = res;
    //     this.quests = this.eval.questions;
    //     this.count = this.quests.length;
    //     this.question = this.quests[0];
    //     this.sys.log.debug("Evaluation:", res, this.evalId);
    //   },
    //   err => {
    //     this.sys.log.err("Failed to read the evaluation:", err, this.evalId);
    //   }
    // );
  }

}
