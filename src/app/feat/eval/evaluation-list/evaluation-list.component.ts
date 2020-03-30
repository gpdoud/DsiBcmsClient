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

  constructor(
    protected sys: SystemService,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluations List";
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalsvc.list().subscribe(
      res => {
        this.evals = res;
        this.sys.log.info(res);
      }
    );
  }

}
