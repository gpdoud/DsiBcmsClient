import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';
import { Cohort } from '@feat/cohort/cohort.class';
import { CohortService } from '@feat/cohort/cohort.service';

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

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private evalSvc: EvaluationService,
    private cohortSvc: CohortService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation Assign to Cohort";
  }

  assign(cohortId: number): void {
    this.cohortId = cohortId;
    this.evalSvc.assign(this.evalId, cohortId).subscribe(
      res => {
        this.sys.log.debug("Successfully assigned eval to cohort:", res);
        this.message = `Successfully assigned ${res.evals_created} evals/assess to cohort`;
      },
      err => {
        this.sys.log.err("Failed to assign eval to cohort:", this.evalId, cohortId, err);
        this.message = "ERROR: Failed to assign to cohort";
      }
    );
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
        this.cohorts = res;
        this.sys.log.debug("Cohorts:", res);
      },
      err => {
        this.sys.log.err("Failed to read cohorts:", err);
      }
    );
  }

}
