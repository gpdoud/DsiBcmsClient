import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Question } from '../question.class';

@Component({
  selector: 'app-question-detail',
  templateUrl: '../question-form.component.html',
  styleUrls: ['../question-form.component.css']
})
export class QuestionDetailComponent extends BcmsComponent implements OnInit {
  
  questId: any;
  question: Question = new Question();

  edit(): void {
    this.router.navigateByUrl(`/quests/edit/${this.questId}`);
  }
  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.questsvc.remove(this.question).subscribe(
      res => {
        this.sys.log.debug("Question deleted:", res);
        this.router.navigateByUrl(`/quests/list/${this.question.evaluationId}`);
      },
      err => {
        this.sys.log.err("ERROR deleting questions:", err, this.question);
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
    this.readonly = true;
  }

  ngOnInit() {
    this.questId = this.route.snapshot.params.id;
    this.questsvc.get(this.questId).subscribe(
      res => {
        this.question = res;
        this.sys.log.debug("Question:", res);
      },
      err => {
        this.sys.log.err("ERROR reading question:", err);
      }
    );
  }

}
