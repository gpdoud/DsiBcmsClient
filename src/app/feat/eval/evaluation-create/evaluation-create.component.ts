import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from '../evaluation.class';
import { EvaluationService } from '../evaluation.service';

@Component({
  selector: 'app-evaluation-create',
  templateUrl: '../evaluation-form.component.html',
  styleUrls: ['../evaluation-form.component.css']
})
export class EvaluationCreateComponent extends BcmsComponent implements OnInit {

  evalId: any;
  eval: Evaluation = new Evaluation();

  save(): void {
    this.evalsvc.create(this.eval).subscribe(
      (res: any) => {
        this.sys.log.debug("Evaluation created:", res);
        this.router.navigateByUrl("/evals/list");
      },
      err => {
        this.sys.log.err("ERROR creating eval:", err, this.eval);
      }    
    );  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation create";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
