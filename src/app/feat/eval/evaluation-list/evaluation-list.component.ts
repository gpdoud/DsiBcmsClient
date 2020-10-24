import { Component, OnInit } from '@angular/core';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { SystemService } from '@system/system.service';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent extends BcmsListComponent implements OnInit {
  
  evals: Evaluation[];
  templatesOnly: boolean = false;
  get isRootOrAdmin(): boolean {
    return this.sys.userIsRootOrAdmin;
  }

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
          : `${e.enrollment.user.lastname}, ${e.enrollment.user.firstname}`;
    });
  }

  addOwner(evals: Evaluation[]): void {
    evals.forEach(e => {
      e.owner = (e.userId != null) ? e.user.lastname : "";
    });
  }

  canMaint(evals: Evaluation[]): void {
    evals.forEach(e => {
      e.canMaint = this.isRootOrAdmin || this.sys.loggedInUser.id == e.userId;
    });
  }

  removeInactiveUsers(evals: Evaluation[]) {
    let activeEvals: Evaluation[] = [];
    evals.forEach(e => {
      if(e.isTemplate || e.enrollment.user.active) {
        activeEvals.push(e);
      }
    });
    return activeEvals;
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalsvc.list().subscribe(
      (res: Evaluation[]) => {
        res = this.removeInactiveUsers(res);
        this.addStudentName(res);
        this.addOwner(res);
        this.canMaint(res);
        this.evals = res;
        this.sys.log.debug("Templates:", res);
      }
    );
  }

}
