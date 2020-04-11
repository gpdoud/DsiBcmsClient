import { Component, OnInit } from '@angular/core';
import { Question } from '@quest/question.class';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '@quest/question.service';
import { BcmsComponent } from '@feat/common/bcms.component';

@Component({
  selector: 'app-question-create',
  templateUrl: '../question-form.component.html',
  styleUrls: ['../question-form.component.css']
})
export class QuestionCreateComponent extends BcmsComponent implements OnInit {

  questId: number = 0;
  question: Question = new Question()

  save(): void {
    this.question.correctAnswerNbr = Number(this.question.correctAnswerNbr);
    this.questsvc.create(this.question).subscribe(
      res => {
        this.router.navigateByUrl(`/quests/list/${this.question.evaluationId}`)
      },
      err => {
        this.sys.log.err("ERROR Creating Question:", err, this.question);
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
    this.pageTitle = "Question Create";
  }

  ngOnInit() {
    this.question.evaluationId = Number(this.route.snapshot.params.evalId);
  }

}
