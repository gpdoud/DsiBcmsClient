import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: '../evaluation-form.component.html',
  styleUrls: ['../evaluation-form.component.css']
})
export class EvaluationDetailComponent extends BcmsComponent implements OnInit {

  evalId: any;
  eval: Evaluation = new Evaluation();

  edit(): void {
    this.router.navigateByUrl(`/evals/edit/${this.eval.id}`)
  }
  delete(): void {
    this.verified = !this.verified;
  }
  verify(): void {
    this.evalsvc.remove(this.eval).subscribe(
      (res: any) => {
        this.sys.log.debug("Evaluation deleted:", res);
        this.router.navigateByUrl("/evals/list");
      },
      err => {
        this.sys.log.err("ERROR reading eval:", err, this.eval);
      }    
    );
  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation Detail";
    this.readonly = true;
  }

  addStudentName(e: Evaluation): void {
    if(e.enrollment != null) {
      e.studentName = e.enrollment.user.lastname;
    }
  }


  ngOnInit() {
    super.ngOnInit();
    this.evalId = this.route.snapshot.params.id;
    this.evalsvc.get(this.evalId).subscribe(
      (res: Evaluation) => {
        this.addStudentName(res);
        this.eval = res;
        this.sys.log.debug("Evaluation:", res);
      },
      err => {
        this.sys.log.err("ERROR reading eval:", err);
      }
    );
  }

}
