import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../question.class';

@Component({
  selector: 'app-question-edit',
  templateUrl: '../question-form.component.html',
  styleUrls: ['../question-form.component.css']
})
export class QuestionEditComponent extends BcmsComponent implements OnInit {

  questId: number = 0;
  question: Question = new Question()
  cignore: boolean = false;
  dignore: boolean = false;
  eignore: boolean = false;

  disable(inp: string): void {
    if(inp == 'c') {
        this.cignore = !this.cignore;
    } else if(inp == 'd') {
      this.dignore = !this.dignore;
    } else if(inp == 'e') {
      this.eignore = !this.eignore;
    }
  }

  save(): void {
    if(this.cignore) {
      this.question.answerTextC = "";
    }
    if(this.dignore) {
      this.question.answerTextD = "";
    }
    if(this.eignore) {
      this.question.answerTextE = "";
    }
    this.question.correctAnswerNbr = Number(this.question.correctAnswerNbr);
    this.questsvc.change(this.question).subscribe(
      res => {
        this.router.navigateByUrl(`/quests/list/${this.question.evaluationId}`)
      },
      err => {
        this.sys.log.err("ERROR Updating Question:", err, this.question);
      }
    );
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private questsvc: QuestionService
  ) {
    super(sys);
    this.pageTitle = "Question Edit";
  }

  ngOnInit() {
    this.questId = this.route.snapshot.params.id;
    this.questsvc.get(this.questId).subscribe(
      res => {
        this.question = res;
        this.sys.log.debug("Question:", res);
      },
      err => {
        this.sys.log.err("ERROR: Reading question:", err);
      }
    );
  }

}
