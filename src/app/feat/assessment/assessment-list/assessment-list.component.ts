import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '@assessment/assessment.service';
import { Assessment } from '@assessment/assessment.class';
import { SystemService } from '@core/system/system.service';
import { BcmsListComponent } from '@feat/common/bcms-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.css']
})
export class AssessmentListComponent extends BcmsListComponent implements OnInit {

  cohortId: number = 0;
  assessments: Assessment[] = [];
  
  constructor(
    protected sys: SystemService,
    private route: ActivatedRoute,
    private assessmentsvc: AssessmentService
    ) { 
      super(sys);
      this.pageTitle = "Assessment List";
      this.sortCriteria = "id";
      this.ascOrder = false;
  }

  refresh(): void {
    this.assessmentsvc.listByCohort(this.cohortId).subscribe(
      res => {
        res.forEach(a => {
          a.userName = `${a.enrollment.user.firstname} ${a.enrollment.user.lastname}`;
          a.grade = a.pointsScore / a.pointsMax;
        });
        this.assessments = res;
        this.sys.log.debug("Assessments", res);
      },
      err => console.error(err)
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.cohortId = this.route.snapshot.params.cohortId;
    this.refresh();
  }

}
