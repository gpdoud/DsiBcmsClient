import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';

@Component({
  selector: 'app-evaluation-student-list',
  templateUrl: './evaluation-student-list.component.html',
  styleUrls: ['./evaluation-student-list.component.css']
})
export class EvaluationStudentListComponent extends BcmsListComponent implements OnInit {

  evals: Evaluation[];
  studentId: number = 0;
  timer(min: number, sec: number) {
    return min.toString() + ":" + (sec < 10 ? 0 + sec.toString() : sec.toString());
  }

  constructor(
    protected sys: SystemService,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluations List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.studentId = this.sys.loggedInUser.id;
    this.evalsvc.listStudentEvals(this.studentId).subscribe(
      res => {
        this.evals = res;
        this.sys.log.debug("StudentEvals:", res);
      },
      err => {
        this.sys.log.err("Problem reading student evals:", err, this.studentId);
      }
    );
  }

}
