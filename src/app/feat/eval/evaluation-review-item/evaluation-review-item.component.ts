import { Component, OnInit, Input } from '@angular/core';
import { Question } from '@feat/quest/question.class';

@Component({
  selector: 'app-evaluation-review-item',
  templateUrl: './evaluation-review-item.component.html',
  styleUrls: ['./evaluation-review-item.component.css']
})
export class EvaluationReviewItemComponent implements OnInit {

  @Input() idx: number;

  _q: Question;
  
  get q() { return this._q; }
  
  @Input() 
  set q(val: Question) { 
    this._q = val; 
    if(this.q.correctAnswerNbr === -1) {
      this.points = 0;
      this.questcls = this.questclsNeutral;
      this.chkx = this.chkxNeutral;
    } else if(this.q.correctAnswerNbr === this.q.userAnswerNbr) {
      this.points = this.q.pointValue;
      this.questcls = this.questclsRight;
      this.chkx = this.chkxRight;
    } else {
      this.questcls = this.questclsWrong;
      this.chkx = this.chkxWrong;
    } 

    if(this.q.correctAnswerNbr === -1)
      this.anscls[this.q.userAnswerNbr] = this.ansclsNeutral;
    else {
      this.anscls[this.q.userAnswerNbr] = this.ansclsWrong;
      this.anscls[this.q.correctAnswerNbr] = this.ansclsRight;
    }
  };

  points: number = 0;
  chkx: string = "";
  chkxNeutral: string = "";
  chkxRight: string = "(CORRECT)";
  chkxWrong: string = "(INCORRECT)";
  questclsNeutral = " ";
  questclsRight = " alert-success ";
  questclsWrong = " alert-danger ";
  questcls: string = ""
  ansclsNeutral: string = " neutral ";
  ansclsRight: string = " right ";
  ansclsWrong: string = " wrong ";
  anscls: string[] = [ "", "", "", "", ""  ];

  answer(q: Question, idx: number): string { 
    switch(idx) {
      case 0: return q.answerTextA;
      case 1: return q.answerTextB;
      case 2: return q.answerTextC;
      case 3: return q.answerTextD;
      case 4: return q.answerTextE;
      default: return "No Correct Answer";
    }
  }

  answerResult(q: Question): boolean { return q.correctAnswerNbr === q.userAnswerNbr; }
  isWrongAns(q: Question, anbr: number): boolean { return q.correctAnswerNbr !== anbr && q.userAnswerNbr == anbr; }
  isRightAns(q: Question, anbr: number): boolean { return q.correctAnswerNbr === anbr && q.userAnswerNbr == anbr; }

  constructor() { }

  ngOnInit() {
  }

}
