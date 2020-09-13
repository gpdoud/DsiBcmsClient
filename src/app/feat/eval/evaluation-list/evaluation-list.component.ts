import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent extends BcmsListComponent implements OnInit {
  
  evals: Evaluation[];
  templatesOnly: boolean = false;

  constructor(
    protected sys: SystemService,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluations List";
    this.sortCriteria = "studentName";
  }

  addStudentName(evals: Evaluation[]): void {
    evals.forEach(e => {
        e.studentName = (e.enrollment == null) 
          ? ''
          : `${e.enrollment.user.lastname}`;
    });
  }

  addOwner(evals: Evaluation[]): void {
    evals.forEach(e => {
      e.owner = (e.userId != null) ? e.user.lastname : "";
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalsvc.list().subscribe(
      (res: Evaluation[]) => {
        this.addStudentName(res);
        this.addOwner(res);
        this.evals = res;
        this.sys.log.debug("Templates:", res);
      }
    );
  }

}
