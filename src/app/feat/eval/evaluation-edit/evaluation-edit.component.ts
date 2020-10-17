import { Component, OnInit } from '@angular/core';
import { BcmsComponent } from '@feat/common/bcms.component';
import { SystemService } from '@system/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from '../evaluation.class';

@Component({
  selector: 'app-evaluation-edit',
  templateUrl: '../evaluation-form.component.html',
  styleUrls: ['../evaluation-form.component.css']
})
export class EvaluationEditComponent extends BcmsComponent implements OnInit {

  evalId: any;
  eval: Evaluation = new Evaluation();
  get isRootOrAdmin(): boolean {
    return this.sys.userIsRootOrAdmin;
  }

  save(): void {
    this.evalsvc.change(this.eval).subscribe(
      (res: any) => {
        this.sys.log.debug("Evaluation changed:", res);
        this.router.navigateByUrl("/evals/list");
      },
      err => {
        this.sys.log.err("ERROR changing eval:", err, this.eval);
      }    
    );  }

  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private evalsvc: EvaluationService
  ) { 
    super(sys);
    this.pageTitle = "Evaluation edit";
  }

  addStudentName(e: Evaluation): void {
    if(e.enrollment != null) {
      e.studentName = e.enrollment.user.lastname;
    }
  }

  addOwner(e: Evaluation): void {
    e.owner = (e.userId != null) ? e.user.lastname : "";
  }

  canMaint(e: Evaluation): void {
    e.canMaint = this.isRootOrAdmin || this.sys.loggedInUser.id == e.userId;
  }

  ngOnInit() {
    super.ngOnInit();
    this.evalId = this.route.snapshot.params.id;
    this.evalsvc.get(this.evalId).subscribe(
      (res: Evaluation) => {
        this.addStudentName(res);
        this.addOwner(res);
        this.canMaint(res);
        this.eval = res;
        this.sys.log.debug("Evaluation:", res);
      },
      err => {
        this.sys.log.err("ERROR reading eval:", err);
      }
    );
  }

}
