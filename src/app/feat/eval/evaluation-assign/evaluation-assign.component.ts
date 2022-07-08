import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';
import { Cohort } from '@feat/cohort/cohort.class';
import { CohortService } from '@feat/cohort/cohort.service';
import { User } from '@feat/user/user.class';
import { UserSelection } from '@feat/user/user-selection.class';

@Component({
  selector: 'app-evaluation-assign',
  templateUrl: './evaluation-assign.component.html',
  styleUrls: ['./evaluation-assign.component.css']
})
export class EvaluationAssignComponent extends BcmsComponent implements OnInit {

  evalId: number = 0;
  eval: Evaluation = new Evaluation();
  cohorts: Cohort[] = [];
  message: string = '';
  cohortId: number = 0;
  cohort!: Cohort;
  students!: UserSelection[];

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private evalSvc: EvaluationService,
    private cohortSvc: CohortService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation Assign to Cohort";
  }

  checked: boolean = false;
  checkAllChanged(): void {
    console.debug(`Changed(): is checked: ${this.checked}`);
    this.students.forEach(us => {
      us.checked = this.checked;
    });
  }

  displayStudents(): void {
    this.students = [];
    console.warn(this.cohortId);
    this.cohortSvc.get(this.cohortId).subscribe({
      next: res => { 
        res.enrollments.forEach(e => {
          let us = new UserSelection();
          us.user = e.user;
          this.students.push(us);
        })
      }
    });
  }

  assign(): void {
    let cohortId = +this.cohortId;
    let evalId = +this.evalId;
    for(let us of this.students) {
      let userId = +us.user.id;
      if(!us.checked) { continue; } // skip student
      this.evalSvc.assign(cohortId, userId, evalId).subscribe({
        next: res => {
          us.message = "Assigned...";
        }
      });
    };
  }

  ngOnInit() {
    this.evalId = this.route.snapshot.params.id;
    this.evalSvc.get(this.evalId).subscribe(
      res => {
        this.eval = res;
        this.sys.log.debug("Evaluation:", res);
      },
      err => {
        this.sys.log.err("Failed to read evaluation:", err);
      }
    );
    this.cohortSvc.list().subscribe(
      (res: Cohort[]) => {
        this.cohorts = res.filter(c => c.active);
        this.sys.log.debug("Cohorts:", res);
      },
      err => {
        this.sys.log.err("Failed to read cohorts:", err);
      }
    );
  }

}
